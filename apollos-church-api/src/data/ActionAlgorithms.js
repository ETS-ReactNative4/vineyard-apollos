import { ActionAlgorithm } from '@apollosproject/data-connector-rock';

class dataSource extends ActionAlgorithm.dataSource {
  ACTION_ALGORITHMS = {
    ...this.ACTION_ALGORITHMS,
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
}

export { dataSource };
