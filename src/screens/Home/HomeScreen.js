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
import Lottie from 'lottie-react-native';

const HomeScreen = ({navigation}) => {
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
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View
        bg={'white'}
        flex={1}
        alignItems={'center'}
        justifyContent={'center'}>
        <View mt={10}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
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
                <Text fontSize={14} fontFamily={'Lexend-Regular'}>
                  123 Elm Street Sunnydale, US
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
            <Center flex={1} alignItems={'center'} justifyContent={'center'}>
              <Lottie
                source={require('../../assets/spinner.json')}
                autoPlay
                loop
                style={{
                  // marginBottom: 5,
                  height: 80,
                  width: 80,
                  // backgroundColor: 'black',
                }}></Lottie>
            </Center>
          ) : (
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
                          onPress={() => navigation.navigate('Filter')}
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
          )}
        </View>
        {isBottomSheetExpanded === true ? (
          <BottomSheet
            ref={bottomSheetRef}
            enableDismissOnClose={true}
            index={clo} // Set to -1 to start with collapsed state
            snapPoints={['50%', '98%']} // Adjust snap points as needed
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
                fontFamily={'Lexend-Light'}
                color={'grey.400'}
                mt={3}>
                20 - 25 years old
              </Text>
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
                      <Center alignItems={'center'} justifyContent={'center'}>
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
                      <Center alignItems={'center'} justifyContent={'center'}>
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
                <View
                  borderColor={'grey.400'}
                  borderWidth={1}
                  borderRadius={12}
                  p={1}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Text fontSize={12} fontFamily={'Lexend-Regular'} mx={2}>
                    A Relationship
                  </Text>
                </View>
                <View
                  borderColor={'grey.400'}
                  ml={5}
                  borderWidth={1}
                  borderRadius={12}
                  p={1}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Text fontSize={12} fontFamily={'Lexend-Regular'} mx={2}>
                    Nothing Serious
                  </Text>
                </View>
              </Row>
              <View
                borderColor={'grey.400'}
                mt={5}
                borderWidth={1}
                borderRadius={12}
                p={1}
                alignSelf={'flex-start'}
                alignItems={'center'}
                justifyContent={'center'}>
                <Text fontSize={12} fontFamily={'Lexend-Regular'} mx={2}>
                  I'll know when i find it
                </Text>
              </View>
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
                <FInputs placeholder={'Distance'} />
              </View>
              <FInputs placeholder={'City'} />
              <View mt={5}>
                <FButton
                  label={'Apply'}
                  variant={'Solid'}
                  onPress={() => {
                    setIsBottomSheetExpanded(false);
                    setLoading(true);
                  }}
                />
              </View>
            </ScrollView>
          </BottomSheet>
        ) : null}
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
