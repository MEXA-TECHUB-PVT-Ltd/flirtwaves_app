import {Divider, Row} from 'native-base';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';

// import CheckSnackBar from '../svg/CheckSnackBar.svg'

const CustomSnackbar = ({
  visible,
  message,
  messageDescription,
  onDismiss,
  height,
  translation,
}) => {
  const [animation] = useState(new Animated.Value(0));
  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false, // Ensure you have this set to false for Android
      }).start();
      const timeout = setTimeout(() => {
        onDismiss();
      }, 3000);
      return () => clearTimeout(timeout);
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);
  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0], // Slide in from the top
              }),
            },
          ],
          height: height,
        },
      ]}>
      {/* <View> */}
      <Row>
        <Divider
          w={2}
          bg={'primary.50'}
          borderLeftRadius={10}
          orientation="vertical"
        />
        <View>
          <View style={{marginHorizontal: 10, marginTop: 0.5}}>
            <Text style={styles.message}>{message}</Text>
          </View>
          <View style={{marginHorizontal: 10, marginBottom: 5, marginTop: 5}}>
            <Text style={styles.messageDescription}>{messageDescription}</Text>
          </View>
        </View>
      </Row>
      {/* </View> */}
      {/*  <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
        <Text style={styles.dismissButtonText}>Dismiss</Text>
      </TouchableOpacity> */}
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 25, // Display at the top of the screen
    left: 15,
    right: 15,
    height: '30%',
    borderRadius: 10,
    backgroundColor: 'black',
    //padding: 14,
    // flexDirection: 'row-reverse',
    //alignItems: 'center',
  },
  message: {
    color: '#F94449',
    fontSize: 16,
    fontFamily: 'NotoSans-SemiBold',
  },
  messageDescription: {
    color: '#979797',
    fontSize: 14,
    fontFamily: 'NotoSans-Regular',
    // fontWeight: '200',
  },
  dismissButton: {
    marginLeft: 16,
  },
  dismissButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
export default CustomSnackbar;
