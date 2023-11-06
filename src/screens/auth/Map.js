import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {Image, View} from 'native-base';
import Header from '../../components/Header/Header';

const Map = () => {
  return (
    <View flex={1}>
      <View zIndex={10} position={'absolute'}>
        <Header />
      </View>
      <Image
        flex={1}
        source={require('../../assets/maps.png')}
        resizeMode="contain"
        alt="map"
      />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});
