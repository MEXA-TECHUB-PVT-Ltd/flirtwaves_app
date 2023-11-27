// import {View} from 'react-native';
import React from 'react';
import {Icon, Input, Pressable, Text, View} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FInputs = props => {
  const [show, setShow] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  return (
    <>
      {props?.label ? (
        <Text
          mt={props?.mt}
          ml={1}
          fontSize={props?.fontSize}
          fontFamily={props.fontFamily}>
          {props?.label}
        </Text>
      ) : null}

      <Input
        mt={1}
        p={2}
        // aria-label="User Name"

        type={show === true ? props?.type : 'text'}
        placeholder={props.placeholder}
        value={props.value}
        autoCapitalize="none"
        borderWidth={1}
        onFocus={() => {
          setFocused(true);
        }}
        _focus={{bg: 'white', borderColor: 'primary.400'}}
        onEndEditing={props?.onFocusEnd}
        onBlur={() => {
          setFocused(false);
        }}
        onChangeText={props.onChangeText}
        // alignItems={currentLanguage === 'ar' ? 'flex-end' : null}
        // isDisabled={props?.isDisabled}
        isReadOnly={props?.isDisabled}
        rounded={'md'}
        borderColor={'#00000017'}
        fontSize={14}
        fontFamily={'NotoSans-Regular'}
        _text={{
          color: '#868686',
          fontSize: 14,
          fontWeight: 'NotoSans-Regular',
          alignSelf: 'center',
        }}
        bg={'white'}
        // InputLeftElement={
        //   <Icon
        //     as={
        //       props?.leftIconName === 'person' ||
        //       props?.leftIconName === 'search-outline' ? (
        //         <Ionicons name={props.leftIconName} />
        //       ) : (
        //         <AntDesign name={props.leftIconName} />
        //       )
        //     }
        //     size={5}
        //     mx="2"
        //     color="muted.400"
        //   />
        // }
        InputRightElement={
          props?.rightIcon ? (
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? 'visibility-off' : 'visibility'}
                  />
                }
                size={5}
                mx="2"
                color={focused === true ? 'primary.400' : 'muted.400'}
              />
            </Pressable>
          ) : null
        }
      />
    </>
  );
};

export default FInputs;
