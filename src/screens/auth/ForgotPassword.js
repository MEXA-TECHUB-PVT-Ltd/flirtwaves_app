import {
  //   KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  //   Text,
  TouchableWithoutFeedback,
  //   Button,
  Keyboard,
} from 'react-native';
import {
  Input,
  View,
  KeyboardAvoidingView,
  Text,
  Button,
  VStack,
  Heading,
  Center,
  NativeBaseProvider,
  ScrollView,
} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';

import Header from '../../components/Header/Header';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FInputs from '../../components/inputs/inputs';
import FButton from '../../components/button/FButton';

const ForgotPassword = ({navigation}) => {
  const formSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const [modalVisible, setModalVisible] = React.useState(false);

  const handleCreate = em => {
    const body = {
      email: em,
    };
  };

  const [currentLanguage, setLanguage] = React.useState();

  return (
    <View flex={1} bg={'primary.20'}>
      <Header />

      {/* <Center> */}

      <ScrollView showsVerticalScrollIndicator={false} flex={1}>
        <View alignItems={'center'}>
          <Heading mt={'40%'}>Forget Password</Heading>
          <Text color="grey.400" mt={'2'} fontSize={14}>
            Enter your email for a verification code
          </Text>
        </View>
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
              <View mt={'50%'} flex={1}>
                <FInputs
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Enter your Email"
                />
                {errors.email && (
                  <View
                    flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}
                    alignItems={'center'}
                    mt={1}>
                    <View
                      bg={'red.500'}
                      h={2}
                      w={2}
                      rounded={'full'}
                      mr={1}></View>
                    <Text color={'red.500'} fontSize={12}>
                      {errors.email}
                    </Text>
                  </View>
                )}
              </View>
              <View mt={20} mb={10} flex={1}>
                <FButton
                  title={'Send Code'}
                  variant={'Solid'}
                  onPress={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>

      {/* </Center> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
export default ForgotPassword;
