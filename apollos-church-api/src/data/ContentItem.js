import { ContentItem } from '@apollosproject/data-connector-postgres';
import { createGlobalId } from '@apollosproject/server-core';

const { schema, resolver, models, migrations } = ContentItem;

class dataSource extends ContentItem.dataSource {
  getFeatures = async (model) => {
    const { Feature } = this.context.dataSources;
    const features = await model.getFeatures({
      order: [['priority', 'ASC']],
    });

    // filter out location and event features
    // those are handled differently and are shown above the content
    const filteredFeatures = features.filter(
      (feature) =>
        !['EventDateFeature', 'LocationFeature'].includes(feature.apollosType)
    );

    if (
      model.dataValues.contentItemCategoryId ===
      '1acff1cb-805b-4561-b5f7-ee136b0b39b4'
    ) {
      filteredFeatures.push(
        Feature.createActionTableFeature({
          __typename: 'ActionTableFeature',
          title: '',
          actions: [
            {
              id: createGlobalId(
                JSON.stringify({
                  __typename: 'ActionTableItem',
                  title: 'Share your story',
                }),
                'ActionTableItem'
              ),
              title: 'Share your story',
              action: 'OPEN_URL',
              relatedNode: {
                __typename: 'Url',
                url: 'GoDoGood://app-link/nav/Stories',
              },
            },
          ],
        })
      );
    }

    return filteredFeatures;
  };
}

export { schema, resolver, dataSource, models, migrations };
