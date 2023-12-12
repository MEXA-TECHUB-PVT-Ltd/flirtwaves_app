import {View, Text, Image, Pressable, Center} from 'native-base';

import React from 'react';
import Swiper from 'react-native-swiper';
import Entypo from 'react-native-vector-icons/Entypo';
import {useGetUserByIdQuery} from '../../redux/apis/auth';
import Lottie from 'lottie-react-native';
const Gallery = ({navigation, route}) => {
  const otherUid = route?.params?.otherUid;
  const {
    data: userData,
    isError: userError,
    isLoading: Userloading,
  } = useGetUserByIdQuery(otherUid);
  // console.log('object', userData);
  return (
    <View flex={1} bg={'white'}>
      <Pressable onPress={() => navigation.goBack()} p={3}>
        <View rounded={'full'} alignSelf={'flex-end'}>
          <Entypo name={'cross'} color={'black'} size={30} />
        </View>
      </Pressable>
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
        <>
          {userData?.data?.images?.length > 0 && (
            <Swiper
              showsPagination={true}
              showsButtons={false}
              activeDotStyle={{width: 20}}
              style={{marginTop: 10}}
              paginationStyle={{
                bottom: 0,
                marginBottom: 20,
              }}
              activeDotColor={'#F5BF03'}
              loop={false}>
              {userData?.data?.images.map((item, index) => {
                console.log(item);
                return (
                  <View key={index}>
                    <Image
                      key={index}
                      source={{uri: item}}
                      mt={5}
                      h={'90%'}
                      // flex={0.8}
                      resizeMode={'cover'}
                      alt={`img_${index}`}
                    />
                  </View>
                );
              })}
            </Swiper>
          )}
        </>
      )}
    </View>
  );
};
export default Gallery;
