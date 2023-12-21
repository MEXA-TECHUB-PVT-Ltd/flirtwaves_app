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

import * as Yup from 'yup';
import {Formik} from 'formik';
import FButton from '../../components/button/FButton';
import FInputs from '../../components/inputs/inputs';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import Header from '../../components/Header/Header';
import {useSelector} from 'react-redux';
import {
  useChangePasswordMutation,
  useLoginUserMutation,
} from '../../redux/apis/auth';
const UpdatePassword = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);

  const pass = useSelector(state => state.auth?.password);
  const [error, setError] = React.useState(false);
  const formSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .required(`New Password is required`)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-]{8,}$/,
        `Password must contain at least 8 characters,${'\n'}including one letter one number one special charcter,`,
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });
  const {id, email} = useSelector(state => state.auth.userData);
  const [updatePassword, {data, isLoading}] = useChangePasswordMutation();

  const handleCreate = (oldPass, newPass) => {
    if (pass !== oldPass) {
      setError(true);
    } else {
      setError(false);
      let body = {
        userId: id,
        password: newPass,
      };
      updatePassword(body).then(res => {
        if (res?.data?.error === false) {
          setVisible(true);
        }
      });
    }
  };
  return (
    // <View flex={1}>
    <View flex={1} bg={'white'}>
      <Header title={'Change Password'} />

      <CustomSnackbar
        message={'Success'}
        visible={visible}
        onDismiss={() => {
          setVisible(false);
          navigation.goBack();
        }}
        messageDescription={'Password updated Successfully'}
      />
      <ScrollView mx={5} mt={5}>
        <View>
          <Formik
            validateOnChange
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={formSchema}
            onSubmit={values =>
              handleCreate(
                values.oldPassword,
                values.newPassword,
                values.confirmPassword,
              )
            }>
            {({
              values,
              handleChange,

              handleSubmit,

              errors,
            }) => (
              <>
                <View my={5}>
                  <FInputs
                    type="password"
                    rightIcon
                    placeholder="Old Password"
                    value={values.oldPassword}
                    onChangeText={handleChange('oldPassword')}
                  />

                  {errors.oldPassword || error === true ? (
                    <View flexDir={'row'} alignItems={'center'} mt={1} ml={1}>
                      <View
                        bg={'red.500'}
                        h={2}
                        w={2}
                        rounded={'full'}
                        mx={1}></View>
                      <Text color={'red.500'} fontSize={12}>
                        {error
                          ? 'Old Password is not incorrect'
                          : errors.oldPassword}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View mb={5}>
                  <FInputs
                    type={'password'}
                    rightIcon
                    placeholder="New Password"
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
                <FInputs
                  value={values.confirmPassword}
                  type={'password'}
                  rightIcon
                  placeholder="Confirm Password"
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
                <View mt={'90%'}>
                  <FButton
                    loading={isLoading}
                    label={'Change Password'}
                    variant={'Solid'}
                    onPress={handleSubmit}
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

export default UpdatePassword;

const styles = StyleSheet.create({});
