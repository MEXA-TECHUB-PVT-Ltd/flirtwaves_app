import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'native-base';

const Map = () => {
  return (
    <Image
      flex={1}
      source={require('../../assets/maps.png')}
      resizeMode="contain"
      alt="map"
    />
  );
};

export default Map;

const styles = StyleSheet.create({});
