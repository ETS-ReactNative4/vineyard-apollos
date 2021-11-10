import { gql } from '@apollo/client';

export default gql`
  query getOrganizationFeature($nodeId: ID!) {
    getOrganizationFeature(nodeId: $nodeId) {
      id
      name
      logoUrl
    }
  }
`;
