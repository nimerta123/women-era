import { View, Text, StyleSheet,TextInput,TouchableOpacity,Image} from 'react-native'
import React ,{useState,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from './src/screens/LogInScreen';
import SignUp from './src/screens/SignUp';
import Register from './src/screens/Register';
import BottomNavigation from './src/screens/BottomNavigation';
import SplashScreen from './src/screens/SplashScreen'
import ForgetPass from './src/screens/ForgetPass';
import ExpertHomescreen from './src/screens/ExpertHomescreen';

const Stack = createNativeStackNavigator();


const App = () =>{
  const[showSplashScreen, setShowSplashScreen] = useState(true);
  useEffect(() =>{
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 2000);
  },[])
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='BottomNavigation'>
        {showSplashScreen ? (<Stack.Screen component={SplashScreen} name='SplashScreen' options={{headerShown:false}}
        />
        ) : null
      }
       
        <Stack.Screen component={ExpertHomescreen} name='ExpertHomescreen'/>
        <Stack.Screen component={SignUp} name='SignUp' options={{headerShown:false}} />
        <Stack.Screen component={BottomNavigation} name='BottomNavigation' options={{headerShown:false}} />
        <Stack.Screen component={LogInScreen} name='LogInScreen' options={{headerShown:false}} /> 
        <Stack.Screen component={Register} name='Register' options={{headerShown:false}} />
        <Stack.Screen component={ForgetPass} name='ForgetPass' options={{headerShown:false}} />
        
       
     </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App