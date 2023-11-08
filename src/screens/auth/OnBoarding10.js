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
import AlertModal from '../../components/Modal/AlertModal';

const OnBoarding10 = ({navigation, route}) => {
  const fromEdit = route?.params?.fromEdit;
  const [id, setId] = React.useState(0);
  const data = [
    {
      id: 1,
      name: 'A little of everything',
    },
    {
      id: 2,
      name: 'Vegan',
    },
    {id: 3, name: `flexitarian`},
    {id: 4, name: `Vegetarian`},
    {id: 5, name: `Junk food 4eva`},
    {id: 6, name: `Kosher`},
    {id: 7, name: `halal`},
  ];
  const [visible, setVisible] = React.useState(false);
  return (
    <View bg={'primary.20'} flex={1}>
      <FStatusBar />
      <Header right />
      {/* <ScrollView flex={1}> */}
      <View mx={5} flex={1}>
        <Text
          textAlign={'center'}
          fontSize={20}
          fontFamily={'Lexend-SemiBold'}
          mt={8}>
          What are your eating habits?
        </Text>
        <View mt={8}>
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
      {/* </ScrollView> */}
      {fromEdit === true ? (
        <View mb={16} mx={5}>
          <FButton
            label={'Save Changes'}
            variant={'Solid'}
            onPress={() => navigation.goBack()}
          />
        </View>
      ) : (
        <View mb={16} mx={5}>
          <Footer
            load={'30'}
            num={4}
            onPress={() => navigation.navigate('AddHeight')}
          />
        </View>
      )}
      <AlertModal
        modalVisible={visible}
        fromAuth={true}
        onPress={() => navigation.navigate('Tabs', {screen: 'Home'})}
        onPress1={() => navigation.navigate('Tabs', {screen: 'Home'})}
      />
    </View>
  );
};
export default OnBoarding10;
