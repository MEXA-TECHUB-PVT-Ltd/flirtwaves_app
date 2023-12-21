import {View, Text, Image, ScrollView} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import FButton from '../../components/button/FButton';

const Privacy = ({navigation, route}) => {
  const des = `Welcome to Flirt Waves! This Privacy Policy outlines how we collect, use, and safeguard your information while using our app. You agree to the practices described in this policy by using Flirt Waves.
1. Information We Collect
a. User Profile Information:
          Gender
          Age
          Height
          Food preferences
          Sleeping habits
          Smoking habits
          Exercise habits
          Cooking skills
          Eating habits
b. Communication Data:
Messages
Audio and video call logs
c. Multi-Lingual Converter:
Language preferences for translation
d. Photo Verification:
User-submitted photos for identity verification
2. How We Use Your Information
a. Profile Matching:
Matching users based on preferences for a personalized experience.
b. Communication Features:
Facilitating messaging, audio, and video calls between users.
c. Multi-Lingual Converter:
Providing language conversion services based on user preferences.
d. Photo Verification:
Verifying user identity for increased trust and safety.
3. Information Sharing
a. Profile Information:
Shared with other users to enable matching based on preferences.
b. Communication Data:
Used to facilitate and improve in-app communication features.
c. Favorites and Distance Information:
Shared with users to enhance the app experience.
d. Reporting Feature:
User-reported information is shared with our support team to address concerns and maintain a safe environment.
4. User Controls and Choices
a. Profile Updates:
Users can update their profile information, including preferences, at any time.
b. Communication Preferences:
Users can manage their communication preferences, including opting out of certain types of communication.
c. Favorites Management:
Users can add, view, and remove other users from their favorites list.
5. Security Measures
We implement security measures to protect your information from unauthorized access, disclosure, alteration, and destruction.
6. Distance Calculation
Users can view the approximate distance between each other based on their provided location information.
7. Subscription Plans and Payments
a. Subscription Features:
Users can purchase subscription plans to unlock additional features.
b. Payment Processing:
Payment transactions for subscription plans are handled securely through Stripe. Flirt Waves does not store your payment information.
8. Changes to this Privacy Policy
We may update this Privacy Policy to reflect changes in our practices. Please review this policy periodically for any updates.
9. Contact Us:
If you have questions or concerns about this Privacy Policy, please contact us at [contact@flirtwaves.com].


`;
  return (
    <View bg={'white'} flex={1}>
      <Header />
      <View mx={5} mt={5}>
        <Image
          alignSelf={'center'}
          source={require('../../assets/privacy-policy.png')}
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
          {`Review and accept our${'\n'}privacy policy`}
        </Text>
      </View>
      <ScrollView>
        <View mx={5}>
          <Text textAlign={'justify'} fontSize={14} mt={5}>
            {des}
          </Text>
        </View>
      </ScrollView>
      <View mx={5} mb={5}>
        <FButton
          label={'Accept'}
          variant={'Solid'}
          mt={5}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />

        <FButton
          label={'Continue without accepting'}
          variant={'outline'}
          onPress={() => navigation.navigate('SignUp')}
          mt={5}
        />
      </View>
    </View>
  );
};
export default Privacy;
