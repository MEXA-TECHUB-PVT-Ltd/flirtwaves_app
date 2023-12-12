import {View, Image, Text, Pressable, Row, Avatar, Input} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useGetUserByIdQuery} from '../../../redux/apis/auth';

// navigate('Tabs', {screen: 'AllChats'}

const ChatScreen = props => {
  const navigation = useNavigation();
  const {data: userData, isLoading} = useGetUserByIdQuery(props?.otherid);
  const sendNotification = async () => {
    let userToken = userData?.data?.device_id;
    const serverKey =
      'AAAAwIzMwkc:APA91bFhMh8x-9cwYeNpav4xc6g_gkmjARKk8sao7ZjE1fD_7xvRWAypZa6xESII19AlcDRd3N5BAZn5ZLQEPgTjEsJSRhhUJjALZ36fXZOXroQy5o9oYBxD7tDNwTeWhVShkYB8PkAb'; // Replace with your actual server key
    const token = userToken.replace(/"/g, '');
    //'f5scnV4jSJ6j2QMOLYUAYI:APA91bEQOL6umubg_n73gGvXxwM8lF9UdkiIcQC2qnHeH2Axi54RQM6Ny6wXnz8RxdvCiMOOR5KBrzGUp4d59cf9oBq3stokRw4HzMSF'; // Replace with the device token
    const data = {
      to: token,
      notification: {
        body: `${userData?.data?.name} is Calling you`,
        title: 'Calling',
        subtitle: 'New offer is recieved',
      },
      data: {
        channelName: 'test',
        userId: '123',
        callType: 'Video',
      },
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `key=${serverKey}`,
    };
    try {
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      navigation.navigate('VideoCall', {fromChat: true});
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  const sendAudioNotification = async () => {
    let userToken = userData?.data?.device_id;
    const serverKey =
      'AAAAwIzMwkc:APA91bFhMh8x-9cwYeNpav4xc6g_gkmjARKk8sao7ZjE1fD_7xvRWAypZa6xESII19AlcDRd3N5BAZn5ZLQEPgTjEsJSRhhUJjALZ36fXZOXroQy5o9oYBxD7tDNwTeWhVShkYB8PkAb'; // Replace with your actual server key
    const token = userToken.replace(/"/g, '');
    //'f5scnV4jSJ6j2QMOLYUAYI:'; // Replace with the device token
    const data = {
      to: token,
      notification: {
        body: `${userData?.data?.name} is Calling you`,
        title: 'Calling',
        // subtitle: 'New offer is recieved',
      },
      data: {
        callId: 'random123',
        userId: '123',
        callType: 'Audio',
      },
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `key=${serverKey}`,
    };

    try {
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      navigation.navigate('AudioCall');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  console.log(userData);
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
                source={
                  userData?.data?.images
                    ? {uri: userData?.data?.images[0]}
                    : require('../../../assets/avatars.png')
                }
                h={10}
                w={10}
              />
              <View ml={3}>
                <Text
                  color={'black'}
                  fontSize={16}
                  fontFamily={'Jost-SemiBold'}>
                  {userData?.data?.name}
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
          <Pressable onPress={() => sendAudioNotification()}>
            <Image
              h={4}
              w={4}
              resizeMode={'contain'}
              alt={'audio'}
              mr={5}
              source={require('../../../assets/call.png')}
            />
          </Pressable>
          <Pressable onPress={() => sendNotification()}>
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
