import {View, Text, Pressable, Row, Divider, Image, Stack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AlertModal from '../../components/Modal/AlertModal';
import FButton from '../../components/button/FButton';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../../components/Header/Header';
import Footer from '../../components/footer/footer';
import AddPhotoCom from '../../components/Photo/AddPhotoComp';

const AddPhoto = ({navigation, route}) => {
  const [slide, setSlide] = React.useState(false);
  const fromEdit = route?.params?.fromEdit;
  return (
    <View bg={'primary.20'} flex={1}>
      <Header />
      <View flex={1} mx={5}>
        <Text
          textAlign={'center'}
          fontSize={20}
          fontFamily={'Lexend-SemiBold'}
          mt={10}>
          Add your photos
        </Text>
        <Text
          textAlign={'center'}
          fontSize={14}
          color={'grey.400'}
          fontFamily={'Lexend-Light'}
          mt={4}>
          Add minimum 1 photo to continue. One of these images should be a
          picture of yourself.
        </Text>
        <View alignSelf={'center'} mx={2} mt={5}>
          <AddPhotoCom slide={slide} fromEdit={fromEdit} />
        </View>
      </View>
    </View>
  );
};
export default AddPhoto;
