import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, H4, H6, Icon } from '@apollosproject/ui-kit';
import PropTypes from 'prop-types';

export default function EventInfoItem({ icon, title, subtitle, onPress }) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container(theme)}
      disabled={!onPress}
    >
      <Icon
        style={styles.icon}
        fill={theme.colors.text.tertiary}
        size={theme.sizing.baseUnit * 1.5}
        name={icon}
      />
      <View style={styles.textContainer}>
        {title && <H4 bold>{title}</H4>}
        {subtitle && <H6 style={styles.h6(theme)}>{subtitle}</H6>}
      </View>
      {onPress && (
        <Icon
          style={styles.icon}
          fill={theme.colors.text.tertiary}
          size={theme.sizing.baseUnit * 1.5}
          name="arrow-next"
        />
      )}
    </TouchableOpacity>
  );
}

EventInfoItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: (theme) => ({
    flexDirection: 'row',
    padding: 8,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
    minHeight: 60,
    alignItems: 'center',
    backgroundColor: theme.colors.paper,
  }),
  textContainer: {
    flexDirection: 'column',
    maxWidth: '90%',
    paddingHorizontal: 8,
    flexGrow: 1,
  },
  icon: {
    paddingHorizontal: 8,
  },
  h6: ({ colors, sizing }) => ({
    color: colors.text.tertiary,
    fontSize: sizing.baseUnit * 0.875,
  }),
});
