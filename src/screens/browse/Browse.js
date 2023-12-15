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
import {
  useGetAllCookingsQuery,
  useGetAllExcercisesQuery,
  useGetAllHabbitsQuery,
  useGetAllKidsQuery,
  useGetAllNightLifeQuery,
  useGetAllRelationsQuery,
  useGetAllSmokingsQuery,
  useSerchUserMutation,
  useWhichTwoWordsQuery,
} from '../../redux/apis/auth';

const Browse = ({navigation}) => {
  const [selected, setSelected] = React.useState();
  const handleSelection = id => {
    if (selected === id) {
      setSelected();
    }
  };
  const [clicked, setClicked] = React.useState(false);

  const [focused, setFocued] = React.useState(false);
  const [searchUser, {data: searchedUsers, isLoading: searchLoading}] =
    useSerchUserMutation();
  const [searchText, setSearchText] = React.useState('');
  const [searchHistory, setSearchHistory] = React.useState([
    'Sofia Rodriguez',
    'Sofia Lopez',
    'Sofia Ramirez',
    'Sofia Morales',
  ]);
  const [found, setFound] = React.useState();

  const handleSearch = () => {
    let body = {
      name: searchText,
    };
    searchUser(body);

    // const lowerCaseSearchText = searchText.toLowerCase();
    // const isFound = searchHistory.includes(lowerCaseSearchText);

    // Update search history

    // Clear the input
    // setSearchText('');
    // setTimeout(() => {
    //   // setClicked(false);
    //   // setFocued(false);
    //   // setIsLoading(false);
    // }, 2000);
  };
  // console.log(searchHistory);
  const highlightMatches = item => {
    const lowerCaseSearchText = searchText.toLowerCase();
    // console.log(lowerCaseSearchText);

    if (!lowerCaseSearchText) {
      // No search text, return the original item
      return (
        <Pressable
          onPress={() => {
            setClicked(false);
            setFocued(false);
            setIsLoading(true);
            console.log('id', item?.id);
            navigation.navigate('Filter', {otherId: item.id});
          }}>
          <Text style={styles.historyItem}>{item?.name}</Text>
          <Divider my={2} />
        </Pressable>
      );
    }

    // Split the item into parts based on the search text
    const parts = item?.name?.split(
      new RegExp(`(${lowerCaseSearchText})`, 'gi'),
    );
    // console.log(parts);

    return (
      <Pressable
        onPress={() => {
          setClicked(false);
          setFocued(false);
          setIsLoading(true);
          console.log('id', item?.id);
          navigation.navigate('Filter', {otherId: item.id});
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
      prefrenceId: 4,
      screen: 'Partner',
    },
    {
      id: 2,
      name: 'Nothing Serious ',
      prefrenceId: 5,
      screen: 'Partner',
    },
    {
      id: 3,
      name: 'I’ll know when i find it',
      prefrenceId: 6,
      screen: 'Partner',
    },
    {
      id: 4,
      name: 'Night owl',
      prefrenceId: 4,
      screen: 'Night',
    },
    {
      id: 5,
      name: 'Junk Food',
      prefrenceId: 8,
      screen: 'Eating',
    },
    {
      id: 6,
      name: 'Vegetarian',
      prefrenceId: 7,
      screen: 'Eating',
    },
    {
      id: 7,
      name: 'Halal',
      prefrenceId: 10,
      screen: 'Eating',
    },
    {
      id: 8,
      name: 'Exercise all the time',
      prefrenceId: 6,
      screen: 'Exercise',
    },
    {
      id: 9,
      name: 'Occasional Exercise',
      prefrenceId: 4,
      screen: 'Exercise',
    },
  ];
  const [page, setPage] = React.useState(1);
  const {
    data: RelationData,
    isError,
    isLoading: loading,
  } = useGetAllRelationsQuery(page);
  const {
    data: exerciseData,
    isError: exerciseError,
    isLoading: exerciseLoading,
  } = useGetAllExcercisesQuery(page);
  const {
    data: travelData,
    isError: travelError,
    isLoading: travelLoading,
  } = useWhichTwoWordsQuery(page);
  const {
    data: cookingData,
    isError: cookingError,
    isLoading: cookingLoading,
  } = useGetAllCookingsQuery(page);
  const {
    data: nightData,
    isError: nightError,
    isLoading: nightLoading,
  } = useGetAllNightLifeQuery(page);
  const {data: smookingData, isLoading: smookingLoading} =
    useGetAllSmokingsQuery(page);
  const {data: eatingHabbit, isLoading: eatingLoading} =
    useGetAllHabbitsQuery(page);
  const {data: kidsData, isLoading: kidsLoading} = useGetAllKidsQuery(page);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    if (isLoading === true) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [isLoading]);
  React.useEffect(() => {
    if (
      cookingLoading ||
      travelLoading ||
      exerciseLoading ||
      loading ||
      kidsLoading ||
      nightLoading ||
      smookingLoading ||
      eatingLoading
    ) {
      setIsLoading(true);
    }
  }, [cookingData, travelData, RelationData, exerciseData]);
  // console.log('rees', searchedUsers);
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
                  // handleSearch();
                  // setTimeout(() => {
                  setFocued(false);
                  // }, 2000);
                }}
                onSubmitEditing={() => {
                  handleSearch();
                  setClicked(false);
                  // setFocued(false);
                  setTimeout(() => {
                    setFocued(false);
                  }, 2100);
                }}
                onEndEditing={() => {
                  handleSearch();
                  setClicked(false);
                  setTimeout(() => {
                    setFocued(false);
                  }, 2100);
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
              <Pressable
                m={5}
                onPress={() => {
                  setFocued(false);
                }}>
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
                          navigation.navigate(item?.screen, {
                            fromVerif: true,
                            prefrenceId: item?.prefrenceId,
                          });
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
              </Pressable>
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
                  {!searchLoading ? (
                    <FlatList
                      data={searchedUsers?.data}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => item?.id}
                      //   style={styles.historyList}
                    />
                  ) : (
                    <View
                      flex={1}
                      // mt={'50%'}
                      alignItems={'center'}
                      justifyContent={'center'}>
                      <Lottie
                        source={require('../../assets/spinner.json')}
                        autoPlay
                        loop
                        style={{
                          // marginBottom: 5,
                          height: 20,
                          width: 20,
                          // backgroundColor: 'black',
                        }}></Lottie>
                    </View>
                  )}
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
                    {RelationData?.data?.map(item => {
                      console.log(item);
                      return (
                        <Pressable
                          key={item?.id}
                          mx={3}
                          mt={4}
                          onPress={() => {
                            navigation.navigate('Partner', {
                              fromVerif: true,
                              prefrenceId: item?.id,
                            });
                          }}>
                          <Image
                            source={{uri: item?.image}}
                            h={24}
                            w={24}
                            alt={'img'}
                          />
                          <Text
                            fontSize={12}
                            w={24}
                            mt={2}
                            fontFamily={'Lexend-Light'}
                            color={'grey.400'}>
                            {item?.relation_type}
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
                    {exerciseData?.data?.map(item => {
                      return (
                        <Pressable
                          onPress={() => {
                            navigation.navigate('Exercise', {
                              fromVerif: true,
                              prefrenceId: item?.id,
                            });
                          }}
                          key={item?.id}
                          mx={3}
                          mt={4}>
                          <Image
                            source={{uri: item?.image}}
                            h={24}
                            w={24}
                            alt={'img'}
                          />
                          <Text
                            fontSize={12}
                            mt={2}
                            w={24}
                            fontFamily={'Lexend-Light'}
                            color={'grey.400'}>
                            {item?.exercise}
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
                    {cookingData?.data?.map(item => {
                      return (
                        <Pressable
                          onPress={() => {
                            navigation.navigate('Cooking', {
                              fromVerif: true,
                              prefrenceId: item?.id,
                            });
                          }}
                          key={item?.id}
                          mx={3}
                          mt={4}>
                          <Image
                            source={{uri: item?.image}}
                            h={24}
                            w={24}
                            alt={'img'}
                          />
                          <Text
                            fontSize={12}
                            w={24}
                            mt={2}
                            fontFamily={'Lexend-Light'}
                            color={'grey.400'}>
                            {item?.cooking_skill}
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
                    {travelData?.data?.map(item => {
                      return (
                        <Pressable
                          onPress={() => {
                            navigation.navigate('Travel', {
                              fromVerif: true,
                              prefrenceId: item?.id,
                            });
                          }}
                          key={item?.id}
                          mx={3}
                          my={4}>
                          <Image
                            source={{uri: item?.image}}
                            h={24}
                            w={24}
                            alt={'img'}
                          />
                          <Text
                            fontSize={12}
                            mt={2}
                            w={24}
                            fontFamily={'Lexend-Light'}
                            color={'grey.400'}>
                            {item?.habit}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                  <Row alignItems={'center'} mt={5}>
                    <Image
                      source={require('../../assets/moon.png')}
                      alt={'love'}
                      h={6}
                      w={6}
                      resizeMode="contain"
                    />
                    <Text ml={2} fontSize={16} fontFamily={'Lexend-SemiBold'}>
                      Night Life
                    </Text>
                  </Row>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {nightData?.data?.map(item => {
                      return (
                        <Pressable
                          onPress={() => {
                            navigation.navigate('Night', {
                              fromVerif: true,
                              prefrenceId: item?.id,
                            });
                          }}
                          key={item?.id}
                          mx={3}
                          my={4}>
                          <Image
                            source={{uri: item?.image}}
                            h={24}
                            w={24}
                            alt={'img'}
                          />
                          <Text
                            fontSize={12}
                            mt={2}
                            w={24}
                            fontFamily={'Lexend-Light'}
                            color={'grey.400'}>
                            {item?.night_life}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>

                  <Row alignItems={'center'} mt={5}>
                    <Image
                      source={require('../../assets/kid.png')}
                      alt={'love'}
                      h={6}
                      w={6}
                      resizeMode="contain"
                    />
                    <Text ml={2} fontSize={16} fontFamily={'Lexend-SemiBold'}>
                      Kids Opinion
                    </Text>
                  </Row>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {kidsData?.data?.map(item => {
                      return (
                        <Pressable
                          onPress={() => {
                            navigation.navigate('Kids', {
                              fromVerif: true,
                              prefrenceId: item?.id,
                            });
                          }}
                          key={item?.id}
                          mx={3}
                          my={4}>
                          <Image
                            source={{uri: item?.image}}
                            h={24}
                            w={24}
                            alt={'img'}
                          />
                          <Text
                            fontSize={12}
                            mt={2}
                            w={24}
                            fontFamily={'Lexend-Light'}
                            color={'grey.400'}>
                            {item?.kids_opinion}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                  <Row alignItems={'center'} mt={5}>
                    <Image
                      source={require('../../assets/smoking.png')}
                      alt={'love'}
                      h={6}
                      w={6}
                      resizeMode="contain"
                    />
                    <Text ml={2} fontSize={16} fontFamily={'Lexend-SemiBold'}>
                      Smooking Opinion
                    </Text>
                  </Row>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {smookingData?.data?.map(item => {
                      return (
                        <Pressable
                          onPress={() => {
                            navigation.navigate('Smoke', {
                              fromVerif: true,
                              prefrenceId: item?.id,
                            });
                          }}
                          key={item?.id}
                          mx={3}
                          my={4}>
                          <Image
                            source={{uri: item?.image}}
                            h={24}
                            w={24}
                            alt={'img'}
                          />
                          <Text
                            fontSize={12}
                            mt={2}
                            w={24}
                            fontFamily={'Lexend-Light'}
                            color={'grey.400'}>
                            {item?.smoking_opinion}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                  <Row alignItems={'center'} mt={5}>
                    <Image
                      source={require('../../assets/healthy.png')}
                      alt={'love'}
                      h={6}
                      w={6}
                      resizeMode="contain"
                    />
                    <Text ml={2} fontSize={16} fontFamily={'Lexend-SemiBold'}>
                      Eating Habbits
                    </Text>
                  </Row>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {eatingHabbit?.data?.map(item => {
                      return (
                        <Pressable
                          onPress={() => {
                            navigation.navigate('Eating', {
                              fromVerif: true,
                              prefrenceId: item?.id,
                            });
                          }}
                          key={item?.id}
                          mx={3}
                          my={4}>
                          <Image
                            source={{uri: item?.image}}
                            h={24}
                            w={24}
                            alt={'img'}
                          />
                          <Text
                            fontSize={12}
                            mt={2}
                            w={24}
                            fontFamily={'Lexend-Light'}
                            color={'grey.400'}>
                            {item?.hobby}
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
