import { View, Text, StyleSheet,Image} from 'react-native'
import React from 'react'


export default function SplashScreen() {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/splashicon.png')} 
    resizeMode='center' 
    style={styles.splashlogo}/> 
    </View>
  )
}
const styles = StyleSheet.create({
container:{
    backgroundColor: '#be7df0',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
splashlogo:{
    height:300,
    width:300
}
})