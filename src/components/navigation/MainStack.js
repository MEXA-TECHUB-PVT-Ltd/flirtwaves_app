import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from '../../screens/auth/onBoarding';
import Privacy from '../../screens/auth/Privacy';
import ConnectionProblem from '../../screens/auth/ConnectionProblem';
import EmailVerify from '../../screens/auth/EmailVerify';
import SignUp from '../../screens/auth/SignUp';
import SignIn from '../../screens/auth/SignIn';
import About from '../../screens/auth/About';
import LookingFor from '../../screens/auth/LookingFor';
import AddPhoto from '../../screens/auth/AddPhoto';
import OnBoarding3 from '../../screens/auth/OnBoarding3';
import AddHeight from '../../screens/auth/AddHeight';
import OnBoarding4 from '../../screens/auth/OnBoarding4';
import OnBoarding5 from '../../screens/auth/OnBoarding5';
import OnBoarding6 from '../../screens/auth/OnBoarding6';
import OnBoarding7 from '../../screens/auth/OnBoarding7';
import OnBoarding8 from '../../screens/auth/onBoarding8';
import OnBoarding9 from '../../screens/auth/OnBoarding9';
import OnBoarding10 from '../../screens/auth/OnBoarding10';
import Map from '../../screens/auth/Map';
import ForgotPassword from '../../screens/auth/ForgotPassword';
import VerifyOtp from '../../screens/auth/VerifyOtp';
import ResetPassword from '../../screens/auth/ResetPassword';
import BottomTabs from './bottomTab/BottomTab';
import Filtered from '../../screens/Home/Filtered';
import Gallery from '../../screens/Home/Gallery';
import ReportUser from '../../screens/Home/ReportUser';
import Chatting from '../../screens/chat/Chatting';
import CallHistory from '../../screens/chat/CallHistory';
import AudioCall from '../../screens/chat/AudioCall';
import VideoCall from '../../screens/chat/VideoCall';
import AcceptRequest from '../../screens/chat/AcceptRequest';
import SearchScreen from '../../screens/Home/SearchScreen';
import FavoriteUser from '../../screens/favorites/FavoriteUser';
import ProfileProcessing from '../../screens/profile/ProfileProcessing';
import ProfileVerification from '../../screens/profile/ProfileVerification';
import EditProfile from '../../screens/profile/EditProfile';
import PersnolInfo from '../../screens/profile/PersnolInfo';
import Settings from '../../screens/settings/Settings';
import FAQS from '../../screens/settings/FAQS';
import Premium from '../../screens/settings/Premium';
import PrivacySettings from '../../screens/settings/PrivacySettings';
import Content from '../../screens/browse/Content';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import Sound from 'react-native-sound';
import {PermissionsAndroid, Platform} from 'react-native';
import database from '@react-native-firebase/database';
import {useNavigationContainerRef} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setFromSignIn} from '../../redux/slices/auth';
import Cooking from '../../screens/browse/Cooking';
import Travel from '../../screens/browse/Travel';
import Exercise from '../../screens/browse/Exercise';
import Partner from '../../screens/browse/Partner';
import Eating from '../../screens/browse/Eating';
import Night from '../../screens/browse/Night';
import Kids from '../../screens/browse/Kids';
import Smoke from '../../screens/browse/Smoke';
import {
  useUpdateCallStatusMutation,
  useUpdateOnlineStatusMutation,
} from '../../redux/apis/auth';
import {AppState} from 'react-native';
import UpdatePassword from '../../screens/settings/ChangePassword';
import Feedback from '../../screens/settings/Feedback';
export default function MainStack() {
  const navigationRef = useNavigationContainerRef(); // Access navigation container reference
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const fromNotifi = useSelector(state => state.auth?.fromSignIn);
  messaging()
    .getToken()
    .then(res => {
      console.log(Platform.Version);
    });
  //     React.useEffect(()=>{
  // handlePermissions();
  // return ()=>handlePermissions();

  //     })
  // const handlePermissions=()=>{
  //   if(Platform.Version<30){
  //     Linking.openSettings()
  //   }
  // }
  const [initialRoute, setInitialRoute] = React.useState(false);
  const uid = useSelector(state => state.auth?.userData?.id);
  Sound.setCategory('Playback');

  var ding = new Sound('call.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      // console.log('failed to load the sound', error);
      return;
    }
    // when loaded successfully
  });

  React.useEffect(() => {
    pushNoti();
    return () => pushNoti();
  }, []);
  const pushNoti = async () => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'App needs permission to send notifications',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission granted');
        // handleNotifi()
        // Permission is granted, continue with your logic here
      } else {
        console.log('Permission denied', granted);
        // Permission denied, handle the lack of permission here
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const [updateCall] = useUpdateCallStatusMutation();

  // const handleNotifi = () => {
  //   PushNotification.configure({
  //     onNotification: function (notification) {
  //       console.log('NOTIFICATION:', notification);
  //       if (notification.userInteraction === true) {
  //         ding.stop(() => {
  //           // Note: If you want to play a sound after stopping and rewinding it,
  //           // it is important to call play() in a callback.
  //           //   whoosh.play();
  //         });
  //         switch (notification.action) {
  //           case 'Answer':
  //             if (notification?.data?.call_type === 'AUDIO') {
  //               let body = {
  //                 caller_id: notification?.data?.caller_id,
  //                 call_id: notification?.data?.call_id,
  //                 call_status: 'ACCEPT', //ACCEPT, DECLINED, or NOTANSWERED
  //               };
  //               updateCall(body).then(res => {
  //                 console.log('Video', res);
  //               });
  //               setInitialRoute(true);
  //               dispatch(setFromSignIn(true));
  //               navigationRef.current.navigate('AudioCall', notification.data);
  //               ding.stop(() => {
  //                 // Note: If you want to play a sound after stopping and rewinding it,
  //                 // it is important to call play() in a callback.
  //                 //   whoosh.play();
  //               });
  //             } else {
  //               let body = {
  //                 caller_id: notification?.data?.caller_id,
  //                 call_id: notification?.data?.call_id,
  //                 call_status: 'ACCEPT', //ACCEPT, DECLINED, or NOTANSWERED
  //               };
  //               updateCall(body).then(res => {
  //                 console.log('Video', res);
  //               });
  //               setInitialRoute(true);

  //               dispatch(setFromSignIn(true));
  //               navigationRef.current.navigate('VideoCall', notification?.data);
  //               ding.stop(() => {
  //                 // Note: If you want to play a sound after stopping and rewinding it,
  //                 // it is important to call play() in a callback.
  //                 //   whoosh.play();
  //               });
  //             }

  //             // navigate to answer screen
  //             // navigation.navigate('AnswerScreen', {notification: notification});
  //             break;
  //           case 'Decline':
  //             ding.stop(() => {});
  //             let body = {
  //               caller_id: notification?.data?.caller_id,
  //               call_id: notification?.data?.call_id,
  //               call_status: 'DECLINED', //ACCEPT, DECLINED, or NOTANSWERED
  //             };
  //             updateCall(body).then(res => {
  //               console.log('Video', res);
  //             });
  //             break;
  //         }
  //       }
  //     },
  //     requestPermissions: Platform.OS === 'ios',
  //     onAction: function (notification) {
  //       ding.stop(() => {
  //         // Note: If you want to play a sound after stopping and rewinding it,
  //         // it is important to call play() in a callback.
  //         //   whoosh.play();
  //       });
  //     },
  //   });
  //   // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   //   console.log('Message handled in the background!', remoteMessage);
  //   //   ding.play(success => {
  //   //     if (success) {
  //   //     } else {
  //   //     }
  //   //   });

  //   //   // if (remoteMessage.notification && remoteMessage.notification.title) {
  //   //   PushNotification.localNotification({
  //   //     /* Android Only Properties */
  //   //     channelId: 'channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
  //   //     // ticker: 'My Notification Ticker', // (optional)
  //   //     /* iOS and Android properties */
  //   //     largeIcon: 'ic_launcher',
  //   //     smallIcon: 'ic_notification',
  //   //     largeIconUrl: 'https://www.example.tld/picture.jpg',
  //   //     title: remoteMessage.notification.title, // (optional)
  //   //     message: remoteMessage.notification.body, // (required)
  //   //     playSound: true,
  //   //     priority: 'high',
  //   //     timeoutAfter: 3000,
  //   //     //   invokeApp: false,
  //   //     soundName: 'call.mp3',
  //   //     actions: ['Answer', 'Decline'],
  //   //     userInfo: remoteMessage?.data,
  //   //   });
  //   //   //  ToastAndroid.show(remoteMessage.notification.title, ToastAndroid.SHORT);
  //   //   // }
  //   // });
  //   // Register foreground message handler

  // };
  React.useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        if (notification.userInteraction === true) {
          ding.stop(() => {
            // Note: If you want to play a sound after stopping and rewinding it,
            // it is important to call play() in a callback.
            //   whoosh.play();
          });
          switch (notification.action) {
            case 'Answer':
              if (notification?.data?.call_type === 'AUDIO') {
                let body = {
                  caller_id: notification?.data?.caller_id,
                  call_id: notification?.data?.call_id,
                  call_status: 'ACCEPT', //ACCEPT, DECLINED, or NOTANSWERED
                };
                updateCall(body).then(res => {
                  console.log('Video', res);
                });
                database()
                  .ref('call/' + `${notification?.data?.caller_id}`)
                  .child(`${notification?.data?.receiver_id}`)
                  .update({
                    caller_id: notification?.data?.caller_id,
                    call_status: 'ACCEPTED',
                    call_type: 'AUDIO',
                    call_id: notification?.data?.call_id,
                    channel_name: notification?.data?.channel_name,
                    receiver_id: notification?.data?.receiver_id,
                  });
                setInitialRoute(true);
                dispatch(setFromSignIn(true));
                navigationRef.current.navigate('AudioCall', notification.data);
                ding.stop(() => {
                  // Note: If you want to play a sound after stopping and rewinding it,
                  // it is important to call play() in a callback.
                  //   whoosh.play();
                });
              } else {
                let body = {
                  caller_id: notification?.data?.caller_id,
                  call_id: notification?.data?.call_id,
                  call_status: 'ACCEPT', //ACCEPT, DECLINED, or NOTANSWERED
                };
                updateCall(body).then(res => {
                  console.log('Video', res);
                });
                database()
                  .ref('call/' + `${notification?.data?.caller_id}`)
                  .child(`${notification?.data?.receiver_id}`)
                  .update({
                    caller_id: notification?.data?.caller_id,
                    call_status: 'ACCEPTED',
                    call_type: 'VIDEO',
                    call_id: notification?.data?.call_id,
                    channel_name: notification?.data?.channel_name,
                    receiver_id: notification?.data?.receiver_id,
                  });
                setInitialRoute(true);

                dispatch(setFromSignIn(true));
                navigationRef.current.navigate('VideoCall', notification?.data);
                ding.stop(() => {
                  // Note: If you want to play a sound after stopping and rewinding it,
                  // it is important to call play() in a callback.
                  //   whoosh.play();
                });
              }

              // navigate to answer screen
              // navigation.navigate('AnswerScreen', {notification: notification});
              break;
            case 'Decline':
              ding.stop(() => {});
              if (notification?.data?.call_type === 'AUDIO') {
                let body = {
                  caller_id: notification?.data?.caller_id,
                  call_id: notification?.data?.call_id,
                  call_status: 'DECLINED', //ACCEPT, DECLINED, or NOTANSWERED
                };
                database()
                  .ref('call/' + `${notification?.data?.caller_id}`)
                  .child(`${notification?.data?.receiver_id}`)
                  .update({
                    caller_id: notification?.data?.caller_id,
                    call_status: 'DECLINED',
                    call_type: 'AUDIO',
                    call_id: notification?.data?.call_id,
                    channel_name: notification?.data?.channel_name,
                    receiver_id: notification?.data?.receiver_id,
                  });
                updateCall(body).then(res => {
                  console.log('Video', res);
                });
              } else {
                let body = {
                  caller_id: notification?.data?.caller_id,
                  call_id: notification?.data?.call_id,
                  call_status: 'DECLINED', //ACCEPT, DECLINED, or NOTANSWERED
                };
                database()
                  .ref('call/' + `${notification?.data?.caller_id}`)
                  .child(`${notification?.data?.receiver_id}`)
                  .update({
                    caller_id: notification?.data?.caller_id,
                    call_status: 'DECLINED',
                    call_type: 'VIDEO',
                    call_id: notification?.data?.call_id,
                    channel_name: notification?.data?.channel_name,
                    receiver_id: notification?.data?.receiver_id,
                  });
                updateCall(body).then(res => {
                  console.log('Video', res);
                });
              }
              break;
          }
        }
      },
      requestPermissions: Platform.OS === 'ios',
      onAction: function (notification) {
        ding.stop(() => {
          // Note: If you want to play a sound after stopping and rewinding it,
          // it is important to call play() in a callback.
          //   whoosh.play();
        });
      },
    });
    messaging().onMessage(async remoteMessage => {
      console.log('Notification received in foreground:', remoteMessage);
      ding.play(success => {
        if (success) {
        } else {
        }
      });

      // Handle the notification content here
      // You can update your app's UI or show a custom in-app notification.
      if (remoteMessage.notification && remoteMessage.notification.title) {
        PushNotification.localNotification({
          /* Android Only Properties */
          channelId: 'channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
          ticker: 'My Notification Ticker', // (optional)
          /* iOS and Android properties */
          largeIcon: 'ic_launcher',
          priority: 'high',
          largeIconUrl: 'https://www.example.tld/picture.jpg',
          title: remoteMessage.notification.title, // (optional)
          message: remoteMessage.notification.body, // (required)
          playSound: true,
          smallIcon: 'ic_notification',
          soundName: 'call.mp3',
          timeoutAfter: 3000,
          actions: ['Answer', 'Decline'],
          userInfo: remoteMessage?.data,
        });
      }
    });
  }, []);
  const [updateStaus, {isError: onlineError}] = useUpdateOnlineStatusMutation();
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(
    appState.current,
  );

  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    // return () => {
    //   AppState.removeEventListener('change', _handleAppStateChange);
    // };
  }, [appStateVisible, uid]);

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // TODO SET USERS ONLINE STATUS TO TRUE
      let body = {
        id: uid,
        data: {
          online_status: AppState?.currentState === 'active' ? true : false,
          // verified_status: true,
        },
      };
      // console.log(body);
      updateStaus(body).then(res => {});
    } else {
      // TODO SET USERS ONLINE STATUS TO FALSE
      let body = {
        id: uid,
        data: {
          online_status: false,
          // verified_status: true,
        },
      };
      // console.log(body);
      updateStaus(body).then(res => {});
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };
  // React?.useEffect(() => {

  // }, [AppState?.currentState]);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoarding" component={OnBoarding} />

        <Stack.Screen name="ConnectionProblem" component={ConnectionProblem} />
        <Stack.Screen name="Verify" component={EmailVerify} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Looking" component={LookingFor} />
        <Stack.Screen name="AddPhoto" component={AddPhoto} />
        <Stack.Screen name="OnBoarding3" component={OnBoarding3} />
        <Stack.Screen name="AddHeight" component={AddHeight} />
        <Stack.Screen name="OnBoarding4" component={OnBoarding4} />
        <Stack.Screen name="OnBoarding5" component={OnBoarding5} />
        <Stack.Screen name="OnBoarding6" component={OnBoarding6} />
        <Stack.Screen name="OnBoarding7" component={OnBoarding7} />
        <Stack.Screen name="OnBoarding8" component={OnBoarding8} />
        <Stack.Screen name="OnBoarding9" component={OnBoarding9} />
        <Stack.Screen name="OnBoarding10" component={OnBoarding10} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="ForgetPassword" component={ForgotPassword} />
        <Stack.Screen name="Verification" component={VerifyOtp} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Tabs" component={BottomTabs} />
        <Stack.Screen name="Filter" component={Filtered} />
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen name="ReportUser" component={ReportUser} />
        <Stack.Screen name="Chatting" component={Chatting} />
        <Stack.Screen name="CallHistory" component={CallHistory} />
        <Stack.Screen name="AudioCall" component={AudioCall} />
        <Stack.Screen name="VideoCall" component={VideoCall} />
        <Stack.Screen name="AcceptRequest" component={AcceptRequest} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="FavoriteUser" component={FavoriteUser} />
        <Stack.Screen name="ProfileProcess" component={ProfileProcessing} />
        <Stack.Screen name="ProfileVerifi" component={ProfileVerification} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="PersonalInfo" component={PersnolInfo} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Faq" component={FAQS} />
        <Stack.Screen name="Premium" component={Premium} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="PrivacySetting" component={PrivacySettings} />
        <Stack.Screen name="Content" component={Content} />
        <Stack.Screen name="Cooking" component={Cooking} />
        <Stack.Screen name="Travel" component={Travel} />
        <Stack.Screen name="Exercise" component={Exercise} />
        <Stack.Screen name="Partner" component={Partner} />
        <Stack.Screen name="Eating" component={Eating} />
        <Stack.Screen name="Night" component={Night} />
        <Stack.Screen name="Kids" component={Kids} />
        <Stack.Screen name="Smoke" component={Smoke} />
        <Stack.Screen name="ChangePassword" component={UpdatePassword} />
        <Stack.Screen name="Feedback" component={Feedback} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
