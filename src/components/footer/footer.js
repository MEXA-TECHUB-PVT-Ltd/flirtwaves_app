import {StyleSheet, ActivityIndicator} from 'react-native';
import {Pressable, Text, View, Row} from 'native-base';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Footer = props => {
  const navigation = useNavigation();
  return (
    <View m={5} ml={3} mb={0}>
      <Row
        mb={4}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Row alignItems={'center'}>
          <Text fontSize={14} fontFamily={'Lexend-SemiBold'}>
            {props?.num}
          </Text>
          <Text color={'grey.400'} fontSize={16}>
            /
          </Text>
          <Text color={'grey.400'} fontSize={16}>
            12
          </Text>
        </Row>
        <Pressable
          bg={'primary.400'}
          borderRadius={10}
          p={1}
          onPress={() => props?.onPress()}>
          {props?.loading ? (
            <ActivityIndicator size={'small'} color={'black'} />
          ) : (
            <Entypo name={'chevron-right'} size={30} color={'black'} />
          )}
        </Pressable>
      </Row>

      {props?.load ? (
        <View style={styles.container}>
          <View style={[styles.progressBar, {width: `${props?.load}%`}]} />
        </View>
      ) : null}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,

    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: 5,
    backgroundColor: '#f5bf03', // Green color
  },
  progressText: {
    textAlign: 'center',
    marginTop: 5,
  },
});
