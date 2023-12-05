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
import {
  useGetAllGendersQuery,
  useUpdateUserProfileMutation,
} from '../../redux/apis/auth';
import {setUserProfile} from '../../redux/slices/auth';

const LookingFor = ({navigation}) => {
  const [id, setId] = React.useState();
  const dispatch = useDispatch();
  const uid = useSelector(state => state.auth?.userData?.id);
  const userProfile = useSelector(state => state.auth?.userProfile);
  const [page, setPage] = React.useState(1);
  const {
    data: isData,
    isError,
    isLoading: loading,
  } = useGetAllGendersQuery(page);
  console.log(isData, isError);

  const [updateProfile, {isLoading}] = useUpdateUserProfileMutation();
  const data = [
    {
      id: 1,
      name: 'Men',
    },
    {
      id: 2,
      name: 'Women',
    },
    {id: 3, name: 'Everyone'},
  ];
  const handleCreate = async () => {
    if (id?.id) {
      const newObj = {...userProfile, interested_in: id?.id};
      console.log(newObj);
      await dispatch(setUserProfile(newObj));
      navigation.navigate('AddPhoto');
    }
  };
  return (
    <View bg={'primary.20'} flex={1}>
      <FStatusBar />
      <Header />
      {loading ? (
        <ActivityIndicator size={'small'} color={'black'} />
      ) : (
        <ScrollView flex={1}>
          <View mx={5} flex={1}>
            <Text
              textAlign={'center'}
              fontSize={20}
              fontFamily={'Lexend-SemiBold'}
              mt={10}>
              Whom are you looking for?
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
                      {item?.gender}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}
      {!loading && (
        <View mb={16} mx={5}>
          <Footer
            loading={isLoading}
            load={'15'}
            num={2}
            onPress={() => handleCreate()}
          />
        </View>
      )}
    </View>
  );
};
export default LookingFor;
