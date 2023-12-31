import {
  View,
  Text,
  ScrollView,
  Row,
  Pressable,
  Box,
  Slider,
  Image,
  Icon,
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

import Footer from '../../components/footer/footer';
import DateComp from '../auth/components/DateComp';
import {useDispatch, useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import {
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
} from '../../redux/apis/auth';
import {setUserProfile} from '../../redux/slices/auth';

const PersnolInfo = ({navigation}) => {
  const dispatch = useDispatch();
  const uid = useSelector(state => state.auth?.userData.id);
  const {
    data: userData,
    isError: userError,
    isLoading: Userloading,
  } = useGetUserByIdQuery(uid);
  const [dob, setDob] = React.useState(userData?.data?.dob);

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });
  const [updateProfile, {isLoading}] = useUpdateUserProfileMutation();
  const handleCreate = async name => {
    let body = {
      id: uid,
      data: {
        name: name,
        height: updatedHeight ? updatedHeight : userData?.data?.height,
        gender: id === 1 ? 'male' : 'female',
        dob: dob,
      },
    };
    await updateProfile(body).then(async res => {
      console.log(res);
      if (res?.data?.error === false) {
        await dispatch(setUserProfile(body));
        navigation.goBack();
      }
    });
  };
  const [id, setId] = React.useState(userData?.data?.gender === 'male' ? 1 : 2);
  const [onChangeValue, setOnChangeValue] = React.useState(170); // Set to 170 cm (5'7") as the default value
  const [onChangeEndValue, setOnChangeEndValue] = React.useState(170);
  const [height, setHeight] = React.useState(userData?.data?.height);
  const [updatedHeight, setUpdatedHeight] = React.useState();

  // Function to convert centimeters to feet and inches
  const cmToFeetAndInches = cm => {
    const inches = Math.round(cm / 2.54);
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    setHeight(`${feet}'${remainingInches}"`);
    setUpdatedHeight(`${feet}.${remainingInches}`);
    return `${feet}'${remainingInches}"`;
  };
  const handleOnChange = v => {
    v && setOnChangeEndValue(Math.floor(v));
    cmToFeetAndInches(v);
  };
  const handleNavigation = async () => {
    if (updatedHeight) {
    }
  };
  return (
    <View bg={'primary.20'} flex={1}>
      <FStatusBar />
      <Header />
      {Userloading ? (
        <Center
          flex={1}
          // mt={'50%'}
          alignItems={'center'}
          justifyContent={'center'}>
          <Lottie
            source={require('../../assets/spinner.json')}
            autoPlay
            loop
            style={{
              // marginBottom: 5,
              height: 50,
              width: 50,
              // backgroundColor: 'black',
            }}></Lottie>
        </Center>
      ) : (
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
                name: userData?.data?.name,
                email: userData?.data?.email,
              }}
              validationSchema={formSchema}
              onSubmit={values => handleCreate(values.name, values.email)}>
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
                  <View mt={4}>
                    <FInputs
                      isDisabled={true}
                      placeholder={'Email Address'}
                      onChangeText={handleChange('email')}
                      value={values.email}
                    />

                    <View flexDir={'row'} alignItems={'center'} mt={1}>
                      <View
                        bg={'red.500'}
                        h={2}
                        w={2}
                        rounded={'full'}
                        mx={1}></View>
                      <Text color={'red.500'} fontSize={12}>
                        Email Can't be changed
                      </Text>
                    </View>
                  </View>
                  <DateComp
                    SavePress={ok => {
                      console.log('SavePress', ok);
                      setDob(ok);
                    }}
                    fromEdit={true}
                    val={userData?.data?.dob}
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
                          <Center
                            alignItems={'center'}
                            justifyContent={'center'}>
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
                          <Center
                            alignItems={'center'}
                            justifyContent={'center'}>
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
                  <View mt={5}>
                    <Text fontSize={16} fontFamily={'Lexend-Medium'} mb={4}>
                      Height
                    </Text>
                    <Pressable
                      bg={'white'}
                      flexDir={'row'}
                      p={2}
                      mb={5}
                      onPress={() => {}}
                      alignItems={'center'}
                      justifyContent={'center'}>
                      <Text
                        fontSize={16}
                        fontFamily={'Lexend-Regular'}
                        color={'black'}
                        textAlign={'center'}>
                        {onChangeValue} cm
                      </Text>
                      <Text
                        fontSize={16}
                        fontFamily={'Lexend-Regular'}
                        color={'black'}
                        textAlign={'center'}>
                        ({height} ft)
                      </Text>
                    </Pressable>

                    <Slider
                      defaultValue={170} // Set the default value to 170 cm (5'7")
                      colorScheme="primary"
                      minValue={100} // Set the minimum value to 100 cm
                      maxValue={274.32} // Set the maximum value to 9 feet (274.32 cm)
                      step={1} // Set the step value to 1 cm
                      onChange={v => {
                        setOnChangeValue(Math.floor(v));
                      }}
                      onChangeEnd={v => {
                        handleOnChange(v);
                      }}>
                      <Slider.Track bg="white">
                        <Slider.FilledTrack bg="primary.400" />
                      </Slider.Track>
                      <Slider.Thumb
                        borderWidth="0"
                        bg="primary.400"
                        w={6}
                        alignItems={'center'}
                        justifyContent={'center'}>
                        <Icon
                          as={
                            <Image
                              source={require('../../assets/slide.png')}
                              h={1}
                              w={1}
                              alt="img"
                              resizeMode="contain"
                            />
                          }
                          ml={-1}
                          size="xs"
                        />
                      </Slider.Thumb>
                    </Slider>
                  </View>
                  <View mt={8} mb={4}>
                    <FButton
                      loading={isLoading}
                      label={'Save Changes'}
                      variant={'Solid'}
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
export default PersnolInfo;
