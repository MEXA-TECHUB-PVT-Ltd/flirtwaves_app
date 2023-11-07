import {
  VStack,
  Modal,
  Text,
  Button,
  Heading,
  Row,
  View,
  Image,
} from 'native-base';
import React from 'react';
import FButton from '../button/FButton';

export default function ({
  modalVisible,
  setModalVisible,
  heading,
  message,
  btntxt1,
  btntxt2,
  children,
  onPress,
  fromSettings,
  fromAuth,
  onPress1,
  comon,
  h,
}) {
  // const [modalVisible, setModalVisible] = React.useState();
  return (
    <Modal isOpen={modalVisible} flex={1} p={2} borderRadius={24}>
      <Modal.Content
        borderRadius={20}
        w={'90%'}
        h={h}
        _light={{bg: 'white'}}
        // alignItems={'flex-start'}
        _dark={{bg: 'black'}}>
        {fromAuth === true ? (
          <>
            <Image
              source={require('../../assets/map.png')}
              h={20}
              mt={5}
              w={20}
              resizeMode="contain"
              alignSelf={'center'}
              alt={'img'}
            />
            <View mx={5}>
              <Text
                mt={2}
                fontSize={14}
                fontFamily={'Lexend-Light'}
                textAlign={'center'}
                color={'grey.400'}>
                Enable location through which we can provide you with profile
                who are nearby and meet your preferences.
              </Text>
              <View mb={4}>
                <FButton
                  mt={8}
                  variant={'Solid'}
                  label={'Use my current location'}
                  onPress={onPress}
                />
                <FButton
                  mt={4}
                  variant={'outline'}
                  label={'Maybe, later'}
                  onPress={onPress1}
                />
              </View>
            </View>
          </>
        ) : null}
        {comon ? (
          <>
            <Image
              mt={5}
              source={require('../../assets/warning.png')}
              h={20}
              w={20}
              resizeMode="contain"
              alignSelf={'center'}
              alt={'img'}
            />
            {heading ? (
              <Text
                mt={2}
                mx={5}
                // w={'100%'}
                color={'black'}
                fontFamily={'Lexend-SemiBold'}
                textAlign="center"
                fontSize={18}>
                {heading}
              </Text>
            ) : null}
            {message ? (
              <Text
                mt={2}
                fontSize={14}
                fontFamily={'Lexend-Light'}
                textAlign={'center'}
                color={'grey.400'}
                mx={5}>
                {message}
              </Text>
            ) : null}

            <Button.Group
              // direction="coloumn"
              my="3"
              // flex={1}
              // w=
              alignSelf={'center'}
              // justifyContent="space-between"
              alignItems={'center'}
              // ml={5}
            >
              <Row
                alignSelf={'center'}
                alignItems={'center'}
                justifyContent="center">
                {btntxt1 ? (
                  <Button
                    rounded="full"
                    // _stack={{bgColor: 'transparent'}}
                    accessibilityLabel="modal-btn1"
                    onPress={
                      () => {
                        setModalVisible(false);
                      }
                      // await storeScreenName('SCREENNAME', 'AddLocationScreen');
                      // navigation.navigate('AddLocationScreen');
                    }
                    mr={2}
                    alignSelf={'center'}
                    w={'42%'}
                    variant="outline"
                    _text={{
                      color: 'primary.50',
                      fontSize: 14,
                      fontFamily: 'NotoSans-Medium',
                    }}
                    borderColor={'primary.50'}
                    borderWidth={1}
                    // flex={1}
                    size="sm">
                    {btntxt1}
                  </Button>
                ) : null}

                <Button
                  _stack={{bgColor: 'transparent'}}
                  mt={5}
                  // ml={1}
                  // borderWidth={1}
                  accessibilityLabel="modal-btn2"
                  onPress={
                    // handleDontAllow();
                    onPress
                  }
                  rounded="md"
                  // flex={1}
                  w={fromSettings ? '40%' : '80%'}
                  // ml={fromSettings === true ? 2 : 16}
                  size={btntxt1 ? 'sm' : 'sm'}
                  bg={'primary.400'}
                  _text={{
                    color: 'black',
                    fontSize: 14,
                    fontFamily: 'NotoSans-Medium',
                  }}
                  //   variant="outline"
                >
                  {btntxt2}
                </Button>
              </Row>
            </Button.Group>
          </>
        ) : null}

        {/* </View> */}
      </Modal.Content>
    </Modal>
  );
}
