import React from 'react';
import {Text, View, Button, Image, Icon} from 'native-base';
const FButton = props => {
  return (
    <View mt={props?.mt}>
      {props?.variant === 'secondary' ? (
        <Button
          p={3}
          onPress={props?.onPress}
          _pressed={{bg: '#fff'}}
          bg={'white'}
          _text={{color: 'black', fontSize: 14, fontFamily: 'Lexend-Regular'}}
          leftIcon={
            (props?.label === 'Continue with Google' && (
              <Icon
                as={
                  <Image
                    source={require('../../assets/google.png')}
                    h={7}
                    w={7}
                    resizeMode="contain"
                    alt="google"
                  />
                }
              />
            )) ||
            (props?.label === 'Continue with Facebook' && (
              <Icon
                as={
                  <Image
                    source={require('../../assets/Facebook.png')}
                    h={7}
                    w={7}
                    resizeMode="contain"
                    alt="facebook"
                  />
                }
              />
            ))
          }
          borderRadius={10}>
          {props?.label}
        </Button>
      ) : null}
      {props?.variant === 'Solid' && (
        <Button
          bg={'primary.400'}
          _pressed={{bg: 'primary.300'}}
          onPress={props?.onPress}
          _text={{color: 'black', fontSize: 14, fontFamily: 'Lexend-Regular'}}
          borderRadius={12}
          leftIcon={
            props?.label === 'Logout' && (
              <Icon
                as={
                  <Image
                    source={require('../../assets/logout.png')}
                    h={6}
                    w={6}
                    resizeMode="contain"
                    alt="logout"
                  />
                }
              />
            )
          }>
          {props?.label}
        </Button>
      )}
      {props?.variant === 'outline' && (
        <Button
          bg={'#F5BF0333'}
          onPress={props?.onPress}
          _pressed={{bg: '#F5BF0330'}}
          _text={{
            color: 'primary.400',
            fontSize: 14,
            fontFamily: 'Lexend-Regular',
          }}
          borderRadius={12}>
          {props?.label}
        </Button>
      )}
    </View>
  );
};

export default FButton;
