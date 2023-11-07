import {
  View,
  Text,
  Pressable,
  Input,
  ScrollView,
  Row,
  Icon,
  Divider,
  Image,
  FavouriteIcon,
} from 'native-base';
import React from 'react';
import {FlatList, StyleSheet, ImageBackground} from 'react-native';
import Header from '../../components/Header/Header';
import Entypo from 'react-native-vector-icons/Entypo';

const FavoriteScreen = ({navigation}) => {
  const [focused, setFocued] = React.useState(false);
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
      setFocued(false);
    }, 2000);
  };

  const highlightMatches = item => {
    const lowerCaseSearchText = searchText.toLowerCase();

    if (!lowerCaseSearchText) {
      // No search text, return the original item
      return (
        <Pressable
          onPress={() => {
            navigation.navigate('FavoriteUser');
            setFocued(false);
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
          navigation.navigate('FavoriteUser');
          setFocued(false);
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

  return (
    <View flex={1} bg={'white'}>
      <Text
        mx={5}
        mt={5}
        fontSize={20}
        fontFamily={'Lexend-SemiBold'}
        color={'primary.400'}>
        Favorites
      </Text>
      <Input
        alignSelf={'center'}
        mt={5}
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
      <ScrollView>
        <View
          mx={5}
          my={5}
          flexWrap={'wrap'}
          flexDir={'row'}
          justifyContent={'space-between'}>
          {data?.map((item, index) => {
            return (
              <Pressable
                key={index}
                my={2}
                onPress={() => navigation.navigate('FavoriteUser')}>
                <ImageBackground
                  source={item?.img}
                  imageStyle={{borderRadius: 12, resizeMode: 'cover'}}
                  style={{
                    height: 180,
                    width: 152,
                    flex: 1,
                    padding: 5,
                  }}>
                  <FavouriteIcon
                    size={'md'}
                    color={'primary.400'}
                    m={1}
                    alignSelf={'flex-end'}
                  />
                  <View position={'absolute'} bottom={3} left={2}>
                    <Text
                      alignSelf={'baseline'}
                      fontSize={14}
                      mb={2}
                      color={'white'}
                      fontFamily={'Lexend-SemiBold'}>
                      {item?.name}, {item?.age}
                    </Text>
                    <View bg={'#FFFFFF4D'} p={1} borderRadius={10}>
                      <Text
                        alignSelf={'baseline'}
                        fontSize={10}
                        color={'white'}
                        fontFamily={'Lexend-Medium'}>
                        {item?.distance} away
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      {focused === true && (
        <View
          bg={'white'}
          position={'absolute'}
          borderRadius={10}
          zIndex={999}
          h={48}
          w={'85%'}
          top={32}
          right={6}>
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
  );
};

export default FavoriteScreen;
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

//  {
//    recentSearchData?.map((item, index) => (
//      <Row mt={1} alignItems="center">
//        {/* <AntDesign name="clockcircleo" size={18} color="black" /> */}
//        <Text
//          mx="4"<CancelRecentSearch width={10} height={10} />
//          key={index}
//          fontSize="md"
//          onPress={() => {
//            handleRecentSearch(item.recentSearch);
//          }}>
//          {item.recentSearch}
//        </Text>
//      </Row>
//    ));
//  }
//
