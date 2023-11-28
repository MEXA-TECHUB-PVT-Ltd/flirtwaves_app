import {
  View,
  Text,
  ScrollView,
  Row,
  PresenceTransition,
  Pressable,
} from 'native-base';
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
import {usePostUserMutation} from '../../redux/apis/auth';
import {setUserData} from '../../redux/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [createUser, {data: isData, isLoading, isError}] =
    usePostUserMutation();
  const [error, setError] = React.useState();
  const formSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required(`Password is required`)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-]{8,}$/,
        `Password must contain at least 8 characters,${'\n'}including one letter one number one special charcter,`,
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });
  const handleCreate = (email, password, name) => {
    try {
      let body = {
        email,
        password,

        signup_type: 'email',
      };
      createUser(body).then(res => {
        console.log(res);
        if (res?.data?.error === false) {
          dispatch(setUserData(res?.data?.data));
          navigation.navigate('About');
        } else {
          setError(res?.error?.data?.msg);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '826995950151-fj3s3tosc4noduuqcc387s9q0201uggh.apps.googleusercontent.com',
    });
    // GoogleSignin.signOut();
  });
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      console.log(idToken);
    } catch (err) {
      console.error(err);
    }
    // Check if your device supports Google Play

    // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
  }
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
            mt={16}>
            Sign Up
          </Text>
          <Formik
            initialValues={{
              confirmPassword: '',
              email: '',
              password: '',
            }}
            validationSchema={formSchema}
            onSubmit={values =>
              handleCreate(
                values.email,
                values.password,
                values.confirmPassword,
              )
            }>
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
                  {errors.email || error ? (
                    <View flexDir={'row'} alignItems={'center'} mt={1}>
                      <View
                        bg={'red.500'}
                        h={2}
                        w={2}
                        rounded={'full'}
                        mx={1}></View>
                      <Text color={'red.500'} fontSize={12}>
                        {errors.email ? errors?.email : error}
                      </Text>
                    </View>
                  ) : null}
                </View>

                <View mt={5}>
                  <FInputs
                    placeholder={'Password'}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    rightIcon
                    type={'password'}
                  />
                  {errors.password && (
                    <View>
                      <View flexDir={'row'} mt={1}>
                        <View
                          mt={1.5}
                          bg={'red.500'}
                          h={2}
                          w={2}
                          rounded={'full'}
                          mx={1}></View>
                        <Text color={'red.500'} fontSize={12}>
                          {errors.password}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
                <View mt={5}>
                  <FInputs
                    placeholder={'Confrim Password'}
                    onChangeText={handleChange('confirmPassword')}
                    value={values.confirmPassword}
                    rightIcon
                    type={'password'}
                  />
                  {errors.confirmPassword && (
                    <View flexDir={'row'} mt={1} alignItems={'center'}>
                      <View
                        bg={'red.500'}
                        h={2}
                        w={2}
                        rounded={'full'}
                        mx={1}></View>
                      <Text color={'red.500'} fontSize={12}>
                        {errors.confirmPassword}
                      </Text>
                    </View>
                  )}
                </View>

                <View mt={10}>
                  <FButton
                    loading={isLoading}
                    label={'Continue'}
                    variant={'Solid'}
                    onPress={handleSubmit}
                  />
                  <FButton
                    label={'Continue with Google'}
                    mt={10}
                    onPress={() => onGoogleButtonPress()}
                    variant={'secondary'}
                  />
                  <FButton
                    label={'Continue with Facebook'}
                    mt={5}
                    variant={'secondary'}
                  />
                  <Pressable onPress={() => navigation.navigate('SignIn')}>
                    <Row
                      alignItems={'center'}
                      alignSelf={'center'}
                      mt={10}
                      mb={3}>
                      <Text
                        fontSize={13}
                        fontFamily={'Lexend-Light'}
                        color={'grey.400'}>
                        Already have an account?{' '}
                      </Text>
                      <Text
                        color={'primary.400'}
                        fontSize={14}
                        fontFamily={'Lexend-Medium'}>
                        Sign In
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
export default SignUp;
