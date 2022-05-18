import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, Image, LinearGradient} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Register = () =>{
    const navigation = useNavigation();
    return(
      <><View style={styles.container}>
        <Image source={require('../assets/splashicon.png')}
          resizeMode='center'
          style={styles.splashlogo} />
      </View>
      <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={[styles.userbtn, {
              borderColor: '#be7df0',
              borderWidth: 1,
              marginTop: 15
            }]}>
            <Text style={[styles.btntext, { color: '#be7df0' }]}>Register as Expert</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={[styles.userbtn2, {
              borderColor: '#be7df0',
              borderWidth: 1,
              marginTop: 15
            }]}>
            <Text style={[styles.btntext, { color: '#be7df0' }]}>Register as Student</Text>
          </TouchableOpacity>
        </View></>
    )
}
export default Register
const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#be7df0',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    btnContainer:{
      flex:1,
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",

    },
    userbtn:{
      backgroundColor:"",
      width:"100%",
      borderRadius: 15,
      padding:15
    },
    userbtn2:{
      backgroundColor:"",
      width:"100%",
      borderRadius: 15,
      padding:15,
    },
    btntext:{
      fontSize:16, 
      textAlign:'center',

    },
    container:{
      backgroundColor: '#be7df0',
      flex:1,
      justifyContent:'center',
      alignItems:'center'
  },
  splashlogo:{
      height:200,
      width:200
  }
    })
