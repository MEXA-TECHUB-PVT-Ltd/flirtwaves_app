import {View, Text, Pressable, Row, Image, Box, ScrollView} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import {ImageBackground, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Content = ({navigation}) => {
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
  ];
  const [like, setLiked] = React.useState(false);
  const [selected, setSelected] = React.useState();
  return (
    <View bg={'white'} flex={1}>
      <Header />
      <ScrollView>
        <View mx={5} my={5}>
          {data?.map((item, index) => {
            return (
              <>
                <ImageBackground
                  source={item?.img}
                  key={index}
                  style={{height: 350, marginBottom: 20}}
                  imageStyle={{
                    borderRadius: 10,
                    resizeMode: 'cover',
                  }}>
                  <Pressable
                    flex={1}
                    flexDir={'column'}
                    onPress={() => {
                      navigation.navigate('Filter');
                    }}
                    justifyContent={'space-between'}
                    p={2}>
                    <Row alignItems={'center'} justifyContent={'space-between'}>
                      <View
                        bg={index === 3 ? '#FFFFFF2B' : '#1919192B'}
                        borderRadius={10}
                        p={1}>
                        <Text
                          mx={1}
                          fontSize={12}
                          fontFamily={'Lexend-Light'}
                          color={index === 3 ? 'white' : 'black'}>
                          {item?.distance} away
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => {
                          setSelected(index);
                          setLiked(!like);
                        }}>
                        <View
                          bg={'white'}
                          borderRadius={20}
                          p={2}
                          alignItems={'center'}
                          justifyContent={'center'}>
                          <AntDesign
                            name={
                              like === true && index === selected
                                ? 'heart'
                                : 'hearto'
                            }
                            size={20}
                            color={'#F5BF03'}
                          />
                        </View>
                      </Pressable>
                    </Row>
                    <View>
                      <Row>
                        <Row alignItems={'center'}>
                          <Text
                            fontSize={18}
                            color={'white'}
                            fontFamily={'Lexend-Regular'}>
                            {item?.name}, {item?.age}
                          </Text>
                          {item?.isVerified === true ? (
                            <Image
                              ml={3}
                              source={require('../../assets/verified.png')}
                              h={6}
                              alt={'img'}
                              w={6}
                              resizeMode="contain"
                            />
                          ) : null}
                        </Row>
                      </Row>
                      <Box mt={2}>
                        <Row
                          alignItems={'center'}
                          bg={
                            item?.status === 'offline'
                              ? 'transparent'
                              : '#039D0040'
                          }
                          w={item?.status === 'offline' ? '22%' : '28%'}
                          borderColor={'#6E6E6E'}
                          borderWidth={item?.status === 'offline' ? 1 : null}
                          p={2}
                          borderRadius={10}>
                          <View
                            bg={
                              item?.status === 'offline' ? '#6E6E6E' : '#039D00'
                            }
                            h={2}
                            w={2}
                            rounded={'full'}></View>
                          <Text
                            fontSize={10}
                            fontFamily={'Lexend-Light'}
                            ml={2}
                            color={'white'}>
                            {item?.status}
                          </Text>
                        </Row>
                      </Box>
                    </View>
                  </Pressable>
                  <View style={[styles.overlay, {height: 400}]} />
                </ImageBackground>
              </>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
export default Content;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.7,
    backgroundColor: 'black',
  },
});
