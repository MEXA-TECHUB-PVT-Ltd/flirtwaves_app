import React, {useState} from 'react';
import {
  Dimensions,
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  Heading,
  IconButton,
  Icon,
  HStack,
  Avatar,
  Center,
  Image,
  Row,
  ScrollView,
  Stack,
  Divider,
  Input,
  Checkbox,
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
// import {MaterialIcons, Ionicons} from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AlertModal from '../../components/Modal/AlertModal';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import FButton from '../../components/button/FButton';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {
  useGetUserCrushesQuery,
  useRemoveCrushMutation,
} from '../../redux/apis/auth';
import LoaderModal from '../../components/Loader/Loader';
var {width, height} = Dimensions.get('window');

function AllChats({navigation}) {
  // const uid = useSelector(state => state.auth?.userData?.id);
  const [mode, setMode] = useState('Basic');
  const [layer, setLayer] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const id = useSelector(state => state?.auth?.userData?.id);
  const {data: crushUsers, isLoading: crushLoading} = useGetUserCrushesQuery({
    id: id,
    page: page,
  });

  const bottomSheetRef = React.useRef(null);
  const openBottomSheet = id => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  };

  const languages = [
    {
      id: 1,
      name: 'Afrikans',
    },
    {
      id: 2,
      name: 'Albanian',
    },
    {id: 3, name: 'Amharic'},
    {
      id: 4,
      name: 'Arabic',
    },
    {
      id: 5,
      name: 'Armenian',
    },
    {
      id: 6,
      name: 'Azerbaijani',
    },
    {
      id: 7,
      name: 'Basque',
    },
  ];

  const [selected, setSelected] = React.useState();

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Row mt={5} mx={6} justifyContent={'space-between'} alignItems={'center'}>
        <Text
          color={'primary.400'}
          fontSize={22}
          fontFamily={'Lexend-SemiBold'}>
          Messages
        </Text>
        <LoaderModal visible={crushLoading} />
        <Row alignItems={'center'} flexDir={'row-reverse'}>
          <Pressable onPress={() => navigation.navigate('CallHistory')}>
            <Image
              source={require('../../assets/callHistory.png')}
              h={5}
              w={5}
              resizeMode={'contain'}
              alt={'chat'}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              openBottomSheet();
            }}>
            <Image
              mx={4}
              source={require('../../assets/language.png')}
              h={5}
              w={5}
              resizeMode={'contain'}
              alt={'chat'}
            />
          </Pressable>
        </Row>
      </Row>
      <Input
        alignSelf={'center'}
        mt={8}
        bg={'white'}
        _focus={{bg: 'white', borderColor: 'primary.400'}}
        placeholder={'Search here'}
        w={'85%'}
        color={'txtColor'}
        // value={}
        // onChangeText={setMessage}
        p={2}
        borderWidth={1}
        borderRadius={12}
        InputLeftElement={
          <Pressable
            onPress={() => {
              // openBottomSheet1();
            }}>
            <Icon
              as={
                <Image
                  source={require('../../assets/search.png')}
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Row
          mt={5}
          mx={6}
          mb={5}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Row alignItems={'center'}>
            <Text color={'black'} fontSize={16} fontFamily={'Lexend-Medium'}>
              My Flames
            </Text>
            <Text color={'grey.400'} fontSize={10} ml={2}>
              ({crushUsers?.count})
            </Text>
          </Row>
          <Pressable
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Text color={'primary.400'} fontSize={14}>
              See all
            </Text>
          </Pressable>
        </Row>
        <View style={{flexDirection: 'row'}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {crushUsers?.userCrushes?.map((item, index) => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate('Chatting', {uid: item?.id})
                  }
                  alignItems={'center'}
                  key={item?.id}
                  mr={4}
                  ml={index === 0 ? 6 : 0}>
                  <Stack>
                    <Avatar
                      source={item?.images && {uri: item?.images[0]}}
                      size={'md'}
                    />
                    {item?.online_status === true ? (
                      <Stack
                        h={2}
                        w={2}
                        rounded={'full'}
                        position={'absolute'}
                        bottom={0}
                        right={2}
                        bg={'#04C200'}></Stack>
                    ) : null}
                  </Stack>
                  <Text
                    mt={2}
                    color={'black'}
                    fontSize={12}
                    fontFamily={'Lexend-Regular'}>
                    {item?.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
        <Text
          mt={6}
          mb={3}
          mx={6}
          textAlign="left"
          fontSize={16}
          fontFamily={'Lexend-Medium'}
          color={'black'}>
          Messages
        </Text>

        <Basic
          chats={crushUsers?.userCrushes}
          close={() => {
            setLayer(false);
          }}
          open={() => {
            setLayer(true);
          }}
        />
      </ScrollView>

      {layer === true ? (
        <View style={[styles.overlay, {height: height}]} />
      ) : null}
      <BottomSheet
        defaultOff={true}
        height={'55%'}
        width="100%"
        openBottom={bottomSheetRef}>
        {/* <View> */}

        <View position={'absolute'} right={10} top={16} p={2} rounded={'full'}>
          <Pressable
            onPress={() => {
              bottomSheetRef.current.close();
            }}>
            <Entypo name={'cross'} color={'black'} size={25} />
          </Pressable>
        </View>

        <Text fontSize={16} fontFamily={'Lexend-SemiBold'} my={5}>
          Change Chat Language
        </Text>
        {languages?.map((item, index) => {
          return (
            <View key={index} style={{marginBottom: 10}}>
              <Row alignItems={'center'} justifyContent={'space-between'}>
                <Text
                  fontSize={14}
                  fontFamily={'Lexend-Regular'}
                  color={'grey.400'}>
                  {item?.name}
                </Text>
                <Checkbox
                  aria-label="check"
                  isChecked={index === selected ? true : false}
                  onChange={() => setSelected(index)}
                  value="val"></Checkbox>
              </Row>
              <Divider
                mt={2}
                bg={
                  index === languages?.length - 1 ? 'transparent' : 'grey.400'
                }
                opacity={0.5}
              />
            </View>
          );
        })}

        <FButton label={'Change'} variant={'Solid'} />
      </BottomSheet>
    </View>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.7,
    backgroundColor: 'black',
    width: width,
  },
});

function Basic(props) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [chats, setChats] = useState([]);
  const uid = useSelector(state => state.auth?.userData?.id);
  const [chatingList, setChattingList] = React.useState([]);
  // React.useEffect(() => {
  //   props?.chats?.forEach(item => {
  //     AllMessages(item?.id);
  //   });
  // }, [props?.chats]);
  useFocusEffect(
    React.useCallback(() => {
      // setIsLoading(true);
      //  fetchChatsStatus();
      fetchChats();
    }, [uid, dis]),
  );
  const fetchChats = async () => {
    const snapshotref = await database().ref('chatBase/' + `${uid}`);
    snapshotref.on('value', snapshot => {
      if (snapshot.exists()) {
        const chatData = snapshot.val();
        const chatList = Object.keys(chatData).map(chatId => ({
          id: chatId,
          ...chatData[chatId],
        }));
        chatList.sort((a, b) => {
          const key = Object.keys(a)[1];
          const A = a[key];
          const key1 = Object.keys(b)[1];
          const B = b[key1];
          const timeA = A.createdAt.split(':').map(Number);
          const timeB = B.createdAt.split(':').map(Number);
          if (timeA[0] > timeB[0]) {
            return -1;
          }
          if (timeA[0] < timeB[0]) {
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
        setChats(chatList);

        // setIsLoading(false);
      }
    });
  };

  const [chatId, setChatId] = React.useState();
  const [active, setActive] = useState(false);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const [removeCrush, {data: crushRemoved, isLoading: crushLoading}] =
    useRemoveCrushMutation();

  const removemMessages = async () => {
    if (chatId) {
      const databaseRef = database()
        .ref('chatBase/' + `${uid}`)
        .child(`${chatId}`);
      // Remove the data
      await databaseRef
        .remove()
        .then(() => {
          console.log('Data deleted successfully.');
          setDis(false);
          // navigation.navigate('ChatList');
        })
        .catch(error => {
          console.error('Error deleting data:', error);
        });
    }
  };
  const senderName = useSelector(state => state.auth?.userData?.name);

  const handleRemoveCrush = () => {
    if (chatId) {
      let body = {
        id: uid,
        data: {
          crushId: chatId,
        },
      };
      removeCrush(body).then(res => {
        console.log(res);
      });
    }
  };
  const [dis, setDis] = React.useState(false);
  const [alertName, setAlertName] = React.useState();
  const onRowDidOpen = rowKey => {
    // console.log('This row opened', rowKey);
  };

  const renderItem = ({item, index}) => {
    const key = Object.keys(item)[1];
    const dataItem = item[key];

    const parts = dataItem?.createdAt.split(':');

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
      <Pressable
        key={item?.id}
        onTouchStart={() => {
          console.log('press');
          setChatId(item?.id);
          setAlertName(
            senderName === dataItem.chatterName
              ? dataItem.chatName
              : dataItem.chatterName,
          );
        }}
        onPress={() => {
          console.log('press');
        }}>
        <Pressable
          my={2}
          // borderColor={'grey.500'}
          onPress={() => navigation.navigate('Chatting', {uid: item?.id})}
          alignItems="center"
          bg="white"
          // borderBottomColor="trueGray.200"View
          borderWidth={0}
          borderRadius={12}
          justifyContent="center"
          height={50}
          underlayColor={'#AAA'}
          _pressed={{
            bg: 'white',
          }}
          p={2}>
          <HStack
            width="100%"
            px={4}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <HStack alignItems={'center'}>
              <Stack>
                <Avatar
                  size={'md'}
                  source={{
                    uri:
                      senderName === dataItem.chatterName
                        ? dataItem.avatar
                        : dataItem.userAvatar,
                  }}
                />
                {item?.online_status === true ? (
                  <Stack
                    h={2}
                    w={2}
                    rounded={'full'}
                    position={'absolute'}
                    bottom={0}
                    right={0}
                    bg={'#04C200'}></Stack>
                ) : null}
              </Stack>
              <Box ml={5}>
                <Text
                  color={'black'}
                  fontFamily={'Lexend-SemiBold'}
                  fontSize={14}>
                  {senderName === dataItem.chatterName
                    ? dataItem.chatName
                    : dataItem.chatterName}
                </Text>
                <Text color={'grey.400'} fontSize={12} numberOfLines={1}>
                  {dataItem?.message}
                </Text>
              </Box>
            </HStack>
            <Box alignItems={'center'}>
              <Text color={'grey.400'} mb={1} fontSize={10} numberOfLines={1}>
                {messageTime}
              </Text>
              {dataItem?.status === 'delivered' && dataItem?.sender === uid ? (
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
              {dataItem?.status === 'seen' && dataItem.sender === uid ? (
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
              {/* {dataItem.sender === uid ? (
                <Icon
                  size="4"
                  _light={{
                    color: dataItem.status === 'seen' ? 'blue' : 'blue',
                  }}
                  _dark={{
                    color: dataItem.status === 'seen' ? 'blue' : 'blue',
                  }}
                  as={MaterialIcons}
                  name={'done-all'}
                />
              ) : null} */}
              {/* {item?.status === 'rec' ? (
              <Box
                rounded={'full'}
                h={4}
                w={4}
                bg={'primary.400'}
                alignItems={'center'}
                justifyContent={'center'}>
                <Text fontSize={10}>{item?.recieved}</Text>
              </Box>
            ) : null} */}
            </Box>
          </HStack>
          <Divider w={'75%'} mx={3} mt={2} alignSelf={'flex-end'} />
        </Pressable>
      </Pressable>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <HStack pr={6} mt={2}>
      <Pressable
        p={4}
        ml="auto"
        cursor="pointer"
        borderRadius={10}
        bg="primary.20"
        justifyContent="center"
        onPress={() => {
          navigation.navigate('ReportUser');
        }}
        _pressed={{
          opacity: 0.5,
        }}>
        <Image
          source={require('../../assets/block.png')}
          h={4}
          w={4}
          alt={'img'}
          resizeMode={'contain'}
        />
      </Pressable>
      <Pressable
        mx={2}
        px={4}
        cursor="pointer"
        borderRadius={10}
        bg="primary.20"
        justifyContent="center"
        onPress={() => {
          setDis(true);
        }}
        _pressed={{
          opacity: 0.5,
        }}>
        <Image
          source={require('../../assets/delChat.png')}
          h={4}
          w={4}
          alt={'img'}
          resizeMode={'contain'}
        />
      </Pressable>
      <Pressable
        px={4}
        cursor="pointer"
        borderRadius={10}
        bg="primary.20"
        justifyContent="center"
        onPress={() => {
          props.open && props.open('open');

          setActive(true);
        }}
        _pressed={{
          opacity: 0.5,
        }}>
        <Image
          source={require('../../assets/bin.png')}
          h={4}
          w={4}
          alt={'img'}
          resizeMode={'contain'}
        />
      </Pressable>
    </HStack>
  );

  return (
    <Box>
      <SwipeListView
        data={chats}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-170}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
      <AlertModal
        modalVisible={active}
        cancelPress={() => {
          props.close && props.close('open');
          setActive(false);
        }}
        fromSettings
        heading={'Uncrush'}
        message={`Do you want to uncrush ${alertName}?`}
        btntxt1={'Cancel'}
        btntxt2={'Yes,Uncrush'}
        comon={true}
        onPress={() => {
          props.close && props.close('open');
          handleRemoveCrush();
          setActive(false);
        }}></AlertModal>
      <AlertModal
        modalVisible={dis}
        cancelPress={() => {
          props.close && props.close('open');
          setDis(false);
        }}
        fromSettings
        heading={'Delete Chat'}
        message={'Do you want to delete chat?'}
        btntxt1={'Cancel'}
        btntxt2={'Yes,Delete'}
        comon={true}
        onPress={() => {
          removemMessages();
          props.close && props.close('open');
        }}></AlertModal>
    </Box>
  );
}

export default AllChats;
