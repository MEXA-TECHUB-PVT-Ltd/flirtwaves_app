// da/``
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Box,
  Center,
  Circle,
  Image,
  Row,
  Stack,
  Text,
  View,
  Progress,
} from 'native-base';
import React from 'react';

import Header from '../../components/Header/Header';
import CircularProgress from 'react-native-circular-progress-indicator';

const ProfileProcessing = ({navigation}) => {
  return (
    <View
      flex={1}
      bg={'primary.20'}
      alignItems={'center'}
      justifyContent={'center'}>
      {/* <ImageBackground
      source={require('../../assets/processing.png')}
      style={{flex: 1}}
      resizeMode="cover">
    //   <View
    //     mx={5}
    //     mt={5}
    //     alignItems={'center'}
    //     justifyContent={'center'}
    //     flex={1}> */}

      <CircularProgress
        value={100}
        inActiveStrokeColor={'white'}
        inActiveStrokeOpacity={0.2}
        activeStrokeColor="black"
        progressValueColor={'black'}
        valueSuffix={'%'}
        onAnimationComplete={() => {
          navigation.navigate('ProfileVerifi');
        }}
      />

      <Text
        mt={5}
        fontSize={16}
        fontFamily={'Lexend-Medium'}
        color={'black'}
        textAlign={'center'}>
        Verifying you...
      </Text>
      <Text
        mt={5}
        fontSize={12}
        fontFamily={'Lexend-Light'}
        color={'black'}
        textAlign={'center'}>
        It will just take a few minutes
      </Text>
    </View>
  );
};

export default ProfileProcessing;

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progress: {
    backgroundColor: 'blue', // Change the color to your desired color
  },
  progressText: {
    position: 'absolute',
    alignSelf: 'center',
    color: 'black', // Change the color to your desired color
  },
});
