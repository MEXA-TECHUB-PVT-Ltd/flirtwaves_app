import {Image, Row, Text, View} from 'native-base';
import React from 'react';

const Logo = props => {
  return (
    <Row alignItems={'center'} alignSelf={props?.align}>
      <Image
        source={require('../../assets/logo.png')}
        h={props?.height}
        w={props?.width}
        resizeMode="contain"
        alt="logo"
      />
      <Text fontSize={25} ml={2} fontFamily={'Lexend-SemiBold'}>
        Flirt Waves
      </Text>
    </Row>
  );
};

export default Logo;
