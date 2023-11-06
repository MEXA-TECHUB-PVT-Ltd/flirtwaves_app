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

const OnBoarding5 = ({navigation}) => {
  const [id, setId] = React.useState(0);
  const data = [
    {
      id: 1,
      name: 'I’m a microwave master',
    },
    {
      id: 2,
      name: 'I’m a delivery expert',
    },
    {id: 3, name: `I know a few good recipes`},
    {id: 4, name: `I’m an excellent chef`},
  ];

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
            mt={10}>
            What’s your cooking skills?
          </Text>
          <View mt={20}>
            {data?.map(item => {
              return (
                <Pressable
                  bg={'white'}
                  p={2}
                  mb={5}
                  onPress={() => {
                    setId(item?.id);
                  }}
                  //   key={item?.id}
                  alignItems={'center'}
                  borderColor={id === item?.id ? 'primary.400' : null}
                  borderWidth={id === item?.id ? 1 : null}
                  justifyContent={'center'}>
                  <Text
                    fontSize={16}
                    fontFamily={
                      id === item?.id ? 'Lexend-Regular' : 'Lexend-Light'
                    }
                    color={id === item?.id ? 'black' : 'grey.400'}
                    textAlign={'center'}>
                    {item?.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View mb={16} mx={5}>
        <Footer
          load={'60'}
          num={7}
          onPress={() => navigation.navigate('OnBoarding6')}
        />
      </View>
    </View>
  );
};
export default OnBoarding5;
