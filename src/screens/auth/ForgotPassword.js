// da/``
import {ImageBackground, StyleSheet} from 'react-native';
import {
  Box,
  Center,
  Circle,
  Image,
  Row,
  ScrollView,
  Text,
  View,
} from 'native-base';
import React from 'react';

import Header from '../../components/Header/Header';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FInputs from '../../components/inputs/inputs';
import FButton from '../../components/button/FButton';
import {useForgetPasswordMutation} from '../../redux/apis/auth';
const ForgotPassword = ({navigation}) => {
  const [postEmail, {data, isError, isLoading}] = useForgetPasswordMutation();

  const [error, setError] = React.useState();
  const formSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });
  const handleCreate = em => {
    let body = {
      email: em,
    };
    postEmail(body).then(res => {
      if (res?.data?.error === false) {
        navigation.navigate('Verification', {otp: res?.data?.otp, email: em});
      } else {
        setError(res?.error?.data?.msg);
      }
    });
  };
  return (
    // <View flex={1}>
    <View flex={1} bg={'primary.20'}>
      <Header />
      <ScrollView mx={5} mt={5} showsVerticalScrollIndicator={false}>
        <View mt={16}>
          <Text
            fontSize={22}
            mb={32}
            textAlign={'center'}
            fontFamily={'Lexend-SemiBold'}>
            Forget Password
          </Text>

          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={formSchema}
            onSubmit={values => handleCreate(values.email)}>
            {({
              values,
              handleChange,

              handleSubmit,

              errors,
            }) => (
              <>
                <FInputs
                  placeholder={'Email Address'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                />
                {errors.email || isError === true ? (
                  <View flexDir={'row'} alignItems={'center'} mt={1} ml={1}>
                    <View
                      bg={'red.500'}
                      h={1}
                      w={1}
                      rounded={'full'}
                      mr={1}></View>
                    <Text color={'red.500'} fontSize={12}>
                      {errors.email ? errors.email : error}
                    </Text>
                  </View>
                ) : null}
                <View mt={'50%'} mb={5}>
                  <FButton
                    loading={isLoading}
                    label={'Send Code'}
                    onPress={handleSubmit}
                    variant={'Solid'}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
