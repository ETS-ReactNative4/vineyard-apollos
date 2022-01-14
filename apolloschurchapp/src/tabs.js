import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, useColorScheme } from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationService,
  useTheme,
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
import customTheme from './theme';
import createStoriesTab from './ui/StoriesTabConnected';
import HomeTabHeader from './ui/HomeTabHeader';

const HeaderLogo = () => {
  const theme = useTheme();
  return (
    <Icon
      name="brand-icon"
      size={theme.sizing.baseUnit * 1.5}
      fill={theme.colors.primary}
    />
  );
};

const ProfileButton = () => {
  const navigation = useNavigation();
  return (
    <Touchable
      onPress={() => {
        navigation.navigate('UserSettingsNavigator');
      }}
    >
      <View>
        <UserAvatarConnected size="xsmall" />
      </View>
    </Touchable>
  );
};

const SearchButton = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <Touchable
      onPress={() => {
        navigation.navigate('Search');
      }}
    >
      <Icon
        name="search"
        size={theme.sizing.baseUnit * 2}
        fill={theme.colors.primary}
      />
    </Touchable>
  );
};

const tabBarIcon = (name) => {
  function TabBarIcon({ color }) {
    return <Icon name={name} fill={color} size={24} />;
  }
  TabBarIcon.propTypes = {
    color: PropTypes.string,
  };
  return TabBarIcon;
};

const fontStyles = { fontFamily: 'NunitoSans-Bold' };

const HomeTabWithHeader = (props) => (
  <DefaultTabComponent
    {...props}
    feedViewProps={{
      ListHeaderComponent: HomeTabHeader,
      contentInsetAdjustmentBehavior: 'automatic',
      style: {
        backgroundColor: customTheme.colors.primary,
      },
    }}
  />
);
// we nest stack inside of tabs so we can use all the fancy native header features
const HomeTab = createFeatureFeedTab({
  options: {
    headerHideShadow: true,
    headerCenter: HeaderLogo,
    headerLeft: ProfileButton,
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
    headerLeft: ProfileButton,
    headerTintColor: customTheme.colors.primary,
    headerLargeTitleStyle: fontStyles,
    headerBackTitleStyle: fontStyles,
    headerTitleStyle: fontStyles,
  },
});

const SetTab = createFeatureFeedTab({
  tabName: 'Get Set',
  feedName: 'WATCH',
  options: {
    headerLeft: ProfileButton,
    headerTintColor: customTheme.colors.secondary,
    headerLargeTitleStyle: fontStyles,
    headerBackTitleStyle: fontStyles,
    headerTitleStyle: fontStyles,
  },
});

const GoTab = createFeatureFeedTab({
  options: {
    headerLeft: ProfileButton,
    headerRight: SearchButton,
    headerTintColor: customTheme.colors.tertiary,
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
    headerLeft: ProfileButton,
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
  useEffect(() => {
    checkOnboardingStatusAndNavigate({
      client,
      navigation: NavigationService,
      navigateHome: false,
    });
  }, [client]);

  let activeColor;
  const colorScheme = useColorScheme();

  switch (getFocusedRouteNameFromRoute(route)) {
    case 'Ready':
      activeColor = customTheme.colors.primary;
      break;
    case 'Set':
      activeColor = customTheme.colors.secondary;
      break;
    case 'Go':
      activeColor = customTheme.colors.tertiary;
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
