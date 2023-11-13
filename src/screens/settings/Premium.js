import {View, Text, Row, Box, Pressable} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import FButton from '../../components/button/FButton';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';

const Premium = ({navigation}) => {
  const data = [
    {
      id: 1,
      name: 'Unlock premium features for one month.',
    },
    {
      id: 2,
      name: 'Access advanced matching capabilities.',
    },
    {
      id: 3,
      name: 'Send unlimited likes to increase your connections.',
    },
    {
      id: 4,
      name: 'Enjoy enhanced privacy controls for a secure and enjoyable experience.',
    },
    {id: 5, name: `Gain insights into who's interested in your profile.`},
    {id: 6, name: 'Priority customer support for quick assistance.'},
    {id: 7, name: 'No ads for a distraction-free experience'},
    {id: 8, name: 'Flexible monthly pricing for your convenience.'},
    {id: 9, name: 'Easily upgrade, downgrade, or cancel anytime.'},
  ];
  const [id, setId] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  return (
    <View bg={'white'} flex={1}>
      <Header title={'Go Premium'} />
      <CustomSnackbar
        message={'Success'}
        visible={visible}
        height={'8%'}
        onDismiss={() => {
          setVisible(false);
          navigation.goBack();
        }}
        messageDescription={'Subscription paid Successfully'}
      />
      <View m={5} mx={6} flex={1} mt={8}>
        <View bg={'#F2F2F2'} p={2} borderRadius={10}>
          <Row alignItems={'center'} justifyContent={'space-around'}>
            <Pressable
              onPress={() => setId(1)}
              bg={id === 1 ? 'primary.400' : 'transparent'}
              p={3}
              borderRadius={10}
              alignItems={'center'}
              justifyContent={'center'}>
              <Text
                fontSize={id === 1 ? 18 : 16}
                fontFamily={'Lexend-SemiBold'}
                color={id === 1 ? 'black' : 'grey.400'}>
                $ 500
              </Text>
              <Text
                fontSize={10}
                fontFamily={'Lexend-Regular'}
                color={id === 1 ? 'black' : 'grey.400'}
                mt={2}>
                {' '}
                Monthly Plan
              </Text>
            </Pressable>
            <Pressable
              bg={id === 2 ? 'primary.400' : 'transparent'}
              onPress={() => setId(2)}
              p={3}
              borderRadius={10}
              alignItems={'center'}
              justifyContent={'center'}>
              <Text
                fontSize={id === 2 ? 18 : 16}
                fontFamily={'Lexend-SemiBold'}
                color={id === 2 ? 'black' : 'grey.400'}>
                $ 900
              </Text>
              <Text
                mt={2}
                fontSize={10}
                fontFamily={'Lexend-Regular'}
                color={id === 2 ? 'black' : 'grey.400'}>
                {' '}
                Quaterly Plan
              </Text>
            </Pressable>
            <Pressable
              bg={id === 3 ? 'primary.400' : 'transparent'}
              onPress={() => setId(3)}
              p={3}
              borderRadius={10}
              alignItems={'center'}
              justifyContent={'center'}>
              <Text
                fontSize={id === 3 ? 18 : 16}
                fontFamily={'Lexend-SemiBold'}
                color={id === 3 ? 'black' : 'grey.400'}>
                $ 1000
              </Text>
              <Text
                mt={2}
                fontSize={10}
                fontFamily={'Lexend-Regular'}
                color={id === 3 ? 'black' : 'grey.400'}>
                {' '}
                Yearly Plan
              </Text>
            </Pressable>
          </Row>
        </View>
        <Text
          fontSize={16}
          fontFamily={'Lexend-SemiBold'}
          color={'primary.400'}
          my={4}>
          Plan Description
        </Text>
        {id === 1 && (
          <>
            {data?.map(item => {
              return (
                <View key={item?.id} mb={4}>
                  <Row>
                    <View
                      bg={'primary.400'}
                      h={2}
                      w={2}
                      rounded={'full'}
                      mt={2}></View>
                    <Text
                      fontSize={13}
                      fontFamily={'Lexend-Regular'}
                      ml={3}
                      color={'grey.400'}>
                      {item?.name}
                    </Text>
                  </Row>
                </View>
              );
            })}
          </>
        )}
        {id === 2 && (
          <>
            {data?.map(item => {
              return (
                <View key={item?.id} mb={4}>
                  <Row>
                    <View
                      bg={'primary.400'}
                      h={2}
                      w={2}
                      rounded={'full'}
                      mt={2}></View>
                    <Text
                      fontSize={13}
                      fontFamily={'Lexend-Regular'}
                      ml={3}
                      color={'grey.400'}>
                      {item?.name}
                    </Text>
                  </Row>
                </View>
              );
            })}
          </>
        )}
        {id === 3 && (
          <>
            {data?.map(item => {
              return (
                <View key={item?.id} mb={4}>
                  <Row>
                    <View
                      bg={'primary.400'}
                      h={2}
                      w={2}
                      rounded={'full'}
                      mt={2}></View>
                    <Text
                      fontSize={13}
                      fontFamily={'Lexend-Regular'}
                      ml={3}
                      color={'grey.400'}>
                      {item?.name}
                    </Text>
                  </Row>
                </View>
              );
            })}
          </>
        )}
      </View>
      <View mb={12} mx={5}>
        <FButton
          variant={'Solid'}
          label={'Pay Now'}
          onPress={() => setVisible(true)}
        />
      </View>
    </View>
  );
};

export default Premium;
