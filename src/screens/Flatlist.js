import React, {useState, useEffect} from 'react'
import { SafeAreaView, StyleSheet,ScrollView, View, Text,ActivityIndicator, FlatList, Image, TouchableOpacity} from 'react-native'

const MyFlatlist = (props) =>{
    console.log(props)
    const[isLoading, setisLoading] = useState([]);
    const [data,setdata] = useState([]);

    useEffect(()=>{
        getListPhotos();
        return() =>{

        }
    },[])

    const getListPhotos =() =>{
        const apiURL = 'https://jsonplaceholder.typicode.com/photos?_limit=20&_page=1';
        fetch(apiURL)
        .then((res) => res.json())
        .then((resJson) =>{
            setdata(resJson)
        }).catch((error) => {
            console.log('Error: ', error )
        }).finally(()=>setisLoading(false))
        
    }
    const renderItem=({item, index}) =>{
        return(
            <TouchableOpacity
            style = {[styles.item,{
                marginLeft:14,
                width:200,
                // marginTop:11,
                height:150,
                backgroundColor:'white'
            }]}>
                <Image
                style= {styles.image}
                source = {{uri:item.url}}
                resizeMode='contain'
                />
            </TouchableOpacity>
        )
    }
    return(
        <SafeAreaView style = {styles.container}>
            {isLoading ? <ActivityIndicator/> :(
                <FlatList
                data = {data}
                renderItem = {renderItem}
                keyExtractor={item => `key-${item.id}`}
                horizontal = {props.mode == 'horizontal' ? true : false}
                vertical = {props.mode == 'vertical' ? true: false}
                />
        )}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    item:{
      borderWidth:0.5,
      padding:8,
      borderRadius:10,

    },
    image:{
        width:100,
        height:100,

    }
})
export default MyFlatlist