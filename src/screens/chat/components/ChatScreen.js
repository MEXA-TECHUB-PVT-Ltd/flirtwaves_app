import {View, Image, Text, Pressable, Row, Avatar, Input} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

// navigate('Tabs', {screen: 'AllChats'}

const ChatScreen = props => {
  const navigation = useNavigation();
  return (
    <>
      <Row justifyContent={'space-between'} alignItems={'center'}>
        <Row alignItems={'center'}>
          <Pressable onPress={() => navigation.goBack()}>
            <Entypo name={'chevron-left'} size={30} color={'black'} />
          </Pressable>

          <Pressable onPress={() => {}}>
            <Row alignItems={'center'}>
              <Avatar
                source={require('../../../assets/h1.png')}
                h={10}
                w={10}
              />
              <View ml={3}>
                <Text
                  color={'black'}
                  fontSize={16}
                  fontFamily={'Jost-SemiBold'}>
                  Sahara Ardia
                </Text>
                <Text
                  color={'txtColor'}
                  fontSize={12}
                  fontFamily={'Jost-Regular'}>
                  Online
                </Text>
              </View>
            </Row>
          </Pressable>
        </Row>
        <Row alignItems={'center'}>
          <Pressable onPress={() => navigation.navigate('AudioCall')}>
            <Image
              h={4}
              w={4}
              resizeMode={'contain'}
              alt={'audio'}
              mr={5}
              source={require('../../../assets/call.png')}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('VideoCall')}>
            <Image
              h={7}
              w={8}
              resizeMode={'contain'}
              alt={'audio'}
              source={require('../../../assets/video.png')}
            />
          </Pressable>
        </Row>
      </Row>
    </>
  );
};
export default ChatScreen;
