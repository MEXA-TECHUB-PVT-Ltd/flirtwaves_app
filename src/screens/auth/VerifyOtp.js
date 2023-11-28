import React, {useState} from 'react';
import {ScrollView, Text, View} from 'native-base';
import {StyleSheet, ImageBackground} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import Header from '../../components/Header/Header';
import FButton from '../../components/button/FButton';
// import JdButton from '../../components/button/Buttons';
// import Header from '../../components/Header/Header';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'space-around',
  },
  title: {fontSize: 30, fontWeight: 'bold', textAlign: 'center'},
  codeFieldRoot: {marginHorizontal: 50},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 40,
    fontSize: 24,
    // borderWidth: 2,\C
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    borderRadius: 10,
    borderColor: '#00000030',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  focusCell: {
    borderColor: '#f5bf03',
    borderWidth: 1,
  },
});

const CELL_COUNT = 4;

const VerifyOtp = ({navigation, route}) => {
  const [value, setValue] = useState('');
  const otp = route?.params?.otp;
  const email = route?.params?.email;
  const [otpError, setOtpError] = React.useState();
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  React.useEffect(() => {
    if (loading === true) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    if (value === '') {
      setOtpError();
    }
  });
  const handleVerify = () => {
    if (value !== '' || value !== ' ') {
      console.log(value);
      if (otp === value) {
        setLoading(true);
        navigation.navigate('ResetPassword', {email: email});
      } else {
        setOtpError('Invalid Otp');
      }
    }
  };
  return (
    <View flex={1} bg={'primary.20'}>
      <View position={'absolute'} top={0} left={0}>
        <Header />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View mt={32} mx={5}>
          <Text
            fontSize={22}
            mb={32}
            fontFamily={'Lexend-SemiBold'}
            textAlign={'center'}>
            Verification
          </Text>
        </View>
        <CodeField
          ref={ref}
          {...props}
          autoFocus={true}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        {otpError && (
          <View
            flexDir={'row'}
            alignItems={'center'}
            mt={2}
            ml={1}
            alignSelf={'center'}>
            <View bg={'red.500'} h={2} w={2} rounded={'full'} mr={1}></View>
            <Text color={'red.500'} fontSize={14}>
              {otpError}
            </Text>
          </View>
        )}
        <View mx={5} mb={5} mt={'50%'}>
          <FButton
            loading={loading}
            label={'Verify'}
            variant={'Solid'}
            onPress={() => {
              handleVerify();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default VerifyOtp;
