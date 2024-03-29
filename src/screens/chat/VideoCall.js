import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';

import {createAgoraRtcEngine} from 'react-native-agora';
import {useDispatch, useSelector} from 'react-redux';
import {setFromSignIn} from '../../redux/slices/auth';
import database from '@react-native-firebase/database';

const VideoCall = ({navigation, route}) => {
  const agoraEngineRef = React.useRef(); // Agora engine instance
  const dispatch = useDispatch();
  const fromChat = route?.params?.fromChat;
  const fromHistory = route?.params?.fromHistory;
  const [duration, setDuration] = React.useState(0);
  console.log('duration: ' + duration);
  const {
    call_id,
    call_status,
    call_type,
    caller_id,
    channel_name,
    receiver_id,
    gettingCall,
  } = route?.params;

  const FromNotifi = useSelector(state => state.auth?.fromSignIn);
  console.log(FromNotifi);
  React.useEffect(() => {
    database()
      .ref('call/' + `${caller_id}`)
      .child(`${receiver_id}`)
      .on('value', snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (
            data?.call_status !== 'DECLINED' &&
            data?.call_status !== 'ACCEPTED'
          ) {
            setTimeout(() => {
              leave();
            }, 30000);
          } else if (data?.call_status === 'DECLINED') {
            leave();
          }

          console.log(
            '----------------------------------------------------------------',
          );
          console.log(
            '----------------------------------------------------------------',
          );
          console.log(data);

          console.log(
            '----------------------------------------------------------------',
          );
          console.log(
            '----------------------------------------------------------------',
          );
        }
      });
  }, []);
  React.useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVoiceSDKEngine();
  }, []);
  const setupVoiceSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.disableVideo();

      console.log('agora', agoraEngine);
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          // showMessage('Successfully joined the channel ');
          console.log('Successfully joined the channel ');
          // setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          console.log('User joined the channel', Uid);
          // showMessage('Remote user joined with uid ' + Uid);
          // setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          console.log('useroffline', Uid);
          if (FromNotifi === true) {
            dispatch(setFromSignIn(false));
            navigation.replace('CallHistory');
          } else if (fromChat === true) {
            navigation.goBack();
          } else if (fromHistory === true) {
            navigation.goBack();
          }
          // navigation.goBack();÷
          // showMessage('Remote user left the channel. uid: ' + Uid);
          // setRemoteUid(0);
        },
        onRtcStats: (connection, stats) => {
          console.log('stats: ', stats?.duration, stats?.userCount);
          setDuration(stats?.duration);
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
      dispatch(setFromSignIn(false));
      // dispatch(setFromSignIn());

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
      if (FromNotifi === true) {
        leave();
      } else if (fromChat === true) {
        navigation.goBack();
      } else if (fromHistory === true) {
        navigation.goBack();
      }
    },
  };
  const props = {
    rtcProps: {
      appId: 'bdf562115aec49c2819b25fde6ed2b29',
      channel: channel_name,
    },
  };
  const style = {
    localBtnContainer: {
      marginBottom: 5,
    },
    remoteBtnContainer: {
      backgroundColor: 'transparent',
      // marginBottom: 100,
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
    <AgoraUIKit
      connectionData={props.rtcProps}
      rtcCallbacks={rtcCallbacks}
      styleProps={style}
    />
  );
};
export default VideoCall;
