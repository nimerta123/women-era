import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import MyFlatlist from './Flatlist';
import 'firebase/firestore';
// import { collection, query, where, onSnapshot } from "firebase/firestore";
// import { db } from './config'
import firestore from '@react-native-firebase/firestore';
//newcode
// import { firebase } from './config'
import {collection, setDoc, doc, getDocs, addDoc} from 'firebase/firestore';

const HomeScreen = ({navigation}) => {
  const [fetchsch, setfetchsch] = useState('');
  const [name, setname] = useState('');
  const [scholarships, setScholarships] = useState();

  useEffect(() => {
    getdata();
    // firestore()
    //   .collection('Users')
    //   .add({
    //     name: 'Ada Lovelace',
    //     age: 30,
    //   })
    //   .then(() => {
    //     console.log('User added!');
    //   });
  }, []);
  var scholarShipsArray = [];
  const getdata = async () => {
    firestore()
      .collection('scholarships')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        //  setScholarships(querySnapshot);
        querySnapshot.forEach(documentSnapshot => {
          // console.log(
          //   'User ID: ',
          //   documentSnapshot.id,
          //   documentSnapshot.data(),
          // );
          scholarShipsArray.push(documentSnapshot.data());
          setScholarships([...scholarships, scholarShipsArray]);

          console.log('scholarShipsArray', scholarships);
        });
      });
  };

  //newreadcode
  // const Read = () => {
  //     const myDoc =doc(db, "scholarships", "id")
  // getDoc(myDoc)
  // .then((snapshot) =>{
  //     if(snapshot.exists){
  //        setfetchsch(snapshot.data())
  //     }
  //     else{
  //         alert("no doc found")
  //     }
  // })
  // .catch((error) => {
  //     alert(error.message)
  // })
  // }
  //newcode

  // const scholarshipRef = firestore().collection('scholarships')

  // useEffect(() => {
  // getDocs(collection(db, "scholarships")).then(docSnap =>{
  //         let sch = [];
  //        docSnap.forEach((doc) =>{
  //            sch.push({ ...doc.data(),id:doc.id})
  //        })
  //        console.log("data", sch)
  //        setfetchsch(sch)
  //    })
  // },[]);

  // useEffect(async() =>{
  // const userInfo = await AsyncStorage.getItem("name")
  // console.log(userInfo)
  // setname(userInfo);
  // scholarshipRef.onSnapshot(querySnapshot=>{
  //     const fetchsch = []
  //     querySnapshot.forEach((doc) =>{
  //         const{sch} = doc.data()
  //         fetchsch.push({
  //             id: doc.id,
  //             sch,

  //         })
  //     })
  //     setfetchsch(fetchsch )
  // })
  //   },[])
  return (
    <View
      style={{
        backgroundColor: '#FFF',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: '#be7df0',
          height: '28%',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
        }}>
        {/* <Image
                            source={require('../assets/avatar.webp')}
                            style={{height:60,width:60}}
                        /> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 25,
            width: '100%',
          }}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                fontSize: 28,
                color: '#FFF',
                fontWeight: 'bold',
              }}>
              Hi {name}
            </Text>
          </View>
          <View style={{width: '50%', alignItems: 'flex-end'}}>
            {/* <Image
                            source={require('../images/g.png')}
                            style={{height:60,width:60}}
                        /> */}
          </View>
        </View>
      </View>
      <LinearGradient
        colors={['rgba(0,164,109,0.4)', 'transparent']}
        style={{
          left: 0,
          right: 0,
          height: 90,
          marginTop: -45,
        }}>
        <View
          style={{
            backgroundColor: '#FFF',
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginHorizontal: 20,
            borderRadius: 15,
            marginTop: 25,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#e69ae0"
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              width: 260,
            }}
          />
        </View>
      </LinearGradient>
      {/* <Text> Recommended Experts</Text> */}
      {/* <MyFlatlist mode={'horizontal'} /> */}
      <Text> Recommended Jobs</Text>

      {/* {scholarships?.forEach((item, index) => {
        console.log('item========>', item?.scholarship);
        return (
          <View id={index} style={{backgroundColor: 'red', width: 100}}>
            <Text>{item?.scholarship}</Text>
          </View>
        );
      })} */}

      {scholarships.map(item => {
        console.log('item', item);
        return <Text>{item?.scholarship}</Text>;
      })}

      {/* <MyFlatlist mode= {'vertical'}/> */}
      {/* //newcode */}
      {/* <View style={{flex: 2, marginTop: 100}}>
        <FlatList
          style={{height: '50%'}}
          data={fetchsch}
          numColumns={1}
          renderItem={({item}) => (
            <Pressable style={styles.container}>
              <View style={styles.innercontainer}>
                <Text style={styles.itemtext} />
              </View>
            </Pressable>
          )}
        />
      </View> */}
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
  },
  innercontainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  itemtext: {
    fontWeight: 300,
  },
});
