import React , {useState, useEffect}from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Dimensions,StatusBar, Pressable } from 'react-native'
// import {TextInput,ScrollView,TouchableOpacity} from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import MyFlatlist from './Flatlist'
import { db } from './config'
import { setDoc , doc, getDoc, addDoc, collection} from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'


const ExpertHomescreen = ({navigation}) => {
    const [scholarship, setscholarship] = useState('')
    // useEffect(() =>{
    //     create();    
    //   },[])

    // function create() {
        // const response=db.collection('mydata');
        // const data=await response.get();
        // console.log(data)
        // const myDoc = doc(db, "MyCollection" , "MyDocument")
       
        // const docData = {
        //     "scholarship" :scholarship.replace,
        // }
        // addscholarship(docData, redirect)
        // setDoc(myDoc, docData)  
        // console.log("start")
        //  setDoc(doc(db, "myscholarships", "data"),{
        //     scholarship: scholarship,
        // })
        // addDoc(collection(db, "scholarships"), {
        //     scholarship: scholarship,
        // })
        // .then(() => {
        //         alert("created")
        //         console.log("created")
        // }) .catch((error) => {
        //         alert(error.message)
        //         console.log("456")
        // })
    // }
    // function redirect() {
    //     navigation.navigate("HomeScreen")
    // }

function create () {
    console.log("kchbhi")
    addDoc(collection(db,"scholarships"),{
        scholarship: scholarship,
    }).then(()=>{
        console.log ("entered successfully")
    }).catch((error)=>{
        console.log(error)
    })
}
    function Read() {

    }
const Update = () => {
    
}
const Delete = () => {
    
}
    return(
        <View style={{
            backgroundColor:"#FFF",
            flex:1
        }}>
           <View style={{
               backgroundColor:"#be7df0",
               height:"28%",
               borderBottomLeftRadius:20,
               borderBottomRightRadius:20,
               paddingHorizontal:20
           }}>
                        {/* <Image
                            source={require('../assets/avatar.webp')}
                            style={{height:60,width:60}}
                        /> */}
               <View style={{
                   flexDirection:"row",
                   alignItems:"center",
                   marginTop:25,
                   width:"100%"
               }}>
                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontSize:28,
                            color:"#FFF",
                            fontWeight:"bold"
                        }}>Hi Nimerta</Text>
                   </View>
                   <View style={{width:"50%",alignItems:"flex-end"}}>
                        {/* <Image
                            source={require('../images/g.png')}
                            style={{height:60,width:60}}
                        /> */}
                   </View>
               </View>
           </View>
           <LinearGradient
            colors={["rgba(0,164,109,0.4)", "transparent"]}
            style={{
                left:0,
                right:0,
                height:90,
                marginTop:-45
            }}
           >
               <View style={{
                   backgroundColor:"#FFF",
                   paddingVertical:8,
                   paddingHorizontal:20,
                   marginHorizontal:20,
                   borderRadius:15,
                   marginTop:25,
                   flexDirection:"row",
                   alignItems:"center"
               }}>
                   <TextInput
                        placeholder="Search"
                        placeholderTextColor="#e69ae0"
                        style={{
                            fontWeight:"bold",
                            fontSize:18,
                            width:260
                        }}

                   />
               </View>
              
            </LinearGradient>
            <Text> Recommended Students</Text>
            <MyFlatlist mode={'horizontal'} />       
            <Text> Upload Scholarship</Text>
            <TextInput placeholder = 'Add Scholarship'
             value={scholarship}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(scholarship)=>setscholarship(scholarship)}
            // onBlur={handleBlur('additionalSkill')}
           
            ></TextInput>
            <TouchableOpacity
               onPress={() => create()}
              style={[styles.submit,{borderColor:'#be7df0',
            borderWidth:1,
            marginTop:15
            }]}>
            <Text style={[styles.textSign,{color:'#be7df0'}]}>
              Submit
            </Text>
            </TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({
    textInput:{
        flex:1,
        // marginTop:-12,
        
        color:'#05375a',
        borderWidth:0.5,
        borderRadius:4,
        width:300,
        alignSelf:'center'
    },
    // button:{
    //     alignItems:'center',
    //     marginTop:20,
    // },
    submit:{
        width:100,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        alignSelf:'center'
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold'
    },
    })
export default ExpertHomescreen;