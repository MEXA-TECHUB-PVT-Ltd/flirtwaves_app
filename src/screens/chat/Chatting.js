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
import React, {useLayoutEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import ChatScreen from './components/ChatScreen';
import {
  GiftedChat,
  Bubble,
  Day,
  Send,
  InputToolbar,
} from 'react-native-gifted-chat';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AlertModal from '../../components/Modal/AlertModal';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useGetUserByIdQuery} from '../../redux/apis/auth';
import moment from 'moment';

const Chatting = ({navigation, route}) => {
  const otherid = route?.params?.uid;
  const {data: userData, isLoading} = useGetUserByIdQuery(otherid);
  const [messages, setMessages] = useState([]);
  const [messageReciver, setMessageReciver] = useState([]);
  const [indexss, setIndexss] = useState(0);
  const [reciverIndex, setReciverIndex] = useState(0);
  const [messageID, setMessageID] = useState('');
  const [reciverMessageID, setReciverMessageID] = useState('');
  const [receiverIds, setReciverIds] = useState([]);
  const [ids, setIds] = useState([]);
  const [blockedByUser, setBlockedByUser] = useState([]);
  const [status, setStatus] = useState();
  const uid = useSelector(state => state.auth?.userData?.id);
  const senderName = useSelector(state => state.auth?.userData?.name);
  const senderImage = useSelector(state => state.auth?.userData?.images);

  const scrollRef = React.useRef(null);
  const [focus, setFocus] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState();
  const bottomSheetRef = React.useRef(null);
  const bottomSheetRef1 = React.useRef(null);
  const [chat, setChat] = useState([
    {
      _id: otherid,
      text: 'Hi Alex, nice to meet you and thanks for add me',
      createdAt: new Date(),
      user: {
        _id: uid,
        name: 'React Native',
      },
    },
    {
      _id: 2,
      text: 'Hi Sahara, your welcome nice to meet you too',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'You',
      },
    },
    {
      _id: 3,
      text: 'Okay by the way, can you meet me today ?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
      },
    },
    {
      _id: 4,
      text: 'Of course dude!',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'You',
      },
    },
    // Add more messages here...
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
  const isFocused = useIsFocused();
  // React.useEffect(() => {
  //   AllMessages();
  // }, [isFocused]);
  React.useEffect(() => {
    const messagesRef = database()
      .ref('chatBase/' + `${uid}`)
      .child(`${otherid}`);
    const messagesreciverRef = database()
      .ref('chatBase/' + `${otherid}`)
      .child(`${uid}`);
    messagesRef.on('value', snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const messagesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        const simpleMessagesArray = messagesArray.map(message => ({
          id: message.id,
          message: message.message,
          sender: message.sender,
          receiver: message.receiver,
          createdAt: message.createdAt,
          recieverName: message.recieverName,
          senderName: message.senderName,
          avatar: message.avatar,
          userAvatar: message.userAvatar,
          status: message.status,
        }));
        simpleMessagesArray.sort((a, b) => {
          const timeA = a?.createdAt?.split(':').map(Number);
          const timeB = b?.createdAt?.split(':').map(Number);
          if (timeA[0] < timeB[0]) {
            return -1;
          }
          if (timeA[0] > timeB[0]) {
            return 1;
          }
          if (timeA[1] !== timeB[1]) {
            return timeA[1] - timeB[1];
          }
          if (timeA[2] !== timeB[2]) {
            return timeA[2] - timeB[2];
          }
          return timeA[3] - timeB[3];
        });
        setIndexss(simpleMessagesArray.length);
        setMessages(simpleMessagesArray);
      }
    });
    messagesreciverRef.on('value', snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const messagesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));

        const simpleMessagesArray = messagesArray.map(message => ({
          id: message.id,
          message: message.message,
          sender: message.sender,
          receiver: message.receiver,
          createdAt: message.createdAt,
          recieverName: message.recieverName,
          senderName: message.senderName,
          avatar: message.avatar,
          userAvatar: message.userAvatar,
          status: message.status,
        }));
        simpleMessagesArray.sort((a, b) => {
          const timeA = a?.createdAt?.split(':').map(Number);
          const timeB = b?.createdAt?.split(':').map(Number);
          if (timeA[0] < timeB[0]) {
            return -1;
          }
          if (timeA[0] > timeB[0]) {
            return 1;
          }
          if (timeA[1] !== timeB[1]) {
            return timeA[1] - timeB[1];
          }
          if (timeA[2] !== timeB[2]) {
            return timeA[2] - timeB[2];
          }
          return timeA[3] - timeB[3];
        });
        setReciverIndex(simpleMessagesArray.length);
        setReciverMessageID(
          simpleMessagesArray[simpleMessagesArray.length - 1]?.id,
        );
        const RecieverMessagesId = messagesArray?.map(mes => ({
          RecMesId: mes?.id,
        }));
        setReciverIds(RecieverMessagesId);
      }
    });

    // return () => messagesRef.off('value');
  }, [otherid]);

  const AllMessages = async () => {
    // var user = await AsyncStorage.getItem('Userid');
    const doc_id =
      route.params.uid > uid
        ? uid + '-' + route.params.uid
        : route.params.uid + '-' + uid;

    const messageRef = firestore()
      .collection('chats')
      .doc(doc_id)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    messageRef.onSnapshot(querySnap => {
      const allmsg = querySnap?.docs?.map(docsnap => {
        const data = docsnap.data();
        if (data.createdAt) {
          return {
            ...docsnap.data(),
            createdAt: docsnap.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docsnap.data(),
            createdAt: new Date(),
          };
        }
      });
      //  setLoading(false);
      //  setCount(count + 1);

      setChat(allmsg);
    });
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
  };

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
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  const flatListRef = React.useRef(null);
  const [message, setMessage] = React.useState('');
  // useFocusEffect(
  //   React.useCallback(() => {
  //     updateUnreadMessages();
  //   }, []),
  // );

  // const updateUnreadMessages = async () => {
  //   try {
  //     // var user = await AsyncStorage.getItem('Userid');
  //     let docid = '';

  //       docid =
  //         route.params.userid > user
  //           ? user + '-' + route.params.userid
  //           : route.params.userid + '-' + user;

  //     let updated = false;
  //     const messagesList = firestore()
  //       .collection('chats')
  //       .doc(docid)
  //       .collection('messages');
  //     // console.log("ORDER_ITEMS  :  ", ORDER_ITEMS);
  //     messagesList
  //       .where('read', '==', false)
  //       .get()
  //       .then(snapshots => {
  //         if (snapshots.size > 0) {
  //           snapshots.forEach(message => {
  //             if (message?._data?.user?._id != user) {
  //               messagesList.doc(message?.id).update({
  //                 read: true,
  //               });

  //               if (!updated) {
  //                 dispatch(setChatCount(0));
  //                 let prevChatList = chatList;
  //                 const newData = prevChatList?.map(item => {
  //                   if (item?.user?.id == message?._data?.user?._id) {
  //                     return {
  //                       ...item,
  //                       count: 0,
  //                     };
  //                   } else {
  //                     return {
  //                       ...item,
  //                     };
  //                   }
  //                 });
  //                 dispatch(setChatList(newData));

  //                 updated = true;
  //               } else {
  //                 // console.log("else not updated....", updated);
  //               }
  //             } else {
  //               // console.log("else called......");
  //             }
  //           });
  //         }
  //       });
  //   } catch (error) {}
  // };
  const sendMessage = mes => {
    if (message !== '' && message !== ' ') {
      const date = new Date();

      const messagesRefsender = database()
        .ref('chatBase/' + `${uid}`)
        .child(`${otherid}`);

      const messagesRefreciver = database()
        .ref('chatBase/' + `${otherid}`)
        .child(`${uid}`);

      messagesRefreciver.push({
        sender: uid,
        senderName: senderName,
        userAvatar: senderImage[0],
        avatar: userData?.data?.images[0],
        receiver: otherid,
        status: 'delivered',
        chatId: otherid,
        chatName: userData?.data?.name,

        recieverName: userData?.data?.name,
        message: message,
        chatterName: senderName,
        createdAt: moment(date).format('DD:HH:mm:ss'),
      });

      messagesRefsender.push({
        sender: uid,
        senderName: senderName,
        userAvatar: senderImage[0],
        avatar: userData?.data?.images[0],
        receiver: otherid,
        status: 'delivered',
        chatId: otherid,
        chatName: userData?.data?.name,
        reciverName: userData?.data?.name,
        message: message,
        chatterName: senderName,

        createdAt: moment(date).format('DD:HH:mm:ss'),
      });
      setMessage('');
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      handleSeendStatus();
    }, [messages]),
  );
  const handleSeendStatus = () => {
    if (reciverMessageID) {
      console.log('handle');
      receiverIds?.map(updated => {
        const messagesRefreciver = database()
          .ref('chatBase/' + `${otherid}`)
          .child(`${uid}`)
          .child(updated?.RecMesId);
        messagesRefreciver.update({
          status: 'seen',
        });
      });
    }
  };
  handleSeendStatus();
  const renderConversation = ({item}) => {
    const parts = item?.createdAt.split(':');

    const totalHours = parseInt(parts[1]);
    const minutes = parseInt(parts[2]);
    let hours = totalHours % 12;

    if (hours === 0) {
      hours = 12;
    }

    const ampm = totalHours < 12 ? 'AM' : 'PM';

    const messageTime = `${hours
      .toString()
      .padStart(2, '0')}:${minutes} ${ampm}`;
    return (
      <View
        bg={item?.sender === uid ? 'primary.20' : '#F3F3F3'}
        style={{
          flex: 1,
          borderRadius: 12,
          justifyContent: 'center',
          alignSelf: item?.sender === uid ? 'flex-end' : 'flex-start',
          padding: 8,
          marginBottom: 25,
          padding: 10,
          width: '88%',
        }}>
        <Pressable onPress={() => setVisible(true)}>
          {item?.image ? ( // Check if there's an image
            <Image
              source={{uri: item.image}}
              alt="Image"
              size="auto" // Set height to "auto" to maintain image proportions
              height={130}
              borderRadius={5}
            />
          ) : (
            <Text fontSize={13} fontFamily={'Lexend-Regular'} color={'black'}>
              {item?.message}
            </Text>
          )}

          <Row alignSelf={'flex-end'} alignItems={'center'} mt={2}>
            <Text
              color={item?.senderId === uid ? 'txtColor' : 'black'}
              mr={2}
              fontSize={10}>
              {messageTime}
            </Text>
            {item?.status === 'delivered' && item?.sender === uid ? (
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
            {item?.status === 'seen' && item?.sender === uid ? (
              <Icon
                size="4"
                _light={{
                  color: 'blue.400',
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
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            width: '80%',
            padding: 8,
            marginVertical: 10,
            backgroundColor: '#FDF2CD', // Customize the color for left messages
          },
          right: {
            width: '80%',
            padding: 8,
            backgroundColor: '#F3F3F3',
            // Customize the color for right messages
          },
        }}
        textStyle={{
          left: {
            color: 'black',
          },
          right: {
            color: 'black',
          },
        }}
        tickStyle={{
          backgroundColor: 'black',
        }}
        // renderTicks={true}
      />
    );
  };
  const CustomInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          //   backgroundColor: 'red',
          height: 52,
          borderColor: '#f5bf03',
          // borderTopColor: '#ccc',
          borderWidth: 0.3,
          borderRadius: 12,
          marginLeft: 5,
          width: '80%',
          // position: 'absolute',
          // top: 0,
          left: 2,
          bottom: -50,
          marginTop: 2,
          // paddingLeft: 25,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
        textInputStyle={{color: 'black'}}>
        {/* <Input
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
            setFocus(false)
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
        /> */}
      </InputToolbar>
    ); // This will remove the input message box
  };
  const renderSend = props => {
    return (
      <Send
        {...props}
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 48,
          width: 48,
          borderRadius: 10,
          position: 'absolute',
          bottom: 0,
          right: -50,
          // backgroundColor: 'white',
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,
          // elevation: 5,
        }}>
        {/* <Pressable
          position={'absolute'}
          right={0}
          onPress={() => {
            sendMessage();
          }}> */}
        <View>
          <Image
            source={require('../../assets/send.png')}
            h={10}
            w={10}
            alt={'img'}
            ml={2}
          />
        </View>
        {/* </Pressable> */}
      </Send>
    );
  };
  return (
    <View bg={'white'} flex={1}>
      <View mx={5} mt={5}>
        <ChatScreen otherid={otherid} />
      </View>
      <Divider opacity={0.2} mt={2} />
      <View mx={5} mt={5} mb={5} flex={1}>
        <View mt={5} mb={16} flex={1}>
          <FlatList
            style={{flex: 1}}
            data={messages}
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            renderItem={renderConversation}
            keyExtractor={(item, index) => index.toString()}
            onContentSizeChange={() => flatListRef.current.scrollToEnd()}
            onLayout={() => flatListRef.current.scrollToEnd()}
          />
        </View>
        {/* <View mt={5}> */}
        <Row alignItems={'center'} position={'absolute'} bottom={0} mx={5}>
          <Input
            bg={'white'}
            _focus={{bg: 'white', borderColor: 'primary.400', borderWidth: 1}}
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
            borderWidth={0}
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
        {/* <FlatList
          data={chat}
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          renderItem={renderConversation}
          keyExtractor={(item, index) => index.toString()}
          onContentSizeChange={() => flatListRef.current.scrollToEnd()}
          onLayout={() => flatListRef.current.scrollToEnd()}
        /> */}
      </View>

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
    </View>
    // </View>
  );
};
export default Chatting;
