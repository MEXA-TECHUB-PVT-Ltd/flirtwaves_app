import {StyleSheet} from 'react-native';
import {Pressable, Text, View} from 'native-base';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import {useUpdateUserProfileMutation} from '../../redux/apis/auth';
import {useSelector} from 'react-redux';

const Header = props => {
  const uid = useSelector(state => state.auth?.userData?.id);
  const userProfile = useSelector(state => state.auth?.userProfile);
  const [updateUser, {isError}] = useUpdateUserProfileMutation();
  const navigation = useNavigation();
  return (
    <View
      m={5}
      ml={3}
      mb={0}
      flexDir={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <Pressable
        onPress={() => {
          if (props?.fromSettings === true) {
            navigation.navigate('Tabs', {screen: 'Settings'});
          } else {
            navigation.goBack();
          }
        }}>
        <Entypo name={'chevron-left'} size={30} color={'black'} />
      </Pressable>

      {props?.load ? (
        <View style={styles.container}>
          <View style={[styles.progressBar, {width: `${props?.load}%`}]} />
        </View>
      ) : (
        <>
          <Text fontSize={22} color={'black'} fontFamily={'Lexend-SemiBold'}>
            {props?.title}
          </Text>
          {/* <Pressable onPress={() => navigation.goBack()}> */}
          {props?.title !== 'FAQs' && (
            <>
              {props?.right ? (
                <Pressable
                  onPress={async () => {
                    let body = {
                      id: uid,
                      date: userProfile,
                    };
                    updateUser(body).then(res => {
                      console.log(res);
                      if (res?.data?.error === false) {
                        navigation.navigate('Tabs', {screen: 'Home'});
                      }
                    });
                  }}>
                  <Text fontSize={16} underline fontFamily={'Lexend-Medium'}>
                    Skip
                  </Text>
                </Pressable>
              ) : (
                <Entypo name="chevron-left" size={30} color={'transparent'} />
              )}
            </>
          )}

          {props?.title === 'FAQs' && (
            <Pressable p={2} onPress={props?.handlePress}>
              <EvilIcons name="search" size={30} color={'black'} />
            </Pressable>
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
