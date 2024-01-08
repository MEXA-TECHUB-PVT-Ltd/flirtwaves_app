import {
  View,
  Text,
  Image,
  Row,
  Pressable,
  ScrollView,
  Avatar,
  Divider,
} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import {useSelector} from 'react-redux';
import {
  useGetUserByIdQuery,
  useGetUserCallsQuery,
  useMakeCallMutation,
} from '../../redux/apis/auth';
import database from '@react-native-firebase/database';
import PushNotification, {Importance} from 'react-native-push-notification';
import LoaderModal from '../../components/Loader/Loader';
import {ActivityIndicator} from 'react-native';

const CallHistory = ({navigation}) => {
  const uid = useSelector(state => state.auth?.userData?.id);
  const [page, setPage] = React.useState(1);
  const [userDataMap, setUserDataMap] = React.useState({});

  const {data: callHistory, isLoading: loading} = useGetUserCallsQuery({
    uid: uid,
    page: page,
  });

  const name = useSelector(state => state.auth?.userData?.name);
  const [createCall, {data: callData}] = useMakeCallMutation();

  React.useEffect(() => {
    const fetchUserData = async () => {
      const userDataMapCopy = {};

      callHistory?.calls?.data?.forEach(item => {
        console.log(item)
        try {
          const {data:userData} = useGetUserByIdQuery(item?.receiver_id);
          console.log(userData);
          userDataMapCopy[item.id] = userData;
        } catch (error) {
          console.error(`Error fetching user data for ID ${item.id}:`, error);
        }
      });

      setUserDataMap(userDataMapCopy);
    };

    fetchUserData();
  }, [callHistory]);

  // in this function video call setup is handled and calls are handled with firebase to listen for call declined or accepted on real time
  const sendNotification = async (r_id, d_id) => {
    let r = (Math.random() + 1).toString(36).substring(7);
    console.log(r);
    let body = {
      caller_id: uid,
      receiver_id: r_id,
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

          priority: 'high',

          // (optional) default: true. Creates the default vibration pattern if true.
        },
        // (optional) callback returns whether the channel was created, false means it already existed.
      );

      let userToken = d_id;
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
          gettingCall: true,
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
        await database()
          .ref('call/' + `${uid}`)
          .child(`${r_id}`)
          .update({
            call_id: res?.data?.call.call_id,
            call_status: 'ALL',
            call_type: 'VIDEO',
            caller_id: res?.data?.call.caller_id,
            channel_name: r,
            receiver_id: res?.data?.call?.receiver_id,
            hangup_up: false,
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
  };
  // in this function audio call setup is handled and calls are handled with firebase to listen for call declined or accepted on real time
  const sendAudioNotification = async (r_id, d_id) => {
    let r = (Math.random() + 1).toString(36).substring(7);
    console.log(r);
    let body = {
      caller_id: uid,
      receiver_id: r_id,
      channel_name: r,
      call_type: 'AUDIO', //AUDIO or VIDEO
      call_status: 'DECLINED', //ACCEPT, DECLINED, or NOTANSWERED
    };
    console.log(body);
    createCall(body).then(async res => {
      console.log(res);
      let userToken = d_id;
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
          // (optional) default: true
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
          gettingCall: true,
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
        await database()
          .ref('call/' + `${uid}`)
          .child(`${r_id}`)
          .update({
            call_id: res?.data?.call.call_id,
            call_status: 'ALL',
            call_type: 'AUDIO',
            caller_id: res?.data?.call.caller_id,
            channel_name: r,
            receiver_id: res?.data?.call?.receiver_id,
            hangup_up: false,
          });
        navigation.navigate('AudioCall', {
          gettingCall: false,
          call_id: res?.data?.call.call_id,
          call_status: 'NOTANSWERED',
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
    <View flex={1} bg={'white'}>
      <Header title={'Call History'} />
      {loading ? (
        <LoaderModal visible={loading} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View m={5} ml={3}>
            {callHistory?.calls?.data?.map((item, index) => {
              return (
                <View borderRadius={10} p={1} key={index}>
                  <Row
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    mx={2}>
                    <Row alignItems={'center'}>
                      {/* <Avatar source={{uri: user?.images[0]}} size={'md'} /> */}
                      <View ml={2}>
                        <Text
                          color={'black'}
                          fontSize={14}
                          fontFamily={'Lexend-Medium'}>
                          test
                        </Text>
                        {item?.call_duration ? (
                          <Text
                            color={'txtColor'}
                            fontSize={10}
                            fontFamily={'Lexend-Regular'}>
                            {item?.call_type} {item?.call_duration}
                          </Text>
                        ) : (
                          <Text
                            color={'txtColor'}
                            fontSize={10}
                            fontFamily={'Lexend-Regular'}>
                            {item?.call_type} {item?.call_status}
                          </Text>
                        )}
                      </View>
                    </Row>
                    <Row alignItems={'center'}>
                      <Pressable
                        onPress={() =>
                          sendAudioNotification(
                            item?.receiver_id,
                            // userData?.data?.device_id,
                          )
                        }>
                        <Image
                          h={4}
                          w={4}
                          resizeMode={'contain'}
                          alt={'audio'}
                          mr={5}
                          source={require('../../assets/call.png')}
                        />
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          sendNotification(
                            item?.receiver_id,
                            // userData?.data?.device_id,
                          );
                        }}>
                        <Image
                          h={6}
                          w={6}
                          resizeMode={'contain'}
                          alt={'audio'}
                          source={require('../../assets/video.png')}
                        />
                      </Pressable>
                    </Row>
                  </Row>
                  <Divider
                    bg={
                      index === callHistory?.calls?.data?.length - 1
                        ? 'transparent'
                        : 'grey.400'
                    }
                    my={2}
                    opacity={0.5}
                    w={'85%'}
                    alignSelf={'flex-end'}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};
export default CallHistory;
