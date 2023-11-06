import {View, Text, Image, ScrollView} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import FButton from '../../components/button/FButton';

const EmailVerify = ({navigation}) => {
  const des = `The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
Like any other website, mtechub llc uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
You may consult this list to find the Privacy Policy for each of the advertising partners of mtechub llc.
Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on mtechub llc, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
Note that mtechub llc has no access to or control over these cookies that are used by third-party advertisers. 
The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
Like any other website, mtechub llc uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
You may consult this list to find the Privacy Policy for each of the advertising partners of mtechub llc.
Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on mtechub llc, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
Note that mtechub llc has no access to or control over these cookies that are used by third-party advertisers.

`;
  return (
    <View bg={'white'} flex={1}>
      <Header />
      <View alignItems={'center'} justifyContent={'center'} flex={1}>
        <Image
          alignSelf={'center'}
          source={require('../../assets/check.png')}
          h={20}
          w={20}
          resizeMode="contain"
          alt={'privacy'}
        />
        <Text
          textAlign={'center'}
          fontSize={22}
          mt={3}
          fontFamily={'Lexend-SemiBold'}>
          Check your email
        </Text>
        <View mx={5}>
          <Text textAlign={'center'} fontSize={14} mt={5}>
            We have send you a link to connect to your account. click on the
            link from the email and login to your account
          </Text>
        </View>
      </View>

      <View mx={5} mb={10}>
        <FButton
          label={'Use another email address'}
          variant={'Solid'}
          mt={5}
          onPress={() => navigation.goBack()}
        />
        <FButton
          label={'Login in a different way'}
          variant={'outline'}
          mt={5}
          onPress={() => navigation.navigate('OnBoarding')}
        />
      </View>
    </View>
  );
};
export default EmailVerify;
