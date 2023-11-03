import {ImageBackground, StyleSheet, Platform, Pressable} from 'react-native';
import {Row, ScrollView, Text, View} from 'native-base';
import React from 'react';
import FButton from '../../components/button/FButton';
import Logo from '../../components/logo/Logo';

const OnBoarding = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/bg.png')}
      style={{flex: 1, resizeMode: 'contain'}}>
      <ScrollView mx={5} mt={10} showsVerticalScrollIndicator={false}>
        <Logo height={10} width={10} align={'center'} />
        <View mt={'50%'}>
          <Text
            fontSize={25}
            fontFamily={'Lexend-SemiBold'}
            textAlign={'center'}>
            Make Friends with the people like you
          </Text>
          <Text
            fontSize={14}
            fontFamily={'Lexend-Light'}
            textAlign={'center'}
            my={5}>
            We created to bring together amazing singles who want to find love,
            laughter and happily ever after!
          </Text>
          <FButton
            label={'Continue with Email Address'}
            mt={4}
            onPress={() => {
              navigation.navigate('Privacy');
            }}
            variant={'secondary'}
          />
          <FButton
            label={'Continue with Google'}
            mt={5}
            variant={'secondary'}
          />
          <FButton
            label={'Continue with Facebook'}
            mt={5}
            variant={'secondary'}
          />
          {Platform.OS === 'ios' && (
            <FButton
              label={'Continue with Facebook'}
              mt={5}
              variant={'secondary'}
            />
          )}
          <Pressable onPress={() => navigation.navigate('ConnectionProblem')}>
            <Text
              textAlign={'center'}
              fontSize={16}
              fontFamily={'Lexene-Medium'}
              mb={2}
              mt={12}>
              Connection Problem?
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});
