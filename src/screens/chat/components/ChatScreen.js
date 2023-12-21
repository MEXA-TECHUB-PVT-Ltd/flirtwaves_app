import {View, Image, Text, Pressable, Row, Avatar, Input} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  useGetUserByIdQuery,
  useMakeCallMutation,
} from '../../../redux/apis/auth';
import PushNotification, {Importance} from 'react-native-push-notification';

// navigate('Tabs', {screen: 'AllChats'}

const ChatScreen = props => {
  const navigation = useNavigation();
  const {data: userData, isLoading} = useGetUserByIdQuery(props?.otherid);
  const uid = useSelector(state => state.auth?.userData?.id);
  const name = useSelector(state => state.auth?.userData?.name);
  const [createCall, {data: callData, isLoading: callLoading}] =
    useMakeCallMutation();
  const sendNotification = async () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    console.log(r);
    let body = {
      caller_id: uid,
      receiver_id: props?.otherid,
      channel_name: r,
      call_type: 'VIDEO', //AUDIO or VIDEO
      call_status: 'DECLINED', //ACCEPT, DECLINED, or NOTANSWERED
    };
    console.log(body);
    createCall(body).then(async res => {
      console.log(res);
      await PushNotification.createChannel(
        {
          channelId: 'channel-id', // (required)
          channelName: 'My channel', // (required)
          foreground: true,
          channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
          playSound: true, // (optional) default: true
          soundName: 'call.mp3', // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true,
          timeoutAfter: 30000,
          priority: 'high',
          //
          // (optional) default: true. Creates the default vibration pattern if true.
        },
        // (optional) callback returns whether the channel was created, false means it already existed.
      );

      let userToken = userData?.data?.device_id;
      const serverKey =
        'AAAAwIzMwkc:APA91bFhMh8x-9cwYeNpav4xc6g_gkmjARKk8sao7ZjE1fD_7xvRWAypZa6xESII19AlcDRd3N5BAZn5ZLQEPgTjEsJSRhhUJjALZ36fXZOXroQy5o9oYBxD7tDNwTeWhVShkYB8PkAb'; // Replace with your actual server key
      const token = userToken.replace(/"/g, '');
      //'f5scnV4jSJ6j2QMOLYUAYI:APA91bEQOL6umubg_n73gGvXxwM8lF9UdkiIcQC2qnHeH2Axi54RQM6Ny6wXnz8RxdvCiMOOR5KBrzGUp4d59cf9oBq3stokRw4HzMSF'; // Replace with the device token
      const data = {
        to: token,
        notification: {
          body: `${name} is Calling you`,
          title: 'Calling',
          subtitle: 'New offer is recieved',
        },
        data: {
          call_id: res?.data?.call.call_id,
          call_status: 'DECLINED',
          call_type: 'VIDEO',
          caller_id: res?.data?.call.caller_id,
          channel_name: r,
          receiver_id: res?.data?.call?.receiver_id,
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

        navigation.navigate('VideoCall', {
          fromChat: true,
          gettingCall: false,
          call_id: res?.data?.call.call_id,
          call_status: 'DECLINED',
          call_type: 'VIDEO',
          caller_id: res?.data?.call.caller_id,
          channel_name: r,
          receiver_id: res?.data?.call?.receiver_id,
        });
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    });
    // PushNotification.createChannel(
    //   {
    //     channelId: 'channel-id', // (required)
    //     channelName: 'My channel', // (required)
    //     foreground: true,
    //     channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    //     playSound: true, // (optional) default: true
    //     soundName: 'call.mp3', // (optional) See `soundName` parameter of `localNotification` function
    //     importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    //     vibrate: true,
    //     timeoutAfter: 30000,
    //     priority: 'high',
    //     //
    //     // (optional) default: true. Creates the default vibration pattern if true.
    //   },
    //   // (optional) callback returns whether the channel was created, false means it already existed.
    // );

    // let userToken = userData?.data?.device_id;
    // const serverKey =
    //   'AAAAwIzMwkc:APA91bFhMh8x-9cwYeNpav4xc6g_gkmjARKk8sao7ZjE1fD_7xvRWAypZa6xESII19AlcDRd3N5BAZn5ZLQEPgTjEsJSRhhUJjALZ36fXZOXroQy5o9oYBxD7tDNwTeWhVShkYB8PkAb'; // Replace with your actual server key
    // const token = userToken.replace(/"/g, '');
    // //'f5scnV4jSJ6j2QMOLYUAYI:APA91bEQOL6umubg_n73gGvXxwM8lF9UdkiIcQC2qnHeH2Axi54RQM6Ny6wXnz8RxdvCiMOOR5KBrzGUp4d59cf9oBq3stokRw4HzMSF'; // Replace with the device token
    // const data = {
    //   to: token,
    //   notification: {
    //     body: `${userData?.data?.name} is Calling you`,
    //     title: 'Calling',
    //     subtitle: 'New offer is recieved',
    //   },
    //   data: {
    //     channelName: r,
    //     userId: `${uid}`,
    //     callType: 'Video',
    //   },
    // };
    // const headers = {
    //   'Content-Type': 'application/json',
    //   Authorization: `key=${serverKey}`,
    // };
    // try {
    //   const response = await fetch('https://fcm.googleapis.com/fcm/send', {
    //     method: 'POST',
    //     headers: headers,
    //     body: JSON.stringify(data),
    //   });

    //   navigation.navigate('VideoCall', {fromChat: true});
    // } catch (error) {
    //   console.error('Error sending notification:', error);
    // }
  };
  const sendAudioNotification = async () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    console.log(r);
    let body = {
      caller_id: uid,
      receiver_id: props?.otherid,
      channel_name: r,
      call_type: 'AUDIO', //AUDIO or VIDEO
      call_status: 'DECLINED', //ACCEPT, DECLINED, or NOTANSWERED
    };
    console.log(body);
    createCall(body).then(async res => {
      console.log(res);
      let userToken = userData?.data?.device_id;
      let r = (Math.random() + 1).toString(36).substring(7);
      PushNotification.createChannel(
        {
          channelId: 'channel-id', // (required)
          channelName: 'My channel', // (required)
          foreground: true,
          channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
          playSound: true, // (optional) default: true
          soundName: 'call.mp3', // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true,
          timeoutAfter: 30000,
          priority: 'high',
          //
          // (optional) default: true. Creates the default vibration pattern if true.
        },
        // (optional) callback returns whether the channel was created, false means it already existed.
      );
      const serverKey =
        'AAAAwIzMwkc:APA91bFhMh8x-9cwYeNpav4xc6g_gkmjARKk8sao7ZjE1fD_7xvRWAypZa6xESII19AlcDRd3N5BAZn5ZLQEPgTjEsJSRhhUJjALZ36fXZOXroQy5o9oYBxD7tDNwTeWhVShkYB8PkAb'; // Replace with your actual server key
      const token = userToken.replace(/"/g, '');
      //'f5scnV4jSJ6j2QMOLYUAYI:'; // Replace with the device token
      const data = {
        to: token,
        notification: {
          body: `${name} is Calling you`,
          title: 'Calling',
          // subtitle: 'New offer is recieved',
        },
        data: {
          gettingCall: false,
          call_id: res?.data?.call.call_id,
          call_status: 'DECLINED',
          call_type: 'AUDIO',
          caller_id: res?.data?.call.caller_id,
          channel_name: r,
          receiver_id: res?.data?.call?.receiver_id,
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

        navigation.navigate('AudioCall', {
          gettingCall: false,
          call_id: res?.data?.call.call_id,
          call_status: 'DECLINED',
          call_type: 'AUDIO',

          caller_id: res?.data?.call.caller_id,
          channel_name: r,
          receiver_id: res?.data?.call?.receiver_id,
        });
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    });
  };

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
                  {userData?.data?.online_status === true
                    ? 'Online'
                    : 'Offline'}
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
