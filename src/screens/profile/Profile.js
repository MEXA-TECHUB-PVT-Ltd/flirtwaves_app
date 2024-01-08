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
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  useDeleteUserMutation,
  useGetUserByIdQuery,
} from '../../redux/apis/auth';

const Profile = ({navigation}) => {
  const [like, setLiked] = React.useState(true);
  const [active, setActive] = React.useState(false);
  const [active2, setActive2] = React.useState(false);
  const uid = useSelector(state => state.auth?.userData?.id);
  console.log(uid);
  const [deleteUser, {data: isData, isError, isLoading: loading}] =
    useDeleteUserMutation();
  const bottomSheetRef = React.useRef(null);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] =
    React.useState(false);

  const [isLoading, setLoading] = React.useState(false);
  const [imgUrl, setImgUrl] = React.useState('');
  React.useEffect(() => {
    if (isLoading === true) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  });
  const handleCamera = async () => {
    // console.warn('camera')
    const data = await ImagePicker.openCamera({
      width: 500,
      height: 500,
      // cropping: true,
    }).then(imageDetail => {
      console.log(imageDetail);
      console.log(imageDetail.path.split('/').pop());
      const source = imageDetail.path;

      setImgUrl(source);
    });
  };
  useFocusEffect(
    React.useCallback(() => {
      setImgUrl('');
    }, []),
  );
  React.useEffect(() => {
    if (imgUrl !== null && imgUrl !== undefined && imgUrl !== '') {
      navigation.navigate('ProfileProcess');
    }
  }, [imgUrl]);
  const handleDelete = async () => {
    deleteUser(uid).then(res => {
      console.log(res);
      if (res?.data?.error === false) {
        navigation.navigate('OnBoarding');
        setActive(false);
      }
    });
  };
  const userData = useSelector(state => state?.auth?.userData);

  const {data: profileData, isError: profileError} = useGetUserByIdQuery(uid);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View bg={'white'} flex={1}>
        <ImageBackground
          source={{uri: userData?.images?.length>0?userData?.images[0]:''}}
          style={{height: '65%', width: '100%'}}>
          <Pressable
            position={'absolute'}
            w={10}
            right={0}
            top={5}
            rounded={'full'}
            onPress={() => {
              navigation.navigate('Settings');
            }}>
            <View p={2}>
              <Feather name="settings" size={20} color={'white'} />
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
          heading={'Delete Account'}
          message={
            'Do you want to delete your account? After deleting your account, you can request to recover data within 90 days'
          }
          btntxt1={'Cancel'}
          btntxt2={'Yes,Delete'}
          comon={true}
          onPress={() => {
            handleDelete();
          }}></AlertModal>
        <AlertModal
          modalVisible={active2}
          verifi={true}
          onPress={() => {
            setActive2(false);
            handleCamera();
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
          <ScrollView mx={5} mt={5} showsVerticalScrollIndicator={false}>
            <Row alignItems={'center'} justifyContent={'space-between'}>
              <Row>
                <View>
                  <Text fontSize={16} fontFamily={'Lexend-Medium'}>
                    {userData?.name}
                  </Text>
                  <Text
                    fontSize={12}
                    fontFamily={'Lexend-Light'}
                    color={'grey.400'}>
                    {userData?.gender} - {userData?.height} ft
                  </Text>
                </View>
                {userData?.verified_status === true && (
                  <Image
                    ml={3}
                    source={require('../../assets/verified.png')}
                    h={6}
                    alt={'img'}
                    w={6}
                    resizeMode="contain"
                  />
                )}
              </Row>
              <Pressable
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}
                position={'absolute'}
                p={1}
                right={2}
                bg={'primary.400'}
                rounded={'md'}
                flexDir={'row'}
                h={7}
                w={16}
                alignItems={'center'}
                justifyContent={'center'}
                top={2}>
                <Image
                  source={require('../../assets/edit.png')}
                  h={3}
                  w={3}
                  alt={'img'}
                  resizeMode={'contain'}
                />
                <Text
                  ml={1}
                  color={'black'}
                  fontSize={14}
                  fontFamily={'Lexend-Regular'}>
                  Edit
                </Text>
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
                {userData?.location}
              </Text>
            </Row>
            <View my={5} flexWrap={'wrap'} alignItems={'center'} justifyContent={'space-between'}>
              <Row>
                {profileData?.data?.relation_type_data && (
                  <View
                    bg={'white'}
                    borderColor={'grey.400'}
                    borderWidth={1}
                    w={'auto'}
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
                      <Text
                        ml={2}
                        numberOfLines={1}
                        fontSize={10}
                        fontFamily={'Lexend-Medium'}>
                        {profileData?.data?.relation_type_data}
                      </Text>
                    </Row>
                  </View>
                )}
                {profileData?.data?.exercise_data && (
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
                        {profileData?.data?.exercise_data}
                      </Text>
                    </Row>
                  </View>
                )}
              </Row>
              <Row mt={4}>
                {profileData?.data?.cooking_skill_data && (
                  <View
                    bg={'white'}
                    borderColor={'grey.400'}
                    w={'auto'}
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
                      <Text
                        ml={2}
                        fontSize={10}
                        fontFamily={'Lexend-Medium'}
                        numberOfLines={1}>
                        {profileData?.data?.cooking_skill_data}
                      </Text>
                    </Row>
                  </View>
                )}

                {profileData?.data?.habit_data && (
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
                        {profileData?.data?.habit_data}
                      </Text>
                    </Row>
                  </View>
                )}
              </Row>
              <Row mt={4}>
                {profileData?.data?.night_life_data && (
                  <View
                    bg={'white'}
                    w={'auto'}
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
                      <Text
                        ml={2}
                        fontSize={10}
                        fontFamily={'Lexend-Medium'}
                        numberOfLines={1}>
                        {profileData?.data?.night_life_data}
                      </Text>
                    </Row>
                  </View>
                )}

                {profileData?.data?.smoking_opinion_data && (
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
                        {profileData?.data?.smoking_opinion_data}
                      </Text>
                    </Row>
                  </View>
                )}
              </Row>

              <Row mt={4}>
                {profileData?.data?.kids_opinion_data && (
                  <View
                    bg={'white'}
                    borderColor={'grey.400'}
                    borderWidth={1}
                    p={1}
                    w={'auto'}
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
                        {profileData?.data?.kids_opinion_data}
                      </Text>
                    </Row>
                  </View>
                )}

                {profileData?.data?.hobby_data && (
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
                        {profileData?.data?.hobby_data}
                      </Text>
                    </Row>
                  </View>
                )}
              </Row>
            </View>
            <Text fontSize={16} fontFamily={'Lexend-Medium'}>
              Gallery
            </Text>
            <View
              // mt={5}
              flexDir={'row'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}>
              {userData?.images?.map((item, index) => {
                return (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('Gallery', {otherUid: uid})
                    }
                    key={index}
                    m={2}>
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
              <Row alignItems={'center'} justifyContent={'space-between'}>
                <View w={'45%'}>
                  <FButton
                    label={'Delete Account'}
                    variant={'outline'}
                    onPress={() => setActive(true)}
                  />
                </View>
                <View w={'45%'}>
                  <FButton
                    label={'Verify Account'}
                    variant={'Solid'}
                    onPress={() => setActive2(true)}
                  />
                </View>
              </Row>
            </View>
          </ScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};
export default Profile;
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
