import React from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import GET_LOCATION_FEATURE from './getLocationFeature';
import LocationFeature from './LocationFeature';

export default function LocationFeatureConnected({ nodeId }) {
  const { data } = useQuery(GET_LOCATION_FEATURE, {
    variables: {
      nodeId,
    },
  });

  if (data?.getLocationFeature) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <LocationFeature {...data.getLocationFeature} />;
  }
  return null;
}

LocationFeatureConnected.propTypes = {
  nodeId: PropTypes.string,
};
