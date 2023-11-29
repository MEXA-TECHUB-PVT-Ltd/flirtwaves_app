import {StyleSheet} from 'react-native';
import {
  Divider,
  Image,
  Pressable,
  Row,
  ScrollView,
  Input,
  Icon,
  Button,
  Text,
  View,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker, DatePicker} from 'react-native-wheel-pick';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import BottomSheet from '../../../components/bottomSheet/BottomSheet';
import FButton from '../../../components/button/FButton';

const DateComp = props => {
  const [currentLanguage, setLanguage] = React.useState();

  const [selected, setSelected] = React.useState(1);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = React.createRef();

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
    setModalVisible(true);
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
    setModalVisible(false);
  };
  const handleSelection = id => {
    setSelected(id);
  };
  const navigation = useNavigation();
  // const event = [
  //   {
  //     id: 1,
  //     name: 'Before Event',
  //   },
  //   {
  //     id: 2,
  //     name: 'After Event',
  //   },
  // ];
  const [pressed, setPressed] = React.useState(1);

  const [startTimeHour, setStartTimeHour] = React.useState('9');
  const [startTimeMin, setStartTimeMin] = React.useState('00');
  const [startTimeAm, setStartTimeAm] = React.useState('Am');
  const [endTimeHour, setEndTimeHour] = React.useState('5');
  const [endTimeMin, setEndTimeMin] = React.useState('00');
  const [endTimeAm, setEndTimeAm] = React.useState('Pm');
  const [months, setMonth] = React.useState('');
  const [years, setYears] = React.useState('');
  const [days, setDays] = React.useState('');
  const [stringyMonth, setStringyMonth] = React.useState('');
  const [dobirth, setDOb] = React.useState();
  const month = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const year = [
    '1970',
    '1971',
    '1972',
    '1973',
    '1974',
    '1975',
    '1976',
    '1977',
    '1978',
    '1979',
    '1980',
    '1981',
    '1982',
    '1983',
    '1984',
    '1985',
    '1986',
    '1987',
    '1988',
    '1989',
    '1990',
    '1991',
    '1992',
    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
    '2026',
    '2027',
    '2028',
    '2029',
    '2030',
    '2031',
    '2032',
    '2033',
    '2034',
    '2035',
    '2036',
    '2037',
    '2038',
    '2039',
    '2040',
    '2041',
    '2042',
    '2043',
    '2044',
    '2045',
    '2046',
    '2047',
    '2048',
    '2049',
    '2050',
  ];
  const day = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
  ];
  React.useEffect(() => {
    if (month === 'JAN') {
      setStringyMonth('01');
    } else if (month === 'FEB') {
      setStringyMonth('02');
    } else if (month === 'MAR') {
      setStringyMonth('03');
    } else if (month === 'APR') {
      setStringyMonth('04');
    } else if (month === 'MAY') {
      setStringyMonth('05');
    } else if (month === 'JUN') {
      setStringyMonth('06');
    } else if (month === 'JUL') {
      setStringyMonth('07');
    } else if (month === 'AUG') {
      setStringyMonth('08');
    } else if (month === 'SEP') {
      setStringyMonth('09');
    } else if (month === 'OCT') {
      setStringyMonth('10');
    } else if (month === 'NOV') {
      setStringyMonth('11');
    } else {
      setStringyMonth('12');
    }
  }, [month]);
  // React.useEffect(() => {}, [days, stringyMonth, years]);
  const handleSave = () => {
    let dob = `${years}-${stringyMonth}-${days}`;

    setDOb(dob);
    props?.SavePress && props?.SavePress(dob);
  };

  return (
    <View>
      <>
        <Pressable
          onPress={() => {
            openBottomSheet();
          }}
          bg={'white'}
          p={3}
          mt={5}
          borderRadius={8}
          borderColor={'txtColor'}>
          <Text color={'grey.400'} fontFamily={'Lexend-Light'}>
            {dobirth ? dobirth : `Date of Birth`}
          </Text>
        </Pressable>
        <BottomSheet
          defaultOff={true}
          height={'40%'}
          width={'100%'}
          openBottom={bottomSheetRef}>
          <View mb={5}>
            <Text fontSize={16} fontFamily={'Lexend-SemiBold'} mt={2}>
              Date of Birth
            </Text>
            <Pressable
              onPress={() => bottomSheetRef.current.close()}
              position={'absolute'}
              right={1}
              top={3}>
              <View
                // borderWidth={2}
                rounded={'full'}>
                <Entypo name={'cross'} color={'black'} size={18} />
              </View>
            </Pressable>
            <Row mt={5} justifyContent={'space-between'} h={'60%'}>
              <Picker
                style={{
                  width: 100,
                  backgroundColor: 'white',
                }}
                textSize={16}
                selectTextColor={'black'}
                selectLineSize={2}
                selectLineColor={'#fdce25'}
                isShowSelectBackground={false}
                pickerData={day}
                onValueChange={value => {
                  setDays(value);
                }}
              />
              <Picker
                style={{
                  width: 100,
                  backgroundColor: 'white',
                }}
                textSize={16}
                selectTextColor={'black'}
                selectLineSize={2}
                selectLineColor={'#fdce25'}
                isShowSelectBackground={false}
                pickerData={month}
                onValueChange={value => {
                  setMonth(value);
                }}
              />
              <Picker
                style={{
                  width: 100,
                  backgroundColor: 'white',
                }}
                textSize={16}
                selectTextColor={'black'}
                selectLineColor={'#fdce25'}
                selectLineSize={2}
                isShowSelectBackground={false}
                pickerData={year}
                onValueChange={value => {
                  setYears(value);
                }}
              />
            </Row>
          </View>
          <FButton
            onPress={() => {
              handleSave();
              closeBottomSheet();
            }}
            label={'Save'}
            variant={'Solid'}
          />
        </BottomSheet>
      </>
    </View>
  );
};

export default DateComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  horizontalLine: {
    marginHorizontal: 10,
    borderBottomWidth: 5,
    marginTop: 3,
  },
  timeAndEdit: {
    flexDirection: 'row',
  },
  imgPen: {
    marginLeft: 5,
  },
  notifications: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginTop: 5,
  },
  txtTime: {
    fontSize: 3,
  },
  txtNotification: {
    backgroundColor: '#F2F2F2',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
});
