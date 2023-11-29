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

import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import Header from '../../components/Header/Header';
import FButton from '../../components/button/FButton';
import FInputs from '../../components/inputs/inputs';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector} from 'react-redux';
import {useUpdatePasswordMutation} from '../../redux/apis/auth';

const ResetPassword = ({navigation, route}) => {
  const [visible, setVisible] = React.useState(false);
  const email = route?.params?.email;
  const [updatePassword, {isError, isLoading}] = useUpdatePasswordMutation();
  const formSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('New Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-]{8,}$/,
        `Password must contain at least 8 characters,${'\n'}including one letter one number one special charcter,`,
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleCreate = (nP, cP) => {
    setVisible(true);
    let body = {
      email: email,
      password: nP,
    };
    updatePassword(body).then(res => {
      if (res?.data?.error === false) {
        setVisible(true);
      }
    });
    // console.log('create', body);
  };
  return (
    // <View flex={1}>
    <View bg={'primary.20'} flex={1}>
      <Header />
      <CustomSnackbar
        message={'Success'}
        visible={visible}
        height={'8%'}
        onDismiss={() => {
          setVisible(false);
          navigation.navigate('SignIn');
        }}
        messageDescription={'Password reset Successfully'}
      />
      <ScrollView mx={5} mt={5} showsVerticalScrollIndicator={false}>
        <View mt={16}>
          <Text
            fontSize={22}
            mb={'30%'}
            fontFamily={'Lexend-SemiBold'}
            texAlign={'center'}>
            Reset Password
          </Text>
          <Formik
            initialValues={{
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={formSchema}
            onSubmit={values =>
              handleCreate(values.newPassword, values.confirmPassword)
            }>
            {({
              values,
              handleChange,

              handleSubmit,

              errors,
            }) => (
              <>
                <View>
                  <View>
                    <FInputs
                      placeholder={'Password'}
                      rightIcon
                      value={values.newPassword}
                      onChangeText={handleChange('newPassword')}
                    />
                    {errors.newPassword && (
                      <View flexDir={'row'} mt={1} mx={1}>
                        <View
                          mt={1.5}
                          bg={'red.500'}
                          h={2}
                          w={2}
                          rounded={'full'}
                          mx={1}></View>
                        <Text color={'red.500'} fontSize={12}>
                          {errors.newPassword}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View mt={3}>
                    <FInputs
                      placeholder={'Confirm Password'}
                      rightIcon
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                      <View flexDir={'row'} alignItems={'center'} mt={1} ml={1}>
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
                </View>
                <View mt={'48%'} mb={5}>
                  <FButton
                    loading={isLoading}
                    variant={'Solid'}
                    label={'Reset Password'}
                    onPress={handleSubmit}
                  />
                </View>
              </>
            )}
          </Formik>
          {/* <FInputs placeholder={'Password'} rightIcon />
          <FInputs placeholder={'Confirm Password'} rightIcon mt={5} /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
