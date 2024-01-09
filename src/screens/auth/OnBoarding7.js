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
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
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
import {setUserProfile} from '../../redux/slices/auth';
import {useGetAllNightLifeQuery} from '../../redux/apis/auth';

const OnBoarding7 = ({navigation, route}) => {
  const [id, setId] = React.useState(0);
  const fromEdit = route?.params?.fromEdit;
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const {data: isData, isError, isLoading} = useGetAllNightLifeQuery(page);
  const userProfile = useSelector(state => state.auth?.userProfile);
  const data = [
    {
      id: 1,
      name: 'I’m in bed by midnight',
    },
    {
      id: 2,
      name: 'I’m a night owl',
    },
    {id: 3, name: 'I party in moderation'},
  ];
  const handleNavigation = async () => {
    if (id) {
      const data = {...userProfile, night_life: id?.id};
      console.log('data', data);
      await dispatch(setUserProfile(data));

      if (fromEdit === true) {
        navigation.goBack();
      } else {
        navigation.navigate('OnBoarding8');
      }
    }
  };
  return (
    <View bg={'primary.20'} flex={1}>
      <FStatusBar />
      <>
      {fromEdit ? 
      (<Header />)
       :
       (<Header right />)}
      </>
      {isLoading ? (
        <ActivityIndicator color={'black'} size={'small'} />
      ) : (
        <ScrollView flex={1}>
          <View mx={5} flex={1}>
            <Text
              textAlign={'center'}
              fontSize={20}
              fontFamily={'Lexend-SemiBold'}
              mt={10}>
              What’s your nightlife?
            </Text>
            <View mt={20}>
              {isData?.data?.map(item => {
                return (
                  <Pressable
                    bg={'white'}
                    p={2}
                    mb={5}
                    onPress={() => {
                      setId(item);
                    }}
                    //   key={item?.id}
                    alignItems={'center'}
                    borderColor={id?.id === item?.id ? 'primary.400' : null}
                    borderWidth={id?.id === item?.id ? 1 : null}
                    justifyContent={'center'}>
                    <Text
                      fontSize={16}
                      fontFamily={
                        id?.id === item?.id ? 'Lexend-Regular' : 'Lexend-Light'
                      }
                      color={id?.id === item?.id ? 'black' : 'grey.400'}
                      textAlign={'center'}>
                      {item?.night_life}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}
      {!isLoading && (
        <>
          {fromEdit === true ? (
            <View mb={16} mx={5}>
              <FButton
                label={'Save Changes'}
                variant={'Solid'}
                onPress={() => handleNavigation()}
              />
            </View>
          ) : (
            <View mb={16} mx={5}>
              <Footer load={'70'} num={9} onPress={() => handleNavigation()} />
            </View>
          )}
        </>
      )}
    </View>
  );
};
export default OnBoarding7;
