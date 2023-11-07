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

export default function MainStack() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Privacy" component={Privacy} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
