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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
