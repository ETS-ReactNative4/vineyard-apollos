import React from 'react';
import { ContentTitles } from '@apollosproject/ui-kit';
import PropTypes from 'prop-types';
import ContentTilesConnected from '@apollosproject/ui-connected/src/ContentNodeConnected/ContentTitlesConnected';
import LocationFeatureConnected from './LocationFeatureConnected';

export default function ContentNodeHeader({ isLoading, node }) {
  return isLoading ? (
    <ContentTitles featured isLoading />
  ) : (
    <>
      <ContentTilesConnected node={node} />
      <LocationFeatureConnected nodeId={node.id} />
    </>
  );
}

ContentNodeHeader.propTypes = {
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  node: PropTypes.object,
};
