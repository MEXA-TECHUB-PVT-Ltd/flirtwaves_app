import React, {useState} from 'react';
import {
  Dimensions,
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import AlertModal from '../../components/Modal/AlertModal';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import FButton from '../../components/button/FButton';
var {width, height} = Dimensions.get('window');

function AllChats({navigation}) {
  const [mode, setMode] = useState('Basic');
  const [layer, setLayer] = React.useState(false);
  const [connections, setConnections] = useState([
    {
      id: 1,
      img: require('../../assets/h1.png'),
      name: 'Olivia',
      message: 'Okay see you soon',
      time: '12:32 AM',
      recieved: '2',
      status: 'online',
    },
    {
      id: 2,
      img: require('../../assets/h2.png'),
      name: 'Rose',
      message: 'Thankyou Alex after interested',
      time: '12:22 AM',
      sent: '2',
      status: 'offline',
    },
    {
      id: 3,
      img: require('../../assets/h3.png'),
      name: 'Isabell',
      message: 'Do you have time in sunday ?',
      time: '12:20 AM',
      sent: '2',
      status: 'online',
    },
    {
      id: 4,
      img: require('../../assets/h4.png'),
      name: 'Emma',
      message: 'Where your home ? I want . . .',
      time: '12:08 AM',
      sent: '2',
      status: 'offline',
    },
    {
      id: 5,
      img: require('../../assets/h5.png'),
      name: 'Isabell',
      message: 'Okee makasih yaa waktunya',
      time: '12:08 AM',
      sent: '2',
      status: 'online',
    },
    {
      id: 6,
      img: require('../../assets/h6.png'),
      name: 'Sofia',
      message: 'Maaf yaa kalo pernah ngerepotin',
      time: '12:32 AM',
      sent: '2',
      status: 'online',
    },
  ]);
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
              ({connections?.length})
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
            {connections?.map(item => {
              return (
                <Stack
                  alignItems={'center'}
                  key={item?.id}
                  mr={4}
                  ml={item?.id === 1 ? 6 : 0}>
                  <Stack>
                    <Avatar source={item?.img} size={'md'} />
                    {item?.status === 'online' ? (
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
                </Stack>
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
          Converstations
        </Text>
        <>
          <Box bg={'primary.20'}>
            <Pressable
              bg={'primary.20'}
              my={2}
              onPress={() => {
                navigation.navigate('AcceptRequest');
              }}
              alignItems="center"
              borderWidth={0}
              borderRadius={12}
              justifyContent="center"
              height={50}
              underlayColor={'#AAA'}
              _pressed={{
                bg: 'white',
              }}
              p={1}>
              <HStack
                width="100%"
                px={4}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <HStack alignItems={'center'}>
                  <Stack>
                    <Avatar
                      size={'md'}
                      source={require('../../assets/h6.png')}
                    />

                    <Stack
                      h={2}
                      w={2}
                      rounded={'full'}
                      position={'absolute'}
                      bottom={0}
                      right={0}
                      bg={'#04C200'}></Stack>
                  </Stack>
                  <Box ml={5}>
                    <Text
                      color={'black'}
                      fontFamily={'Lexend-SemiBold'}
                      fontSize={14}>
                      {'Sahara Ardia Fadia'}
                    </Text>
                    <Text color={'grey.400'} fontSize={12} numberOfLines={1}>
                      {'Okay see you soon'}
                    </Text>
                  </Box>
                </HStack>
                <Stack
                  ml={2}
                  alignItems={'center'}
                  bg={'primary.400'}
                  mt={2}
                  borderRadius={8}
                  p={1}>
                  <Text fontSize={12} fontFamily={'Lexend-Medium'}>
                    Waiting for Reply
                  </Text>
                </Stack>
              </HStack>
            </Pressable>
          </Box>
          <Divider w={'75%'} alignSelf={'flex-end'} mx={3} mt={1} />
        </>
        <Basic
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
  const [active, setActive] = useState(false);
  const [listData, setListData] = useState([
    {
      id: 1,
      img: require('../../assets/h1.png'),
      name: 'Sahara Ardia Fadia',
      message: 'Okay see you soon',
      time: '12:32 AM',
      recieved: '2',
      status: 'rec',
    },
    {
      id: 2,
      img: require('../../assets/h2.png'),
      name: 'Zahra Putri Stephanie',
      message: 'Thankyou Alex after interested',
      time: '12:22 AM',
      sent: '2',
      status: 'sent',
    },
    {
      id: 3,
      img: require('../../assets/h3.png'),
      name: 'Shiren Putri Sungkar',
      message: 'Do you have time in sunday ?',
      time: '12:20 AM',
      sent: '2',
      status: 'seen',
    },
    {
      id: 4,
      img: require('../../assets/h4.png'),
      name: 'Natasya Valentina',
      message: 'Where your home ? I want . . .',
      time: '12:08 AM',
      sent: '2',
      status: 'seen',
    },
    {
      id: 5,
      img: require('../../assets/h5.png'),
      name: 'Chesya Zhaharani',
      message: 'Okee makasih yaa waktunya',
      time: '12:08 AM',
      sent: '2',
      status: 'sent',
    },
    {
      id: 6,
      img: require('../../assets/h6.png'),
      name: 'Saqila Septiani Anggun',
      message: 'Maaf yaa kalo pernah ngerepotin',
      time: '12:32 AM',
      sent: '2',
      status: 'sent',
    },
  ]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };
  const [dis, setDis] = React.useState(false);
  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const renderItem = ({item, index}) => (
    <Box key={item?.id}>
      <Pressable
        my={2}
        // borderColor={'grey.500'}
        onPress={() => navigation.navigate('Chatting')}
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
              <Avatar size={'md'} source={item?.img} />
              {item?.id === 1 ? (
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
                {item?.name}
              </Text>
              <Text color={'grey.400'} fontSize={12} numberOfLines={1}>
                {item?.message}
              </Text>
            </Box>
          </HStack>
          <Box alignItems={'center'}>
            <Text color={'grey.400'} mb={1} fontSize={10} numberOfLines={1}>
              {item?.time}
            </Text>
            {item?.status === 'sent' ? (
              <Icon
                size="4"
                _light={{
                  color: 'grey.400',
                }}
                _dark={{
                  color: 'coolGray.400',
                }}
                as={MaterialIcons}
                name={'done-all'}
              />
            ) : null}
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
    </Box>
  );

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
        data={listData}
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
        message={'Do you want to uncrush Zahra?'}
        btntxt1={'Cancel'}
        btntxt2={'Yes,Uncrush'}
        comon={true}
        onPress={() => {
          props.close && props.close('open');
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
          props.close && props.close('open');

          setDis(false);
        }}></AlertModal>
    </Box>
  );
}

export default AllChats;
