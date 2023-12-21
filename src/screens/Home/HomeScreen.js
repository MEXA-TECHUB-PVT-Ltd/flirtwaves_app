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
  FlatList,
} from 'native-base';
import {
  Platform,
  PermissionsAndroid,
  AppState,
  Animated,
  RefreshControl,
} from 'react-native';

import React, {useState} from 'react';
import HomeComp from './components/HomeComp';
import {ImageBackground, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

// import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import MapView, {Marker} from 'react-native-maps';

import Entypo from 'react-native-vector-icons/Entypo';

import Geocoder from 'react-native-geocoding';
import {MapKey} from '../../constants/MapKey';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import FInputs from '../../components/inputs/inputs';
import FButton from '../../components/button/FButton';
import Lottie from 'lottie-react-native';
import RnRangeSlider from 'rn-range-slider';
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  useAddCrushMutation,
  useAddToFavMutation,
  useBrowseByPrefrenceMutation,
  useGetAllDashboardProfileQuery,
  useGetUserByIdQuery,
  useRemoveFavMutation,
  useUpdateOnlineStatusMutation,
  useUpdateUserProfileMutation,
} from '../../redux/apis/auth';
import RangeSlider from './components/RangeSlider';

const HomeScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [postCrush, {data: crushData, isLoading: crusLoading}] =
    useAddCrushMutation();

  const [updateUser, {isError}] = useUpdateUserProfileMutation();
  const [updateStaus, {isError: onlineError}] = useUpdateOnlineStatusMutation();
  const [LocationCords, setLocationCords] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  React.useEffect(() => {
    // Check and request location permission
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        handleWatchPosition();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          // await PermissionsAndroid.request(
          //   PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
          // );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            handleWatchPosition();
          } else {
            console.log('Location permission denied');
          }
        } catch (error) {
          console.log('Error requesting location permission:', error);
        }
      }
    };

    requestLocationPermission();
  }, []);
  //   console.log('aa', updatedLocation);
  const [address, setAddress] = React.useState();

  const handleWatchPosition = async () => {
    // console.log('loc');
    Geocoder.init(MapKey);
    await Geolocation.getCurrentPosition(
      position => {
        // console.log('aa', position);
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setLocationCords({
          latitude: lat,
          longitude: long,
        });

        Geocoder.from(lat, long).then(json => {
          var addressComponent = json.results[0].formatted_address;
          setAddress(addressComponent);
          // ref?.current?.setAddressText(addressComponent);
          console.log('address', addressComponent);
          console.log(uid);
          let body = {
            id: uid,
            data: {
              location: addressComponent,
              latitude: lat,
              longitude: long,
            },
          };
          console.log(body);
          updateUser(body).then(res => {
            console.log('res', res);
          });
          // _________________________________fix current location issue while adding listing_________________
          let geometry = json?.results[0]?.geometry;
        });
        // Update the user's location using the latitude and longitude values
        // You can send this data to a server, update a map, or perform any other necessary actions
        // console.log('New location:', latitude, longitude);
        // dispatch(setLiveLocation({latitude: latitude, longitude: longitude}))
      },
      error => {
        // Handle error cases
        if (error.code === error.PERMISSION_DENIED) {
          console.log('Location permission denied.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          console.log('Location information is unavailable.');
        } else if (error.code === error.TIMEOUT) {
          console.log('Location request timed out.');
        } else {
          console.log('An unknown error occurred.');
        }
      },
      {
        enableHighAccuracy: true, // Use GPS for more accurate results (if available)
        timeout: 2000, // Set a timeout of 5 seconds
        maximumAge: 0, // Force the device to get the current location instead of using a cached result
        distanceFilter: 10, // Update the location only if the user has moved at least 10 meters
      },
    );
  };

  const userProfile = useSelector(state => state.auth?.userProfile);
  const uid = useSelector(state => state.auth?.userData?.id);
  const location = useSelector(state => state.userData?.location);

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const {
    data: isData,
    isError: error,
    isLoading: loading,
    refetch,
  } = useGetAllDashboardProfileQuery({uid: uid, page: page});
  const [
    filterUser,
    {data: filteredUsers, isError: filterError, isLoading: filterLoading},
  ] = useBrowseByPrefrenceMutation();

  const [like, setLiked] = React.useState(false);

  const [selected, setSelected] = React.useState();
  const bottomSheetRef = React.useRef(null);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] =
    React.useState(false);
  const [clo, setClo] = React.useState(-1);
  const [id, setId] = React.useState(0);
  const openBottomSheet = uid => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  };
  const [on, setOn] = React.useState(false);

  const [isLoading, setLoading] = React.useState(loading);
  React.useEffect(() => {
    if (isLoading === true) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  });
  const [low, setLow] = React.useState(25);
  const [high, setHigh] = React.useState(40);

  const renderThumb = React.useCallback(
    () => (
      <Image
        source={require('../../assets/thumb.png')}
        h={5}
        w={5}
        resizeMode={'contain'}
        alt={'thumb'}
      />
    ),
    [],
  );
  const renderRail = React.useCallback(
    () => <View bg={'primary.20'} h={1} w={'100%'} rounded={'full'}></View>,
    [],
  );
  const renderRailSelected = React.useCallback(
    () => <View bg={'primary.400'} h={1} w={'100%'} rounded={'full'}></View>,
    [],
  );
  const renderLabel = React.useCallback(value => <Text>{value}</Text>, []);
  // const renderNotch = React.useCallback(() => <, []);
  const handleValueChange = React.useCallback((low, high) => {
    console.log('red', low, high);
    setLow(low);
    setHigh(high);
  }, []);
  const [h, setH] = React.useState('50%');
  const [pre, setPre] = React.useState();
  const [dashData, setDashData] = React.useState([]);
  const [postFav, {isData: FavData, isError: Error}] = useAddToFavMutation();
  const [removeFav, {isData: RFavData, isError: RError}] =
    useRemoveFavMutation();
  React.useEffect(() => {
    if (isData?.data) {
      if (isData?.data[0]?.id === dashData[0]?.id) {
        return;
      } else {
        if (isData?.count === 0) {
          return;
        }
        setDashData(prev => [...prev, ...isData?.data]);
      }
    }
  }, [isData]);
  const [favId, setFavId] = React.useState();

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
      });
    }
  }, [like, favId]);

  const {
    data: userData,
    isError: userError,
    isLoading: Userloading,
  } = useGetUserByIdQuery(uid);
  // console.log('name', userData?.data?.id);
  const img = require('../../assets/avatars.png');
  const innerTap = Gesture.Tap().onStart(() => {
    console.log('inner tap');
  });

  const outerTap = Gesture.Tap()
    .onStart(() => {
      console.log('outer tap');
    })
    .simultaneousWithExternalGesture(innerTap);
  const [distance, setDistance] = React.useState();
  const [city, setCity] = React.useState();
  const handlerFilter = () => {
    const gender = id === 1 ? 'male' : 'female';
    let body = {
      id: uid,
      page: page,
      data: {
        gender: id ? gender : null,
        distance: distance,
        location: city,
        // relation_type_id: pre,
        online_status: on,
        minAge: minValue,
        maxAge: maxValue,
      },
    };
    filterUser(body).then(res => {
      console.log(res?.data);
      setDashData(res?.data?.users);
    });
  };

  const MIN_DEFAULT = 0;
  const MAX_DEFAULT = 100;
  const [minValue, setMinValue] = useState(20);
  const [maxValue, setMaxValue] = useState(25);

  const handleCrush = crushId => {
    let body = {
      uid: uid,
      data: {
        crushIds: [crushId],
      },
    };
    postCrush(body).then(res => {
      console.log(res);
      if (res?.data?.error === false) {
        navigation.navigate('Chatting', {
          uid: crushId,
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
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    setPage(1);
    // setDashData([]);
    refetch();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <Pressable
          onPress={() => setIsBottomSheetExpanded(false)}
          // bg={'white'}
          flex={1}
          // alignItems={'center'}
        >
          <View mt={10} mx={4}>
            <Row
              alignItems={'center'}
              w={'80%'}
              justifyContent={'space-between'}>
              <Row alignItems={'center'}>
                <View
                  bg={'primary.400'}
                  alignItems={'center'}
                  p={2}
                  borderRadius={10}
                  justifyContent={'center'}>
                  <Image
                    alt="img"
                    source={require('../../assets/loc.png')}
                    h={5}
                    w={5}
                    resizeMode={'contain'}
                  />
                </View>
                <View ml={4}>
                  <Text
                    fontSize={12}
                    fontFamily={'Lexend-Light'}
                    color={'grey.400'}>
                    Your location
                  </Text>
                  <Text
                    textAlign={'left'}
                    fontSize={14}
                    w={210}
                    fontFamily={'Lexend-Regular'}
                    numberOfLines={1}>
                    {userData?.data?.location}
                  </Text>
                </View>
              </Row>
              <Pressable
                p={2}
                ml={3}
                onPress={() => {
                  setIsBottomSheetExpanded(true);
                  setClo(0);
                }}>
                <Image
                  source={require('../../assets/filter.png')}
                  h={6}
                  w={6}
                  resizeMode="contain"
                  alt={'filter'}
                />
              </Pressable>
            </Row>
            {isLoading ? (
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
              <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}></RefreshControl>
                }>
                <FlatList
                  mt={2}
                  mb={2}
                  showsVerticalScrollIndicator={false}
                  data={dashData}
                  refreshControl={
                    <RefreshControl
                      refreshing={isLoading}
                      onRefresh={onRefresh}></RefreshControl>
                  }
                  onEndReached={() => {
                    setPage(page + 1);
                  }}
                  keyExtractor={item => item?.id}
                  renderItem={({item, index}) => {
                    return (
                      <>
                        {item?.block_status === false ||
                        item?.report_status === false ? (
                          <ImageBackground
                            source={item?.images ? {uri: item?.images[0]} : img}
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
                                setIsBottomSheetExpanded(false);
                                navigation.navigate('Filter', {
                                  otherId: item?.id,
                                });
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
                                    {item?.distance?.toFixed(2)} km away
                                  </Text>
                                </View>
                                <Pressable
                                  onPress={() => {
                                    setSelected(index);
                                    setLiked(!like);
                                    setFavId(item?.id);

                                    // console.log('like', like);
                                    // handleFav(item?.id);
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
                                <Row
                                  alignItems={'center'}
                                  justifyContent={'space-between'}>
                                  <Row alignItems={'center'}>
                                    <Text
                                      fontSize={18}
                                      color={'white'}
                                      fontFamily={'Lexend-Regular'}>
                                      {item?.name}, {calculateAge(item?.dob)}
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
                                <Pressable
                                  onPress={() => {
                                    handleCrush(item?.id);
                                  }}
                                  bg={'primary.400'}
                                  p={2}
                                  rounded={'full'}
                                  position={'absolute'}
                                  bottom={1}
                                  right={0}>
                                  <Image
                                    source={require('../../assets/mes.png')}
                                    h={5}
                                    w={5}
                                    alt="png"
                                  />
                                </Pressable>
                                <Box mt={2}>
                                  <Row
                                    alignItems={'center'}
                                    bg={
                                      item?.online_status === false
                                        ? 'transparent'
                                        : '#039D0040'
                                    }
                                    w={
                                      item?.online_status === false
                                        ? '22%'
                                        : '28%'
                                    }
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
                                      {item?.online_status === false
                                        ? 'offline'
                                        : 'Active now'}
                                    </Text>
                                  </Row>
                                </Box>
                              </View>
                            </Pressable>
                            <View style={[styles.overlay, {height: 400}]} />
                          </ImageBackground>
                        ) : null}
                      </>
                    );
                  }}
                />
              </ScrollView>
            )}
          </View>
          {isBottomSheetExpanded === true ? (
            <BottomSheet
              ref={bottomSheetRef}
              enableDismissOnClose={true}
              enableContentPanningGesture={false}
              index={0} // Set to -1 to start with collapsed state
              snapPoints={['60%', '98%']} // Adjust snap points as needed
              height={210}
              openDuration={250}
              closeOnDragDown={false}
              draggableIcon={true}
              closeOnPressMask={true}
              customStyles={{
                container: {
                  borderTopLeftRadius: 100,
                  borderTopRightRadius: 100,
                  paddingTop: 0,
                  padding: 20,
                  // zIndex: 999,
                  backgroundColor: 'white',
                },
                draggableIcon: {
                  backgroundColor: 'white',
                },
              }}>
              {/* <BottomSheetView style={{flex: 1}}> */}
              <Pressable>
                <ScrollView
                  m={5}
                  horizontal={false}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}>
                  <Text fontSize={16} fontFamily={'Lexend-Medium'}>
                    Apply Filter
                  </Text>
                  <Text
                    fontSize={14}
                    mt={5}
                    fontFamily={'Lexend-Regular'}
                    color={'primary.400'}>
                    Add Range
                  </Text>
                  <Text
                    fontSize={12}
                    mb={4}
                    fontFamily={'Lexend-Light'}
                    color={'grey.400'}
                    mt={3}>
                    {minValue} - {maxValue} years old
                  </Text>
                  <View alignSelf={'center'}>
                    <RangeSlider
                      sliderWidth={280}
                      min={MIN_DEFAULT}
                      max={MAX_DEFAULT}
                      step={10}
                      onValueChange={range => {
                        setMinValue(range.min);
                        setMaxValue(range.max);
                      }}
                    />
                  </View>

                  <View mt={5}>
                    <Text
                      color={'primary.400'}
                      fontSize={16}
                      fontFamily={'Lexend-SemiBold'}>
                      Select Gender
                    </Text>
                    <Row
                      alignItems={'center'}
                      justifyContent={'space-around'}
                      mt={5}>
                      <Pressable onPress={() => setId(1)}>
                        <Box
                          h={32}
                          w={32}
                          bg={'white'}
                          borderColor={id === 1 ? 'primary.400' : 'grey.400'}
                          borderWidth={id === 1 ? 1 : 1}
                          justifyContent={'center'}
                          borderRadius={10}>
                          <Center
                            alignItems={'center'}
                            justifyContent={'center'}>
                            <View
                              bg={id === 1 ? 'primary.400' : 'grey.400'}
                              rounded={'full'}
                              p={4}>
                              <Image
                                source={require('../../assets/male.png')}
                                h={6}
                                w={6}
                                resizeMode="contain"
                                alt={'male'}
                              />
                            </View>
                            <Text
                              color={id === 1 ? 'black' : 'grey.400'}
                              fontSize={12}
                              mt={3}
                              fontFamily={
                                id === 1 ? 'Lexend-Medium' : 'Lexend-Light'
                              }>
                              Male
                            </Text>
                          </Center>
                        </Box>
                      </Pressable>
                      <Pressable onPress={() => setId(2)}>
                        <Box
                          h={32}
                          borderRadius={10}
                          w={32}
                          borderColor={id === 2 ? 'primary.400' : 'grey.400'}
                          borderWidth={id === 2 ? 1 : 1}
                          bg={'white'}
                          alignItems={'center'}
                          justifyContent={'center'}>
                          <Center
                            alignItems={'center'}
                            justifyContent={'center'}>
                            <View
                              bg={id === 2 ? 'primary.400' : 'grey.400'}
                              rounded={'full'}
                              p={4}>
                              <Image
                                source={require('../../assets/female.png')}
                                h={6}
                                w={6}
                                alt={'female'}
                                resizeMode="contain"
                              />
                            </View>
                          </Center>
                          <Text
                            color={id === 2 ? 'black' : 'grey.400'}
                            fontSize={12}
                            mt={3}
                            fontFamily={
                              id === 2 ? 'Lexend-Medium' : 'Lexend-Light'
                            }>
                            Female
                          </Text>
                        </Box>
                      </Pressable>
                    </Row>
                  </View>
                  <Text
                    color={'primary.400'}
                    fontSize={16}
                    mt={5}
                    fontFamily={'Lexend-Medium'}>
                    Prefrence
                  </Text>
                  <Row alignItems={'center'} mt={5}>
                    <Pressable
                      onPress={() => setPre(4)}
                      borderColor={pre === 4 ? 'primary.400' : 'grey.400'}
                      borderWidth={1}
                      borderRadius={12}
                      p={1}
                      alignItems={'center'}
                      justifyContent={'center'}>
                      <Text
                        fontSize={12}
                        fontFamily={
                          pre === 4 ? 'Lexend-SemiBold' : 'Lexend-Regular'
                        }
                        mx={2}>
                        A Relationship
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setPre(5)}
                      borderColor={pre === 5 ? 'primary.400' : 'grey.400'}
                      ml={5}
                      borderWidth={1}
                      borderRadius={12}
                      p={1}
                      alignItems={'center'}
                      justifyContent={'center'}>
                      <Text
                        fontSize={12}
                        fontFamily={
                          pre === 5 ? 'Lexend-SemiBold' : 'Lexend-Regular'
                        }
                        mx={2}>
                        Nothing Serious
                      </Text>
                    </Pressable>
                  </Row>
                  <Pressable
                    onPress={() => setPre(6)}
                    borderColor={pre === 6 ? 'primary.400' : 'grey.400'}
                    mt={5}
                    borderWidth={1}
                    borderRadius={12}
                    p={1}
                    alignSelf={'flex-start'}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <Text
                      fontSize={12}
                      fontFamily={
                        pre === 6 ? 'Lexend-SemiBold' : 'Lexend-Regular'
                      }
                      mx={2}>
                      I'll know when i find it
                    </Text>
                  </Pressable>
                  <Row
                    my={5}
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <Text
                      fontSize={16}
                      color={'primary.400'}
                      fontFamily={'Lexend-Medium'}>
                      Online
                    </Text>
                    <Switch
                      onThumbColor={'primary.400'}
                      onTrackColor={'primary.20'}
                      onToggle={() => {
                        setOn(!on);
                      }}
                      isChecked={on}
                    />
                  </Row>
                  <View mb={5}>
                    <Text
                      fontSize={14}
                      color={'primary.400'}
                      fontFamily={'Lexend-SemiBold'}
                      mb={2}>
                      Distance
                    </Text>
                    <FInputs
                      placeholder={'Enter Distance'}
                      value={distance}
                      onChangeText={setDistance}
                    />
                  </View>
                  <Text
                    fontSize={14}
                    color={'primary.400'}
                    fontFamily={'Lexend-SemiBold'}
                    mb={2}>
                    City
                  </Text>
                  <FInputs
                    placeholder={'Enter City'}
                    value={city}
                    onChangeText={setCity}
                  />
                  <View mt={5}>
                    <FButton
                      label={'Apply'}
                      variant={'Solid'}
                      onPress={() => {
                        setIsBottomSheetExpanded(false);
                        handlerFilter();

                        setLoading(true);
                      }}
                    />
                  </View>
                </ScrollView>
              </Pressable>
              {/* </BottomSheetView> */}
            </BottomSheet>
          ) : null}
        </Pressable>
      </View>
    </GestureHandlerRootView>
  );
};
export default HomeScreen;
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
