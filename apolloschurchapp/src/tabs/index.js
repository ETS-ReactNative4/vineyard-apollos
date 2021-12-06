import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, useColorScheme } from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationService,
  withTheme,
  Icon,
  Touchable,
} from '@apollosproject/ui-kit';
import { useApolloClient } from '@apollo/client';
import {
  createFeatureFeedTab,
  UserAvatarConnected,
  DefaultTabComponent,
} from '@apollosproject/ui-connected';
import { checkOnboardingStatusAndNavigate } from '@apollosproject/ui-onboarding';
// import Connect from './connect';
import theme from '../theme';
import createStoriesTab from '../ui/StoriesTabConnected';
import HomeTabHeader from '../ui/HomeTabHeader';
import tabBarIcon from './tabBarIcon';

const HeaderLogo = withTheme(() => ({
  size: 24,
  name: 'brand-icon',
}))(Icon);

const SearchIcon = withTheme(({ theme: { colors, sizing: { baseUnit } } }) => ({
  name: 'search',
  size: baseUnit * 2,
  fill: colors.tertiary,
}))(Icon);

const SearchButton = ({ onPress }) => (
  <Touchable onPress={onPress}>
    <SearchIcon />
  </Touchable>
);

SearchButton.propTypes = {
  onPress: PropTypes.func,
};

const Avatar = withTheme(() => ({
  size: 'xsmall',
}))(UserAvatarConnected);

const ProfileButton = ({ onPress }) => (
  <Touchable onPress={onPress}>
    <View>
      <Avatar />
    </View>
  </Touchable>
);

ProfileButton.propTypes = {
  onPress: PropTypes.func,
};

const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <ProfileButton
      onPress={() => {
        navigation.navigate('UserSettingsNavigator');
      }}
    />
  );
};
const HeaderCenter = () => <HeaderLogo source={require('./wordmark.png')} />;
const HeaderRight = () => {
  const navigation = useNavigation();
  return (
    <SearchButton
      onPress={() => {
        navigation.navigate('Search');
      }}
    />
  );
};

const fontStyles = { fontFamily: 'NunitoSans-Bold' };

const HomeTabWithHeader = (props) => (
  <DefaultTabComponent
    {...props}
    feedViewProps={{
      ListHeaderComponent: HomeTabHeader,
      contentInsetAdjustmentBehavior: 'automatic',
      style: {
        backgroundColor: theme.colors.primary,
      },
    }}
  />
);
// we nest stack inside of tabs so we can use all the fancy native header features
const HomeTab = createFeatureFeedTab({
  options: {
    headerHideShadow: true,
    headerCenter: HeaderCenter,
    headerLeft: HeaderLeft,
    headerLargeTitle: false,
    headerStyle: {
      blurEffect: 'systemChromeMaterial',
      backgroundColor: 'transparent',
    },
    headerTranslucent: true,
  },
  tabName: 'Home',
  feedName: 'HOME',
  TabComponent: HomeTabWithHeader,
});

const ReadyTab = createFeatureFeedTab({
  tabName: 'Be Ready',
  feedName: 'READ',
  options: {
    headerLeft: HeaderLeft,
    headerTintColor: theme.colors.primary,
    headerLargeTitleStyle: fontStyles,
    headerBackTitleStyle: fontStyles,
    headerTitleStyle: fontStyles,
  },
});

const SetTab = createFeatureFeedTab({
  tabName: 'Get Set',
  feedName: 'WATCH',
  options: {
    headerLeft: HeaderLeft,
    headerTintColor: theme.colors.secondary,
    headerLargeTitleStyle: fontStyles,
    headerBackTitleStyle: fontStyles,
    headerTitleStyle: fontStyles,
  },
});

const GoTab = createFeatureFeedTab({
  options: {
    headerLeft: HeaderLeft,
    headerRight: HeaderRight,
    headerTintColor: theme.colors.tertiary,
    headerLargeTitleStyle: fontStyles,
    headerBackTitleStyle: fontStyles,
    headerTitleStyle: fontStyles,
  },
  tabName: 'Go Serve',
  feedName: 'PRAY',
  tabProps: {
    useTagFilter: true,
  },
});

const StoriesTab = createStoriesTab({
  tabName: 'Stories',
  feedName: 'STORIES',
  options: {
    headerLeft: HeaderLeft,
    headerLargeTitleStyle: fontStyles,
    headerBackTitleStyle: fontStyles,
    headerTitleStyle: fontStyles,
  },
});

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  const client = useApolloClient();
  // this is only used by the tab loaded first
  // if there is a new version of the onboarding flow,
  // we'll navigate there first to show new screens
  useEffect(
    () => {
      checkOnboardingStatusAndNavigate({
        client,
        navigation: NavigationService,
        navigateHome: false,
      });
    },
    [client]
  );

  let activeColor;
  const colorScheme = useColorScheme();

  switch (getFocusedRouteNameFromRoute(route)) {
    case 'Ready':
      activeColor = theme.colors.primary;
      break;
    case 'Set':
      activeColor = theme.colors.secondary;
      break;
    case 'Go':
      activeColor = theme.colors.tertiary;
      break;
    default:
      if (colorScheme === 'light') {
        activeColor = '#000000';
      } else {
        activeColor = '#ffffff';
      }
  }

  return (
    <Navigator lazy tabBarOptions={{ activeTintColor: activeColor }}>
      <Screen
        name="Home"
        component={HomeTab}
        options={{ tabBarIcon: tabBarIcon('house') }}
      />
      <Screen
        name="Ready"
        component={ReadyTab}
        options={{ tabBarIcon: tabBarIcon('ready') }}
      />
      <Screen
        name="Set"
        component={SetTab}
        options={{ tabBarIcon: tabBarIcon('set') }}
      />
      <Screen
        name="Go"
        component={GoTab}
        options={{ tabBarIcon: tabBarIcon('go') }}
      />
      <Screen
        name="Stories"
        component={StoriesTab}
        options={{ tabBarIcon: tabBarIcon('chat-dots') }}
      />
    </Navigator>
  );
};

TabNavigator.propTypes = {
  route: PropTypes.string,
};

export default TabNavigator;
