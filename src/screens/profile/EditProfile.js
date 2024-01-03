import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Row,
  Stack,
  Center,
} from 'native-base';

import React from 'react';
import Header from '../../components/Header/Header';
import Swiper from 'react-native-swiper';
import FButton from '../../components/button/FButton';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import {useSelector} from 'react-redux';
import {
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
} from '../../redux/apis/auth';
import Lottie from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';

const EditProfile = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const userProfile = useSelector(state => state.auth?.userProfile);
  const uid = useSelector(state => state.auth?.userData?.id);
  const {
    data: userData,
    isError: userError,
    isLoading: Userloading,
  } = useGetUserByIdQuery(uid);
  const [updateProfile, {isLoading}] = useUpdateUserProfileMutation();
  useFocusEffect(
    React.useCallback(() => {
      if(Object.keys(userProfile).length!==0){
        console.log('isLoading', userProfile)
        let body = {
       
          id:uid,
          data:userProfile
        
      };
      updateProfile(body).then(res => {
        console.log(res);
        if (res?.data?.error === false) {
          // setVisible(true);÷
        }
      });
      }
     
      

      
    }, [userProfile]),
  );
  const handleNavigation = () => {
    let body = {
      id: uid,
      data: userProfile,
    };
    updateProfile(body).then(res => {
      console.log(res);
      if (res?.data?.error === false) {
        setVisible(true);
      }
    });
  };
  return (
    <View flex={1} bg={'white'}>
      <Header title={'Edit Profile'} />
      <CustomSnackbar
        message={'Success'}
        visible={visible}
        height={'8%'}
        onDismiss={() => {
          setVisible(false);
          navigation.goBack();
        }}
        messageDescription={'Profile edited Successfully'}
      />
      {Userloading ||isLoading? (
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View h={380}>
            {userData?.data?.images?.length > 0 && (
              <Swiper
                // ref={swiper}

                showsPagination={true}
                showsButtons={false}
                activeDotStyle={{width: 20}}
                style={{
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                paginationStyle={
                  {
                    //   bottom: 0,
                    //   marginBottom: 20,
                    // paddingBottom: 20,
                  }
                }
                activeDotColor={'#F5BF03'}
                loop={false}>
                {userData?.data?.images.map((item, index) => {
                  return (
                    <Stack key={index}>
                      <Image
                        alignSelf={'center'}
                        borderRadius={10}
                        source={{uri: item}}
                        mt={5}
                        // h={'50%'}
                        h={300}
                        w={300}
                        // w={'80%'}
                        resizeMode={'cover'}
                        alt={'img'}
                      />
                      <Pressable
                        onPress={() =>
                          navigation.navigate('AddPhoto', {fromEdit: true})
                        }
                        position={'absolute'}
                        p={1}
                        right={10}
                        bg={'primary.400'}
                        rounded={'md'}
                        flexDir={'row'}
                        h={7}
                        w={16}
                        alignItems={'center'}
                        justifyContent={'center'}
                        top={8}>
                        <Image
                          source={require('../../assets/edit.png')}
                          h={3}
                          w={3}
                          alt={'img'}
                          resizeMode={'contain'}
                        />
                        <Text
                          ml={1}
                          color={'black'}
                          fontSize={10}
                          fontFamily={'Lexend-Regular'}>
                          Edit
                        </Text>
                      </Pressable>
                    </Stack>
                  );
                })}
              </Swiper>
            )}
          </View>

          <View mx={5} flex={1}>
            <Row alignItems={'center'} justifyContent={'space-between'} mb={5}>
              <Text
                fontSize={16}
                fontFamily={'Lexend-SemiBold'}
                color={'primary.400'}>
                Profile Info
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('PersonalInfo');
                }}
                //   position={'absolute'}
                p={1}
                //   right={2}
                bg={'primary.400'}
                rounded={'md'}
                flexDir={'row'}
                h={7}
                w={20}
                alignItems={'center'}
                justifyContent={'center'}>
                <Image
                  source={require('../../assets/edit.png')}
                  h={3}
                  w={3}
                  alt={'img'}
                  resizeMode={'contain'}
                />
                <Text
                  ml={1}
                  color={'black'}
                  fontSize={14}
                  fontFamily={'Lexend-Regular'}>
                  Edit
                </Text>
              </Pressable>
            </Row>
            <Row alignItems={'center'} justifyContent={'space-between'}>
              <Text fontSize={14} fontFamily={'Lexend-Regular'}>
                Full Name
              </Text>
              <Text>{userData?.data?.name}</Text>
            </Row>
            <Row alignItems={'center'} justifyContent={'space-between'} my={2}>
              <Text fontSize={14} fontFamily={'Lexend-Regular'}>
                Email
              </Text>
              <Text>{userData?.data?.email}</Text>
            </Row>
            <Row alignItems={'center'} justifyContent={'space-between'}>
              <Text fontSize={14} fontFamily={'Lexend-Regular'}>
                Gender
              </Text>
              <Text>{userData?.data?.gender}</Text>
            </Row>
            <Row alignItems={'center'} justifyContent={'space-between'} mt={2}>
              <Text fontSize={14} fontFamily={'Lexend-Regular'}>
                Height
              </Text>
              <Text>{userData?.data?.height} ft</Text>
            </Row>
            <Text
              my={4}
              mb={2}
              fontSize={16}
              color={'primary.400'}
              fontFamily={'Lexend-SemiBold'}>
              Prefrences
            </Text>
            {userData?.data?.relation_type_data && (
              <Row
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={2}>
                <Text fontSize={14} fontFamily={'Lexend-Regular'}>
                  Looking for {userData?.data?.relation_type_data}
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('OnBoarding3', {fromEdit: true});
                  }}
                  //   position={'absolute'}
                  p={1}
                  //   right={2}

                  rounded={'md'}
                  flexDir={'row'}
                  h={7}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Image
                    source={require('../../assets/edit.png')}
                    h={3}
                    w={3}
                    alt={'img'}
                    resizeMode={'contain'}
                  />
                  <Text
                    ml={1}
                    color={'black'}
                    fontSize={14}
                    fontFamily={'Lexend-Regular'}>
                    Edit
                  </Text>
                </Pressable>
              </Row>
            )}

            {userData?.data?.exercise_data && (
              <Row
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={2}>
                <Text fontSize={14} fontFamily={'Lexend-Regular'}>
                  {userData?.data?.exercise_data}
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('OnBoarding4', {fromEdit: true});
                  }}
                  //   position={'absolute'}
                  p={1}
                  //   right={2}

                  rounded={'md'}
                  flexDir={'row'}
                  h={7}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Image
                    source={require('../../assets/edit.png')}
                    h={3}
                    w={3}
                    alt={'img'}
                    resizeMode={'contain'}
                  />
                  <Text
                    ml={1}
                    color={'black'}
                    fontSize={14}
                    fontFamily={'Lexend-Regular'}>
                    Edit
                  </Text>
                </Pressable>
              </Row>
            )}
            {userData?.data?.cooking_skill_data && (
              <Row
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={2}>
                <Text fontSize={14} fontFamily={'Lexend-Regular'}>
                  {userData?.data?.cooking_skill_data}
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('OnBoarding5', {fromEdit: true});
                  }}
                  //   position={'absolute'}
                  p={1}
                  //   right={2}

                  rounded={'md'}
                  flexDir={'row'}
                  h={7}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Image
                    source={require('../../assets/edit.png')}
                    h={3}
                    w={3}
                    alt={'img'}
                    resizeMode={'contain'}
                  />
                  <Text
                    ml={1}
                    color={'black'}
                    fontSize={14}
                    fontFamily={'Lexend-Regular'}>
                    Edit
                  </Text>
                </Pressable>
              </Row>
            )}
            {userData?.data?.habit_data && (
              <Row
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={2}>
                <Text fontSize={14} fontFamily={'Lexend-Regular'}>
                  {userData?.data?.habit_data}
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('OnBoarding6', {fromEdit: true});
                  }}
                  //   position={'absolute'}
                  p={1}
                  //   right={2}

                  rounded={'md'}
                  flexDir={'row'}
                  h={7}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Image
                    source={require('../../assets/edit.png')}
                    h={3}
                    w={3}
                    alt={'img'}
                    resizeMode={'contain'}
                  />
                  <Text
                    ml={1}
                    color={'black'}
                    fontSize={14}
                    fontFamily={'Lexend-Regular'}>
                    Edit
                  </Text>
                </Pressable>
              </Row>
            )}
            {userData?.data?.night_life_data && (
              <Row
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={2}>
                <Text fontSize={14} fontFamily={'Lexend-Regular'}>
                  {userData?.data?.night_life_data}
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('OnBoarding7', {fromEdit: true});
                  }}
                  //   position={'absolute'}
                  p={1}
                  //   right={2}

                  rounded={'md'}
                  flexDir={'row'}
                  h={7}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Image
                    source={require('../../assets/edit.png')}
                    h={3}
                    w={3}
                    alt={'img'}
                    resizeMode={'contain'}
                  />
                  <Text
                    ml={1}
                    color={'black'}
                    fontSize={14}
                    fontFamily={'Lexend-Regular'}>
                    Edit
                  </Text>
                </Pressable>
              </Row>
            )}
            {userData?.data?.smoking_opinion_data && (
              <Row
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={2}>
                <Text fontSize={14} fontFamily={'Lexend-Regular'}>
                  {userData?.data?.smoking_opinion_data}
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('OnBoarding8', {fromEdit: true});
                  }}
                  //   position={'absolute'}
                  p={1}
                  //   right={2}

                  rounded={'md'}
                  flexDir={'row'}
                  h={7}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Image
                    source={require('../../assets/edit.png')}
                    h={3}
                    w={3}
                    alt={'img'}
                    resizeMode={'contain'}
                  />
                  <Text
                    ml={1}
                    color={'black'}
                    fontSize={14}
                    fontFamily={'Lexend-Regular'}>
                    Edit
                  </Text>
                </Pressable>
              </Row>
            )}
            {userData?.data?.kids_opinion_data && (
              <Row
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={2}>
                <Text fontSize={14} fontFamily={'Lexend-Regular'}>
                  {userData?.data?.kids_opinion_data}
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('OnBoarding9', {fromEdit: true});
                  }}
                  //   position={'absolute'}
                  p={1}
                  //   right={2}

                  rounded={'md'}
                  flexDir={'row'}
                  h={7}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Image
                    source={require('../../assets/edit.png')}
                    h={3}
                    w={3}
                    alt={'img'}
                    resizeMode={'contain'}
                  />
                  <Text
                    ml={1}
                    color={'black'}
                    fontSize={14}
                    fontFamily={'Lexend-Regular'}>
                    Edit
                  </Text>
                </Pressable>
              </Row>
            )}

            {userData?.data?.hobby_data && (
              <Row
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={2}>
                <Text fontSize={14} fontFamily={'Lexend-Regular'}>
                  {userData?.data?.hobby_data}
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('OnBoarding10', {fromEdit: true});
                  }}
                  //   position={'absolute'}
                  p={1}
                  //   right={2}

                  rounded={'md'}
                  flexDir={'row'}
                  h={7}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Image
                    source={require('../../assets/edit.png')}
                    h={3}
                    w={3}
                    alt={'img'}
                    resizeMode={'contain'}
                  />
                  <Text
                    ml={1}
                    color={'black'}
                    fontSize={14}
                    fontFamily={'Lexend-Regular'}>
                    Edit
                  </Text>
                </Pressable>
              </Row>
            )}
            <View my={5}>
              <FButton
                loading={isLoading}
                label={'Edit Profile'}
                variant={'Solid'}
                onPress={() => {
                  handleNavigation();
                }}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
export default EditProfile;
