import {Image, View} from 'native-base';
import React from 'react';

const Logo = props => {
  return (
    <View>
      <Image
        source={require('../../assets/logo.png')}
        h={props?.height}
        w={props?.width}
        resizeMode="contain"
        alignSelf={props?.align}
      />
    </View>
  );
};

export default Logo;
