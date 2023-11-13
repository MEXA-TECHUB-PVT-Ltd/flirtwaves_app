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
  cancelPress,
  onPress1,
  comon,
  verifi,
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
                fontSize={12}
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
            {heading === 'Contact Support' ? (
              <Image
                mt={5}
                source={require('../../assets/email.png')}
                h={20}
                w={20}
                resizeMode="contain"
                alignSelf={'center'}
                alt={'img'}
              />
            ) : (
              <Image
                mt={5}
                source={require('../../assets/warning.png')}
                h={20}
                w={20}
                resizeMode="contain"
                alignSelf={'center'}
                alt={'img'}
              />
            )}

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
                fontSize={12}
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
                    // _stack={{bgColor: 'transparent'}}
                    accessibilityLabel="modal-btn1"
                    onPress={
                      cancelPress

                      // await storeScreenName('SCREENNAME', 'AddLocationScreen');
                      // navigation.navigate('AddLocationScreen');
                    }
                    borderRadius={10}
                    bg={'primary.20'}
                    mr={2}
                    alignSelf={'center'}
                    w={'42%'}
                    variant="outline"
                    _text={{
                      color: 'primary.400',
                      fontSize: 14,
                      fontFamily: 'NotoSans-Medium',
                    }}
                    borderColor={'primary.400'}
                    borderWidth={1}
                    // flex={1}
                    size="sm">
                    {btntxt1}
                  </Button>
                ) : null}

                <Button
                  _stack={{bgColor: 'transparent'}}
                  // mt={5}
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
        {verifi ? (
          <View m={5}>
            <Text
              fontSize={16}
              fontFamily={'Lexend-SemiBold'}
              textAlign={'center'}>
              Instructions
            </Text>
            <Text
              textAlign={'ledt'}
              fontSize={12}
              color={'grey.400'}
              fontFamily={'Lexend-Light'}>
              Verify your identity with a quick 5-second video
            </Text>
            <Row alignItems={'center'} mt={2}>
              <View h={2} w={2} bg={'primary.400'} rounded={'full'}></View>
              <Text
                ml={2}
                textAlign={'ledt'}
                fontSize={12}
                color={'grey.400'}
                fontFamily={'Lexend-Light'}>
                Click the 'Record' button below.
              </Text>
            </Row>
            <Row mt={2}>
              <View
                h={2}
                w={2}
                bg={'primary.400'}
                rounded={'full'}
                mt={2}></View>
              <Text
                ml={2}
                textAlign={'ledt'}
                fontSize={12}
                color={'grey.400'}
                fontFamily={'Lexend-Light'}>
                Nod your head in a 'yes' motion for the entire 5 seconds.
              </Text>
            </Row>
            <Row alignItems={'center'} mt={2}>
              <View h={2} w={2} bg={'primary.400'} rounded={'full'}></View>
              <Text
                ml={2}
                textAlign={'ledt'}
                fontSize={12}
                color={'grey.400'}
                fontFamily={'Lexend-Light'}>
                Ensure your face is clearly visible in the video.
              </Text>
            </Row>
            <Row alignItems={'center'} mb={4} mt={2}>
              <View h={2} w={2} bg={'primary.400'} rounded={'full'}></View>
              <Text
                ml={2}
                textAlign={'ledt'}
                fontSize={12}
                color={'grey.400'}
                fontFamily={'Lexend-Light'}>
                Click 'Submit' after recording.
              </Text>
            </Row>
            <FButton label={'Ok'} onPress={onPress} variant={'Solid'} />
          </View>
        ) : null}

        {/* </View> */}
      </Modal.Content>
    </Modal>
  );
}
