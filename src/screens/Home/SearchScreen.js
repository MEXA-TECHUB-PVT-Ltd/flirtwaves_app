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
} from 'native-base';
import React from 'react';
import {FlatList, StyleSheet, ImageBackground} from 'react-native';
import Header from '../../components/Header/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import {useGetUserCrushesQuery} from '../../redux/apis/auth';
import {useSelector} from 'react-redux';

const SearchScreen = ({navigation}) => {
  const [focused, setFocued] = React.useState(false);
  const uid = useSelector(state => state?.auth?.userData?.id);
  const [page, setPage] = React.useState(1);
  const {data: crushData, isLoading: crushLoading} = useGetUserCrushesQuery({
    id: uid,
    page: page,
  });
  console.log(crushData);

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
            navigation.navigate('Filter', {otherId: item?.id});
            setFocued(false);
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

    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Filter', {otherId: item?.id});
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
  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <View flex={1} bg={'white'}>
      <Header title={'My Crushes'} />
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
          {crushData?.userCrushes?.map((item, index) => {
            return (
              <Pressable
                key={index}
                my={2}
                onPress={() =>
                  navigation.navigate('Filter', {otherId: item?.id})
                }>
                <ImageBackground
                  source={item?.images ? {uri: item?.images[0]} : null}
                  imageStyle={{borderRadius: 12, resizeMode: 'cover'}}
                  style={{
                    height: 180,
                    width: 152,
                    flex: 1,
                    padding: 5,
                  }}>
                  <View position={'absolute'} bottom={3} left={2}>
                    <Text
                      alignSelf={'baseline'}
                      fontSize={14}
                      mb={2}
                      color={'white'}
                      fontFamily={'Lexend-SemiBold'}>
                      {item?.name}, {calculateAge(item?.dob)}
                    </Text>
                    <View bg={'#353535'} p={1} borderRadius={10}>
                      <Text
                        alignSelf={'baseline'}
                        fontSize={10}
                        color={'white'}
                        fontFamily={'Lexend-Medium'}>
                        {item?.distance?.toFixed(2)} km away
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
              data={crushData?.userCrushes}
              renderItem={renderItem}
              keyExtractor={item => item?.id}
              //   style={styles.historyList}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
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
