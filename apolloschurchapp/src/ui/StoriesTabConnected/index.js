import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NodeFeaturesConnected } from '@apollosproject/ui-connected';
import { styled } from '@apollosproject/ui-kit';
import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

function StoriesTabConnected({ feedName }) {
  const { data } = useQuery(
    gql`
      query getContentItemFeatures($tab: Tab!) {
        getContentItemId(tab: $tab)
      }
    `,
    {
      variables: {
        tab: feedName,
      },
    }
  );

  if (data?.getContentItemId) {
    return (
      <BottomSheetModalProvider>
        <NodeFeaturesConnected nodeId={data?.getContentItemId} />
      </BottomSheetModalProvider>
    );
  }
  return null;
}

StoriesTabConnected.propTypes = {
  feedName: PropTypes.string,
};

const TestView = styled({ height: '15%' })(View);

// eslint-disable-next-line import/prefer-default-export
const createStoriesTab = ({
  tabName,
  screenOptions,
  options,
  tabProps,
  feedName,
  TabComponent = StoriesTabConnected,
  contentItemId,
}) => {
  const TabComponentToRender = (props) => (
    <>
      <TabComponent {...props} {...tabProps} feedName={feedName} />
      <TestView />
    </>
  );
  const TabStack = createNativeStackNavigator();
  const TabNav = () => (
    <TabStack.Navigator
      screenOptions={{
        headerHideShadow: true,
        headerLargeTitle: true,
        ...screenOptions,
      }}
    >
      <TabStack.Screen
        name={tabName}
        component={TabComponentToRender}
        options={options}
        initialParams={{
          itemId: contentItemId,
        }}
      />
    </TabStack.Navigator>
  );
  return TabNav;
};

export default createStoriesTab;
