import {View, Text, Avatar, Image, Row, Pressable} from 'native-base';
import React from 'react';
import {ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header/Header';

const AudioCall = ({navigation}) => {
  const [mute, setMute] = React.useState(false);
  return (
    <>
      <LinearGradient
        colors={['#F5BF03', '#F9D353']}
        style={{flex: 1, justifyContent: 'center'}}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}>
        <View
          bg={mute === true ? '#0000006B' : null}
          flex={1}
          alignItems={'center'}
          justifyContent={'center'}>
          <View position={'absolute'} top={0} left={0}>
            <Header />
          </View>
          <View
            justifyContent={'center'}
            // bg={'#0000006B'}
            alignItems={'center'}>
            <Avatar
              source={require('../../assets/h1.png')}
              size={'2xl'}
              borderColor={'primary.20'}
              borderWidth={3}
            />
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

            <Row alignItems={'center'}>
              <View
                h={10}
                w={10}
                rounded={'full'}
                bg={'white'}
                alignItems={'center'}
                justifyContent={'center'}>
                <Image
                  h={6}
                  // p={2}
                  w={6}
                  resizeMode="contain"
                  source={require('../../assets/volume.png')}
                  alt={'volume'}
                />
              </View>
              <Pressable onPress={() => navigation.navigate('Chatting')}>
                <View
                  h={16}
                  w={16}
                  rounded={'full'}
                  bg={'white'}
                  mx={8}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Image
                    h={8}
                    // p={2}
                    w={8}
                    resizeMode="contain"
                    source={require('../../assets/declineCall.png')}
                    alt={'decline'}
                  />
                </View>
              </Pressable>
              <Pressable onPress={() => setMute(!mute)}>
                <View
                  h={10}
                  w={10}
                  rounded={'full'}
                  bg={'white'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Image
                    h={6}
                    // p={2}
                    w={6}
                    resizeMode="contain"
                    source={require('../../assets/mute.png')}
                    alt={'mute'}
                  />
                </View>
              </Pressable>
            </Row>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};
export default AudioCall;
