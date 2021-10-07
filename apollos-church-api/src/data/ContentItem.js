import { ContentItem } from '@apollosproject/data-connector-postgres';

const { models, migrations, schema, dataSource } = ContentItem;

const resolver = {
  ...ContentItem.resolver,
  DevotionalContentItem: {
    ...ContentItem.resolver.DevotionalContentItem,
    theme: (args) => {
      switch (args.dataValues.contentItemCategoryId) {
        case '8edb84c2-063a-45bf-b92e-845745edb57a': // Be Ready
          return {
            colors: {
              paper: 'white',
            },
          };
        default:
          return {
            colors: {
              paper: 'green',
            },
          };
      }
    },
  },
  UniversalContentItem: {
    ...ContentItem.resolver.UniversalContentItem,
    theme: (args) => {
      switch (args.dataValues.contentItemCategoryId) {
        case '1acff1cb-805b-4561-b5f7-ee136b0b39b4': // Get Set
          return {
            colors: {
              paper: 'salmon',
            },
          };
        case '569f5ff8-4cf9-4de0-a4d5-cd91ed78c7e2': // Go Serve
          return {
            colors: {
              paper: 'black',
            },
          };
        default:
          return {
            colors: {
              paper: 'green',
            },
          };
      }
    },
  },
};

export { models, migrations, resolver, schema, dataSource };
