import {
  View,
  Text,
  ScrollView,
  Row,
  Pressable,
  Box,
  Image,
  Center,
  Slider,
  Icon,
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
import RnRangeSlider from 'rn-range-slider';
import {setUserProfile} from '../../redux/slices/auth';
import {useDispatch, useSelector} from 'react-redux';

const AddHeight = ({navigation}) => {
  const [id, setId] = React.useState(0);
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.auth?.userProfile);

  const data = [
    {
      id: 1,
      name: 'Relationship',
    },
    {
      id: 2,
      name: 'Nothing Serious',
    },
    {id: 3, name: `I'll know when I find it`},
  ];
  const [onChangeValue, setOnChangeValue] = React.useState(170); // Set to 170 cm (5'7") as the default value
  const [onChangeEndValue, setOnChangeEndValue] = React.useState(170);
  const [height, setHeight] = React.useState();
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
      const data = {...userProfile, height: updatedHeight};
      console.log(data);
      await dispatch(setUserProfile(data));
      navigation.navigate('OnBoarding4');
    }
  };
  return (
    <View bg={'primary.20'} flex={1}>
      <FStatusBar />
      <Header right />
      <ScrollView flex={1}>
        <View mx={5} flex={1}>
          <Text
            textAlign={'center'}
            fontSize={20}
            fontFamily={'Lexend-SemiBold'}
            mb={20}
            mt={10}>
            What's your height?
          </Text>
          <View flex={1}>
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
                {height}
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
        </View>
      </ScrollView>

      <View mb={16} mx={5}>
        <Footer load={'40'} num={5} onPress={() => handleNavigation()} />
      </View>
    </View>
  );
};

export default AddHeight;
