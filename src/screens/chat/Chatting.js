import {
  View,
  Image,
  Text,
  ScrollView,
  Row,
  Input,
  Icon,
  Pressable,
  Divider,
} from 'native-base';
import {FlatList} from 'react-native';
import React, {useState} from 'react';
import ChatScreen from './components/ChatScreen';
import {useFocusEffect} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AlertModal from '../../components/Modal/AlertModal';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
const Chatting = ({navigation}) => {
  const scrollRef = React.useRef(null);
  const [focus, setFocus] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState();
  const bottomSheetRef = React.useRef(null);
  const bottomSheetRef1 = React.useRef(null);
  const [chat, setChat] = useState([
    {
      id: 1,
      sent: 'Hi Alex, nice to meet you and thanks for add me',
      time: '12:02 Am',
      image: '',
    },
    {
      id: 2,
      recieved: 'Hi Sahara, your welcome nice to meet you too',
      time: '12:04 Am',
      image: '',
    },
    {
      id: 3,
      sent: 'Okay by the way, can you meet me today ?',
      time: '12:04 Am',
      image: '',
    },
  ]);
  const emojiData = [
    '😀',
    '😁',
    '😂',
    '🤣',
    '😃',
    '😄',
    '😅',
    '😆',
    '😉',
    '😊',
    '😋',
    '😎',
    '😍',
    '😘',
    '😗',
    '😙',
    '😚',
    '☺️',
    '🙂',
    '🤗',
    '🤩',
    '🤔',
    '🤨',
    '😐',
    '😑',
    '😒',
    '🙄',
    '😔',
    '😕',
    '🙃',
    '🤑',
    '😲',
    '🙁',
    '😖',
    '😞',
    '😟',
    '😤',
    '😢',
    '😭',
    '😦',
    '😧',
    '😨',
    '😩',
    '😬',
    '😰',
    '😱',
    '😳',
    '🤯',
    '😵',
    '😡',
    '😠',
    '🤢',
    '🤮',
    '🤧',
    '😷',
    '🤒',
    '🤕',
    '🤑',
    '🤠',
    // Add more emojis as needed
  ];

  React.useEffect(() => {
    if (focus === true) {
      flatListRef.current.scrollToEnd();
    }
    console.log('focus', focus);
  }, [focus, focus]);
  const openBottomSheet = id => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  };

  const openBottomSheet1 = id => {
    if (bottomSheetRef1.current) {
      bottomSheetRef1.current.open();
    }
  };
  const handlePickImage = async () => {
    // console.warn('gallery')
    const data = await ImagePicker.openPicker({
      width: 500,
      height: 500,
    }).then(imageDetail => {
      setImageUrl({
        uri: imageDetail.path,
      });
      const imageUri = imageDetail.path;
      addImageMessage(imageUri, getCurrentTime());
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
      console.log(imageDetail.path.split('/').pop());
      setImageUrl({
        uri: imageDetail.path,
      });
      const imageUri = imageDetail.path;
      addImageMessage(imageUri, getCurrentTime());
      bottomSheetRef.current.close();
    });
  };
  const addImageMessage = (imageUri, time) => {
    const newImageMessage = {
      id: chat.length + 1,
      time: getCurrentTime(),
      image: imageUri,
    };
    setChat([...chat, newImageMessage]);
  };
  const handleEmojiSelection = selectedEmoji => {
    // Add the selected emoji to your chat array
    const newChatItem = {
      id: chat.length + 1,
      sent: selectedEmoji,
      time: getCurrentTime(), // You should define this function
      image: '', // If it's a text message
    };

    setChat(prevChat => [...prevChat, newChatItem]);
    bottomSheetRef1.current.close();
  };
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const flatListRef = React.useRef(null);
  const [message, setMessage] = React.useState('');
  useFocusEffect(
    React.useCallback(() => {
      flatListRef.current.scrollToEnd();
    }, [focus, chat, message]),
  );
  React.useEffect(() => {
    flatListRef.current.scrollToEnd();
  }, [focus, chat, message]);

  const sendMessage = () => {
    const newMessage = {
      recieved: message,
      time: getCurrentTime(),
    };
    setChat(previousMessage => [...previousMessage, newMessage]);
    console.log('new', newMessage);
  };

  const renderConversation = ({item}) => {
    return (
      <View
        bg={item?.sent ? 'primary.20' : '#F3F3F3'}
        style={{
          flex: 1,
          borderRadius: 12,
          justifyContent: 'center',
          alignSelf: item?.sent ? 'flex-start' : 'flex-end',
          padding: 8,
          marginBottom: 25,
          padding: 10,
          width: '88%',
        }}>
        {/* <View
          bg={item?.sent ? 'grey.500' : 'pro'}
          borderRadius={10}
          flex={1}
          p={2}
          w={'85%'}
          mb={5}
          alignSelf={item?.sent ? 'flex-start' : 'flex-end'}> */}
        <Pressable onPress={() => setVisible(true)}>
          {item?.image ? ( // Check if there's an image
            <Image
              source={{uri: item.image}}
              alt="Image"
              size="auto" // Set height to "auto" to maintain image proportions
              height={130}
              borderRadius={5}
            />
          ) : item?.sent ? (
            <Text
              fontSize={13}
              fontFamily={'Lexend-Regular'}
              color={item?.sent ? 'black' : 'black'}>
              {item?.sent}
            </Text>
          ) : (
            <Text
              color={item?.sent ? 'white' : 'black'}
              fontFamily={'Lexend-Regular'}>
              {item?.recieved}
            </Text>
          )}

          <Row alignSelf={'flex-end'} alignItems={'center'} mt={2}>
            <Text
              color={item?.sent ? 'txtColor' : 'black'}
              mr={2}
              fontSize={10}>
              {item?.time}
            </Text>
            {item?.recieved ? (
              <Icon
                size="4"
                _light={{
                  color: 'black',
                }}
                _dark={{
                  color: 'coolGray.400',
                }}
                as={MaterialIcons}
                name={'done-all'}
              />
            ) : null}
          </Row>
        </Pressable>
        {/* </View> */}
      </View>
    );
  };

  return (
    <View bg={'white'} flex={1}>
      <View mx={5} mt={5}>
        <ChatScreen />
      </View>
      <Divider opacity={0.2} mt={2} />
      <View mx={5} mt={5} mb={16} flex={1}>
        <FlatList
          data={chat}
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          renderItem={renderConversation}
          keyExtractor={(item, index) => index.toString()}
          onContentSizeChange={() => flatListRef.current.scrollToEnd()}
          onLayout={() => flatListRef.current.scrollToEnd()}
        />
      </View>
      {/* <View mt={5}> */}
      <Row alignItems={'center'} position={'absolute'} bottom={3} mx={5}>
        <Input
          bg={'white'}
          _focus={{bg: 'white', borderColor: 'primary.400'}}
          placeholder={'Type a message'}
          w={'85%'}
          color={'txtColor'}
          value={message}
          onChangeText={setMessage}
          p={2}
          onFocus={() => {
            setFocus(true);
          }}
          onTouchStart={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          borderWidth={1}
          borderRadius={12}
          InputLeftElement={
            <Pressable
              onPress={() => {
                openBottomSheet1();
              }}>
              <Icon
                as={
                  <Image
                    source={require('../../assets/happiness.png')}
                    h={5}
                    w={5}
                    resizeMode="contain"
                    alt={'img'}
                  />
                }
                ml={2}
              />
            </Pressable>
          }
          // InputRightElement={
          //   <Pressable
          //     onPress={() => {
          //       openBottomSheet();
          //     }}>
          //     <Icon
          //       as={
          //         <Image
          //           source={require('../../assets/camera.png')}
          //           h={5}
          //           w={5}
          //           resizeMode="contain"
          //           alt={'img'}
          //         />
          //       }
          //       mr={2}
          //     />
          //   </Pressable>
          // }
        />
        <Pressable
          onPress={() => {
            sendMessage();
          }}>
          <Image
            source={require('../../assets/send.png')}
            h={10}
            w={10}
            alt={'img'}
            ml={2}
          />
        </Pressable>
      </Row>
      <BottomSheet
        defaultOff={true}
        height={'20%'}
        width="100%"
        openBottom={bottomSheetRef}>
        {/* <View> */}

        <View
          position={'absolute'}
          right={2}
          top={5}
          // borderWidth={2}
          rounded={'full'}>
          <Pressable
            onPress={() => {
              bottomSheetRef.current.close();
            }}>
            <Entypo name={'cross'} color={'white'} size={18} />
          </Pressable>
        </View>

        <Pressable
          mt={10}
          onPress={() => {
            handleCamera();
            // bottomSheetRef.current.close();
          }}>
          <Row alignItems={'center'}>
            <Feather name={'camera'} size={20} color={'#F94449'} />
            <Text
              mx={2}
              fontSize={16}
              color={'white'}
              fontFamily={'Jost-Medium'}>
              Upload from Camera
            </Text>
          </Row>
        </Pressable>
        <Divider my={4} />
        <Pressable
          onPress={() => {
            handlePickImage();

            bottomSheetRef.current.close();
          }}>
          <Row alignItems={'center'}>
            <MaterialCommunityIcons
              name={'image-outline'}
              size={20}
              color={'#F94449'}
            />
            <Text
              mx={2}
              fontSize={16}
              color={'white'}
              fontFamily={'Jost-Medium'}>
              Upload from Gallery
            </Text>
          </Row>
        </Pressable>
        {/* </View> */}
      </BottomSheet>

      <BottomSheet
        defaultOff={true}
        height={'50%'}
        width="100%"
        openBottom={bottomSheetRef1}>
        {/* <View> */}

        <View
          position={'absolute'}
          right={2}
          top={5}
          // borderWidth={2}
          rounded={'full'}>
          <Pressable
            onPress={() => {
              bottomSheetRef1.current.close();
            }}>
            <Entypo name={'cross'} color={'white'} size={18} />
          </Pressable>
        </View>

        <Pressable mt={10} onPress={() => {}}>
          <FlatList
            data={emojiData}
            numColumns={7} // Number of columns you want
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Pressable
                style={{
                  margin: 5, // Adjust the margin as needed
                  padding: 10,
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}
                onPress={() => handleEmojiSelection(item)}>
                <Text style={{fontSize: 20}}>{item}</Text>
              </Pressable>
            )}
          />
        </Pressable>
        {/* </View> */}
      </BottomSheet>
      <AlertModal
        modalVisible={visible}
        cancelPress={() => {
          setVisible(false);
        }}
        fromChat
        heading={'Speak to AI'}
        message={'Let’s speak to AI about John Doe'}
        btntxt1={'Get Started'}
        onPress={() => {
          navigation.navigate('AiFeedback');
          setVisible(false);
        }}></AlertModal>
    </View>
    // </View>
  );
};
export default Chatting;
