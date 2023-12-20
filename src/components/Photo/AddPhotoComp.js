import {
  View,
  Text,
  Pressable,
  Row,
  Divider,
  Image,
  Stack,
  Box,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import BottomSheet from '../bottomSheet/BottomSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AlertModal from '../Modal/AlertModal';
import FButton from '../button/FButton';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import Footer from '../footer/footer';
import {useDispatch, useSelector} from 'react-redux';
import {setUserProfile} from '../../redux/slices/auth';
import {
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
} from '../../redux/apis/auth';
import LoaderModal from '../Loader/Loader';

const AddPhotoComp = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [updateProfile, {isLoading}] = useUpdateUserProfileMutation();
  const uid = useSelector(state => state.auth?.userData?.id);
  const userProfile = useSelector(state => state.auth?.userProfile);
  const {
    data: userData,
    isError: userError,
    isLoading: Userloading,
  } = useGetUserByIdQuery(uid);
  console.log(userData);

  const bottomSheetRef = React.useRef(null);
  const [active, setActive] = React.useState(false);
  const [id, setId] = React.useState();
  const [change, setChange] = React.useState();
  const [imgurl1, setImgurl1] = React.useState();
  const [imgurl2, setImgurl2] = React.useState();
  const [imgurl3, setImgurl3] = React.useState();
  const [imgurl4, setImgurl4] = React.useState();
  const [imgurl5, setImgurl5] = React.useState();
  const [imgurl6, setImgurl6] = React.useState();
  const [imgurl7, setImgurl7] = React.useState();
  const [imgurl8, setImgurl8] = React.useState();
  const [camera, setCamera] = React.useState();
  const [imageUrl, setImageUrl] = React.useState();
  const [imgArray, setImgarray] = React.useState([]);
  const [edit, setEdit] = React.useState(false);
  const openBottomSheet = uid => {
    setId(uid);
    setChange(uid);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  };
  React.useEffect(() => {
    if (props?.fromEdit === true) {
      if (userData?.data?.images?.length > 0) {
        setImageUrl(userData?.data?.images[0]);
        setImgurl1(userData?.data?.images[1]);
        setImgurl2(userData?.data?.images[2]);
        setImgurl3(userData?.data?.images[3]);
        setImgurl4(userData?.data?.images[4]);
        setImgurl5(userData?.data?.images[5]);
        setImgurl6(userData?.data?.images[6]);
        setImgurl7(userData?.data?.images[7]);
        setImgurl8(userData?.data?.images[8]);

        setImgarray(userData?.data?.images);
      }
    }
  }, [userData?.data]);
  const handlePickImage = async () => {
    // console.warn('gallery')
    const data = await ImagePicker.openPicker({
      width: 500,
      height: 500,
    }).then(imageDetail => {
      const source = imageDetail.path;
      console.log(imageDetail);
      console.log(imageDetail.path.split('/').pop());
      switch (id) {
        case 1:
          if (edit === true) {
            const edited = [...imgArray];
            edited[0] = source;
            setImgarray(edited);
            setImageUrl(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImageUrl(source);
          }

          break;

        case 2:
          if (edit === true) {
            const edited = [...imgArray];
            edited[1] = source;
            setImgarray(edited);
            setImgurl1(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl1(source);
          }

          break;

        case 3:
          if (edit === true) {
            const edited = [...imgArray];
            edited[2] = source;
            setImgarray(edited);
            setImgurl2(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl2(source);
          }

          break;

        case 4:
          if (edit === true) {
            const edited = [...imgArray];
            edited[3] = source;
            setImgarray(edited);
            setImgurl3(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl3(source);
          }

          break;

        case 5:
          if (edit === true) {
            const edited = [...imgArray];
            edited[4] = source;
            setImgarray(edited);
            setImgurl4(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl4(source);
          }
          break;

        case 6:
          if (edit === true) {
            const edited = [...imgArray];
            edited[5] = source;
            setImgarray(edited);
            setImgurl5(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl5(source);
          }

          break;

        case 7:
          if (edit === true) {
            const edited = [...imgArray];
            edited[6] = source;
            setImgarray(edited);
            setImgurl6(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl6(source);
          }

          break;

        case 8:
          if (edit === true) {
            const edited = [...imgArray];
            edited[7] = source;
            setImgarray(edited);
            setImgurl7(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl7(source);
            setId();
          }
          break;

        case 9:
          if (edit === true) {
            const edited = [...imgArray];
            edited[8] = source;
            setImgarray(edited);
            setImgurl8(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl8(source);
            setId();
          }
          break;

        // code block
      }
      bottomSheetRef.current.close();
    });
  };
  const handleCamera = async () => {
    // console.warn('camera')
    const data = await ImagePicker.openCamera({
      width: 500,
      height: 500,
      // cropping: true,
    }).then(imageDetail => {
      console.log(imageDetail);
      // console.log(imageDetail.path.split('/').pop());
      const source = imageDetail.path;

      console.log('id', imageDetail);
      switch (id) {
        case 1:
          if (edit === true) {
            const edited = [...imgArray];
            edited[0] = source;
            console.log('edited', edited);
            setImgarray(edited);
            setImageUrl(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImageUrl(source);
          }

          break;

        case 2:
          if (edit === true) {
            const edited = [...imgArray];
            edited[1] = source;
            setImgarray(edited);
            setImgurl1(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl1(source);
          }

          break;

        case 3:
          if (edit === true) {
            const edited = [...imgArray];
            edited[2] = source;
            setImgarray(edited);
            setImgurl2(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl2(source);
          }

          break;

        case 4:
          if (edit === true) {
            const edited = [...imgArray];
            edited[3] = source;
            setImgarray(edited);
            setImgurl3(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl3(source);
          }

          break;

        case 5:
          if (edit === true) {
            const edited = [...imgArray];
            edited[4] = source;
            setImgarray(edited);
            setImgurl4(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl4(source);
          }
          break;

        case 6:
          if (edit === true) {
            const edited = [...imgArray];
            edited[5] = source;
            setImgarray(edited);
            setImgurl5(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl5(source);
          }

          break;

        case 7:
          if (edit === true) {
            const edited = [...imgArray];
            edited[6] = source;
            setImgarray(edited);
            setImgurl6(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl6(source);
          }

          break;

        case 8:
          if (edit === true) {
            const edited = [...imgArray];
            edited[7] = source;
            setImgarray(edited);
            setImgurl7(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl7(source);
            setId();
          }
          break;

        case 9:
          if (edit === true) {
            const edited = [...imgArray];
            edited[8] = source;
            setImgarray(edited);
            setImgurl8(source);
            setEdit(false);
          } else {
            setImgarray([...imgArray, source]);
            setImgurl8(source);
            setId();
          }
          break;

        // code block
      }
    });
  };

  React.useEffect(() => {
    if (
      props?.slide === true &&
      !imageUrl &&
      !imgurl1 &&
      !imgurl2 &&
      !imgurl3 &&
      !imgurl4 &&
      !imgurl5 &&
      !imgurl6 &&
      !imgurl7 &&
      !imgurl8
    ) {
      setActive(true);
    }
    if (
      props?.slide === true &&
      imageUrl &&
      imgurl1 &&
      imgurl2 &&
      imgurl3 &&
      imgurl4 &&
      imgurl5 &&
      imgurl6 &&
      imgurl7 &&
      imgurl8
    ) {
      console.log('1');
    }
  }, [props?.slide]);

  const handleNavigation = async () => {
    const uploadPromises = imgArray.map(async imageInfo => {
      const uri = imageInfo;
      const filename = uri.split('/').pop();
      const imageData = {
        uri: uri,
        type: 'image/jpeg', // Change the type based on the image type you're dealing with
        name: filename,
      };

      console.log(uri);
      const dataImage = new FormData();
      dataImage.append('file', imageData);
      dataImage.append('upload_preset', 'e6zfilan');
      dataImage.append('cloud_name', 'dxfdrtxi3');
      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dxfdrtxi3/image/upload',
          {
            method: 'POST',
            body: dataImage,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (!response.ok) {
          throw new Error('Image upload failed');
        }
        const data = await response.json();
        console.log('Image Url', data.url);
        // Assuming you have a function like uploadXpiVideo, you can call it here
        //uploadXpiVideo(data.url, data);
        return data.url;
      } catch (error) {
        console.log('Error While Uploading Image', error);
        throw error; // Rethrow the error so that the Promise.all catches it
      }
    });
    try {
      const imageUrls = await Promise.all(uploadPromises);

      setImgarray(imageUrls);
      const data = {...userProfile, images: imageUrls};
      let body = {
        id: uid,
        data: data,
      };

      updateProfile(body).then(async res => {
        console.log(res);
        if (res?.data?.error === false) {
          await dispatch(setUserProfile(data));
          if (props?.fromEdit === true) {
            navigation.goBack();
          } else {
            navigation.navigate('OnBoarding3');
          }
        }
      });
      // Do something with the imageUrls array, e.g., store it in state or send it to the server
    } catch (error) {
      console.log('Error uploading images:', error);
    } finally {
      // setLoading(false);
    }
    // };
  };
  return (
    <>
      <View flex={1} alignSelf={'center'}>
        <Row mb={2}>
          <Pressable
            onPress={() => {
              openBottomSheet(1);
            }}>
            <Box
              h={48}
              w={48}
              bg={'white'}
              borderRadius={10}
              alignItems={'center'}
              justifyContent={'center'}>
              {imageUrl ? (
                <>
                  <Stack>
                    <Image
                      source={{
                        uri: imageUrl,
                      }}
                      alt={'img'}
                      h={48}
                      w={48}
                      borderRadius={10}
                      resizeMode={'cover'}
                    />
                    <Pressable
                      onPress={() => {
                        setEdit(true);
                        openBottomSheet(1);
                      }}
                      position={'absolute'}
                      p={1}
                      right={2}
                      bg={'primary.400'}
                      rounded={'md'}
                      flexDir={'row'}
                      h={7}
                      w={20}
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
                  </Stack>
                </>
              ) : (
                <Image
                  source={require('../../assets/pic.png')}
                  h={10}
                  w={10}
                  resizeMode={'contain'}
                  alt={'img'}
                />
              )}
            </Box>
          </Pressable>
          <View ml={3}>
            <Pressable
              onPress={() => {
                openBottomSheet(2);
              }}>
              <Box
                h={24}
                w={24}
                bg={'white'}
                mb={1}
                borderRadius={10}
                alignItems={'center'}
                justifyContent={'center'}>
                {imgurl1 ? (
                  <>
                    <Stack>
                      <Image
                        source={{
                          uri: imgurl1,
                        }}
                        alt={'img'}
                        h={24}
                        w={24}
                        borderRadius={10}
                        resizeMode={'cover'}
                      />
                      <Pressable
                        onPress={() => {
                          setEdit(true);
                          openBottomSheet(2);
                        }}
                        position={'absolute'}
                        p={1}
                        right={2}
                        bg={'primary.400'}
                        rounded={'md'}
                        flexDir={'row'}
                        h={7}
                        w={10}
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
                          fontSize={10}
                          fontFamily={'Lexend-Regular'}>
                          Edit
                        </Text>
                      </Pressable>
                    </Stack>
                  </>
                ) : (
                  <Image
                    source={require('../../assets/pic.png')}
                    h={10}
                    w={10}
                    resizeMode={'contain'}
                    alt={'img'}
                  />
                )}
              </Box>
            </Pressable>
            <Pressable
              onPress={() => {
                openBottomSheet(3);
              }}>
              <Box
                h={24}
                w={24}
                bg={'white'}
                borderRadius={10}
                alignItems={'center'}
                justifyContent={'center'}>
                {imgurl2 ? (
                  <>
                    <Stack>
                      <Image
                        source={{
                          uri: imgurl2,
                        }}
                        alt={'img'}
                        h={24}
                        w={24}
                        borderRadius={10}
                        resizeMode={'cover'}
                      />
                      <Pressable
                        onPress={() => {
                          setEdit(true);
                          openBottomSheet(3);
                        }}
                        position={'absolute'}
                        p={1}
                        right={2}
                        bg={'primary.400'}
                        rounded={'md'}
                        flexDir={'row'}
                        h={7}
                        w={10}
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
                          fontSize={10}
                          fontFamily={'Lexend-Regular'}>
                          Edit
                        </Text>
                      </Pressable>
                    </Stack>
                  </>
                ) : (
                  <Image
                    source={require('../../assets/pic.png')}
                    h={10}
                    w={10}
                    resizeMode={'contain'}
                    alt={'img'}
                  />
                )}
              </Box>
            </Pressable>
          </View>
        </Row>
        <Row>
          <Pressable
            onPress={() => {
              openBottomSheet(4);
            }}>
            <Box
              h={24}
              w={24}
              bg={'white'}
              borderRadius={10}
              mr={1}
              alignItems={'center'}
              justifyContent={'center'}>
              {imgurl3 ? (
                <>
                  <Stack>
                    <Image
                      source={{
                        uri: imgurl3,
                      }}
                      alt={'img'}
                      h={24}
                      w={24}
                      borderRadius={10}
                      resizeMode={'cover'}
                    />
                    <Pressable
                      onPress={() => {
                        setEdit(true);
                        openBottomSheet(4);
                      }}
                      position={'absolute'}
                      p={1}
                      right={2}
                      bg={'primary.400'}
                      rounded={'md'}
                      flexDir={'row'}
                      h={7}
                      w={10}
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
                        fontSize={10}
                        fontFamily={'Lexend-Regular'}>
                        Edit
                      </Text>
                    </Pressable>
                  </Stack>
                </>
              ) : (
                <Image
                  source={require('../../assets/pic.png')}
                  h={10}
                  w={10}
                  resizeMode={'contain'}
                  alt={'img'}
                />
              )}
            </Box>
          </Pressable>
          {/* <View ml={2}> */}
          <Pressable
            onPress={() => {
              openBottomSheet(5);
            }}>
            <Box
              h={24}
              w={24}
              bg={'white'}
              mb={1}
              borderRadius={10}
              alignItems={'center'}
              justifyContent={'center'}>
              {imgurl4 ? (
                <>
                  <Stack>
                    <Image
                      source={{
                        uri: imgurl4,
                      }}
                      alt={'img'}
                      h={24}
                      w={24}
                      borderRadius={10}
                      resizeMode={'cover'}
                    />
                    <Pressable
                      onPress={() => {
                        setEdit(true);
                        openBottomSheet(5);
                      }}
                      position={'absolute'}
                      p={1}
                      right={2}
                      bg={'primary.400'}
                      rounded={'md'}
                      flexDir={'row'}
                      h={7}
                      w={10}
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
                        fontSize={10}
                        fontFamily={'Lexend-Regular'}>
                        Edit
                      </Text>
                    </Pressable>
                  </Stack>
                </>
              ) : (
                <Image
                  source={require('../../assets/pic.png')}
                  h={10}
                  w={10}
                  resizeMode={'contain'}
                  alt={'img'}
                />
              )}
            </Box>
          </Pressable>
          <Pressable
            onPress={() => {
              openBottomSheet(6);
            }}>
            <Box
              h={24}
              w={24}
              bg={'white'}
              borderRadius={10}
              ml={'2.5'}
              alignItems={'center'}
              justifyContent={'center'}>
              {imgurl5 ? (
                <>
                  <Stack>
                    <Image
                      source={{
                        uri: imgurl5,
                      }}
                      alt={'img'}
                      h={24}
                      w={24}
                      borderRadius={10}
                      resizeMode={'cover'}
                    />
                    <Pressable
                      onPress={() => {
                        setEdit(true);
                        openBottomSheet(6);
                      }}
                      position={'absolute'}
                      p={1}
                      right={2}
                      bg={'primary.400'}
                      rounded={'md'}
                      flexDir={'row'}
                      h={7}
                      w={10}
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
                        fontSize={10}
                        fontFamily={'Lexend-Regular'}>
                        Edit
                      </Text>
                    </Pressable>
                  </Stack>
                </>
              ) : (
                <Image
                  source={require('../../assets/pic.png')}
                  h={10}
                  w={10}
                  resizeMode={'contain'}
                  alt={'img'}
                />
              )}
            </Box>
          </Pressable>
          <LoaderModal visible={isLoading} />
          {/* </View> */}
        </Row>
        {props?.fromEdit === true ? (
          <View mb={16} mt={24} mx={5}>
            <FButton
              label={'Save Changes'}
              loading={isLoading}
              variant={'Solid'}
              onPress={() => {
                if (
                  !imageUrl &&
                  !imgurl1 &&
                  !imgurl2 &&
                  !imgurl3 &&
                  !imgurl4 &&
                  !imgurl5 &&
                  !imgurl6 &&
                  !imgurl7 &&
                  !imgurl8
                ) {
                  setActive(true);
                } else {
                  handleNavigation();
                }
              }}
            />
          </View>
        ) : (
          <View mb={12} mx={-3} mt={20}>
            <Footer
              load={'20'}
              num={3}
              onPress={() => {
                if (
                  !imageUrl &&
                  !imgurl1 &&
                  !imgurl2 &&
                  !imgurl3 &&
                  !imgurl4 &&
                  !imgurl5 &&
                  !imgurl6 &&
                  !imgurl7 &&
                  !imgurl8
                ) {
                  setActive(true);
                } else {
                  handleNavigation();
                }
              }}
            />
          </View>
        )}
      </View>
      <BottomSheet
        defaultOff={true}
        height={'20%'}
        width="100%"
        onClose={() => props.close && props.close('open')}
        onOpen={() => props.open && props.open('open')}
        openBottom={bottomSheetRef}>
        {/* <View> */}
        <Pressable onPress={() => bottomSheetRef.current.close()}>
          <View
            position={'absolute'}
            right={2}
            top={5}
            // borderWidth={2}
            rounded={'full'}>
            <Entypo name={'cross'} color={'black'} size={18} />
          </View>
        </Pressable>
        <Pressable
          mt={10}
          onPress={() => {
            handleCamera();
            setCamera(true);
            bottomSheetRef.current.close();
          }}>
          <Row alignItems={'center'}>
            <Feather name={'camera'} size={20} color={'#F5BF03'} />
            <Text
              mx={2}
              fontSize={14}
              color={'black'}
              fontFamily={'Lexend-Light'}>
              Upload from Camera
            </Text>
          </Row>
        </Pressable>
        <Divider my={4} />
        <Pressable
          onPress={() => {
            handlePickImage();
            setCamera(false);
            bottomSheetRef.current.close();
          }}>
          <Row alignItems={'center'}>
            <MaterialCommunityIcons
              name={'image-outline'}
              size={20}
              color={'#F5BF03'}
            />
            <Text
              mx={2}
              fontSize={14}
              color={'black'}
              fontFamily={'Lexend-Light'}>
              Upload from Gallery
            </Text>
          </Row>
        </Pressable>
        {/* </View> */}
      </BottomSheet>
      <AlertModal
        modalVisible={active}
        heading={'Add Photo'}
        message={'Add atleast one image to continue'}
        btntxt2={'Ok'}
        comon={true}
        onPress={() => {
          props.close && props.close('open');
          setActive(false);
        }}></AlertModal>
    </>
  );
};
export default AddPhotoComp;

//    <Pressable
//           onPress={() => {
//             openBottomSheet(1);
//           }}>
//           <View
//             mb={4}
//             borderStyle={'dashed'}
//             borderWidth={imageUrl ? 0 : 2}
//             mr={5}
//             bg={'grey.500'}
//             borderColor={'txtColor'}
//             h={48}
//             borderRadius={20}
//             alignItems={'center'}
//             justifyContent={'center'}
//             w={48}>
//             {imageUrl ? (
//               <>
//                 <Stack>
//                   <Image
//                     source={{
//                       uri: imageUrl,
//                     }}
//                     alt={'img'}
//                     h={24}
//                     w={20}
//                     borderRadius={20}
//                     resizeMode={'contain'}
//                   />
//                   <Pressable
//                     onPress={() => setImageUrl()}
//                     position={'absolute'}
//                     right={-4}
//                     top={-7}>
//                     <View
//                       bg={'pro'}
//                       rounded={'full'}

//                       // borderWidth={2}
//                     >
//                       <Entypo name={'cross'} color={'black'} size={18} />
//                     </View>
//                   </Pressable>
//                 </Stack>
//               </>
//             ) : (
//               <Image source={require('../../assets/pic.png')} h={10} w={10} resizeMode={'contain'} alt={'img'} />
//             )}
//           </View>
//         </Pressable>
//         <View>
//           <Pressable
//             onPress={() => {
//               openBottomSheet(2);
//             }}>
//             <View
//               mb={4}
//               borderStyle={'dashed'}
//               borderWidth={imgurl1 ? 0 : 2}
//               mr={5}
//               bg={'grey.500'}
//               borderColor={'txtColor'}
//               h={'24'}
//               borderRadius={20}
//               alignItems={'center'}
//               justifyContent={'center'}
//               w={20}>
//               {imgurl1 ? (
//                 <>
//                   <Stack>
//                     <Image
//                       source={{
//                         uri: imgurl1,
//                       }}
//                       alt={'img'}
//                       h={24}
//                       w={20}
//                       borderRadius={20}
//                       resizeMode={'contain'}
//                     />
//                     <Pressable
//                       onPress={() => setImgurl1()}
//                       position={'absolute'}
//                       right={-4}
//                       top={-7}>
//                       <View
//                         bg={'pro'}
//                         rounded={'full'}

//                         // borderWidth={2}
//                       >
//                         <Entypo name={'cross'} color={'black'} size={18} />
//                       </View>
//                     </Pressable>
//                   </Stack>
//                 </>
//               ) : (
//                 <Image source={require('../../assets/pic.png')} h={10} w={10} resizeMode={'contain'} alt={'img'} />
//               )}
//             </View>
//           </Pressable>
//           <Pressable
//             onPress={() => {
//               openBottomSheet(3);
//             }}>
//             <View
//               mb={4}
//               borderStyle={'dashed'}
//               borderWidth={imgurl2 ? 0 : 2}
//               mr={5}
//               bg={'grey.500'}
//               borderColor={'txtColor'}
//               h={'24'}
//               borderRadius={20}
//               alignItems={'center'}
//               justifyContent={'center'}
//               w={20}>
//               {imgurl2 ? (
//                 <>
//                   <Stack>
//                     <Image
//                       source={{
//                         uri: imgurl2,
//                       }}
//                       alt={'img'}
//                       h={24}
//                       w={20}
//                       borderRadius={20}
//                       resizeMode={'contain'}
//                     />
//                     <Pressable
//                       onPress={() => setImgurl2()}
//                       position={'absolute'}
//                       right={-4}
//                       top={-7}>
//                       <View
//                         bg={'pro'}
//                         rounded={'full'}

//                         // borderWidth={2}
//                       >
//                         <Entypo name={'cross'} color={'black'} size={18} />
//                       </View>
//                     </Pressable>
//                   </Stack>
//                 </>
//               ) : (
//                 <Image source={require('../../assets/pic.png')} h={10} w={10} resizeMode={'contain'} alt={'img'} />
//               )}
//             </View>
//           </Pressable>
//         </View>
//         <Pressable
//           onPress={() => {
//             openBottomSheet(4);
//           }}>
//           <View
//             mb={4}
//             borderStyle={'dashed'}
//             borderWidth={imgurl3 ? 0 : 2}
//             mr={5}
//             bg={'grey.500'}
//             borderColor={'txtColor'}
//             h={'24'}
//             borderRadius={20}
//             alignItems={'center'}
//             justifyContent={'center'}
//             w={20}>
//             {imgurl3 ? (
//               <>
//                 <Stack>
//                   <Image
//                     source={{
//                       uri: imgurl3,
//                     }}
//                     alt={'img'}
//                     h={24}
//                     w={20}
//                     borderRadius={20}
//                     resizeMode={'contain'}
//                   />
//                   <Pressable
//                     onPress={() => setImgurl3()}
//                     position={'absolute'}
//                     right={-4}
//                     top={-7}>
//                     <View
//                       bg={'pro'}
//                       rounded={'full'}

//                       // borderWidth={2}
//                     >
//                       <Entypo name={'cross'} color={'black'} size={18} />
//                     </View>
//                   </Pressable>
//                 </Stack>
//               </>
//             ) : (
//               <Image source={require('../../assets/pic.png')} h={10} w={10} resizeMode={'contain'} alt={'img'} />
//             )}
//           </View>
//         </Pressable>
//         <Pressable
//           onPress={() => {
//             openBottomSheet(5);
//           }}>
//           <View
//             mb={4}
//             borderStyle={'dashed'}
//             borderWidth={imgurl4 ? 0 : 2}
//             mr={5}
//             bg={'grey.500'}
//             borderColor={'txtColor'}
//             h={'24'}
//             borderRadius={20}
//             alignItems={'center'}
//             justifyContent={'center'}
//             w={20}>
//             {imgurl4 ? (
//               <>
//                 <Stack>
//                   <Image
//                     source={{
//                       uri: imgurl4,
//                     }}
//                     alt={'img'}
//                     h={24}
//                     w={20}
//                     borderRadius={20}
//                     resizeMode={'contain'}
//                   />
//                   <Pressable
//                     onPress={() => setImgurl4()}
//                     position={'absolute'}
//                     right={-4}
//                     top={-7}>
//                     <View
//                       rounded={'full'}
//                       bg={'pro'}

//                       // borderWidth={2}
//                     >
//                       <Entypo name={'cross'} color={'black'} size={18} />
//                     </View>
//                   </Pressable>
//                 </Stack>
//               </>
//             ) : (
//               <Image source={require('../../assets/pic.png')} h={10} w={10} resizeMode={'contain'} alt={'img'} />
//             )}
//           </View>
//         </Pressable>
//         <Pressable
//           onPress={() => {
//             openBottomSheet(6);
//           }}>
//           <View
//             mb={4}
//             borderStyle={'dashed'}
//             borderWidth={imgurl5 ? 0 : 2}
//             mr={5}
//             bg={'grey.500'}
//             borderColor={'txtColor'}
//             h={'24'}
//             borderRadius={20}
//             alignItems={'center'}
//             justifyContent={'center'}
//             w={20}>
//             {imgurl5 ? (
//               <>
//                 <Stack>
//                   <Image
//                     source={{
//                       uri: imgurl5,
//                     }}
//                     alt={'img'}
//                     h={24}
//                     w={20}
//                     borderRadius={20}
//                     resizeMode={'contain'}
//                   />
//                   <Pressable
//                     onPress={() => setImgurl5()}
//                     position={'absolute'}
//                     right={-4}
//                     top={-7}>
//                     <View
//                       bg={'pro'}
//                       rounded={'full'}

//                       // borderWidth={2}
//                     >
//                       <Entypo name={'cross'} color={'black'} size={18} />
//                     </View>
//                   </Pressable>
//                 </Stack>
//               </>
//             ) : (
//               <Image source={require('../../assets/pic.png')} h={10} w={10} resizeMode={'contain'} alt={'img'} />
//             )}
//           </View>
//         </Pressable>
