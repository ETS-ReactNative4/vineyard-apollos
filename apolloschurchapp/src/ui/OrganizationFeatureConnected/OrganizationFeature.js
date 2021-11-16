import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme, H4 } from '@apollosproject/ui-kit';
import PropTypes from 'prop-types';

export default function OrganizationFeature({ name, logoUrl, isCard }) {
  const theme = useTheme();

  return (
    <TouchableOpacity disabled style={styles.container(theme, isCard)}>
      <Image source={{ uri: logoUrl }} style={styles.image(theme)} />
      <View style={styles.textContainer}>
        <H4 bold style={styles.h4(theme)}>
          {name}
        </H4>
      </View>
    </TouchableOpacity>
  );
}

OrganizationFeature.propTypes = {
  name: PropTypes.string,
  logoUrl: PropTypes.string,
  isCard: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: (theme, isCard) => ({
    flexDirection: 'row',
    padding: !isCard ? 8 : 0,
    borderTopColor: !isCard ? 'rgba(0,0,0,0.2)' : undefined,
    borderTopWidth: !isCard ? 1 : undefined,
    minHeight: 60,
    alignItems: 'center',
    backgroundColor: !isCard ? theme.colors.paper : undefined,
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
  h4: ({ colors }) => ({
    color: colors.text.secondary,
  }),
});
