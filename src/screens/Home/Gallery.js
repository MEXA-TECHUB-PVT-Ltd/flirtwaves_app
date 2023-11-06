import {View, Text, Image, Pressable} from 'native-base';

import React from 'react';
import Swiper from 'react-native-swiper';
import Entypo from 'react-native-vector-icons/Entypo';
const Gallery = ({navigation}) => {
  return (
    <View flex={1} bg={'white'}>
      <Pressable onPress={() => navigation.goBack()} p={3}>
        <View rounded={'full'} alignSelf={'flex-end'}>
          <Entypo name={'cross'} color={'black'} size={30} />
        </View>
      </Pressable>
      <Swiper
        // ref={swiper}
        showsPagination={true}
        showsButtons={false}
        activeDotStyle={{width: 20}}
        style={{marginTop: 20}}
        paginationStyle={{
          bottom: 0,

          marginBottom: 20,
          // paddingBottom: 20,
        }}
        activeDotColor={'#F5BF03'}
        loop={false}>
        <View h={'100%'} w={'100%'}>
          <Image
            source={require('../../assets/h1.png')}
            mt={5}
            flex={0.8}
            resizeMode={'cover'}
            alt={'img'}
          />
        </View>
        <View h={'100%'} w={'100%'}>
          <Image
            source={require('../../assets/h1.png')}
            mt={5}
            flex={0.8}
            resizeMode={'cover'}
            alt={'img'}
          />
        </View>
        <Image
          source={require('../../assets/h3.png')}
          mt={5}
          flex={0.8}
          resizeMode={'cover'}
          alt={'img'}
        />
        <Image
          source={require('../../assets/h4.png')}
          mt={5}
          flex={0.8}
          resizeMode={'cover'}
          alt={'img'}
        />
        <Image
          source={require('../../assets/h5.png')}
          mt={5}
          flex={0.8}
          resizeMode={'cover'}
          alt={'img'}
        />
        <Image
          source={require('../../assets/h6.png')}
          mt={5}
          flex={0.8}
          resizeMode={'cover'}
          alt={'img'}
        />
      </Swiper>
    </View>
  );
};
export default Gallery;
