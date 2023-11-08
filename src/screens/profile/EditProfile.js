import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Row,
  Stack,
} from 'native-base';

import React from 'react';
import Header from '../../components/Header/Header';
import Swiper from 'react-native-swiper';
import FButton from '../../components/button/FButton';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';

const EditProfile = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <View flex={1} bg={'white'}>
      <Header title={'Edit Profile'} />
      <CustomSnackbar
        message={'Success'}
        visible={visible}
        height={'8%'}
        onDismiss={() => {
          setVisible(false);
          navigation.goBack();
        }}
        messageDescription={'Profile edited Successfully'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View h={380}>
          <Swiper
            // ref={swiper}

            showsPagination={true}
            showsButtons={false}
            activeDotStyle={{width: 20}}
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            paginationStyle={
              {
                //   bottom: 0,
                //   marginBottom: 20,
                // paddingBottom: 20,
              }
            }
            activeDotColor={'#F5BF03'}
            loop={false}>
            <Stack>
              <Image
                alignSelf={'center'}
                borderRadius={10}
                source={require('../../assets/h1.png')}
                mt={5}
                // h={'50%'}
                h={300}
                w={300}
                // w={'80%'}
                resizeMode={'cover'}
                alt={'img'}
              />
              <Pressable
                onPress={() =>
                  navigation.navigate('AddPhoto', {fromEdit: true})
                }
                position={'absolute'}
                p={1}
                right={10}
                bg={'primary.400'}
                rounded={'md'}
                flexDir={'row'}
                h={7}
                w={16}
                alignItems={'center'}
                justifyContent={'center'}
                top={8}>
                <Image
                  source={require('../../assets/edit.png')}
                  h={3}
                  w={3}
                  alt={'img'}
                  resizeMode={'contain'}
                />
                <Text
                  ml={1}
                  color={'black'}
                  fontSize={10}
                  fontFamily={'Lexend-Regular'}>
                  Edit
                </Text>
              </Pressable>
            </Stack>
            <Stack>
              <Image
                alignSelf={'center'}
                borderRadius={10}
                source={require('../../assets/h2.png')}
                mt={5}
                // h={'50%'}
                h={300}
                w={300}
                // w={'80%'}
                resizeMode={'cover'}
                alt={'img'}
              />
              <Pressable
                onPress={() =>
                  navigation.navigate('AddPhoto', {fromEdit: true})
                }
                position={'absolute'}
                p={1}
                right={10}
                bg={'primary.400'}
                rounded={'md'}
                flexDir={'row'}
                h={7}
                w={16}
                alignItems={'center'}
                justifyContent={'center'}
                top={8}>
                <Image
                  source={require('../../assets/edit.png')}
                  h={3}
                  w={3}
                  alt={'img'}
                  resizeMode={'contain'}
                />
                <Text
                  ml={1}
                  color={'black'}
                  fontSize={10}
                  fontFamily={'Lexend-Regular'}>
                  Edit
                </Text>
              </Pressable>
            </Stack>
            <Stack>
              <Image
                alignSelf={'center'}
                borderRadius={10}
                source={require('../../assets/h3.png')}
                mt={5}
                // h={'50%'}
                h={300}
                w={300}
                // w={'80%'}
                resizeMode={'cover'}
                alt={'img'}
              />
              <Pressable
                onPress={() =>
                  navigation.navigate('AddPhoto', {fromEdit: true})
                }
                position={'absolute'}
                p={1}
                right={10}
                bg={'primary.400'}
                rounded={'md'}
                flexDir={'row'}
                h={7}
                w={16}
                alignItems={'center'}
                justifyContent={'center'}
                top={8}>
                <Image
                  source={require('../../assets/edit.png')}
                  h={3}
                  w={3}
                  alt={'img'}
                  resizeMode={'contain'}
                />
                <Text
                  ml={1}
                  color={'black'}
                  fontSize={10}
                  fontFamily={'Lexend-Regular'}>
                  Edit
                </Text>
              </Pressable>
            </Stack>
            <Stack>
              <Image
                alignSelf={'center'}
                borderRadius={10}
                source={require('../../assets/h4.png')}
                mt={5}
                // h={'50%'}
                h={300}
                w={300}
                // w={'80%'}
                resizeMode={'cover'}
                alt={'img'}
              />
              <Pressable
                onPress={() =>
                  navigation.navigate('AddPhoto', {fromEdit: true})
                }
                position={'absolute'}
                p={1}
                right={10}
                bg={'primary.400'}
                rounded={'md'}
                flexDir={'row'}
                h={7}
                w={16}
                alignItems={'center'}
                justifyContent={'center'}
                top={8}>
                <Image
                  source={require('../../assets/edit.png')}
                  h={3}
                  w={3}
                  alt={'img'}
                  resizeMode={'contain'}
                />
                <Text
                  ml={1}
                  color={'black'}
                  fontSize={10}
                  fontFamily={'Lexend-Regular'}>
                  Edit
                </Text>
              </Pressable>
            </Stack>
            <Stack>
              <Image
                alignSelf={'center'}
                borderRadius={10}
                source={require('../../assets/h5.png')}
                mt={5}
                // h={'50%'}
                h={300}
                w={300}
                // w={'80%'}
                resizeMode={'cover'}
                alt={'img'}
              />
              <Pressable
                onPress={() =>
                  navigation.navigate('AddPhoto', {fromEdit: true})
                }
                position={'absolute'}
                p={1}
                right={10}
                bg={'primary.400'}
                rounded={'md'}
                flexDir={'row'}
                h={7}
                w={16}
                alignItems={'center'}
                justifyContent={'center'}
                top={8}>
                <Image
                  source={require('../../assets/edit.png')}
                  h={3}
                  w={3}
                  alt={'img'}
                  resizeMode={'contain'}
                />
                <Text
                  ml={1}
                  color={'black'}
                  fontSize={10}
                  fontFamily={'Lexend-Regular'}>
                  Edit
                </Text>
              </Pressable>
            </Stack>
            <Stack>
              <Image
                alignSelf={'center'}
                borderRadius={10}
                source={require('../../assets/h6.png')}
                mt={5}
                // h={'50%'}
                h={300}
                w={300}
                // w={'80%'}
                resizeMode={'cover'}
                alt={'img'}
              />
              <Pressable
                onPress={() =>
                  navigation.navigate('AddPhoto', {fromEdit: true})
                }
                position={'absolute'}
                p={1}
                right={10}
                bg={'primary.400'}
                rounded={'md'}
                flexDir={'row'}
                h={7}
                w={16}
                alignItems={'center'}
                justifyContent={'center'}
                top={8}>
                <Image
                  source={require('../../assets/edit.png')}
                  h={3}
                  w={3}
                  alt={'img'}
                  resizeMode={'contain'}
                />
                <Text
                  ml={1}
                  color={'black'}
                  fontSize={10}
                  fontFamily={'Lexend-Regular'}>
                  Edit
                </Text>
              </Pressable>
            </Stack>
          </Swiper>
        </View>

        <View mx={5} flex={1}>
          <Row alignItems={'center'} justifyContent={'space-between'} mb={5}>
            <Text
              fontSize={16}
              fontFamily={'Lexend-SemiBold'}
              color={'primary.400'}>
              Profile Info
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('PersonalInfo');
              }}
              //   position={'absolute'}
              p={1}
              //   right={2}
              bg={'primary.400'}
              rounded={'md'}
              flexDir={'row'}
              h={7}
              w={20}
              alignItems={'center'}
              justifyContent={'center'}>
              <Image
                source={require('../../assets/edit.png')}
                h={3}
                w={3}
                alt={'img'}
                resizeMode={'contain'}
              />
              <Text
                ml={1}
                color={'black'}
                fontSize={14}
                fontFamily={'Lexend-Regular'}>
                Edit
              </Text>
            </Pressable>
          </Row>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Text fontSize={14} fontFamily={'Lexend-Regular'}>
              Full Name
            </Text>
            <Text>Olivia</Text>
          </Row>
          <Row alignItems={'center'} justifyContent={'space-between'} my={2}>
            <Text fontSize={14} fontFamily={'Lexend-Regular'}>
              Email Address
            </Text>
            <Text>Olivia@exapmle.com</Text>
          </Row>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Text fontSize={14} fontFamily={'Lexend-Regular'}>
              Gender
            </Text>
            <Text>Female</Text>
          </Row>
          <Row alignItems={'center'} justifyContent={'space-between'} mt={2}>
            <Text fontSize={14} fontFamily={'Lexend-Regular'}>
              Height
            </Text>
            <Text>165 cm(5'4")</Text>
          </Row>
          <Text
            my={4}
            mb={2}
            fontSize={16}
            color={'primary.400'}
            fontFamily={'Lexend-SemiBold'}>
            Prefrences
          </Text>
          <Row alignItems={'center'} justifyContent={'space-between'} mb={2}>
            <Text fontSize={14} fontFamily={'Lexend-Regular'}>
              Looking for relationship
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('OnBoarding3', {fromEdit: true});
              }}
              //   position={'absolute'}
              p={1}
              //   right={2}

              rounded={'md'}
              flexDir={'row'}
              h={7}
              alignItems={'center'}
              justifyContent={'center'}>
              <Image
                source={require('../../assets/edit.png')}
                h={3}
                w={3}
                alt={'img'}
                resizeMode={'contain'}
              />
              <Text
                ml={1}
                color={'black'}
                fontSize={14}
                fontFamily={'Lexend-Regular'}>
                Edit
              </Text>
            </Pressable>
          </Row>
          <Row alignItems={'center'} justifyContent={'space-between'} mb={2}>
            <Text fontSize={14} fontFamily={'Lexend-Regular'}>
              Ocassional Excercise
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('OnBoarding4', {fromEdit: true});
              }}
              //   position={'absolute'}
              p={1}
              //   right={2}

              rounded={'md'}
              flexDir={'row'}
              h={7}
              alignItems={'center'}
              justifyContent={'center'}>
              <Image
                source={require('../../assets/edit.png')}
                h={3}
                w={3}
                alt={'img'}
                resizeMode={'contain'}
              />
              <Text
                ml={1}
                color={'black'}
                fontSize={14}
                fontFamily={'Lexend-Regular'}>
                Edit
              </Text>
            </Pressable>
          </Row>
          <Row alignItems={'center'} justifyContent={'space-between'} mb={2}>
            <Text fontSize={14} fontFamily={'Lexend-Regular'}>
              I'm a excellent chef
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('OnBoarding5', {fromEdit: true});
              }}
              //   position={'absolute'}
              p={1}
              //   right={2}

              rounded={'md'}
              flexDir={'row'}
              h={7}
              alignItems={'center'}
              justifyContent={'center'}>
              <Image
                source={require('../../assets/edit.png')}
                h={3}
                w={3}
                alt={'img'}
                resizeMode={'contain'}
              />
              <Text
                ml={1}
                color={'black'}
                fontSize={14}
                fontFamily={'Lexend-Regular'}>
                Edit
              </Text>
            </Pressable>
          </Row>
          <Row alignItems={'center'} justifyContent={'space-between'} mb={2}>
            <Text fontSize={14} fontFamily={'Lexend-Regular'}>
              Hicking & Backpack
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('OnBoarding6', {fromEdit: true});
              }}
              //   position={'absolute'}
              p={1}
              //   right={2}

              rounded={'md'}
              flexDir={'row'}
              h={7}
              alignItems={'center'}
              justifyContent={'center'}>
              <Image
                source={require('../../assets/edit.png')}
                h={3}
                w={3}
                alt={'img'}
                resizeMode={'contain'}
              />
              <Text
                ml={1}
                color={'black'}
                fontSize={14}
                fontFamily={'Lexend-Regular'}>
                Edit
              </Text>
            </Pressable>
          </Row>
          <Row alignItems={'center'} justifyContent={'space-between'} mb={2}>
            <Text fontSize={14} fontFamily={'Lexend-Regular'}>
              I'm in bed by midnight
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('OnBoarding7', {fromEdit: true});
              }}
              //   position={'absolute'}
              p={1}
              //   right={2}

              rounded={'md'}
              flexDir={'row'}
              h={7}
              alignItems={'center'}
              justifyContent={'center'}>
              <Image
                source={require('../../assets/edit.png')}
                h={3}
                w={3}
                alt={'img'}
                resizeMode={'contain'}
              />
              <Text
                ml={1}
                color={'black'}
                fontSize={14}
                fontFamily={'Lexend-Regular'}>
                Edit
              </Text>
            </Pressable>
          </Row>
          <Row alignItems={'center'} justifyContent={'space-between'} mb={2}>
            <Text fontSize={14} fontFamily={'Lexend-Regular'}>
              Zero tolerance
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('OnBoarding8', {fromEdit: true});
              }}
              //   position={'absolute'}
              p={1}
              //   right={2}

              rounded={'md'}
              flexDir={'row'}
              h={7}
              alignItems={'center'}
              justifyContent={'center'}>
              <Image
                source={require('../../assets/edit.png')}
                h={3}
                w={3}
                alt={'img'}
                resizeMode={'contain'}
              />
              <Text
                ml={1}
                color={'black'}
                fontSize={14}
                fontFamily={'Lexend-Regular'}>
                Edit
              </Text>
            </Pressable>
          </Row>
          <Row alignItems={'center'} justifyContent={'space-between'} mb={2}>
            <Text fontSize={14} fontFamily={'Lexend-Regular'}>
              Thanks but no thanks
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('OnBoarding9', {fromEdit: true});
              }}
              //   position={'absolute'}
              p={1}
              //   right={2}

              rounded={'md'}
              flexDir={'row'}
              h={7}
              alignItems={'center'}
              justifyContent={'center'}>
              <Image
                source={require('../../assets/edit.png')}
                h={3}
                w={3}
                alt={'img'}
                resizeMode={'contain'}
              />
              <Text
                ml={1}
                color={'black'}
                fontSize={14}
                fontFamily={'Lexend-Regular'}>
                Edit
              </Text>
            </Pressable>
          </Row>
          <Row alignItems={'center'} justifyContent={'space-between'} mb={2}>
            <Text fontSize={14} fontFamily={'Lexend-Regular'}>
              A little bit of everything
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('OnBoarding10', {fromEdit: true});
              }}
              //   position={'absolute'}
              p={1}
              //   right={2}

              rounded={'md'}
              flexDir={'row'}
              h={7}
              alignItems={'center'}
              justifyContent={'center'}>
              <Image
                source={require('../../assets/edit.png')}
                h={3}
                w={3}
                alt={'img'}
                resizeMode={'contain'}
              />
              <Text
                ml={1}
                color={'black'}
                fontSize={14}
                fontFamily={'Lexend-Regular'}>
                Edit
              </Text>
            </Pressable>
          </Row>
          <View my={5}>
            <FButton
              label={'Edit Profile'}
              variant={'Solid'}
              onPress={() => setVisible(true)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default EditProfile;
