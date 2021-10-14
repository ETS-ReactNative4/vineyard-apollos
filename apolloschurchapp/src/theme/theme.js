import React from 'react';
import ContentNodeHeader from '../ui/ContentNodeHeader';
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

/* Base Typography sizing and fonts.
 * To control speicfic styles used on different type components (like H1, H2, etc), see "overrides"
 */
const typography = {
  sans: {
    regular: {
      default: 'Nunito-Regular',
      italic: 'Nunito-Italic',
    },
    medium: {
      default: 'Nunito-SemiBold',
      italic: 'Nunito-SemiBoldItalic',
    },
    bold: {
      default: 'Nunito-Bold',
      italic: 'Nunito-BoldItalic',
    },
    black: {
      default: 'Nunito-Bold',
      italic: 'Nunito-BoldItalic',
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
  'ui-connected.ContentNodeConnected': {
    // eslint-disable-next-line react/display-name
    HeaderComponent: () => (props) => <ContentNodeHeader {...props} />,
  },
};

export default {
  colors,
  overrides,
  typography,
};
