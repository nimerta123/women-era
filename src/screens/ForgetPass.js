import { View, Text, StyleSheet, TextInput, TouchableOpacity,Dimensions,StatusBar, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';


// import {Dimensions} from'react-native';
// export const windowWidth=Dimensions.get('window').width;
// export const windowHeight=Dimensions.get('window').height;


export default function ForgetPass() {
  useEffect(() => {
    console.log("LogInScreen")
  }, [])
  const [email, setemail] = useState('');
  const ResetUser=() =>{
    auth()
  .sendPasswordResetEmail(email)
  .then(() => {
    alert('Password sent to Email')
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
  }
  
    const navigation = useNavigation();

    // const [data,setdata]=React.useState({
    //   email:'',
    //   password:'',
    //   check_textInputChange:false,
    //   secureTextEntry:true
    // }); 

    // const textInputChange = (val)=>{
    //   if(val.length !== 0 ){
    //     setdata({
    //       ...data,
    //       email:val,
    //       check_textInputChange:true
    //     });
    //   }else{
    //     setdata({
    //       ...data,
    //       email:val,
    //       check_textInputChange:false
    //     });
    //   }
    // }

    // const handlePasswordChange=(val)=>{
    //   setdata({
    //         ...data,
    //         password:val
    //   });
    // }

    // const updateSecureTextEntry=()=> {
    //   setdata({
    //       ...data,
    //       secureTextEntry:!data.secureTextEntry
    //   });
    // }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#be7df0' barstyle='light-content'/>
      <View style={styles.header}>
        <Text style={styles.text_header}>Reset Password</Text>
      </View>
      <Animatable.View style={styles.footer}
      animation='fadeInUpBig'
      >
        <Text style={styles.text_footer}>Email</Text> 
        <View style={styles.action}>
          <FontAwesome
          name='user-o'
          color='#05375a'
          size={20}
          />
          <TextInput placeholder='Enter Your Email'
          value={email}
          onChangeText={text=>setemail(text)}
          keyboardType='email-address'
          style={styles.textInput}
          autoCapitalize="none"
          // onChangeText={(val)=>textInputChange(val)}
          ></TextInput>
          {/* {data.check_textInputChange ?
          <Animatable.View  animation='bounceIn'>
          <Feather
          name='check-circle'
          color="green"
          size={20}
          />
          </Animatable.View>
          :null} */}
          </View>

          {/* <Text style={[styles.text_footer,{marginTop:20}]}>Password</Text>
          <View style={styles.action}>
          <FontAwesome
          name='user-o'
          color='#05375a'
          size={20}
          />
          <TextInput placeholder='Enter Your Password'
           value={password}
          onChangeText={text=>setpassword(text)} 
          style={styles.textInput}
          autoCapitalize="none"
          secureTextEntry={data.secureTextEntry? true:false}
          // onChangeText={(val)=>handlePasswordChange(val)}
          ></TextInput>
          <TouchableOpacity onPress={updateSecureTextEntry}>
          {data.secureTextEntry?
          <Feather
          name='eye-off'
          color="grey"
          size={20}
          />
          :
          <Feather
          name='eye-off'
          color="grey"
          size={20}
          />
          }
          </TouchableOpacity>
           </View> 
           <Text style={styles.textpass}> Forgetten Password? </Text> */}
           
           <View style={styles.button}>
            {/* <LinearGradient
              colors={['#08d4c4','#01ab9d']}
              style={styles.signIn}>
            <Text style={[styles.textSign,{color:'#fff'}]}>
             SignIn
            </Text>
            </LinearGradient> */}
             
            <TouchableOpacity
              onPress={()=> {ResetUser()}}
              style={[styles.signIn,{borderColor:'#be7df0',
            borderWidth:1,

            }]}>
            <Text style={[styles.textSign,{color:'#be7df0'}]}>
                Reset Password
            </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=> navigation.navigate('Signup')}> 
            <Text style={styles.text}>  Do you have an account? Sign up </Text>
          </TouchableOpacity> */}
         
           </View>
        </Animatable.View>
        
        
        {/* <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.createAcc}>Don't have account. Register Now</Text>
          </Pressable> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#be7df0',
  },
  header:{
      flex: 1,
      justifyContent:'flex-end',
      paddingHorizontal:20, 
      paddingBottom:50,
  },
  footer:{
      flex: 3,
      backgroundColor:'#fff',
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
      paddingVertical:30,
      paddingHorizontal:20,
  },
  text_header:{
      color:'#fff',
      fontWeight:'bold',
      fontSize:30,
  },
  text_footer:{
    color:'#05375a',
    fontSize:18,
},
  action:{
      flexDirection:'row',
      marginTop:10,
      borderBottomWidth:1,
      borderBottomColor:'#f2f2f2',
      paddingBottom:5,
  },
  textInput:{
      flex:1,
      marginTop:-12,
      paddingLeft:10,
      color:'#05375a',
  },
  button:{
      alignItems:'center',
      marginTop:40,
  },
  signIn:{
      width:'100%',
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
  },
  textSign:{
      fontSize:18,
      fontWeight:'bold',
  },
  text:{
    fontSize:15,
    fontWeight:'bold',
    color:'#009387',
    marginTop:20,
  },
  textpass:{
    fontSize:15,
    fontWeight:'bold',
    color:'#009387',
    marginTop:10,
  },
  })