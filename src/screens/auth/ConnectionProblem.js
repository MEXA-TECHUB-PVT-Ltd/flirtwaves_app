import {View, Text, ScrollView} from 'native-base';

import React from 'react';
import Header from '../../components/Header/Header';
import FInputs from '../../components/inputs/inputs';
import FButton from '../../components/button/FButton';
import {Formik} from 'formik';
import * as Yup from 'yup';

const ConnectionProblem = ({navigation}) => {
  const formSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });
  const handleCreate = em => {
    navigation.navigate('Verify');
  };
  return (
    <View flex={1} bg={'white'}>
      <Header />
      <ScrollView>
        <View my={5} mx={5}>
          <Text
            fontSize={22}
            fontFamily={'Lexend-SemiBold'}
            textAlign={'center'}>
            Recover your account with your email address
          </Text>
          <Text
            fontSize={14}
            mt={4}
            fontFamily={'Lexend-Light'}
            color={'txtColor'}
            textAlign={'center'}>
            We will send you a link to connect to your account
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
                <View mx={1} mt={10}>
                  <FInputs
                    placeholder={'Email Address'}
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />
                  {errors.email && (
                    <View flexDir={'row'} alignItems={'center'} mt={1}>
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
                <View mt={'90%'} mb={2}>
                  <FButton
                    label={'Confirm'}
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
export default ConnectionProblem;
