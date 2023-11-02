import {StyleSheet} from 'react-native';
import {Pressable, Text, View} from 'native-base';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Header = props => {
  const navigation = useNavigation();
  return (
    <View
      m={5}
      ml={3}
      mb={0}
      flexDir={'row'}
      alignItems={'center'}
      justifyContent={props?.load ? null : 'space-between'}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <Entypo name={'chevron-left'} size={30} color={'black'} />
      </Pressable>

      {props?.load ? (
        <View style={styles.container}>
          <View style={[styles.progressBar, {width: `${props?.load}%`}]} />
        </View>
      ) : (
        <>
          <Text fontSize={22} color={'white'} fontFamily={'Lexend-SemiBold'}>
            {props?.title}
          </Text>
          {/* <Pressable onPress={() => navigation.goBack()}> */}
          {props?.right ? (
            <Pressable onPress={() => {}}>
              <AntDesign name="infocirlce" color={'white'} size={20} />
            </Pressable>
          ) : (
            <Entypo name="chevron-left" size={30} color={'transparent'} />
          )}

          {/* </Pressable> */}
        </>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    // marginTop: 20,

    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#E1E1E1',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: 5,
    backgroundColor: '#6C309C', // Green color
  },
  progressText: {
    textAlign: 'center',
    marginTop: 5,
  },
});
