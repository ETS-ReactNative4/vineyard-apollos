import React from 'react';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import Marker from '@apollosproject/ui-mapview/src/Marker';
import openMap from 'react-native-open-maps';
import EventInfoItem from '../EventInfoItem';

export default function LocationFeature({
  name,
  street,
  city,
  state,
  zip,
  lat,
  long,
  date,
}) {
  const address = `${street}, ${city}, ${state} ${zip}`;

  return (
    <>
      <MapView
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        style={{ aspectRatio: 2 / 1 }}
      >
        <Marker
          latitude={lat}
          longitude={long}
          onPress={undefined}
          opacityStyle={undefined}
        />
      </MapView>
      <EventInfoItem
        onPress={() =>
          openMap({
            latitude: lat,
            longitude: long,
            query: address,
          })
        }
        icon="pin"
        title={name || address}
        subtitle={name && address}
      />
      {date && <EventInfoItem icon="time" title={date} />}
    </>
  );
}

LocationFeature.propTypes = {
  name: PropTypes.string,
  street: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zip: PropTypes.string,
  lat: PropTypes.number,
  long: PropTypes.number,
  date: PropTypes.string,
};
