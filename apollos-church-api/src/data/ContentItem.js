import { ContentItem } from '@apollosproject/data-connector-postgres';

const { schema, resolver, models, migrations } = ContentItem;

class dataSource extends ContentItem.dataSource {
  getFeatures = async (model) => {
    const features = await model.getFeatures({
      order: [['priority', 'ASC']],
    });
    // filter out location and event features
    // those are handled differently and are shown above the content
    return features.filter(
      (feature) =>
        !['EventDateFeature', 'LocationFeature'].includes(feature.apollosType)
    );
  };
}

export { schema, resolver, dataSource, models, migrations };
