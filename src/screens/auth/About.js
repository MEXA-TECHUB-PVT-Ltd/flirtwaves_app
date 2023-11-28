import {
  View,
  Text,
  ScrollView,
  Row,
  Pressable,
  Box,
  Image,
  Center,
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
import DateComp from './components/DateComp';
import Footer from '../../components/footer/footer';
import {useDispatch, useSelector} from 'react-redux';
import {useUpdateUserProfileMutation} from '../../redux/apis/auth';
import {setUserProfile} from '../../redux/slices/auth';

const About = ({navigation}) => {
  const uid = useSelector(state => state.auth?.userData?.id);
  const [updateProfile, {isLoading}] = useUpdateUserProfileMutation();
  const dispatch = useDispatch();

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required'),
  });
  const [id, setId] = React.useState(0);
  const [dob, setDob] = React.useState();
  const handleCreate = async name => {
    if (id !== 0 && dob) {
      let body = {
        gender: id === 1 ? 'male' : 'female',
        name: name,
        dob: dob,
      };
      console.log(body);
      await dispatch(setUserProfile(body));
      navigation.navigate('Looking');
    }
  };
  return (
    <View bg={'primary.20'} flex={1}>
      <FStatusBar />
      <Header />
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <View mx={5} flex={1}>
          <Text
            textAlign={'center'}
            fontSize={20}
            fontFamily={'Lexend-SemiBold'}
            mt={10}>
            Tell us about yourself
          </Text>
          <Formik
            initialValues={{
              name: '',
            }}
            validationSchema={formSchema}
            onSubmit={values => handleCreate(values.name)}>
            {({
              values,
              handleChange,

              handleSubmit,

              errors,
            }) => (
              <View mt={5} flex={1} mb={4}>
                <View>
                  <FInputs
                    placeholder={'Full Name'}
                    onChangeText={handleChange('name')}
                    value={values.name}
                  />
                  {errors.name && (
                    <View flexDir={'row'} alignItems={'center'} mt={1}>
                      <View
                        bg={'red.500'}
                        h={2}
                        w={2}
                        rounded={'full'}
                        mx={1}></View>
                      <Text color={'red.500'} fontSize={12}>
                        {errors.name}
                      </Text>
                    </View>
                  )}
                </View>
                <DateComp
                  SavePress={ok => {
                    console.log('SavePress', ok);
                    setDob(ok);
                  }}
                />
                <View mt={5}>
                  <Text
                    color={'primary.400'}
                    fontSize={16}
                    fontFamily={'Lexend-SemiBold'}>
                    Select Gendar
                  </Text>
                  <Row
                    alignItems={'center'}
                    justifyContent={'space-around'}
                    mt={5}>
                    <Pressable onPress={() => setId(1)}>
                      <Box
                        h={32}
                        w={32}
                        bg={'white'}
                        borderColor={id === 1 ? 'primary.400' : 'grey.400'}
                        borderWidth={id === 1 ? 1 : 0}
                        justifyContent={'center'}
                        borderRadius={10}>
                        <Center alignItems={'center'} justifyContent={'center'}>
                          <View
                            bg={id === 1 ? 'primary.400' : 'grey.400'}
                            rounded={'full'}
                            p={3}>
                            <Image
                              source={require('../../assets/male.png')}
                              h={5}
                              w={5}
                              resizeMode="contain"
                              alt={'male'}
                            />
                          </View>
                          <Text
                            color={id === 1 ? 'black' : 'grey.400'}
                            fontSize={12}
                            mt={3}
                            fontFamily={
                              id === 1 ? 'Lexend-Medium' : 'Lexend-Light'
                            }>
                            Male
                          </Text>
                        </Center>
                      </Box>
                    </Pressable>
                    <Pressable onPress={() => setId(2)}>
                      <Box
                        h={32}
                        borderRadius={10}
                        w={32}
                        borderColor={id === 2 ? 'primary.400' : 'grey.400'}
                        borderWidth={id === 2 ? 1 : 0}
                        bg={'white'}
                        alignItems={'center'}
                        justifyContent={'center'}>
                        <Center alignItems={'center'} justifyContent={'center'}>
                          <View
                            bg={id === 2 ? 'primary.400' : 'grey.400'}
                            rounded={'full'}
                            p={3}>
                            <Image
                              source={require('../../assets/female.png')}
                              h={5}
                              w={5}
                              alt={'female'}
                              resizeMode="contain"
                            />
                          </View>
                        </Center>
                        <Text
                          color={id === 2 ? 'black' : 'grey.400'}
                          fontSize={12}
                          mt={3}
                          fontFamily={
                            id === 2 ? 'Lexend-Medium' : 'Lexend-Light'
                          }>
                          Female
                        </Text>
                      </Box>
                    </Pressable>
                  </Row>
                </View>
                <View mt={'30%'}>
                  <Footer
                    load={'10'}
                    num={1}
                    onPress={handleSubmit}
                    loading={isLoading}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};
export default About;
