import {
  View,
  Text,
  Row,
  Image,
  ScrollView,
  VStack,
  Pressable,
  Box,
  Center,
  Switch,
} from 'native-base';
import Lottie from 'lottie-react-native';
import React from 'react';
import HomeComp from './components/HomeComp';
import {ImageBackground, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FInputs from '../../components/inputs/inputs';
import FButton from '../../components/button/FButton';
import Header from '../../components/Header/Header';
import Swiper from 'react-native-swiper';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  useAddCrushMutation,
  useAddToFavMutation,
  useGetFavStatusMutation,
  useGetUserByIdQuery,
  useRemoveFavMutation,
} from '../../redux/apis/auth';
import {useSelector} from 'react-redux';
import AlertModal from '../../components/Modal/AlertModal';

const Filtered = ({navigation, route}) => {
  const otherUid = route?.params?.otherId;
  const [active, setActive] = React.useState(false);
  const uid = useSelector(state => state.auth?.userData?.id);
  console.log(otherUid, uid);
  const [postFav, {isData: FavData, isError: Error}] = useAddToFavMutation();
  const [removeFav, {isData: RFavData, isError: RError}] =
    useRemoveFavMutation();
  const [getFavStatus, {data: favStatus, isLoading: favLoading}] =
    useGetFavStatusMutation();
  const [like, setLiked] = React.useState(false);
  React.useEffect(() => {
    let body = {
      user_id: uid,
      favorite_user_id: otherUid,
    };
    getFavStatus(body).then(res => {
      console.log('res', res);
      setLiked(res?.data?.savedStatus);
    });
  }, [otherUid, uid]);

  const [selected, setSelected] = React.useState();
  const bottomSheetRef = React.useRef(null);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] =
    React.useState(false);

  const [isLoading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (isLoading === true) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  });
  const {
    data: userData,
    isError: userError,
    isLoading: Userloading,
  } = useGetUserByIdQuery(otherUid);
  // console.log(userData?.data);
  const [favId, setFavId] = React.useState();
  const [favName, setFavName] = React.useState();

  React.useEffect(() => {
    console.log('object', like, favId);
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
        if (Res?.data?.error === false) {
          setActive(false);
          navigation.goBack();
        }
      });
    }
  }, [like, favId]);
  const [postCrush, {data: crushData, isLoading: crusLoading}] =
    useAddCrushMutation();
  const handleCrush = crushId => {
    let body = {
      uid: uid,
      data: {
        crushIds: [userData?.data?.id],
      },
    };
    postCrush(body).then(res => {
      console.log(res);
      if (res?.data?.error === false) {
        navigation.navigate('Chatting', {
          uid: userData?.data?.id,
        });
      }
    });
  };
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
    <GestureHandlerRootView style={{flex: 1}}>
      <View bg={'white'} flex={1}>
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
            <ImageBackground
              source={
                userData?.data?.images
                  ? {uri: userData?.data?.images[0]}
                  : require('../../assets/avatars.png')
              }
              style={{height: '65%', width: '100%'}}>
              <Row
                flex={1}
                position={'absolute'}
                top={0}
                left={0}
                justifyContent={'space-between'}>
                <Header />
              </Row>
              <Pressable
                position={'absolute'}
                w={10}
                right={5}
                top={5}
                rounded={'full'}
                onPress={() => {
                  if (like === true) {
                    setActive(true);
                  } else {
                    setLiked(!like);
                    setFavId(userData?.data?.id);
                    setFavName(userData?.data?.name);
                  }
                }}>
                <View
                  bg={'white'}
                  borderRadius={20}
                  p={2}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <AntDesign
                    name={like === true ? 'heart' : 'hearto'}
                    size={20}
                    color={'#F5BF03'}
                  />
                </View>
              </Pressable>
              {/* <ImageBackground
            source={require('../../assets/Rectangle.png')}
            style={{
              height: 20,
              width: 100,
            }}>
            <Image
              source={require('../../assets/km.png')}
              h={3}
              resizeMode={'contain'}
              alt={'img'}
            />
          </ImageBackground> */}
            </ImageBackground>
            <View mx={5} mt={10}>
              {/* {isLoading ? null : (
            <ScrollView showsVerticalScrollIndicator={false} mt={2}>
              <View mt={8} mb={16}>
                {data?.map((item, index) => {
                  return (
                    <>
                      <ImageBackground
                        source={item?.img}
                        key={index}
                        style={{height: 400, marginBottom: 20}}
                        imageStyle={{
                          borderRadius: 10,
                          resizeMode: 'cover',
                        }}>
                        <Pressable
                          flex={1}
                          flexDir={'column'}
                          onPress={() => console.log('ok')}
                          justifyContent={'space-between'}
                          p={2}>
                          <Row
                            alignItems={'center'}
                            justifyContent={'space-between'}>
                            <View
                              bg={index === 3 ? '#FFFFFF2B' : '#1919192B'}
                              borderRadius={10}
                              p={1}>
                              <Text
                                mx={1}
                                fontSize={12}
                                fontFamily={'Lexend-Light'}
                                color={index === 3 ? 'white' : 'black'}>
                                {item?.distance} away
                              </Text>
                            </View>
                            <Pressable
                              onPress={() => {
                                setSelected(index);
                                setLiked(!like);
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
                                  {item?.name}, {item?.age}
                                </Text>
                                {item?.isVerified === true ? (
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
                                  item?.status === 'offline'
                                    ? 'transparent'
                                    : '#039D0040'
                                }
                                w={item?.status === 'offline' ? '22%' : '28%'}
                                borderColor={'#6E6E6E'}
                                borderWidth={
                                  item?.status === 'offline' ? 1 : null
                                }
                                p={2}
                                borderRadius={10}>
                                <View
                                  bg={
                                    item?.status === 'offline'
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
                                  {item?.status}
                                </Text>
                              </Row>
                            </Box>
                          </View>
                        </Pressable>
                        <View style={[styles.overlay, {height: 400}]} />
                      </ImageBackground>
                    </>
                  );
                })}
              </View>
            </ScrollView>
          )} */}
            </View>
            <AlertModal
              modalVisible={active}
              cancelPress={() => {
                // props.close && props.close('open');
              }}
              fromSettings
              heading={'Remove'}
              message={`Do you want to remove ${favName} from favorites?`}
              btntxt1={'Cancel'}
              btntxt2={'Yes,Remove'}
              comon={true}
              onPress={() => {
                setFavId(userData?.data?.id);
                setLiked(!like);
              }}></AlertModal>
            <BottomSheet
              ref={bottomSheetRef}
              enableDismissOnClose={true}
              index={0} // Set to -1 to start with collapsed state
              snapPoints={['60%', '98%']} // Adjust snap points as needed
              onScroll={event => {
                console.log('Event', event);
                const offsetY = event.nativeEvent.contentOffset.y;

                if (isBottomSheetExpanded && offsetY === 0) {
                  setIsBottomSheetExpanded(false);
                } else if (!isBottomSheetExpanded && offsetY > 0) {
                  setIsBottomSheetExpanded(true);
                }
              }}
              //snapPoints={snapPoints}
              //onChange={handleSheetChange}
              height={210}
              openDuration={250}
              closeOnDragDown={true}
              draggableIcon={false}
              closeOnPressMask={true}
              customStyles={{
                container: {
                  borderTopLeftRadius: 100,
                  borderTopRightRadius: 100,
                  paddingTop: 0,
                  padding: 20,
                  zIndex: 999,
                  backgroundColor: 'white',
                },
                draggableIcon: {
                  backgroundColor: 'white',
                },
              }}>
              <ScrollView m={5} showsVerticalScrollIndicator={false}>
                <Row alignItems={'center'} justifyContent={'space-between'}>
                  <Row>
                    <View>
                      <Text fontSize={16} fontFamily={'Lexend-Medium'}>
                        {userData?.data?.name}{' '}
                        {calculateAge(userData?.data?.dob)}
                      </Text>
                      <Text
                        fontSize={12}
                        mt={0}
                        fontFamily={'Lexend-Light'}
                        color={'grey.400'}>
                        {userData?.data?.gender} - {userData?.data?.height} ft
                      </Text>
                    </View>
                    {userData?.data?.verified_status && (
                      <Image
                        ml={1}
                        source={require('../../assets/verified.png')}
                        h={6}
                        alt={'img'}
                        w={6}
                        resizeMode="contain"
                      />
                    )}
                  </Row>
                  <Pressable
                    p={2}
                    onPress={() => {
                      handleCrush();
                    }}>
                    <View bg={'primary.400'} borderRadius={10} p={3}>
                      <Image
                        source={require('../../assets/mes.png')}
                        alt={'conversation'}
                        h={5}
                        w={5}
                        resizeMode="contain"
                      />
                    </View>
                  </Pressable>
                </Row>

                <Row alignItems={'center'} mt={2}>
                  <Image
                    alt="img"
                    source={require('../../assets/loc2.png')}
                    h={5}
                    w={5}
                    resizeMode={'contain'}
                  />
                  <Text
                    fontSize={12}
                    numberOfLines={1}
                    w={'70%'}
                    fontFamily={'Lexend-Light'}
                    color={'grey.400'}>
                    {userData?.data?.location}
                  </Text>
                </Row>
                <View
                  my={5}
                  flexDir={'row'}
                  flexWrap={'wrap'}
                  alignItems={'center'}
                  w={'100%'}
                  justifyContent={'space-between'}>
                  {userData?.data?.relation_type_data && (
                    <View
                      m={1}
                      bg={'white'}
                      borderColor={'grey.400'}
                      borderWidth={1}
                      p={1}
                      borderRadius={10}>
                      <Row alignItems={'center'}>
                        <Image
                          source={require('../../assets/love.png')}
                          h={5}
                          w={5}
                          resizeMode={'contain'}
                          alt={'profile'}
                        />
                        <Text ml={2} fontSize={10} fontFamily={'Lexend-Medium'}>
                          {userData?.data?.relation_type_data}
                        </Text>
                      </Row>
                    </View>
                  )}

                  {userData?.data?.excercise_data && (
                    <View
                      bg={'white'}
                      ml={1}
                      m={2}
                      borderColor={'grey.400'}
                      borderWidth={1}
                      p={1}
                      borderRadius={10}>
                      <Row alignItems={'center'}>
                        <Image
                          source={require('../../assets/fitness.png')}
                          h={5}
                          w={5}
                          resizeMode={'contain'}
                          alt={'profile'}
                        />
                        <Text ml={2} fontSize={10} fontFamily={'Lexend-Medium'}>
                          {userData?.data?.excercise_data}
                        </Text>
                      </Row>
                    </View>
                  )}

                  {userData?.data?.cooking_skill_data && (
                    <View
                      bg={'white'}
                      borderColor={'grey.400'}
                      borderWidth={1}
                      p={1}
                      m={1}
                      borderRadius={10}>
                      <Row alignItems={'center'}>
                        <Image
                          source={require('../../assets/chef.png')}
                          h={5}
                          w={5}
                          resizeMode={'contain'}
                          alt={'profile'}
                        />
                        <Text ml={2} fontSize={10} fontFamily={'Lexend-Medium'}>
                          {userData?.data?.cooking_skill_data}
                        </Text>
                      </Row>
                    </View>
                  )}
                  {userData?.data?.habit_data && (
                    <View
                      bg={'white'}
                      ml={1}
                      borderColor={'grey.400'}
                      borderWidth={1}
                      p={1}
                      borderRadius={10}>
                      <Row alignItems={'center'}>
                        <Image
                          source={require('../../assets/hiking.png')}
                          h={5}
                          w={5}
                          resizeMode={'contain'}
                          alt={'profile'}
                        />
                        <Text ml={2} fontSize={10} fontFamily={'Lexend-Medium'}>
                          {userData?.data?.habit_data}
                        </Text>
                      </Row>
                    </View>
                  )}

                  {userData?.data?.night_life_data && (
                    <View
                      bg={'white'}
                      borderColor={'grey.400'}
                      borderWidth={1}
                      p={1}
                      m={1}
                      borderRadius={10}>
                      <Row alignItems={'center'}>
                        <Image
                          source={require('../../assets/moon.png')}
                          h={5}
                          w={5}
                          resizeMode={'contain'}
                          alt={'profile'}
                        />
                        <Text
                          ml={2}
                          fontSize={10}
                          numberOfLines={1}
                          fontFamily={'Lexend-Medium'}>
                          {userData?.data?.night_life_data}
                        </Text>
                      </Row>
                    </View>
                  )}
                  {userData?.data?.smoking_opinion_data && (
                    <View
                      bg={'white'}
                      ml={1}
                      borderColor={'grey.400'}
                      borderWidth={1}
                      p={1}
                      borderRadius={10}>
                      <Row alignItems={'center'}>
                        <Image
                          source={require('../../assets/smoking.png')}
                          h={5}
                          w={5}
                          resizeMode={'contain'}
                          alt={'profile'}
                        />
                        <Text ml={2} fontSize={10} fontFamily={'Lexend-Medium'}>
                          {userData?.data?.smoking_opinion_data}
                        </Text>
                      </Row>
                    </View>
                  )}

                  {userData?.data?.kids_opinion_data && (
                    <View
                      bg={'white'}
                      borderColor={'grey.400'}
                      borderWidth={1}
                      p={1}
                      m={1}
                      borderRadius={10}>
                      <Row alignItems={'center'}>
                        <Image
                          source={require('../../assets/kid.png')}
                          h={5}
                          w={5}
                          resizeMode={'contain'}
                          alt={'profile'}
                        />
                        <Text
                          ml={2}
                          fontSize={10}
                          numberOfLines={1}
                          fontFamily={'Lexend-Medium'}>
                          {userData?.data?.kids_opinion_data}
                        </Text>
                      </Row>
                    </View>
                  )}
                  {userData?.data?.hobby_data && (
                    <View
                      bg={'white'}
                      ml={1}
                      borderColor={'grey.400'}
                      borderWidth={1}
                      p={1}
                      m={2}
                      borderRadius={10}>
                      <Row alignItems={'center'}>
                        <Image
                          source={require('../../assets/healthy.png')}
                          h={5}
                          w={5}
                          resizeMode={'contain'}
                          alt={'profile'}
                        />
                        <Text ml={2} fontSize={10} fontFamily={'Lexend-Medium'}>
                          {userData?.data?.hobby_data}
                        </Text>
                      </Row>
                    </View>
                  )}
                </View>
                <Text fontSize={16} fontFamily={'Lexend-Medium'}>
                  Gallery
                </Text>
                <View
                  mt={3}
                  flexDir={'row'}
                  flexWrap={'wrap'}
                  justifyContent={'space-between'}>
                  {userData?.data?.images?.map((item, index) => {
                    return (
                      <Pressable
                        my={2}
                        onPress={() =>
                          navigation.navigate('Gallery', {otherUid: otherUid})
                        }
                        key={index}>
                        <Image
                          source={{uri: item}}
                          h={24}
                          borderRadius={10}
                          w={24}
                          alt={'gallery'}
                        />
                      </Pressable>
                    );
                  })}
                </View>

                <View mt={5}>
                  <FButton
                    label={'Report & Block Usser'}
                    variant={'Solid'}
                    onPress={() =>
                      navigation.navigate('ReportUser', {otherId: otherUid})
                    }
                  />
                </View>
              </ScrollView>
            </BottomSheet>
          </>
        )}
      </View>
    </GestureHandlerRootView>
  );
};
export default Filtered;
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
