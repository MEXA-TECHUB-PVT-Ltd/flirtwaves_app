import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Image, Text, View} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

const VideoCall = ({navigation}) => {
  const [videoCall, setVideoCall] = useState(true);

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
      marginBottom: 20,
    },
    remoteBtnContainer: {
      backgroundColor: 'white',
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

  return videoCall ? (
    <AgoraUIKit
      connectionData={props.rtcProps}
      rtcCallbacks={rtcCallbacks}
      styleProps={style}
    />
  ) : null;
};
export default VideoCall;
