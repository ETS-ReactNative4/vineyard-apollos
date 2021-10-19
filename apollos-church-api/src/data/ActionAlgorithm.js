import { ActionAlgorithm } from '@apollosproject/data-connector-postgres';

const { schema, resolver } = ActionAlgorithm;

class dataSource extends ActionAlgorithm.dataSource {
  ACTION_ALGORITHMS = {
    ...this.ACTION_ALGORITHMS,
    COMPLETED_CONTENT_FEED: this.completedContentFeedAlgorithm.bind(this),
    SERIES_ITEM_IN_PROGRESS: this.seriesItemInProgressAlgorithm.bind(this),
    OPEN_GO_TAB: this.openGoTabAlgorithm.bind(this),
  };

  async contentFeedAlgorithm({
    subtitle = '',
    channelIds = [],
    limit = 20,
    skip = 0,
    hasImage = true,
  } = {}) {
    const { ContentItem } = this.context.dataSources;
    const items = await ContentItem.getFromCategoryIds(channelIds, {
      limit,
      skip,
    });
    return items.map((item, i) => ({
      id: `${item.id}${i}`,
      title: item.title,
      subtitle: subtitle || item.contentChannel?.name,
      relatedNode: item,
      image: hasImage ? item.getCoverImage() : null,
      action: 'READ_CONTENT',
      summary: item.summary,
    }));
  }

  async openGoTabAlgorithm(...args) {
    const { Feature } = this.context.dataSources;
    const contentFeed = await this.contentFeedAlgorithm(...args);

    return contentFeed.map((item) => ({
      ...item,
      ...Feature.attachActionIds({
        ...item,
        action: 'OPEN_URL',
        relatedNode: {
          __typename: 'Url',
          url: 'GoDoGood://app-link/nav/Go',
        },
      }),
    }));
  }

  async completedContentFeedAlgorithm({ channelId = '' } = {}) {
    if (!channelId) return [];

    const { Feature, Person, ContentItem } = this.context.dataSources;
    Feature.setCacheHint({ scope: 'PRIVATE' });

    const personId = await Person.getCurrentPersonId();

    const items = await ContentItem.model.findAll({
      include: {
        model: this.sequelize.models.interaction,
        where: { action: 'COMPLETE', personId },
        require: true,
      },
      where: { content_item_category_id: channelId },
    });

    return items.map((item, i) => ({
      id: `${item.id}${i}`,
      title: item.title,
      subtitle: item?.contentChannel?.name || '',
      relatedNode: item,
      image: item.getCoverImage(),
      action: 'READ_CONTENT',
      summary: item.summary,
    }));
  }

  async seriesItemInProgressAlgorithm({
    subtitle = '',
    categoryId,
    emptyMessage = 'All caught up!',
    hasImage = true,
  } = {}) {
    const { ContentItem, Feature } = this.context.dataSources;
    Feature.setCacheHint({ scope: 'PRIVATE' });

    const items = await ContentItem.sequelize.query(
      `
    WITH uncompleted_items AS (
        SELECT
            title,
            parent_id
        FROM
            content_item c
            LEFT JOIN interaction i ON c.id = i.node_id
        WHERE
            c.content_item_category_id = '${categoryId}'
            AND (i.action IS NULL
                OR i.action != 'COMPLETE')
        ORDER BY
            publish_at DESC
        LIMIT 1
    ),
    series AS (
        SELECT
            c.id,
            c.title
        FROM
            content_item c
            JOIN uncompleted_items u ON c.id = u.parent_id
    )
    SELECT
        c.id,
        c.title,
        c.apollos_id,
        c.apollos_type,
        c.cover_image_id,
        c.summary,
        s.title parent_name
    FROM
        content_item c
        JOIN series s ON c.parent_id = s.id
        LEFT JOIN interaction i ON c.id = i.node_id
    WHERE
        i.action IS NULL
        OR i.action != 'COMPLETE'
    ORDER BY
        publish_at ASC
    LIMIT 1;
    `,
      {
        model: this.sequelize.models.contentItem,
        mapToModel: true,
      }
    );

    return items.length
      ? items.map((item, i) => ({
          id: `${item.id}${i}`,
          title: item.title,
          subtitle: subtitle || item.parentName,
          relatedNode: item,
          image: hasImage ? item.getCoverImage() : null,
          action: 'READ_CONTENT',
          summary: item.summary,
        }))
      : [
          {
            id: 'EmptyCard',
            relatedNode: {
              // __type: 'Message',
              __typename: 'Message',
              message: emptyMessage,
            },
          },
        ];
  }
}

export { schema, resolver, dataSource };
