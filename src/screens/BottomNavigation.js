import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import More from './More';
import Notifications from './Notifications'
import HomeScreen from './HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  
return (
    <Tab.Navigator
    tabBarOptions={{
      inactiveTintColor: 'darkgray',
      activeTintColor: '#be7df0',
      keyboardHidesTabBar: true
    }}
    screenOptions={({route})=> ({
      tabBarIcon: ({color, focused}) => {
        let activeIcon, InactiveIcon;

        if(route.name=='HomeScreen'){
          activeIcon='home'
          InactiveIcon='home-outline'
        }

        else if(route.name == 'Notifications'){
          activeIcon= 'notifications'
          InactiveIcon= 'notifications-outline'
        }

        else if(route.name == 'More'){
          activeIcon= 'reorder-three'
          InactiveIcon= 'reorder-three-outline'
        }
        return(
          <>
          {
            focused && 
            <View style={{position: 'absolute', top: 0, borderTopColor: '#be7df0', borderTopWidth: 3, width: '100%', paddingBottom: 20}} />
           }
          <Ionicons  name={color == 'darkgray' ? activeIcon : InactiveIcon } 
          color= {color == 'darkgray' ? 'black' : '#be7df0' }
          size= {24}
        />
        </>
        )
      }
    }
    )}>
      <Tab.Screen component={HomeScreen} name='HomeScreen' options={{headerShown:false}} />
      <Tab.Screen component={Notifications} name='Notifications'/>
      <Tab.Screen component={More} name='More'/>
    </Tab.Navigator>
)
}
export default BottomNavigation