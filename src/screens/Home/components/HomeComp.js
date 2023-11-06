import {View, Text} from 'native-base';
import React from 'react';
import {FlatList, ImageBackground} from 'react-native';

const HomeComp = props => {
  console.log(props?.data);
  const RenderData = ({item, index}) => {
    console.log(item);
    return (
      <ImageBackground source={item?.img} key={index} style={{flex: 0.5}}>
        <Text>{item?.name}</Text>
      </ImageBackground>
    );
  };
  return (
    <View flex={1}>
      {props?.data?.map(item => {
        return (
          <View bg={'black'}>
            <Text fontSize={16} color={'black'}>
              {item?.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default HomeComp;
