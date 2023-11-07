import {
  View,
  Text,
  Image,
  Row,
  Pressable,
  ScrollView,
  Avatar,
  Divider,
} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';

const CallHistory = ({navigation}) => {
  const data = [
    {
      id: 1,
      img: require('../../assets/h1.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h2.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h3.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h4.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h5.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h6.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h1.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
    {
      id: 1,
      img: require('../../assets/h2.png'),
      name: 'Sahara Ardia',
      callType: 'Voice call',
      duration: '00:30:42',
    },
  ];
  return (
    <View flex={1} bg={'white'}>
      <Header title={'Call History'} />
      <View m={5}>
        <ScrollView>
          {data?.map((item, index) => {
            return (
              <View borderRadius={10} p={2} key={index}>
                <Row
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  mx={2}>
                  <Row alignItems={'center'}>
                    <Avatar source={item?.img} size={'sm'} />
                    <View ml={2}>
                      <Text
                        color={'black'}
                        fontSize={16}
                        fontFamily={'Lexend-Medium'}>
                        {item?.name}
                      </Text>
                      <Text
                        color={'txtColor'}
                        fontSize={10}
                        fontFamily={'Lexend-Regular'}>
                        {item?.callType} {item?.duration}
                      </Text>
                    </View>
                  </Row>
                  <Row alignItems={'center'}>
                    <Pressable onPress={() => navigation.navigate('AudioCall')}>
                      <Image
                        h={4}
                        w={4}
                        resizeMode={'contain'}
                        alt={'audio'}
                        mr={5}
                        source={require('../../assets/call.png')}
                      />
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('VideoCall')}>
                      <Image
                        h={6}
                        w={6}
                        resizeMode={'contain'}
                        alt={'audio'}
                        source={require('../../assets/video.png')}
                      />
                    </Pressable>
                  </Row>
                </Row>
                <Divider
                  bg={index === 7 ? 'transparent' : 'grey.400'}
                  my={2}
                  opacity={0.5}
                  w={'85%'}
                  alignSelf={'flex-end'}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
export default CallHistory;
