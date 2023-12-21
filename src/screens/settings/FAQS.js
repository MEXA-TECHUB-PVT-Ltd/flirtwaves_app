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
import {useGetFaqsQuery} from '../../redux/apis/auth';
import LoaderModal from '../../components/Loader/Loader';

const FAQS = ({navigation}) => {
  const [page, setPage] = React.useState(1);
  const {data: FaqData, isLoading} = useGetFaqsQuery(page);

  const [selected, setSelected] = React.useState();
  const handleSelection = id => {
    if (selected === id) {
      setSelected();
    }
  };
  const [clicked, setClicked] = React.useState(false);

  const [focused, setFocued] = React.useState(false);

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
              {FaqData?.data?.map(item => {
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
                        {item?.question}
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
                        {item?.answer}
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
      <LoaderModal visible={isLoading} />
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
