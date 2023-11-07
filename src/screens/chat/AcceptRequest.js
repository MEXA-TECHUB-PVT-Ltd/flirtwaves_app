import {View, Text, Avatar, Image, Row, Pressable} from 'native-base';
import React from 'react';
import {ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header/Header';
import FButton from '../../components/button/FButton';

const AcceptRequest = ({navigation}) => {
  const [mute, setMute] = React.useState(false);
  return (
    <>
      <View bg={'primary.20'} flex={1}>
        <View
          bg={mute === true ? '#0000006B' : null}
          flex={1}
          alignItems={'center'}
          justifyContent={'center'}>
          <View position={'absolute'} top={0} left={0}>
            <Header />
          </View>
          <View position={'absolute'} top={24} alignSelf={'center'}>
            <Text
              textAlign={'center'}
              fontSize={22}
              fontFamily={'Lexend-SemiBold'}>
              {`Sahara sent you a${'\n'}message`}
            </Text>
            <Text
              textAlign={'center'}
              mt={4}
              color={'grey.400'}
              fontSize={12}
              fontFamily={'Lexend-Regular'}>
              Your and sahara profile matches 80%{' '}
            </Text>
          </View>
          <View
            justifyContent={'center'}
            // bg={'#0000006B'}
            alignItems={'center'}>
            <Avatar
              source={require('../../assets/h1.png')}
              size={'2xl'}
              borderColor={'primary.400'}
              borderWidth={3}
            />
            <Pressable p={2} onPress={() => navigation.navigate('Filter')}>
              <Text
                underline
                fontSize={16}
                fontFamily={'Lexend-SemiBold'}
                mt={2}>
                See Profile
              </Text>
            </Pressable>
          </View>
          <View position={'absolute'} bottom={16} alignSelf={'center'}>
            {mute === true ? (
              <Text
                fontSize={14}
                color={'white'}
                textAlign={'center'}
                fontFamily={'Jost-Medium'}
                mb={10}>
                Call Muted
              </Text>
            ) : null}
          </View>
        </View>
        <View bottom={16} position={'absolute'} alignSelf={'center'}>
          <Row alignItems={'center'} judtifyContent={'space-between'}>
            <View w={'40%'} ml={5}>
              <FButton
                variant={'outline'}
                label={'Reject'}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View w={'40%'} ml={5}>
              <FButton
                variant={'Solid'}
                label={'Accept'}
                onPress={() => navigation.navigate('Chatting')}
              />
            </View>
          </Row>
        </View>
      </View>
    </>
  );
};
export default AcceptRequest;
