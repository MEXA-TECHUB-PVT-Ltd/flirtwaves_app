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

const Filtered = ({navigation}) => {
  const data = [
    {
      id: 1,
      img: require('../../assets/h1.png'),
      name: 'Rosie',
      age: 20,
      status: 'Active Now',
      distance: '1.3 km',
      isVerified: true,
    },
    {
      id: 2,
      img: require('../../assets/h2.png'),
      name: 'Olivia',
      age: 22,
      status: 'offline',
      distance: '1.3 km',
      isVerified: false,
    },
    {
      id: 3,
      img: require('../../assets/h3.png'),
      name: 'Sophia',
      age: 26,
      status: 'offline',
      distance: '1.3 km',
      isVerified: false,
    },
    {
      id: 4,
      img: require('../../assets/h4.png'),
      name: 'Emily',
      age: 30,
      status: 'offline',
      distance: '1.3 km',
      isVerified: false,
    },
  ];
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
  console.log(isBottomSheetExpanded);
  const [isLoading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (isLoading === true) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  });
  const [gallery, setGallery] = React.useState(false);
  const RenderImage = () => {
    return (
      <View h={'100%'} w={'70%'}>
        <Image
          source={require('../../assets/h1.png')}
          mt={5}
          flex={0.2}
          resizeMode={'cover'}
          alt={'img'}
        />
      </View>
    );
  };
  const RenderImagetwo = () => {
    return (
      <View h={'100%'} w={'70%'}>
        <Image
          source={require('../../assets/h1.png')}
          mt={5}
          flex={0.2}
          resizeMode={'cover'}
          alt={'img'}
        />
      </View>
    );
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View bg={'white'} flex={1}>
        <ImageBackground
          source={require('../../assets/h1.png')}
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
              setLiked(!like);
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
                <Text fontSize={16} fontFamily={'Lexend-Medium'}>
                  Rosie, 20
                </Text>
                <Image
                  ml={3}
                  source={require('../../assets/verified.png')}
                  h={6}
                  alt={'img'}
                  w={6}
                  resizeMode="contain"
                />
              </Row>
              <View bg={'primary.400'} borderRadius={10} p={2}>
                <Image
                  source={require('../../assets/mes.png')}
                  alt={'conversation'}
                  h={5}
                  w={5}
                  resizeMode="contain"
                />
              </View>
            </Row>
            <Text
              fontSize={12}
              mt={5}
              fontFamily={'Lexend-Light'}
              color={'grey.400'}>
              Female - 154 cm
            </Text>
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
                fontFamily={'Lexend-Light'}
                color={'grey.400'}>
                Chigaco, USA
              </Text>
            </Row>
            <View my={5}>
              <Row>
                <View
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
                      Looking for Relationship
                    </Text>
                  </Row>
                </View>
                <View
                  bg={'white'}
                  ml={2}
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
                      Occasional Exercise
                    </Text>
                  </Row>
                </View>
              </Row>
              <Row mt={4}>
                <View
                  bg={'white'}
                  borderColor={'grey.400'}
                  borderWidth={1}
                  p={1}
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
                      I am a excellent chef
                    </Text>
                  </Row>
                </View>
                <View
                  bg={'white'}
                  ml={2}
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
                      Hiking & backpack
                    </Text>
                  </Row>
                </View>
              </Row>
              <Row mt={4}>
                <View
                  bg={'white'}
                  borderColor={'grey.400'}
                  borderWidth={1}
                  p={1}
                  borderRadius={10}>
                  <Row alignItems={'center'}>
                    <Image
                      source={require('../../assets/moon.png')}
                      h={5}
                      w={5}
                      resizeMode={'contain'}
                      alt={'profile'}
                    />
                    <Text ml={2} fontSize={10} fontFamily={'Lexend-Medium'}>
                      I'm in bed by midnight
                    </Text>
                  </Row>
                </View>
                <View
                  bg={'white'}
                  ml={2}
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
                      Zero Tolerance
                    </Text>
                  </Row>
                </View>
              </Row>
              <Row mt={4}>
                <View
                  bg={'white'}
                  borderColor={'grey.400'}
                  borderWidth={1}
                  p={1}
                  borderRadius={10}>
                  <Row alignItems={'center'}>
                    <Image
                      source={require('../../assets/kid.png')}
                      h={5}
                      w={5}
                      resizeMode={'contain'}
                      alt={'profile'}
                    />
                    <Text ml={2} fontSize={10} fontFamily={'Lexend-Medium'}>
                      Thanks but no thanks
                    </Text>
                  </Row>
                </View>
                <View
                  bg={'white'}
                  ml={2}
                  borderColor={'grey.400'}
                  borderWidth={1}
                  p={1}
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
                      A little bit of everything
                    </Text>
                  </Row>
                </View>
              </Row>
            </View>
            <Text fontSize={16} fontFamily={'Lexend-Medium'}>
              Gallery
            </Text>
            <Row justifyContent={'space-between'} mt={5}>
              <Pressable onPress={() => navigation.navigate('Gallery')}>
                <Image
                  source={require('../../assets/h1.png')}
                  h={24}
                  borderRadius={10}
                  w={24}
                  alt={'gallery'}
                />
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Gallery')}>
                <Image
                  source={require('../../assets/h2.png')}
                  h={24}
                  borderRadius={10}
                  w={24}
                  alt={'gallery'}
                />
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Gallery')}>
                <Image
                  source={require('../../assets/h3.png')}
                  h={24}
                  borderRadius={10}
                  w={24}
                  alt={'gallery'}
                />
              </Pressable>
            </Row>
            <Row justifyContent={'space-between'} mt={3}>
              <Pressable onPress={() => navigation.navigate('Gallery')}>
                <Image
                  source={require('../../assets/h4.png')}
                  h={24}
                  borderRadius={10}
                  w={24}
                  alt={'gallery'}
                />
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Gallery')}>
                <Image
                  source={require('../../assets/h5.png')}
                  h={24}
                  borderRadius={10}
                  w={24}
                  alt={'gallery'}
                />
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Gallery')}>
                <Image
                  source={require('../../assets/h6.png')}
                  h={24}
                  borderRadius={10}
                  w={24}
                  alt={'gallery'}
                />
              </Pressable>
            </Row>
            <View mt={10}>
              <FButton label={'Report & Block Usser'} variant={'Solid'} />
            </View>
          </ScrollView>
        </BottomSheet>
        {gallery ? (
          <BottomSheet
            ref={bottomSheetRef}
            enableDismissOnClose={true}
            index={1} // Set to -1 to start with collapsed state
            snapPoints={['100%', '100%']} // Adjust snap points as needed
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
            closeOnDragDown={false}
            draggableIcon={true}
            closeOnPressMask={false}
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
            <Pressable
              onPress={() => setGallery(false)}
              position={'absolute'}
              right={2}
              zIndex={999}
              top={0}>
              <View rounded={'full'}>
                <Entypo name={'cross'} color={'black'} size={30} />
              </View>
            </Pressable>
            <Swiper
              // ref={swiper}
              showsPagination={true}
              showsButtons={false}
              activeDotStyle={{width: 20}}
              paginationStyle={{
                bottom: 0,

                marginBottom: 20,
                // paddingBottom: 20,
              }}
              activeDotColor={'#6C309C'}
              loop={false}>
              <RenderImage />
              <RenderImagetwo />
              {/* <Image
                source={require('../../assets/h3.png')}
                mt={5}
                flex={0.8}
                resizeMode={'cover'}
                alt={'img'}
              />
              <Image
                source={require('../../assets/h4.png')}
                mt={5}
                flex={0.8}
                resizeMode={'cover'}
                alt={'img'}
              />
              <Image
                source={require('../../assets/h5.png')}
                mt={5}
                flex={0.8}
                resizeMode={'cover'}
                alt={'img'}
              />
              <Image
                source={require('../../assets/h6.png')}
                mt={5}
                flex={0.8}
                resizeMode={'cover'}
                alt={'img'}
              /> */}
            </Swiper>
          </BottomSheet>
        ) : null}
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
