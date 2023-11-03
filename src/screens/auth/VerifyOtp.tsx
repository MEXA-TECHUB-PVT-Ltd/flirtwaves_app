import React, {useState} from 'react';
import {Text, View} from 'native-base';
import {StyleSheet} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import JdButton from '../../components/button/Buttons';
import Header from '../../components/Header/Header';
import {useTranslation} from 'react-i18next';
import AlertModal from '../../components/Modal/AlertModal';
import {useVerifyOtpMutation} from '../../redux/auth/auth';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {fontSize: 30, fontWeight: 'bold', textAlign: 'center'},
  codeFieldRoot: {marginHorizontal: 20},
  cell: {
    width: 70,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    // borderWidth: 2,
    borderRadius: 20,
    borderColor: '#00000030',
    textAlign: 'center',
    backgroundColor: '#F7F7F7',
  },
  focusCell: {
    borderColor: '#000',
  },
});

const CELL_COUNT = 4;

const VerifyOtp = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [verify, {data, error: isError, isLoading}] = useVerifyOtpMutation();
  const email = route?.params?.email;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const {t} = useTranslation();
  React.useEffect(() => {
    if (isError) {
      setModalVisible(true);
    }
  }, [isError]);
  const handleVerification = () => {
    verify({
      email: email,
      otp: value,
    }).then(res => {
      if (res?.data?.status === true) {
        navigation.navigate('ResetPassword', {email: email});
      }
    });
  };
  return (
    <View style={styles.root}>
      <View position={'absolute'} top={0} left={0}>
        <Header />
      </View>
      <View alignItems={'center'} mt={'15%'}>
        <Text fontSize={30} fontWeight={'700'} textAlign={'center'}>
          {t('Verification')}
        </Text>
        <Text mx={10} color={'grey.400'} textAlign={'center'} mt={2}>
          {t('Enter the code that you received on example@gmai.com')}
        </Text>
      </View>
      <CodeField
        ref={ref}
        {...props}
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
      <View mx={5} mb={'20%'} mt={'15%'}>
        <JdButton
          loading={isLoading}
          title={'Verify'}
          onPress={() => {
            handleVerification();
          }}
        />
      </View>
      <AlertModal
        heading={'Alert'}
        btntxt2={'OK'}
        onPress={() => {
          setModalVisible(false);
        }}
        // btntxt1={'No'}
        message={isError?.data?.message}
        modalVisible={modalVisible}
        onPress={() => {
          setModalVisible(false);
        }}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default VerifyOtp;