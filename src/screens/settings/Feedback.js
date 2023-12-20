import {View, Text, Pressable, ScrollView, TextArea} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import FButton from '../../components/button/FButton';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import Logo from '../../components/logo/Logo';
import {useAddFeedBackMutation} from '../../redux/apis/auth';
import {useSelector} from 'react-redux';

const Feedback = ({navigation}) => {
  const uid = useSelector(state => state.auth?.userData?.id);

  const [visible, setVisible] = React.useState(false);
  const [detail, setDetail] = React.useState();
  const [postFeedback, {data, isLoading}] = useAddFeedBackMutation();

  const handleSubmit = () => {
    if (detail && detail !== '' && detail !== ' ') {
      let body = {
        uid: uid,
        data: {
          feedback_description: detail,
        },
      };
      postFeedback(body).then(res => {
        if (res?.data?.error === false) {
          setVisible(true);
        }
      });
    }
  };
  return (
    <View bg={'white'} flex={1}>
      <Header />
      <CustomSnackbar
        message={'Success'}
        visible={visible}
        height={'8%'}
        onDismiss={() => {
          setVisible(false);
          navigation.goBack();
        }}
        messageDescription={'Feedback submitted Successfully'}
      />

      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <View mt={10}>
          <Logo height={12} width={12} align={'center'} />
        </View>
        <Text
          fontSize={16}
          mx={5}
          mb={2}
          fontFamily={'Lexend-Regular'}
          color={'primary.400'}
          mt={16}>
          What do you think of Flirt Waves?
        </Text>
        <TextArea
          mx={5}
          placeholder={'Add Message'}
          bg={'white'}
          color={'grey.500'}
          h={32}
          value={detail}
          onChangeText={setDetail}
          borderRadius={10}
          borderColor={'grey.400'}
          borderWidth={0.5}
          _focus={{bg: 'white', borderColor: 'primary.400', borderWidth: 1}}
        />

        <View m={5} mt={'70%'}>
          <FButton
            label={'Submit'}
            loading={isLoading}
            onPress={() => {
              handleSubmit();
            }}
            variant={'Solid'}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default Feedback;
