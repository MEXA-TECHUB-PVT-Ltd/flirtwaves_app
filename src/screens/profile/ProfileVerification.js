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
  Pressable,
} from 'native-base';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../components/Header/Header';
import CircularProgress from 'react-native-circular-progress-indicator';

const ProfileVerification = ({navigation}) => {
  return (
    <View flex={1} bg={'white'} alignItems={'center'} justifyContent={'center'}>
      <View position={'absolute'} top={5} left={5}>
        <Pressable
          onPress={() => {
            navigation.navigate('Tabs', {screen: 'Profile'});
          }}>
          <Entypo name={'chevron-left'} size={30} color={'black'} />
        </Pressable>
      </View>
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

      {/* <CircularProgress
        value={100}
        inActiveStrokeColor={'white'}
        inActiveStrokeOpacity={0.2}
        activeStrokeColor="black"
        progressValueColor={'black'}
        valueSuffix={'%'}
        onAnimationComplete={() => {
          navigation.goBack();
        }}
      /> */}

      <Image
        source={require('../../assets/done.png')}
        size={'lg'}
        alt={'verif'}
        resizeMode="contain"
      />
      <Text
        mt={5}
        fontSize={16}
        fontFamily={'Lexend-Medium'}
        color={'black'}
        textAlign={'center'}>
        Profile Verified
      </Text>
      <Text
        mt={5}
        mx={8}
        fontSize={12}
        fontFamily={'Lexend-Light'}
        color={'grey.400'}
        textAlign={'center'}>
        Congratulations! Your profile is now verified with a verification badge.
        Enjoy all the platform's features and benefits with confidence!
      </Text>
    </View>
  );
};

export default ProfileVerification;

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
