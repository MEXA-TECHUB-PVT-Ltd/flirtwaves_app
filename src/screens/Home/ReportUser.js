import {View, Text, Pressable, ScrollView, TextArea} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import FButton from '../../components/button/FButton';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';

const ReportUser = ({navigation}) => {
  const data = [
    {
      id: 1,
      name: 'Block for no reason',
    },
    {
      id: 2,
      name: 'Commercial profile',
    },
    {
      id: 3,
      name: 'Scam',
    },
    {
      id: 4,
      name: 'Fake profile',
    },
    {
      id: 5,
      name: 'Inappropriate picture',
    },
    {
      id: 6,
      name: 'Bad behavior',
    },
    {id: 7, name: 'Underage'},
  ];
  const [id, setId] = React.useState(0);
  const [isSubmited, setSubmit] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  return (
    <View bg={'white'} flex={1}>
      <Header />
      <CustomSnackbar
        message={'Success'}
        visible={visible}
        height={'8%'}
        onDismiss={() => {
          setVisible(false);
          navigation.navigate('Tabs', {screen: 'Home'});
        }}
        messageDescription={'Reason submitted Successfully'}
      />
      {isSubmited ? (
        <Text
          mt={5}
          fontSize={22}
          fontFamily={'Lexend-SemiBold'}
          textAlign={'center'}
          mx={5}>
          {`Please describe the issue`}
        </Text>
      ) : (
        <>
          <Text
            mt={5}
            fontSize={22}
            fontFamily={'Lexend-SemiBold'}
            textAlign={'center'}
            mx={5}>
            {`Tell us the reason why are${'\n'}you reporting Zahra?`}
          </Text>
          <Text
            mt={3}
            textAlign={'center'}
            mx={5}
            color={
              'grey.400'
            }>{`You will no longer see this person or receive any${'\n'}message from them. Let us know what happened. `}</Text>
        </>
      )}
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        {isSubmited ? (
          <TextArea
            mt={16}
            mx={5}
            placeholder={'Add reason'}
            bg={'white'}
            color={'grey.500'}
            h={32}
            borderRadius={10}
            borderColor={'grey.400'}
            borderWidth={0.5}
            _focus={{bg: 'white', borderColor: 'primary.400', borderWidth: 1}}
          />
        ) : (
          <View m={5}>
            {data?.map(item => {
              return (
                <Pressable
                  bg={'white'}
                  p={2}
                  mb={5}
                  onPress={() => {
                    setId(item?.id);
                  }}
                  //   key={item?.id}
                  alignItems={'center'}
                  borderRadius={10}
                  borderColor={id === item?.id ? 'primary.400' : 'grey.400'}
                  borderWidth={id === item?.id ? 1 : 0.5}
                  justifyContent={'center'}>
                  <Text
                    fontSize={16}
                    fontFamily={
                      id === item?.id ? 'Lexend-Regular' : 'Lexend-Light'
                    }
                    color={id === item?.id ? 'black' : 'grey.400'}
                    textAlign={'center'}>
                    {item?.name}
                  </Text>
                </Pressable>
              );
            })}
            <FButton
              label={'Submit'}
              onPress={() => {
                setSubmit(true);
              }}
              variant={'Solid'}
            />
          </View>
        )}
        {isSubmited ? (
          <View m={5} mt={'70%'}>
            <FButton
              label={'Submit'}
              onPress={() => {
                setVisible(true);
              }}
              variant={'Solid'}
            />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};
export default ReportUser;
