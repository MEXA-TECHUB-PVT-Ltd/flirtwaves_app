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
import PushNotification from 'react-native-push-notification';

const CallHistory = ({navigation}) => {
  const data = [
    {
      id: 1,
      img: require('../../assets/h1.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h2.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h3.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h4.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h5.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h6.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h1.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h2.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h5.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h6.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h1.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h2.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
  ];
  // React.useEffect(() => {
  //   PushNotification.createChannel({
  //     channelId: 'channel-id', // (required)
  //     channelName: 'My channel', // (required)
  //     channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
  //     vibrate: true,
  //     foreground: true,
  //     playSound: true,
  //     soundName: 'call',
  //     allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
  //   });
  // }, []);
  const handleClick = () => {
    PushNotification.localNotification({
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required
      // invokeApp: true,
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      userInteraction: true,
      playSound: true,
      soundName: 'call',
      // date: new Date(Date.now() + totalseconds * 1000), // in 60 secs
      message: 'Recieveing call from InSafe',
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      userInfo: {
        local: true,
      },
    });
  };
  const sendNotification = async () => {
    let userToken = `dT7KCliiRQKbGpqx-lfTyE:APA91bHuNThS9xbzJGYd93GucHDIK7fMWJ8Z64fHOLoHz8h4XZL26grSnhYQv_cg5CBPJqPzdqRsZ1Ta-cAZhWEX8lYFFB1Wkvlvog0JcrE50Ka6KkwOzmnwJxJGz4DeV9tTXEj2Uszh`;
    const serverKey =
      'AAAAwIzMwkc:APA91bFhMh8x-9cwYeNpav4xc6g_gkmjARKk8sao7ZjE1fD_7xvRWAypZa6xESII19AlcDRd3N5BAZn5ZLQEPgTjEsJSRhhUJjALZ36fXZOXroQy5o9oYBxD7tDNwTeWhVShkYB8PkAb'; // Replace with your actual server key
    const token = userToken.replace(/"/g, '');
    //'f5scnV4jSJ6j2QMOLYUAYI:APA91bEQOL6umubg_n73gGvXxwM8lF9UdkiIcQC2qnHeH2Axi54RQM6Ny6wXnz8RxdvCiMOOR5KBrzGUp4d59cf9oBq3stokRw4HzMSF'; // Replace with the device token
    const data = {
      to: token,
      notification: {
        body: 'Sami is Calling you',
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

      navigation.navigate('VideoCall', {fromHistory: true});
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  return (
    <View flex={1} bg={'white'}>
      <Header title={'Call History'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View m={5} ml={3}>
          {data?.map((item, index) => {
            return (
              <View borderRadius={10} p={1} key={index}>
                <Row
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  mx={2}>
                  <Row alignItems={'center'}>
                    <Avatar source={item?.img} size={'md'} />
                    <View ml={2}>
                      <Text
                        color={'black'}
                        fontSize={14}
                        fontFamily={'Lexend-Medium'}>
                        {item?.name}
                      </Text>
                      <Text
                        color={'txtColor'}
                        fontSize={10}
                        fontFamily={'Lexend-Regular'}>
                        {item?.callType} {item?.duration}
                      </Text>
                    </View>
                  </Row>
                  <Row alignItems={'center'}>
                    <Pressable onPress={() => navigation.navigate('AudioCall')}>
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
                        sendNotification();
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
                  bg={index === data?.length - 1 ? 'transparent' : 'grey.400'}
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
    </View>
  );
};
export default CallHistory;
