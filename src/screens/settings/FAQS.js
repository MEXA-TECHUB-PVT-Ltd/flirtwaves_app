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

const FAQS = ({navigation}) => {
  const data = [
    {
      id: 1,
      que: 'Is this dating app free to use?',
      ans: 'This app is designed to help users easily book and manage appointments with Professional Doctors or service providers.',
    },
    {
      id: 2,
      que: 'Can I edit my profile information after creating it?',
      ans: 'This app is designed to help users easily book and manage appointments with Professional Doctors or service providers.',
    },
    {
      id: 3,
      que: 'What is the matching algorithm used in this dating app?',
      ans: 'This app is designed to help users easily book and manage appointments with Professional Doctors or service providers.',
    },
    {
      id: 4,
      que: 'How can I report inappropriate or offensive content or behavior?',
      ans: 'This app is designed to help users easily book and manage appointments with Professional Doctors or service providers.',
    },
    {
      id: 5,
      que: 'Can I delete my account if I no longer want to use the app?',
      ans: 'This app is designed to help users easily book and manage appointments with Professional Doctors or service providers.',
    },
    {
      id: 6,
      que: 'How do I contact customer support if I have a question or issue?',
      ans: 'This app is designed to help users easily book and manage appointments with Professional Doctors or service providers.',
    },
    {
      id: 7,
      que: 'Can I use this dating app on multiple devices with the same account?',
      ans: 'This app is designed to help users easily book and manage appointments with Professional Doctors or service providers.',
    },
  ];
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

            <ScrollView></ScrollView>
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
          <Header title={'FAQs'} handlePress={() => setClicked(true)} />

          <ScrollView>
            <View m={5} mx={4}>
              {data?.map(item => {
                return (
                  <Pressable
                    borderRadius={10}
                    key={item?.id}
                    onPress={() => {
                      setSelected(item?.id);
                      handleSelection(item?.id);
                    }}
                    bg={item?.id === selected ? 'primary.20' : null}
                    p={2}>
                    <Row
                      // mx={2}
                      flexDir={'row'}
                      alignItems={'center'}
                      justifyContent={'space-between'}>
                      <Text
                        fontSize={item?.id === selected ? 14 : 14}
                        fontFamily={
                          item?.id === selected
                            ? 'Lexend-SemiBold'
                            : 'Lexend-Regular'
                        }
                        w={'90%'}
                        color={'black'}>
                        {item?.que}
                      </Text>
                      <AntDesign
                        name={item?.id === selected ? 'up' : 'down'}
                        color={'black'}
                        size={15}
                      />
                    </Row>
                    {item?.id === selected ? (
                      <Text
                        fontSize={12}
                        fontFamily={'Lexend-Light'}
                        mt={2}
                        color={'grey.400'}>
                        {item?.ans}
                      </Text>
                    ) : null}

                    <Divider
                      my={2}
                      bg={
                        item?.id === selected || item?.id === 5
                          ? 'transparent'
                          : null
                      }
                    />
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default FAQS;

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
