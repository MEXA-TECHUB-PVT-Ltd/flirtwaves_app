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

import {ImageBackground, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FInputs from '../../components/inputs/inputs';
import FButton from '../../components/button/FButton';
import Header from '../../components/Header/Header';
import Swiper from 'react-native-swiper';
import Entypo from 'react-native-vector-icons/Entypo';
import AlertModal from '../../components/Modal/AlertModal';

const FavoriteUser = ({navigation}) => {
  const [like, setLiked] = React.useState(true);
  const [active, setActive] = React.useState(false);
  const bottomSheetRef = React.useRef(null);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] =
    React.useState(false);

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
              setActive(true);
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
        <AlertModal
          modalVisible={active}
          cancelPress={() => {
            // props.close && props.close('open');
            setActive(false);
          }}
          fromSettings
          heading={'Remove'}
          message={'Do you want to remove Zahra from favorites?'}
          btntxt1={'Cancel'}
          btntxt2={'Yes,Remove'}
          comon={true}
          onPress={() => {
            navigation.goBack();
          }}></AlertModal>
        <View mx={5} mt={10}></View>

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
                    Rosie, 20
                  </Text>
                  <Text
                    fontSize={12}
                    mt={0}
                    fontFamily={'Lexend-Light'}
                    color={'grey.400'}>
                    Female - 154 cm
                  </Text>
                </View>
                <Image
                  ml={1}
                  source={require('../../assets/verified.png')}
                  h={6}
                  alt={'img'}
                  w={6}
                  resizeMode="contain"
                />
              </Row>
              <Pressable p={2} onPress={() => navigation.navigate('Chatting')}>
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
            <View mt={5}>
              <FButton
                label={'Report & Block Usser'}
                variant={'Solid'}
                onPress={() => navigation.navigate('ReportUser')}
              />
            </View>
          </ScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};
export default FavoriteUser;
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
