import {View, Text, ScrollView, Row, Pressable} from 'native-base';
import React from 'react';
import {ImageBackground, SafeAreaView, StatusBar} from 'react-native';
import FStatusBar from '../../components/statusBar/StatusBar';
import Header from '../../components/Header/Header';
import Logo from '../../components/logo/Logo';
import FButton from '../../components/button/FButton';
import FInputs from '../../components/inputs/inputs';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {useLoginUserMutation} from '../../redux/apis/auth';
import {setPassword, setUserData, setUser_id} from '../../redux/slices/auth';
import messaging from '@react-native-firebase/messaging';
import EncryptedStorage from 'react-native-encrypted-storage';
const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const [loginUser, {data, isError, isLoading}] = useLoginUserMutation();

  async function handleSession(uid) {
    try {
      await EncryptedStorage.setItem('user_id', JSON.stringify(uid));
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {}
  }

  const formSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const [error, setError] = React.useState();
  const [emailError, setEmailError] = React.useState();
  const handleCreate = async (email, password) => {
    const token = await messaging().getToken();

    let body = {
      email,
      password,
      device_id: token,
    };

    loginUser(body).then(async res => {
      await dispatch(setPassword(password));
      console.log('res', res);
      if (res?.data?.error === false) {
        await dispatch(setUserData(res?.data?.data));
        await handleSession(res?.data?.data?.id);
        await dispatch(setUser_id(res?.data?.data?.id));
      } else if (res?.error?.data?.msg === 'Invalid password') {
        setError('Wrong Password');
        setEmailError();
      } else {
        setEmailError(res?.error?.data?.msg);
        setError();
      }
    });
  };
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '826995950151-fj3s3tosc4noduuqcc387s9q0201uggh.apps.googleusercontent.com',
    });
    // GoogleSignin.signOut();
  });
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken, user} = await GoogleSignin.signIn();
      console.log(idToken, user)
  
    } catch (e) {
      console.error(e);
    }

    // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
  }
  console.log(isError);
  return (
    <View bg={'primary.20'} flex={1}>
      <FStatusBar />
      <Header />
      <ScrollView>
        <View mx={5}>
          <Logo height={10} width={10} align={'center'} />
          <Text
            textAlign={'left'}
            fontSize={22}
            fontFamily={'Lexend-SemiBold'}
            mt={20}>
            Sign In
          </Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={formSchema}
            onSubmit={values => handleCreate(values.email, values.password)}>
            {({
              values,
              handleChange,

              handleSubmit,

              errors,
            }) => (
              <View mt={5}>
                <View>
                  <FInputs
                    placeholder={'Email Address'}
                    onChangeText={handleChange('email')}
                    value={values.email}
                  />
                  {errors.email || emailError ? (
                    <View flexDir={'row'} alignItems={'center'} mt={1}>
                      <View
                        bg={'red.500'}
                        h={2}
                        w={2}
                        rounded={'full'}
                        mx={1}
                      />
                      <Text color={'red.500'} fontSize={12}>
                        {errors.email ? errors?.email : emailError}
                      </Text>
                    </View>
                  ) : null}
                </View>

                <View mt={5}>
                  <FInputs
                    placeholder={'Password'}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    onSubmit={handleSubmit}
                    rightIcon
                    type={'password'}
                  />
                  {errors?.password ||
                  (isError === true && error !== undefined) ? (
                    <View>
                      <View flexDir={'row'} alignItems={'center'} mt={1}>
                        <View
                          bg={'red.500'}
                          h={2}
                          w={2}
                          rounded={'full'}
                          mx={1}
                        />
                        <Text color={'red.500'} fontSize={12}>
                          {errors?.password ? errors?.password : error}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
                <Pressable
                  onPress={() => {
                    navigation.navigate('ForgetPassword');
                  }}>
                  <Text
                    mt={2}
                    textAlign={'right'}
                    fontSize={14}
                    color={'primary.400'}
                    fontFamily={'Lexend-Regular'}>
                    Forget Password?
                  </Text>
                </Pressable>
                <View mt={10}>
                  <FButton
                    loading={isLoading}
                    label={'Continue'}
                    variant={'Solid'}
                    onPress={handleSubmit}
                  />
                  <FButton
                    onPress={() => onGoogleButtonPress()}
                    label={'Continue with Google'}
                    mt={10}
                    variant={'secondary'}
                  />
                  <FButton
                    label={'Continue with Facebook'}
                    mt={5}
                    variant={'secondary'}
                  />
                  <Pressable
                    onPress={() => {
                      navigation.navigate('SignUp');
                    }}>
                    <Row
                      alignItems={'center'}
                      alignSelf={'center'}
                      mt={16}
                      mb={3}>
                      <Text
                        fontSize={13}
                        fontFamily={'Lexend-Light'}
                        color={'grey.400'}>
                        Don't have an account?{' '}
                      </Text>
                      <Text
                        color={'primary.400'}
                        fontSize={14}
                        fontFamily={'Lexend-Medium'}>
                        Create Account
                      </Text>
                    </Row>
                  </Pressable>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};
export default SignIn;
