import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Dimensions,StatusBar, Pressable } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
import auth, { firebase } from '@react-native-firebase/auth';
import { RadioButton } from 'react-native-paper';
// import { CheckBox } from 'react-native-elements';
import database from '@react-native-firebase/database';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LogInScreen';


const signupValidationSchema = Yup.object().shape({
  fullname: Yup.string().trim().min(3,'Invalid name!').required('Name is required'),
  email: Yup.string().trim().email('Invalid email!').required('Email is required'),
  qualification: Yup.string().required('Qualification is required!'),
  additionalSkill: Yup.string().required('Skill is required'),
  password: Yup.string().min(8 ,({min}) => 'password must be atleast 8 characters long')
  .required('Password is required')
  // // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])/, {
  //   message:
  //     "Password must be at least one uppercase, one lowercase, one special character and one number.",
  // })
})

export default function SignUp() {
  const navigation = useNavigation();
  // const [email, setemail] = useState('');
  // const [password, setpassword] = useState('');
  // const [fullname, setFullName ]  = useState('');
  // const [qualification, setQualification ]  = useState('');
  // const [additionalSkill, setAdditionalSkill ]  = useState(''); 
  const [expert, setExpert] = useState(false);
  const [student, setStudent]= useState(false);
  const [type, setType]= useState('');
  
  const [checked, setChecked] = React.useState('first');

  const typeExpert = () =>{
    setExpert(true);
    setStudent(false);
  }
  const typeStudent = () =>{
    setExpert(false);
    setStudent(true);
  }
  
  useEffect(() => {
    // await AsyncStorage.clear();
    // alert('Storage successfully cleared!');
    console.log("Signup")
    
  }, [])
    const SignupDatabase= (fullname,qualification,additionalSkill)=>{
      console.log("hey")
      database()
     .ref("Womenera")
    //    .ref(`here`)

          .child("message")
          .set({
             date: new Date().toUTCString(),
            fullname: fullname,
            sender_id: "id",
            qualification: qualification,
            additionalSkill: additionalSkill,
          })
          .then(async() => {
            console.log('sent!!!!');
            //setInput('');
           /// getMsgs(userId);
           await AsyncStorage.setItem("name",fullname)
            console.log(fullname)
          })
          .catch((err)=>{
            console.log("err",err)
            });

    }
    const SignUpUser=(email,password,fullname,qualification,additionalSkill) =>{
    auth()
    .createUserWithEmailAndPassword(email,password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('User account created & signed in!')
      SignupDatabase(fullname,qualification,additionalSkill);
      // navigation.navigate("LogInScreen");
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        console.log(email)
      }
  
      console.error(error);
    });
  }
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
    <ScrollView>
    <Formik 
    initialValues={{ fullname: '', email: '' , password:'',qualification:'',additionalSkill:''  }}
    validateOnMount={true}
    onSubmit={values => SignUpUser( values.email, values.password, values.fullname, values.qualification, values.additionalSkill)}
    validationSchema={signupValidationSchema}
  >
    {({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors }) => (
    <View style={styles.container}>
      <StatusBar backgroundColor='#be7df0' barstyle='light-content'/>
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now</Text>
      </View>
      <Animatable.View style={styles.footer}
      animation='fadeInUpBig'
      >
        <Text style={styles.text_footer}>Full Name</Text> 
        <View style={styles.action}>
          <FontAwesome
          name='user-o'
          color='#05375a'
          size={20}
          />
          <TextInput placeholder='Enter Your Full name'
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText= {handleChange('fullname')}
          onBlur={handleBlur('fullname')}
          value={values.fullname}
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
          {(errors.fullname && touched.fullname) &&
        <Text style={styles.errors}>{errors.fullname}</Text>}
          <Text style={[styles.text_footer,{marginTop:20}]}>Email</Text>
          <View style={styles.action}>
          <FontAwesome
          name='user-o'
          color='#05375a'
          size={20}
          />
          <TextInput placeholder='Enter Your Email'
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          keyboardType= 'email-address'
          ></TextInput>
      
          <TouchableOpacity >
          {/* {data.secureTextEntry?
          // <Feather
          // name='eye-off'
          // color="grey"
          // size={20}
          // />
          // :
          // <Feather
          // name='eye-off'
          // color="grey"
          // size={20}
          // />
          }
           */}
          </TouchableOpacity>
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
          style={styles.textInput}
          autoCapitalize="none"
          secureTextEntry={data.secureTextEntry? true:false}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
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
           <Text style={[styles.text_footer,{marginTop:20}]}>Qualification</Text>
          <View style={styles.action}>
        
          <TextInput placeholder = 'Enter your qualification'
          style={styles.textInput}
          autoCapitalize="none"
           onChangeText={handleChange('qualification')}
           onBlur={handleBlur('qualification')}
           value={values.qualification}
          ></TextInput>
           
           </View>
           {(errors.qualification && touched.qualification) &&
        <Text style={styles.errors}>{errors.qualification}</Text>}
           <Text style={[styles.text_footer,{marginTop:20}]}>Additional Skills</Text>
          <View style={styles.action}>
          <TextInput placeholder = 'Enter your Skills'
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={handleChange('additionalSkill')}
          onBlur={handleBlur('additionalSkill')}
          value={values.additionalSkill}
          ></TextInput>
            {(errors.additionalSkill && touched.additionalSkill) &&
        <Text style={styles.errors}>{errors.additionalSkill}</Text>}
           </View>
           <Text style={[styles.text_footer,{marginTop:20}]}>User Type</Text>
           <View style={{
             flexDirection: 'row',
             marginTop: 15
           }
           }>
             <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      />
       <Text style={{color:'black',fontSize:18,marginTop:5}}>Expert</Text>
        <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      />
      <Text style={{color:'black',fontSize:18,marginTop:5}}>Student</Text>
           </View>
           <TouchableOpacity style={styles.button}
            onPress= {()=> {handleSubmit('email'); navigation.navigate("BottomNavigation")}}
            // onPress={()=> navigation.navigate("HomeScreen")}
            >
            <LinearGradient
              colors={['#be7df0','#6a1ca6']}
              style={styles.signIn}>
            <Text style={[styles.textSign,{color:'#fff'}]}>
             Sign Up
            </Text>
            </LinearGradient>
            <TouchableOpacity
               onPress={() => navigation.navigate("LogInScreen")}
              style={[styles.signIn,{borderColor:'#be7df0',
            borderWidth:1,
            marginTop:15
            }]}>
            <Text style={[styles.textSign,{color:'#be7df0'}]}>
              Sign In
            </Text>
            </TouchableOpacity> 
           </TouchableOpacity>
        </Animatable.View>
    </View>
  )}
  </Formik>
  </ScrollView>
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
      flex: 14,
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
      marginTop:20,
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
  errors:{
    fontSize:14,
    color:'red',
    fontWeight:'bold',
    marginTop:5 
  }
  })
