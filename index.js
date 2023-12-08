import {AppRegistry, ToastAndroid} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import {useNavigation} from '@react-navigation/native';

AppRegistry.registerComponent(appName, () => App);
