import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import HomeScreen from '../../../screens/Home/HomeScreen';
import SignIn from '../../../screens/auth/SignIn';
import SignUp from '../../../screens/auth/SignUp';
import AddPhoto from '../../../screens/auth/AddPhoto';
import ConnectionProblem from '../../../screens/auth/ConnectionProblem';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#F94449',
        tabBarShowLabel: false,
        headerShadowVisible: false,

        tabBarStyle: [
          {
            backgroundColor: 'white',
            // borderColor: '#f5bf03',
            // height: '8%',
          },
        ],
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <View
                  bg={'primary.400'}
                  w={10}
                  h={1}
                  position={'absolute'}
                  top={0}></View>
              ) : null}

              <View alignItems={'center'} justifyContent={'center'}>
                {!focused ? (
                  <Image
                    source={require('../../../assets/unshome.png')}
                    h={5}
                    w={5}
                    alt="png"
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require('../../../assets/shome.png')}
                    h={5}
                    w={5}
                    alt="png"
                    resizeMode="contain"
                  />
                )}
              </View>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={SignIn}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <View
                  bg={'primary.400'}
                  w={10}
                  h={1}
                  position={'absolute'}
                  top={0}></View>
              ) : null}

              <View alignItems={'center'} justifyContent={'center'}>
                {!focused ? (
                  <Image
                    source={require('../../../assets/unsbrowse.png')}
                    h={5}
                    w={5}
                    alt="png"
                  />
                ) : (
                  <Image
                    source={require('../../../assets/sbrowse.png')}
                    h={5}
                    w={5}
                    alt="png"
                    resizeMode="contain"
                  />
                )}
              </View>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={SignUp}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <View
                  bg={'primary.400'}
                  w={10}
                  h={1}
                  position={'absolute'}
                  top={0}></View>
              ) : null}
              <View alignItems={'center'} justifyContent={'center'}>
                {!focused ? (
                  <Image
                    source={require('../../../assets/unsheart.png')}
                    h={5}
                    w={5}
                    alt="png"
                    resizeMode={'contain'}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/sheart.png')}
                    h={5}
                    w={5}
                    alt="png"
                    resizeMode="contain"
                  />
                )}
              </View>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="chat"
        component={AddPhoto}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <View
                  bg={'primary.400'}
                  w={10}
                  h={1}
                  position={'absolute'}
                  top={0}></View>
              ) : null}
              <View alignItems={'center'} justifyContent={'center'}>
                {!focused ? (
                  <Image
                    source={require('../../../assets/unschat.png')}
                    h={5}
                    w={5}
                    alt="png"
                  />
                ) : (
                  <Image
                    source={require('../../../assets/schat.png')}
                    h={5}
                    w={5}
                    alt="png"
                  />
                )}
              </View>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ConnectionProblem}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <View
                  bg={'primary.400'}
                  w={10}
                  h={1}
                  position={'absolute'}
                  top={0}></View>
              ) : null}
              <View alignItems={'center'} justifyContent={'center'}>
                {!focused ? (
                  <Image
                    source={require('../../../assets/unsprofile.png')}
                    h={5}
                    w={5}
                    alt="png"
                  />
                ) : (
                  <Image
                    source={require('../../../assets/sprofile.png')}
                    h={5}
                    w={5}
                    alt="png"
                  />
                )}
              </View>
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
// ///// <Tab.Screen
//    name=""
//    component={AllChats}
//    options={{
//      tabBarIcon: ({focused}) => (
//        <View alignItems={'center'} justifyContent={'center'}>
//          {/* {!focused ? (
//                 <Image
//                   source={require('../../assets/unSelectedChat.png')}
//                   h={6}
//                   w={6}
//                   alt="png"
//                 />
//               ) : (
//                 <Image
//                   source={require('../../assets/selectedChat.png')}
//                   h={6}
//                   w={6}
//                   alt="png"
//                 />
//               )} */}
//        </View>
//      ),
//    }}
//  />;
