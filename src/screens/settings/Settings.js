import {View, Text, Image, Row, Pressable} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import FButton from '../../components/button/FButton';
import AlertModal from '../../components/Modal/AlertModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {setUserData} from '../../redux/slices/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useDispatch } from 'react-redux';
const Settings = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const [active, setActive] = React.useState(false);
  async function removeUserSession() {
    try {
      await EncryptedStorage.removeItem('user_session');
      // Congrats! You've just removed your first value!
    } catch (error) {
      // There was an error on the native side
    }
  }
  const dispatch=useDispatch()
  return (
    <View bg={'white'} flex={1}>
      <Header title={'Settings'} />
      <View mx={5} mt={10} flex={1}>
        <Pressable onPress={() => navigation.navigate('Premium')}>
          <View
            borderColor={'#00000017'}
            borderWidth={1}
            p={3}
            borderRadius={10}>
            <Row alignItems={'center'}>
              <Image
                source={require('../../assets/sub.png')}
                h={5}
                w={5}
                alt={'img'}
                resizeMode="contain"
              />

              <Text fontSize={16} fontFamily={'Lexend-Medium'} ml={4}>
                Go Premium
              </Text>
            </Row>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ChangePassword')} mt={5}>
          <View
            borderColor={'#00000017'}
            borderWidth={1}
            p={3}
            borderRadius={10}>
            <Row alignItems={'center'}>
              <MaterialCommunityIcons name="lock" size={20} color={'#f5bf03'} />

              <Text fontSize={16} fontFamily={'Lexend-Medium'} ml={4}>
                Change Password
              </Text>
            </Row>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Feedback')} mt={5}>
          <View
            borderColor={'#00000017'}
            borderWidth={1}
            p={3}
            borderRadius={10}>
            <Row alignItems={'center'}>
              <MaterialIcons name="feedback" size={20} color={'#f5bf03'} />

              <Text fontSize={16} fontFamily={'Lexend-Medium'} ml={4}>
                Give Feedback
              </Text>
            </Row>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('PrivacySetting');
            // console.log('Press');
          }}>
          <View
            borderColor={'#00000017'}
            borderWidth={1}
            p={3}
            borderRadius={10}
            my={5}>
            <Row alignItems={'center'}>
              <Image
                source={require('../../assets/privacy-policy.png')}
                h={5}
                w={5}
                alt={'img'}
                resizeMode="contain"
              />

              <Text fontSize={16} fontFamily={'Lexend-Medium'} ml={4}>
                Privacy Policy
              </Text>
            </Row>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Faq')}>
          <View
            borderColor={'#00000017'}
            borderWidth={1}
            p={3}
            borderRadius={10}>
            <Row alignItems={'center'}>
              <Image
                source={require('../../assets/faq.png')}
                h={5}
                w={5}
                alt={'img'}
                resizeMode="contain"
              />

              <Text fontSize={16} fontFamily={'Lexend-Medium'} ml={4}>
                FAQs
              </Text>
            </Row>
          </View>
        </Pressable>
        <Pressable onPress={() => setActive(true)}>
          <View
            borderColor={'#00000017'}
            borderWidth={1}
            p={3}
            borderRadius={10}
            my={5}>
            <Row alignItems={'center'}>
              <Image
                source={require('../../assets/email.png')}
                h={5}
                w={5}
                alt={'img'}
                resizeMode="contain"
              />

              <Text fontSize={16} fontFamily={'Lexend-Medium'} ml={4}>
                Contact Support
              </Text>
            </Row>
          </View>
        </Pressable>
      </View>
      <View mb={10} mx={5}>
        <FButton
          label={'Logout'}
          variant={'Solid'}
          onPress={() => setVisible(true)}
        />
      </View>
      <AlertModal
        modalVisible={visible}
        cancelPress={() => {
          setVisible(false);
        }}
        fromSettings
        heading={'Logout'}
        message={'Are you sure you want to logout?'}
        btntxt1={'Cancel'}
        btntxt2={'Yes,Logout'}
        comon={true}
        onPress={() => {
          setVisible(false);
          removeUserSession();
          dispatch(setUserData({}));
          navigation.navigate('OnBoarding');
        }}></AlertModal>
      <AlertModal
        modalVisible={active}
        heading={'Contact Support'}
        message={
          'If you require support, please feel free to reach out to us at [supportwaves@gmail.com].'
        }
        btntxt2={'Ok'}
        comon={true}
        onPress={() => {
          setActive(false);
        }}></AlertModal>
    </View>
  );
};
export default Settings;
