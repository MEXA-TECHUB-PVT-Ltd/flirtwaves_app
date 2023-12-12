import {
  View,
  Text,
  Avatar,
  ScrollView,
  Stack,
  Pressable,
  Input,
  Icon,
  Image,
  Divider,
  Row,
  Switch,
} from 'native-base';
import {FlatList, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import Header from '../../components/Header/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Lottie from 'lottie-react-native';

const Browse = ({navigation}) => {
  const [selected, setSelected] = React.useState();
  const handleSelection = id => {
    if (selected === id) {
      setSelected();
    }
  };
  const [clicked, setClicked] = React.useState(false);

  const [focused, setFocued] = React.useState(false);
  const data2 = [
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
    {
      id: 5,
      img: require('../../assets/h5.png'),
      name: 'Emily',
      age: 30,
      status: 'offline',
      distance: '1.3 km',
      isVerified: false,
    },
    {
      id: 6,
      img: require('../../assets/h6.png'),
      name: 'Emily',
      age: 30,
      status: 'offline',
      distance: '1.3 km',
      isVerified: false,
    },
    {
      id: 7,
      img: require('../../assets/h1.png'),
      name: 'Emily',
      age: 30,
      status: 'offline',
      distance: '1.3 km',
      isVerified: false,
    },
    {
      id: 8,
      img: require('../../assets/h2.png'),
      name: 'Emily',
      age: 30,
      status: 'offline',
      distance: '1.3 km',
      isVerified: false,
    },
  ];
  const [searchText, setSearchText] = React.useState('');
  const [searchHistory, setSearchHistory] = React.useState([
    'Sofia Rodriguez',
    'Sofia Lopez',
    'Sofia Ramirez',
    'Sofia Morales',
  ]);
  const [found, setFound] = React.useState();

  const handleSearch = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const isFound = searchHistory.includes(lowerCaseSearchText);

    // Update search history
    setSearchHistory(prevHistory =>
      isFound ? prevHistory : [...prevHistory, lowerCaseSearchText],
    );

    // Clear the input
    setSearchText('');
    setTimeout(() => {
      setClicked(false);
      setFocued(false);
      setIsLoading(false);
    }, 2000);
  };

  const highlightMatches = item => {
    const lowerCaseSearchText = searchText.toLowerCase();

    if (!lowerCaseSearchText) {
      // No search text, return the original item
      return (
        <Pressable
          onPress={() => {
            setClicked(false);
            setFocued(false);
            setIsLoading(true);
          }}>
          <Text style={styles.historyItem}>{item}</Text>
          <Divider my={2} />
        </Pressable>
      );
    }

    // Split the item into parts based on the search text
    const parts = item.split(new RegExp(`(${lowerCaseSearchText})`, 'gi'));

    return (
      <Pressable
        onPress={() => {
          setClicked(false);
          setFocued(false);
          setIsLoading(true);
        }}>
        <Text style={styles.historyItem}>
          {parts.map((part, index) =>
            part.toLowerCase() === lowerCaseSearchText ? (
              <Text key={index} style={styles.found}>
                {part}
              </Text>
            ) : (
              part
            ),
          )}
        </Text>
        <Divider my={2} />
        {/* <Text ml={2} color={'white'} fontSize={14} fontFamily={'Jost-Regular'}>
          Sofia Lopez
        </Text>
        <Divider my={2} />
        <Text ml={2} color={'white'} fontSize={14} fontFamily={'Jost-Regular'}>
          Sofia Ramirez
        </Text>
        <Divider my={2} />
        <Text ml={2} color={'white'} fontSize={14} fontFamily={'Jost-Regular'}>
          Sofia Morales
        </Text> */}
      </Pressable>
    );
  };

  const renderItem = ({item}) => highlightMatches(item);
  const data = [
    {
      id: 1,
      name: 'A Relationship',
    },
    {
      id: 2,
      name: 'Nothing Serious ',
    },
    {
      id: 3,
      name: 'I’ll know when i find it',
    },
    {
      id: 4,
      name: 'Night owl',
    },
    {
      id: 5,
      name: 'Junk Food',
    },
    {
      id: 6,
      name: 'Vegetarian',
    },
    {
      id: 7,
      name: 'Halal',
    },
    {
      id: 8,
      name: 'Exercise all the time',
    },
    {
      id: 9,
      name: 'Occasional Exercise',
    },
  ];
  const partner = [
    {
      id: 1,
      img: require('../../assets/p1.png'),
      name: 'A Relationship',
    },
    {
      id: 2,
      img: require('../../assets/p2.png'),
      name: 'Nothing Serious',
    },
    {
      id: 3,
      img: require('../../assets/p3.png'),
      name: `You'll know when i find it`,
    },
  ];
  const excercise = [
    {
      id: 1,
      name: 'To excercise with',
      img: require('../../assets/e1.png'),
    },
    {id: 2, name: 'Excercise all time', img: require('../../assets/e2.png')},
    {
      id: 3,
      name: 'Excercise all time',
      img: require('../../assets/e3.png'),
    },
  ];
  const cooking = [
    {
      id: 1,
      name: `I'm a microwave master`,
      img: require('../../assets/c1.png'),
    },
    {
      id: 2,
      name: `I'm a delivery expert`,
      img: require('../../assets/c2.png'),
    },
    {
      id: 3,
      img: require('../../assets/c3.png'),
      name: `I know a few recipes`,
    },
  ];
  const travel = [
    {
      id: 1,
      name: 'Hiking & Backpack',
      img: require('../../assets/t1.png'),
    },
    {
      id: 2,
      name: 'Musuem & Postcards',
      img: require('../../assets/t2.png'),
    },
    {
      id: 3,
      name: 'Deckchair & Sunscreen',
      img: require('../../assets/t3.png'),
    },
  ];
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    if (isLoading === true) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [isLoading]);
  return (
    <View bg={'white'} flex={1}>
      {clicked === true ? (
        <>
          <View flex={1} bg={'white'}>
            <View mt={5} mx={3} flexDir={'row'} alignItems={'center'}>
              <Pressable
                onPress={() => {
                  setClicked(false);
                  setFocued(false);
                }}>
                <Entypo name={'chevron-left'} size={30} color={'black'} />
              </Pressable>
              <Input
                alignSelf={'center'}
                onTouchStart={() => setFocued(true)}
                onFocus={() => console.log('focus')}
                onBlur={() => {
                  handleSearch();
                  // setTimeout(() => {
                  //   setFocued(false);
                  // }, 2000);
                }}
                _focus={{borderColor: 'primary.400'}}
                backgroundColor={'white'}
                value={searchText}
                onChangeText={setSearchText}
                mx={4}
                borderRadius={12}
                placeholder="search here"
                color={'txtColor'}
                fontSize={14}
                borderWidth={1}
                w={'85%'}
                InputLeftElement={
                  focused ? (
                    <Pressable
                      onPress={() => {
                        // openBottomSheet1();
                      }}>
                      <Icon
                        as={
                          <Image
                            source={require('../../assets/searched.png')}
                            h={5}
                            w={5}
                            resizeMode="contain"
                            alt={'img'}
                          />
                        }
                        ml={2}
                      />
                    </Pressable>
                  ) : (
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
                  )
                }
              />
            </View>

            <ScrollView>
              <View m={5}>
                <Text fontSize={16} fontFamily={'Lexend-SemiBold'}>
                  Search by Prefrences
                </Text>
                <View flex={1} flexDir={'row'} flexWrap={'wrap'} mt={5}>
                  {data?.map(item => {
                    return (
                      <Pressable
                        onPress={() => {
                          setClicked(false);
                          setIsLoading(true);
                        }}
                        //   setLoading(true)
                        mr={2}
                        my={2}
                        key={item?.id}
                        borderRadius={10}
                        borderWidth={1}
                        p={2}
                        borderColor={'#00000017'}>
                        <Text
                          fontSize={12}
                          mx={2}
                          fontFamily={'Lexend-Regular'}>
                          {item?.name}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
            {focused === true && (
              <View
                bg={'white'}
                position={'absolute'}
                borderRadius={10}
                zIndex={999}
                h={48}
                w={'80%'}
                top={20}
                right={5}>
                <View m={2} mx={4} my={4}>
                  <FlatList
                    data={searchHistory}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    //   style={styles.historyList}
                  />
                </View>
              </View>
            )}
          </View>
        </>
      ) : (
        <>
          <View
            m={5}
            flexDir={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Text
              fontSize={22}
              color={'primary.400'}
              fontFamily={'Lexend-SemiBold'}>
              Browse
            </Text>
            <Pressable
              onPress={() => {
                setClicked(true);
              }}
              p={2}>
              <Image
                source={require('../../assets/searched.png')}
                h={5}
                w={5}
                resizeMode="contain"
                alt={'img'}
              />
            </Pressable>
          </View>
          <ScrollView>
            <View mx={5}>
              <Row alignItemse={'center'} justifyContent={'space-between'}>
                <View alignItems={'center'}>
                  <Pressable
                    bg={'#F5BF0317'}
                    onPress={() =>
                      navigation.navigate('Content', {fromLikes: true})
                    }
                    borderRadius={10}
                    p={4}
                    borderColor={'primary.400'}
                    borderWidth={1}>
                    <Image
                      source={require('../../assets/love2.png')}
                      h={8}
                      w={8}
                      alt={'img'}
                      resizeMode={'contain'}
                    />
                  </Pressable>
                  <Text
                    textAlign="center"
                    fontSize={12}
                    mt={2}
                    fontFamily={'Lexend-SemiBold'}
                    color={'black'}>
                    {`Likes${'\n'}Recieved`}
                  </Text>
                </View>
                <View alignItems={'center'}>
                  <Pressable
                    bg={'#F5BF0317'}
                    onPress={() =>
                      navigation.navigate('Content', {fromVerif: true})
                    }
                    borderRadius={10}
                    p={4}
                    borderColor={'primary.400'}
                    borderWidth={1}>
                    <Image
                      source={require('../../assets/active.png')}
                      h={8}
                      w={8}
                      alt={'img'}
                      resizeMode={'contain'}
                    />
                  </Pressable>
                  <Text
                    fontSize={12}
                    mt={2}
                    textAlign="center"
                    fontFamily={'Lexend-SemiBold'}
                    color={'black'}>
                    {`Verified${'\n'}Profiles`}
                  </Text>
                </View>
                <View alignItems={'center'}>
                  <Pressable
                    bg={'#F5BF0317'}
                    onPress={() =>
                      navigation.navigate('Content', {fromNew: true})
                    }
                    borderRadius={10}
                    p={4}
                    borderColor={'primary.400'}
                    borderWidth={1}>
                    <Image
                      source={require('../../assets/multiple.png')}
                      h={8}
                      w={8}
                      alt={'img'}
                      resizeMode={'contain'}
                    />
                  </Pressable>
                  <Text
                    fontSize={12}
                    mt={2}
                    textAlign="center"
                    fontFamily={'Lexend-SemiBold'}
                    color={'black'}>
                    {`New${'\n'}User`}
                  </Text>
                </View>
                <View alignItems={'center'}>
                  <Pressable
                    bg={'#F5BF0317'}
                    borderRadius={10}
                    onPress={() =>
                      navigation.navigate('Content', {fromOnline: true})
                    }
                    p={4}
                    borderColor={'primary.400'}
                    borderWidth={1}>
                    <Image
                      source={require('../../assets/online.png')}
                      h={8}
                      w={8}
                      alt={'img'}
                      resizeMode={'contain'}
                    />
                  </Pressable>
                  <Text
                    fontSize={12}
                    textAlign="center"
                    mt={2}
                    fontFamily={'Lexend-SemiBold'}
                    color={'black'}>
                    Online
                  </Text>
                </View>
              </Row>
              {isLoading ? (
                <View
                  flex={1}
                  mt={'50%'}
                  alignItems={'center'}
                  justifyContent={'center'}>
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
                </View>
              ) : (
                <>
                  <Row alignItems={'center'} mt={5}>
                    <Image
                      source={require('../../assets/love2.png')}
                      alt={'love'}
                      h={6}
                      w={6}
                      resizeMode="contain"
                    />
                    <Text ml={2} fontSize={16} fontFamily={'Lexend-SemiBold'}>
                      A Partner for you
                    </Text>
                  </Row>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {partner?.map(item => {
                      return (
                        <Pressable
                          key={item?.id}
                          mx={3}
                          mt={4}
                          onPress={() => {
                            navigation.navigate('Content');
                          }}>
                          <Image source={item?.img} h={24} w={24} alt={'img'} />
                          <Text
                            fontSize={12}
                            w={24}
                            mt={2}
                            fontFamily={'Lexend-Light'}
                            color={'grey.400'}>
                            {item?.name}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                  <Row alignItems={'center'} mt={5}>
                    <Image
                      source={require('../../assets/fitness.png')}
                      alt={'love'}
                      h={6}
                      w={6}
                      resizeMode="contain"
                    />
                    <Text ml={2} fontSize={16} fontFamily={'Lexend-SemiBold'}>
                      Excercise Habbits
                    </Text>
                  </Row>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {excercise?.map(item => {
                      return (
                        <Pressable
                          onPress={() => {
                            navigation.navigate('Content');
                          }}
                          key={item?.id}
                          mx={3}
                          mt={4}>
                          <Image source={item?.img} h={24} w={24} alt={'img'} />
                          <Text
                            fontSize={12}
                            mt={2}
                            w={24}
                            fontFamily={'Lexend-Light'}
                            color={'grey.400'}>
                            {item?.name}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                  <Row alignItems={'center'} mt={5}>
                    <Image
                      source={require('../../assets/chef.png')}
                      alt={'love'}
                      h={6}
                      w={6}
                      resizeMode="contain"
                    />
                    <Text ml={2} fontSize={16} fontFamily={'Lexend-SemiBold'}>
                      Cooking Skills
                    </Text>
                  </Row>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {cooking?.map(item => {
                      return (
                        <Pressable
                          onPress={() => {
                            navigation.navigate('Content');
                          }}
                          key={item?.id}
                          mx={3}
                          mt={4}>
                          <Image source={item?.img} h={24} w={24} alt={'img'} />
                          <Text
                            fontSize={12}
                            w={24}
                            mt={2}
                            fontFamily={'Lexend-Light'}
                            color={'grey.400'}>
                            {item?.name}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                  <Row alignItems={'center'} mt={5}>
                    <Image
                      source={require('../../assets/hiking.png')}
                      alt={'love'}
                      h={6}
                      w={6}
                      resizeMode="contain"
                    />
                    <Text ml={2} fontSize={16} fontFamily={'Lexend-SemiBold'}>
                      Travel Buddy
                    </Text>
                  </Row>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {travel?.map(item => {
                      return (
                        <Pressable
                          onPress={() => {
                            navigation.navigate('Content');
                          }}
                          key={item?.id}
                          mx={3}
                          my={4}>
                          <Image source={item?.img} h={24} w={24} alt={'img'} />
                          <Text
                            fontSize={12}
                            mt={2}
                            w={24}
                            fontFamily={'Lexend-Light'}
                            color={'grey.400'}>
                            {item?.name}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Browse;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  historyList: {
    marginTop: 10,
  },
  historyItem: {
    color: 'black',
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Lexend-Light',
  },
  found: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Lexend-Medium',
  },
});
