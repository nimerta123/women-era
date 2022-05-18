import { View, Text, StyleSheet, TextInput, TouchableOpacity,Dimensions,StatusBar, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

const loginValidationsSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email address is required'),
  password: Yup.string().min(8 ,({min}) => 'password must be atleast 8 characters long')
  .required('Password is required')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])/, {
    message:
      "Password must be at least one uppercase, one lowercase, one special character and one number.",
  })
})

export default function LoginScreen() {
  useEffect(() => {
    console.log("LogInScreen")
  }, [])
 
  const LoginUser=(email, password) =>{
    auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!');
    navigation.navigate("BottomNavigation")
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

    const [data,setdata]=React.useState({
      email:'',
      password:'',
      check_textInputChange:false,
      secureTextEntry:true
    });

    const textInputChange = (val)=>{
      if(val.length !== 0 ){
        setdata({
          ...data,
          email:val,
          check_textInputChange:true
        });
      }else{
        setdata({
          ...data,
          email:val,
          check_textInputChange:false
        });
      }
    }

    const handlePasswordChange=(val)=>{
      setdata({
            ...data,
            password:val
      });
    }

    const updateSecureTextEntry=()=> {
      setdata({
          ...data,
          secureTextEntry:!data.secureTextEntry
      });
    }
    

  return (
    <Formik 
    initialValues={{ email: '' , password:'' }}
    validateOnMount={true}
    onSubmit={values => LoginUser(values.email, values.password)}
    validationSchema={loginValidationsSchema}
  >
    {({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors }) => (
    <View style={styles.container}>
      <StatusBar backgroundColor='#be7df0' barstyle='light-content'/>
      <View style={styles.header}>

        <Text style={styles.text_header}>Sign In</Text>
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
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          style={styles.textInput}
          autoCapitalize="none"
          ></TextInput>
          {data.check_textInputChange ?
          <Animatable.View  animation='bounceIn'>
          <Feather
          name='check-circle'
          color="green"
          size={20}
          />
          </Animatable.View>
          :null}
          </View>
          {(errors.email && touched.email) &&
        <Text style={styles.errors}>{errors.email}</Text>}
          <Text style={[styles.text_footer,{marginTop:20}]}>Password</Text>
          <View style={styles.action}>
          <FontAwesome
          name='user-o'
          color='#05375a'
          size={20}
          />
          <TextInput placeholder='Enter Your Password'
           onChangeText={handleChange('password')}
          //  onBlur={handleBlur('password')}
           value={values.password}
          // onChangeText={text=>setpassword(text)}
          style={styles.textInput}
          autoCapitalize="none"
          secureTextEntry={data.secureTextEntry? true:false}
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
           {(errors.password && touched.password) &&
        <Text style={styles.errors}>{errors.password}</Text>}
           <Pressable onPress={() => navigation.navigate("ForgetPass")}>
            <Text style={styles.forgotpass}>forgot Password</Text>
          </Pressable>
           <TouchableOpacity style={styles.button}
           onPress= {()=> {handleSubmit()}}>
            <LinearGradient
              colors={['#be7df0','#6a1ca6']}
              style={styles.signIn}>
            <Text style={[styles.textSign,{color:'#fff'}]}>
             Sign in
            </Text>
            </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
            // onPress= {()=> {handleSubmit()}}
              style={[styles.signIn,{borderColor:'#be7df0',
            borderWidth:1,
            marginTop:15
            }]}>
            <Text style={[styles.textSign,{color:'#be7df0'}]}>
              Sign in with Google
            </Text>
            </TouchableOpacity>
            <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={styles.createAcc}>Don't have account. Register Now</Text>
          </Pressable>
        </Animatable.View>
    </View>
    )}
    </Formik>
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
      marginTop:50,
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
      fontWeight:'bold'
  },
  forgotpass:{
    marginTop:30,
    textDecorationLine:'underline',
  },
  createAcc:{
    marginTop:15,
  },
  errors:{
    fontSize:14,
    color:'red',
    fontWeight:'bold',
    marginTop:5 
  }
  })