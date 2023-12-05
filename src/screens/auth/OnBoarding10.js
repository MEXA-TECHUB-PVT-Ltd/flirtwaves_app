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
import AlertModal from '../../components/Modal/AlertModal';
import {setUserProfile} from '../../redux/slices/auth';
import {panHandlerName} from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';
import {useDispatch, useSelector} from 'react-redux';
import {
  useGetAllHabbitsQuery,
  useUpdateUserProfileMutation,
} from '../../redux/apis/auth';

const OnBoarding10 = ({navigation, route}) => {
  const fromEdit = route?.params?.fromEdit;
  const [id, setId] = React.useState(0);
  const uid = useSelector(state => state.auth?.userData?.id);
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.auth?.userProfile);
  const [updateUser, {isError}] = useUpdateUserProfileMutation();
  const [page, setPage] = React.useState(1);
  const {data: isData, isLoading} = useGetAllHabbitsQuery(page);
  console.log('is', isLoading);
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
  console.log(isData);
  const handleNavigation = async () => {
    if (id) {
      const data = {...userProfile, eating_habits: id?.id};
      console.log('data', data);
      await dispatch(setUserProfile(data));

      if (fromEdit === true) {
        navigation.goBack();
      } else {
        let body = {
          id: uid,
          date: userProfile,
        };
        updateUser(body).then(res => {
          console.log(res);
          setVisible(true);
        });
      }
    }
  };
  return (
    <View bg={'primary.20'} flex={1}>
      <FStatusBar />
      <Header right />
      {/* <ScrollView flex={1}> */}
      {isLoading ? (
        <ActivityIndicator size={'small'} color={'black'} />
      ) : (
        <View mx={5} flex={1}>
          <Text
            textAlign={'center'}
            fontSize={20}
            fontFamily={'Lexend-SemiBold'}
            mt={8}>
            What are your eating habits?
          </Text>
          <View mt={8}>
            {isData?.data?.map(item => {
              console.log('item', item);
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
                    {item?.hobby}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
      {/* </ScrollView> */}
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
              <Footer
                load={'100'}
                num={12}
                onPress={() => handleNavigation()}
              />
            </View>
          )}
        </>
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
