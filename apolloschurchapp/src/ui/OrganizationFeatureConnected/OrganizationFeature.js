import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme, H4 } from '@apollosproject/ui-kit';
import PropTypes from 'prop-types';

export default function OrganizationFeature({ name, logoUrl }) {
  const theme = useTheme();

  return (
    <TouchableOpacity disabled style={styles.container(theme)}>
      <Image source={{ uri: logoUrl }} style={styles.image(theme)} />
      <View style={styles.textContainer}>
        <H4 bold>{name}</H4>
      </View>
    </TouchableOpacity>
  );
}

OrganizationFeature.propTypes = {
  name: PropTypes.string,
  logoUrl: PropTypes.string,
};

const styles = StyleSheet.create({
  container: (theme) => ({
    flexDirection: 'row',
    padding: 8,
    borderTopColor: 'rgba(0,0,0,0.2)',
    borderTopWidth: 1,
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
  image: (theme) => ({
    paddingHorizontal: 8,
    height: theme.sizing.baseUnit * 2,
    width: theme.sizing.baseUnit * 2,
    borderRadius: 5,
  }),
});
