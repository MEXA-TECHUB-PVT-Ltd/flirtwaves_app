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
const AudioCall = ({navigation}) => {
  const [mute, setMute] = React.useState(false);
  const uid = useSelector(state => state.auth?.userData?.id);

  // React.useEffect(() => {
  //   if (videoCall === false) {
  //     navigation.goBack();
  //   }
  // }, [videoCall]);

  const DeclineCall = () => {
    console.warn('declinde call called');
    //  database().ref(`/callid/${userData.user_id}`).set(null);
    //  database().ref(`/callid/${otheruserid}`).set(null);
    //  dispatch(setGettingCallData({}));/
    navigation.goBack();
  };
  const RenderIcon = () => {
    return (
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
    );
  };

  return (
    <>
      <ZegoUIKitPrebuiltCall
        appID={1248645703}
        appSign={
          'e8f8f62ab2a2f835eeff9c9f7aa343c74fc762acb54299680b268447ddc6638b'
        }
        userID={`${uid}`} // userID can be something like a phone number or the user id on your own user system.
        userName={`Testing done`}
        callID={'test123'} // callID can be any unique string.
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,

          onOnlySelfInRoom: res => {
            console.log(res);
            DeclineCall();
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
              if (duration === 30) {
                DeclineCall();
              }
              // console.warn('duration', duration);
            },
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
