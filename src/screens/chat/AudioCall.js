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
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {useSelector} from 'react-redux';
import {ZegoLayoutMode, ZegoViewPosition} from '@zegocloud/zego-uikit-rn';
import {
  useUpdateCallDurationMutation,
  useUpdateCallStatusMutation,
} from '../../redux/apis/auth';
import database from '@react-native-firebase/database';

const AudioCall = ({navigation, route}) => {
  const [mute, setMute] = React.useState(false);
  const uid = useSelector(state => state.auth?.userData?.id);
  const [duration, setDuration] = React.useState(0);
  const [onlyMe, setOnlyMe] = React.useState(false);
  const {
    call_id,
    call_status,
    call_type,
    caller_id,
    channel_name,
    receiver_id,
    gettingCall,
  } = route?.params;
  const [updateCall, {data: isData, isLoading}] =
    useUpdateCallDurationMutation();
  const [status, setStatus] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);
  const [hangup, setHangup] = React.useState(false);
  const [updateCallStatus, {data: call, isLoading: callLoading}] =
    useUpdateCallStatusMutation();

  // React.useEffect(() => {
  //   if (videoCall === false) {
  //     navigation.goBack();
  //   }
  // }, [videoCall]);

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
              handleNotAnswer();
              setStatus(true);
            }, 30000);
          } else if (data?.call_status === 'DECLINED') {
            handleDecline();
            setHangup(true);
          }

          console.log(
            '----------------------------------------------------------------',
          );
          console.log(
            '----------------------------------------------------------------',
          );
          console.log(data, hangup);

          console.log(
            '----------------------------------------------------------------',
          );
          console.log(
            '----------------------------------------------------------------',
          );
        }
      });
  }, []);
  const handleNotAnswer = () => {
    let body = {
      caller_id: caller_id,
      call_id: call_id,
      call_status: 'NOTANSWERED', //ACCEPT, DECLINED, or NOTANSWERED
    };
    updateCallStatus(body).then(res => {
      console.log(res);
      if (res?.data?.error === false) {
        navigation.goBack();
      }
    });
  };
  const handleDecline = () => {
    let body = {
      caller_id: caller_id,
      call_id: call_id,
      call_status: 'DECLINED', //ACCEPT, DECLINED, or NOTANSWERED
    };
    updateCallStatus(body).then(res => {
      console.log(res);
      if (res?.data?.error === false) {
        navigation.goBack();
      }
    });
  };
  const DeclineCall = () => {
    let body = {
      caller_id: caller_id,
      call_id: call_id,
      call_duration: duration, //hh:mm:ss
    };
    updateCall(body).then(res => {
      console.log(res);
      if (res?.data?.error === false) {
        navigation.goBack();
      }
    });
  };

  return (
    <>
      <ZegoUIKitPrebuiltCall
        appID={1458041945}
        appSign={
          '2aaecc7b28fc3d7f614df4b2ca1379d0b020461a71a1b1ca1f321b93b26bda27'
        }
        userID={`${uid}`} // userID can be something like a phone number or the user id on your own user system.
        userName={'sami'}
        callID={channel_name} // callID can be any unique string.
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,

          onOnlySelfInRoom: () => {
            console.warn('onOnlySelfInRoom');
          },
          layout: {
            mode: ZegoLayoutMode.pictureInPicture,
            config: {
              switchLargeOrSmallViewByClick: false,
              smallViewBorderRadius: 10,
              smallViewPosition: ZegoViewPosition.topRight,
              smallViewSize: {width: 0, height: 0},
            },
          },
          avatarBuilder: ({userInfo}) => {
            return (
              <View style={{width: '100%', height: '100%'}}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                  source={{uri: `https://robohash.org/${userInfo.userID}.png`}}
                  alt="img"
                />
              </View>
            );
          },
          audioVideoViewConfig: {
            showMicrophoneStateOnView: false,
            showCameraStateOnView: false,
            showUserNameOnView: false,
          },
          durationConfig: {
            isVisible: true,
            onDurationUpdate: duration => {
              // 👇️ get the number of full minutes
              const minutes = Math.floor(duration / 60);

              // 👇️ get the remainder of the seconds
              const seconds = duration % 60;

              function padTo2Digits(num) {
                return num.toString().padStart(2, '0');
              }

              // ✅ format as MM:SS
              const result = `${padTo2Digits(minutes)}:${padTo2Digits(
                seconds,
              )}`;

              setDuration(result);
              // console.warn('duration', duration);
            },
          },
          onOnlySelfInRoom: () => {
            navigation.goBack();
          },

          onHangUp: () => {
            DeclineCall();
          },
          turnOnMicrophoneWhenJoining: true,
          useSpeakerWhenJoining: false,
          turnOnCameraWhenJoining: false,
          bottomMenuBarConfig: {
            hideAutomatically: false,
            hideByClick: false,
            // maxCount: 1,
            buttons: [
              ZegoMenuBarButtonName.switchAudioOutputButton,
              ZegoMenuBarButtonName.hangUpButton,
              ZegoMenuBarButtonName.toggleMicrophoneButton,
            ],
          },
        }}
      />
    </>
  );
};
export default AudioCall;
