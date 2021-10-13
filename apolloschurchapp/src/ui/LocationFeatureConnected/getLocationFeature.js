import { gql } from '@apollo/client';

export default gql`
  query getLocationFeature($nodeId: ID!) {
    getLocationFeature(nodeId: $nodeId) {
      id
      name
      street
      city
      state
      zip
      lat
      long
      date
    }
  }
`;
