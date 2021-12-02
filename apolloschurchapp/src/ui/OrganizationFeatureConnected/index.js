import React from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import GET_ORGANIZATION_FEATURE from './getOrganizationFeature';
import OrganizationFeature from './OrganizationFeature';

export default function OrganizationFeatureConnected({
  nodeId,
  ...otherProps
}) {
  const { data } = useQuery(GET_ORGANIZATION_FEATURE, {
    variables: {
      nodeId,
    },
  });

  if (data?.getOrganizationFeature) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return (
      <OrganizationFeature {...data.getOrganizationFeature} {...otherProps} />
    );
  }
  return null;
}

OrganizationFeatureConnected.propTypes = {
  nodeId: PropTypes.string,
};
