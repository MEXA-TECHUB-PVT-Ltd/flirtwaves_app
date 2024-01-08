import {View, Modal, StyleSheet} from 'react-native';
import React from 'react';

// import { COLORS } from "../../utils/COLORS";
import Lottie from 'lottie-react-native';

const LoaderModal = ({visible}) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.main_view}>
        <Lottie
          source={require('../../assets/spinner.json')}
          autoPlay
          loop
          style={styles.loader}
        />
      </View>
    </Modal>
  );
};

export default LoaderModal;
const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    height: 80,
    width: 80,
  },
});
