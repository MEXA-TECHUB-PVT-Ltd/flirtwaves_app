import {
  View,
  Text,
  Pressable,
  Row,
  Image,
  Box,
  ScrollView,
  Center,
  FlatList,
} from 'native-base';
import Lottie from 'lottie-react-native';
import React from 'react';
import Header from '../../components/Header/Header';
import {ImageBackground, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  useAddToFavMutation,
  useGetAllUsersQuery,
  useGetLikesQuery,
  useGetNewUsersQuery,
  useGetOnlineUsersQuery,
  useGetUserofCookingMutation,
  useGetVerifiedProfilesQuery,
  useRemoveFavMutation,
} from '../../redux/apis/auth';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const Cooking = ({navigation, route}) => {
  const fromVerif = route?.params?.fromVerif;
  const prefrenceId = route?.params?.prefrenceId;
  const uid = useSelector(state => state?.auth?.userData?.id);
  console.log('uid', uid);
  const [page, setPage] = React.useState(1);

  const [
    getPrefrences,
    {data: VerifData, isError: VerifError, isLoading: VerifLoading},
  ] = useGetUserofCookingMutation();

  useFocusEffect(
    React.useCallback(() => {
      let body = {
        page: page,
        data: {
          user_id: uid,
          cooking_skill_id: prefrenceId,
        },
      };

      getPrefrences(body);
    }, [prefrenceId]),
  );

  const [dashData, setDashData] = React.useState([]);
  React.useEffect(() => {
    if (fromVerif === true) {
      if (VerifData?.users) {
        if (VerifData?.users[0]?.id === dashData[0]?.id) {
          return;
        } else {
          if (VerifData?.users?.length === 0) {
            return;
          }
          setDashData(prev => [...prev, ...VerifData?.users]);
        }
      }
    }
  }, [VerifData]);

  const [like, setLiked] = React.useState(false);
  const [selected, setSelected] = React.useState();
  const [favId, setFavId] = React.useState();
  const [removeFav, {isData: RFavData, isError: RError}] =
    useRemoveFavMutation();
  const [postFav, {isData: FavData, isError: Error}] = useAddToFavMutation();
  React.useEffect(() => {
    // console.log('object', like, favId);
    if (like === true && favId) {
      let body = {
        uid: uid,
        data: {
          favorite_user_id: favId,
        },
      };

      postFav(body).then(Res => {
        console.log(Res);
      });
    } else if (like === false && favId) {
      let body = {
        id: uid,
        fav: favId,
      };

      removeFav(body).then(Res => {
        console.log('Res', Res);
      });
    }
  }, [like, favId]);
  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
  return (
    <View bg={'white'} flex={1}>
      <Header />
      {VerifLoading ? (
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
        <View mx={5} my={5}>
          <FlatList
            mt={2}
            mb={2}
            showsVerticalScrollIndicator={false}
            data={dashData}
            onEndReached={() => {
              setPage(page + 1);
            }}
            keyExtractor={item => item?.id}
            renderItem={({item, index}) => {
              return (
                <>
                  <ImageBackground
                    source={
                      item?.images
                        ? {uri: item?.images[0]}
                        : require('../../assets/h4.png')
                    }
                    key={index}
                    style={{height: 350, marginBottom: 20}}
                    imageStyle={{
                      borderRadius: 10,
                      resizeMode: 'cover',
                    }}>
                    <Pressable
                      flex={1}
                      flexDir={'column'}
                      onPress={() => {
                        navigation.navigate('Filter', {otherId: item?.id});
                      }}
                      justifyContent={'space-between'}
                      p={2}>
                      <Row
                        alignItems={'center'}
                        justifyContent={'space-between'}>
                        <View bg={'#353535'} borderRadius={10} p={1}>
                          <Text
                            mx={1}
                            fontSize={12}
                            fontFamily={'Lexend-Light'}
                            color={'white'}>
                            {item?.distance?.toFixed(2)} away
                          </Text>
                        </View>
                        <Pressable
                          onPress={() => {
                            setSelected(index);
                            setLiked(!like);
                            setFavId(item?.id);
                          }}>
                          <View
                            bg={'white'}
                            borderRadius={20}
                            p={2}
                            alignItems={'center'}
                            justifyContent={'center'}>
                            <AntDesign
                              name={
                                like === true && index === selected
                                  ? 'heart'
                                  : 'hearto'
                              }
                              size={20}
                              color={'#F5BF03'}
                            />
                          </View>
                        </Pressable>
                      </Row>
                      <View>
                        <Row>
                          <Row alignItems={'center'}>
                            <Text
                              fontSize={18}
                              color={'white'}
                              fontFamily={'Lexend-Regular'}>
                              {item?.name} {calculateAge(item?.dob)}
                            </Text>
                            {item?.verified_status === true ? (
                              <Image
                                ml={3}
                                source={require('../../assets/verified.png')}
                                h={6}
                                alt={'img'}
                                w={6}
                                resizeMode="contain"
                              />
                            ) : null}
                          </Row>
                        </Row>
                        <Box mt={2}>
                          <Row
                            alignItems={'center'}
                            bg={
                              item?.online_status === false
                                ? 'transparent'
                                : '#039D0040'
                            }
                            w={item?.online_status === false ? '22%' : '28%'}
                            borderColor={'#6E6E6E'}
                            borderWidth={
                              item?.online_status === false ? 1 : null
                            }
                            p={2}
                            borderRadius={10}>
                            <View
                              bg={
                                item?.online_status === false
                                  ? '#6E6E6E'
                                  : '#039D00'
                              }
                              h={2}
                              w={2}
                              rounded={'full'}></View>
                            <Text
                              fontSize={10}
                              fontFamily={'Lexend-Light'}
                              ml={2}
                              color={'white'}>
                              {item?.online_status === true
                                ? 'Active now'
                                : 'offline'}
                            </Text>
                          </Row>
                        </Box>
                      </View>
                    </Pressable>
                    <View style={[styles.overlay, {height: 400}]} />
                  </ImageBackground>
                </>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};
export default Cooking;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.7,
    backgroundColor: 'black',
  },
});
