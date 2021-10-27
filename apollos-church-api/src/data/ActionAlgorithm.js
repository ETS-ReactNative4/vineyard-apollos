import { ActionAlgorithm } from '@apollosproject/data-connector-postgres';
import { Op } from 'sequelize';

const { schema, resolver } = ActionAlgorithm;

class dataSource extends ActionAlgorithm.dataSource {
  ACTION_ALGORITHMS = {
    ...this.ACTION_ALGORITHMS,
    COMPLETED_CONTENT_FEED: this.completedContentFeedAlgorithm.bind(this),
    OLDEST_TO_NEWEST_CONTENT_FEED: this.oldestToNewestContentFeedAlgorithm.bind(this),
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

  async oldestToNewestContentFeedAlgorithm({
    subtitle = '',
    channelIds = [],
    limit = 20,
    skip = 0,
    hasImage = true,
  } = {}) {
    const { ContentItem } = this.context.dataSources;

    // This is custom....normally it is sorted by DESC
    const items = await ContentItem.model.findAll({
      limit,
      skip,
      where: {
        contentItemCategoryId: { [Op.in]: channelIds },
      },
      order: [['publishAt', 'ASC']],
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
    const { ContentItem, Feature, Person } = this.context.dataSources;
    Feature.setCacheHint({ scope: 'PRIVATE' });

    const personId = await Person.getCurrentPersonId();

    const items = await ContentItem.sequelize.query(
      `
      WITH completed_items AS (
        SELECT
            c.id,
            c.title,
            c.parent_id
        FROM
            content_item c
            LEFT JOIN interaction i ON c.id = i.node_id
        WHERE
            c.content_item_category_id = '${categoryId}'
            AND i.action = 'COMPLETE'
        AND i.person_id = '${personId}'
          ORDER BY
              publish_at ASC
          LIMIT 1000
      ),
      all_items AS (
          SELECT
        *
          FROM
              content_item c
          WHERE
              c.content_item_category_id = '${categoryId}'
          ORDER BY
              (CASE
                    WHEN parent_id = '520871fb-feca-4f28-bfcc-cbdc26083472' THEN 1
                    WHEN parent_id = '2f16d90c-55fb-4fff-9b5d-4e6d6738d66a' THEN 2
                    WHEN parent_id = '0fd5a8f8-5ae2-45ac-b3ec-a184892e8f5f' THEN 3
                    WHEN parent_id = '820a8e0d-98d8-4f54-a71e-32e190681922' THEN 4
                    END) ASC,
              publish_at ASC
          LIMIT 1000
      ),
      uncompleted_items AS (
          SELECT
              a.id,
              a.title,
              a.summary,
              a.html_content,
              a.publish_at,
              a.apollos_id,
              a.apollos_type,
              a.content_item_category_id,
              a.cover_image_id,
              a.parent_id
          FROM
              all_items a
              LEFT JOIN completed_items c ON a.id = c.id
          WHERE
              c.id IS NULL
          LIMIT 1
      )
      SELECT
          c.title parent_name,
          u.id,
          u.title,
          u.apollos_id,
          u.apollos_type,
          u.cover_image_id,
          u.summary
      FROM
          content_item c
          JOIN uncompleted_items u ON c.id = u.parent_id
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
