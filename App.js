import React from 'react';
import {NativeBaseProvider, extendTheme, Button, View} from 'native-base';
import {Text} from 'react-native';
import OnBoarding from './src/screens/auth/onBoarding';
import Privacy from './src/screens/auth/Privacy';
import MainStack from './src/components/navigation/MainStack';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// import JdButton from './src/components/button/Buttons';
// import JdInputs from './src/components/inputs/inputs';
// import OnBoarding from './src/screens/auth/OnBoarding';
// import SignIn from './src/screens/auth/SignIn';
// import ForgotPassword from './src/screens/auth/ForgotPassword';
// import ResetPassword from './src/screens/auth/ResetPassword';
// import SignUp from './src/screens/auth/SignUp';
// import MainStack from './src/navigation/MainStack/MainStack';
// import {DMSansFont, FontsStyle} from './src/constants/Fonts';
// test added by usama

export default function () {
  const theme = extendTheme({
    fontConfig: {
      'noto-sans': {
        100: {
          normal: 'NotoSans-Light',
          italic: 'NotoSans-LightItalic',
        },
        200: {
          normal: 'NotoSans-Light',
          italic: 'NotoSans-LightItalic',
        },
        300: {
          normal: 'NotoSans-Light',
          italic: 'NotoSans-LightItalic',
        },
        400: {
          normal: 'NotoSans-Regular',
          italic: 'NotoSans-Italic',
        },
        500: {
          normal: 'NotoSans-Medium',
          italic: 'NotoSans-MediumItalic',
        },
        600: {
          normal: 'NotoSans-Medium',
          italic: 'NotoSans-MediumItalic',
        },
        700: {
          normal: 'NotoSans-Bold',
          italic: 'NotoSans-BoldItalic',
        },
        800: {
          normal: 'NotoSans-Bold',
          italic: 'NotoSans-BoldItalic',
        },
        900: {
          normal: 'NotoSans-Bold',
          italic: 'NotoSans-BoldItalic',
        },
      },
    },
    fonts: {
      body: 'noto-sans.500', // Default weight for body text
      heading: 'noto-sans.500', // Default weight for headings
    },
    colors: {
      // Add new color
      primary: {
        20: '#FDF2CD',
        50: '#ffe99a',
        100: '#ffe172',
        200: '#ffd84a',
        300: '#fdce25',
        400: '#f5bf03',
        500: '#d9ac09',
        600: '#bd970e',
        700: '#a18212',
        800: '#876f14',
        900: '#6f5c15',
      },
      second: {
        50: '#da000b',
        100: '#bf000a',
        200: '#a10109',
        300: '#83040a',
        400: '#690308',
        500: '#560509',
        600: '#450509',
        700: '#340508',
        800: '#240506',
        900: '#150304',
      },

      'New Color': {
        50: '#c60007',
        100: '#aa0106',
        200: '#8b0308',
        300: '#6d0509',
        400: '#540407',
        500: '#420507',
        600: '#310506',
        700: '#210405',
        800: '#120303',
        900: '#040101',
      },
      // Redefining only one shade, rest of the color will remain same.
      grey: {
        400: '#979797',
        500: '#2F2F2F',
        300: '#575757',
      },
      secondary: '#C30010',
      pro: '#F94449',
      loc: '#FCFCFC',
      txtColor: '#575757',
    },

    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'light',
    },
  });

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <MainStack />
      </NativeBaseProvider>
    </Provider>
  );
}
