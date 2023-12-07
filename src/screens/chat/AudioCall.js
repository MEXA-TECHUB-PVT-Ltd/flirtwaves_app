import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Avatar, Image, Pressable, Row, Text, View} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
} from 'react-native-agora';
import Header from '../../components/Header/Header';
const AudioCall = ({navigation}) => {
  const [mute, setMute] = React.useState(false);
  const [videoCall, setVideoCall] = useState(true);
  const agoraEngineRef = React.useRef(); // Agora engine instance
  const RtcEngine = React.useRef();
  // React.useEffect(() => {
  //   if (videoCall === false) {
  //     navigation.goBack();
  //   }
  // }, [videoCall]);
  React.useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVoiceSDKEngine();
  }, []);
  const setupVoiceSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngineRef.current?.enableAudio();
      agoraEngineRef.current?.disableVideo();
      console.log('agora', agoraEngine);
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          // showMessage('Successfully joined the channel ' + channelName);÷
          // setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          console.log('User joined the channel', Uid);
          // showMessage('Remote user joined with uid ' + Uid);
          // setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          console.log('useroffline', Uid);
          setVideoCall(false);
          navigation.goBack();
          // navigation.goBack();÷
          // showMessage('Remote user left the channel. uid: ' + Uid);
          // setRemoteUid(0);
        },
        onRtcStats: (connection, stats) => {
          console.log('stats: ', stats?.duration, stats?.userCount);
        },
      });
      agoraEngine.initialize({
        appId: 'bdf562115aec49c2819b25fde6ed2b29',
      });
    } catch (e) {
      console.log(e);
    }
  };
  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      navigation.goBack();
      // setRemoteUid(0);
      // setIsJoined(false);/
      // showMessage('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };
  const rtcCallbacks = {
    EndCall: () => {
      setVideoCall(false), navigation.goBack();
    },
  };
  const props = {
    rtcProps: {appId: 'bdf562115aec49c2819b25fde6ed2b29', channel: 'test'},
  };
  const style = {
    localBtnContainer: {
      marginBottom: 5,
    },
    remoteBtnContainer: {
      backgroundColor: 'transparent',
      marginBottom: 100,
    },
    localBtnStyles: {
      endCall: {
        // borderRadius: 10,
        // backgroundColor: {
        //   type: 'linearGradient',
        //   colors: ['#F5BF03', '#F94449'],
        //   startPoint: {x: 0, y: 0},
        //   endPoint: {x: 1, y: 0},
        // },
        backgroundColor: '#F5BF03',
        paddingVertical: 10,
        borderWidth: 0,
        // paddingHorizontal: 20,
      },
      switchCamera: {
        backgroundColor: '#F5BF03',
        paddingVertical: 10,
        // paddingHorizontal: 20,
        borderWidth: 0,
      },
      muteLocalAudio: {
        backgroundColor: '#F5BF03',
        paddingVertical: 10,
        borderWidth: 0,
      },
      muteLocalVideo: {
        backgroundColor: '#F5BF03',
        paddingVertical: 10,
        borderWidth: 0,
      },
    },
  };
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
              <Pressable onPress={() => navigation.goBack()}>
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
