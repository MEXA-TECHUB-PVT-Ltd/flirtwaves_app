import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useEffect} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Box, Stack, useColorMode} from 'native-base';

const BottomSheet = ({
  children,
  defaultOff,
  height,
  openBottom,
  width,
  onClose,
  onOpen,
}) => {
  // useEffect(() => {
  //   if (!defaultOff) openBottomSheet();
  // }, []);
  const bottomSheetRef = useRef(null);
  const {colorMode} = useColorMode();
  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  useEffect(() => {
    if (!defaultOff) {
      openBottomSheet();
    }
  }, []);

  return (
    <RBSheet
      ref={defaultOff ? openBottom : bottomSheetRef}
      closeOnDragDown={false}
      closeOnPressMask={defaultOff ? true : false}
      closeOnPressBack={true}
      minClosingHeight={0}
      openDuration={250}
      onClose={onClose}
      onOpen={onOpen}
      customStyles={{
        wrapper: styles.wrapper,
        container: [
          styles.container,
          {
            width: width,
            backgroundColor: 'white',
            height: height,
            borderColor: 'grey',
            borderWidth: 0,
          },
        ],
        draggableIcon: styles.draggableIcon,
      }}>
      {children}
    </RBSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  container: {
    backgroundColor: '#fff',
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 15,
  },
  draggableIcon: {
    backgroundColor: 'transparent',
  },
});
