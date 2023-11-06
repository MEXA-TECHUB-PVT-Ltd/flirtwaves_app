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
const SignUp = ({navigation}) => {
  const formSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required(`Password is required`),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });
  const handleCreate = (email, password, name) => {
    console.log(email, name, password);
    navigation.navigate('About');
  };
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
                  {errors.email && (
                    <View flexDir={'row'} alignItems={'center'} mt={1}>
                      <View
                        bg={'red.500'}
                        h={2}
                        w={2}
                        rounded={'full'}
                        mx={1}></View>
                      <Text color={'red.500'} fontSize={12}>
                        {errors.email}
                      </Text>
                    </View>
                  )}
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
                      <View flexDir={'row'} alignItems={'center'} mt={1}>
                        <View
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
                    label={'Continue'}
                    variant={'Solid'}
                    onPress={handleSubmit}
                  />
                  <FButton
                    label={'Continue with Google'}
                    mt={10}
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
