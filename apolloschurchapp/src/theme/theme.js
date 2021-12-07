import React from 'react';
import { Text } from 'react-native';
import { ButtonLink } from '@apollosproject/ui-kit';
import { safeHandleUrl } from '@apollosproject/ui-connected';
import ContentNodeHeader from '../ui/ContentNodeHeader';
import OrganizationFeatureConnected from '../ui/OrganizationFeatureConnected';

/* Add your custom theme definitions below. Anything that is supported in UI-Kit Theme can be
 overridden and/or customized here! */

/* Base colors.
 * These get used by theme types (see /types directory) to color
 * specific parts of the interface. For more control on how certain
 * elements are colored, go there. The next level of control comes
 * on a per-component basis with "overrides"
 */
const colors = {
  primary: 'rgba(79, 110, 174, 1)',
  secondary: 'rgba(95, 192, 194, 1)',
  tertiary: 'rgba(250, 101, 85, 1)',
};

const types = {
  light: {
    colors: {
      screen: '#DDDFDF',
      background: {
        screen: '#DDDFDF',
        regular: '#FFFFFF',
      },
    },
  },
};

/* Base Typography sizing and fonts.
 * To control speicfic styles used on different type components (like H1, H2, etc), see "overrides"
 */
const typography = {
  sans: {
    regular: {
      default: 'NunitoSans-Regular',
      italic: 'NunitoSans-Italic',
    },
    medium: {
      default: 'NunitoSans-SemiBold',
      italic: 'NunitoSans-SemiBoldItalic',
    },
    bold: {
      default: 'NunitoSans-Bold',
      italic: 'NunitoSans-BoldItalic',
    },
    black: {
      default: 'NunitoSans-Bold',
      italic: 'NunitoSans-BoldItalic',
    },
  },
  ui: {
    regular: 'System',
  },
};

/* Responsive breakpoints */
// export const breakpoints = {};

/* Base sizing units. These are used to scale
 * space, and size components relatively to one another.
 */
// export const sizing = {};

/* Base alpha values. These are used to keep transparent values across the app consistant */
// export const alpha = {};

/* Base overlays. These are used as configuration for LinearGradients across the app */
// export const overlays = () => ({});

/* Overrides allow you to override the styles of any component styled using the `styled` HOC. You
 * can also override the props of any component using the `withTheme` HOC. See examples below:
 * ```const StyledComponent = styled({ margin: 10, padding: 20 }, 'StyledComponent');
 *    const PropsComponent = withTheme(({ theme }) => ({ fill: theme.colors.primary }), 'PropsComponent');
 * ```
 * These componnents can have their styles/props overriden by including the following overrides:
 * ```{
 *   overides: {
 *     StyledComponent: {
 *       margin: 5,
 *       padding: 15,
 *     },
 *     // #protip: you even have access 👇to component props! This applies to style overrides too 💥
 *     PropsComponent: () => ({ theme, isActive }) => ({
 *       fill: isActive ? theme.colors.secondary : theme.colors.primary,
 *     }),
 *   },
 * }
 * ```
 */
const overrides = {
  ContentSingle: { autoComplete: false },
  'ui-auth.Entry': {
    authTitleText: 'Have We Met?',
    // eslint-disable-next-line react/display-name
    promptText: `Sign In For A Personalized Experience That Helps You Grow And Show God's Love Beyond The Church Walls.`,
    // eslint-disable-next-line react/display-name
    footerComponent: () => (
      <Text>
        By Clicking &quot;Next,&quot; You Accept Our{' '}
        <ButtonLink
          onPress={() =>
            safeHandleUrl(
              'https://www.vineyardcincinnati.com/privacy-and-terms-of-use'
            )
          }
        >
          Privacy Policy And Terms Of Use.
        </ButtonLink>
      </Text>
    ),
  },
  'ui-onboarding.AskNotifications': {
    // eslint-disable-next-line react/display-name
    slideTitle: () => <Text>Can We Keep You Informed?</Text>,
    // eslint-disable-next-line react/display-name
    description: () => (
      <Text>
        We&apos;ll Let You Know When Important Things Are Happening And Keep You
        In The Loop.
      </Text>
    ),
  },
  'ui-onboarding.Follow': {
    // eslint-disable-next-line react/display-name
    slideTitle: () => <Text>Get Connected</Text>,
    // eslint-disable-next-line react/display-name
    description: () => (
      <Text>Follow Others To Stay Connected To Our Community</Text>
    ),
  },
  'ui-prayer.PrayerDialogScreen': {
    title: 'Support Your Community Through Prayer',
    body: 'Pray For Others Or Submit Prayer Requests',
    primaryActionText: "Let's Go!",
  },
  'ui-connected.ContentNodeConnected': {
    // eslint-disable-next-line react/display-name
    HeaderComponent: () => (props) => <ContentNodeHeader {...props} />,
  },
  // eslint-disable-next-line react/display-name
  'ui-kit.DefaultCard': () => ({ relatedNode, actionIcon, labelText }) => ({
    LabelComponent:
      actionIcon || labelText || !relatedNode?.id ? (
        undefined
      ) : (
        <OrganizationFeatureConnected nodeId={relatedNode?.id} isCard />
      ),
  }),
};

export default {
  colors,
  overrides,
  typography,
  types,
};
