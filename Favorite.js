



import React from "react";
import {
    Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView,
    FlatList, Alert, ActivityIndicator
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// import {NavigationContainer, StackActions} from '@react-navigation/native'
//  import {createDrawerNavigator} from '@react-navigation/drawer'

//  import { createStackNavigator } from '@react-navigation/stack';

import axios from 'axios'


export default class Favorite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            name: '',
            Kinds: [],
            index: 0,
            photo: '',
            showText: false,
            check: 1,
            Item: {},
            count: 1,
            cart: [],
            sum: 0,
            loading: true,
            Categoris: [],
            user_id: 0,
            show:true
        }
    }



    componentDidMount() {
        let user_id = this.props.navigation.getParam("user_id")
        this.setState({ user_id: user_id })

        this.get_Data(user_id)
        
    }


    get_Data(user_id) {
        let data_to_send = {
            user_id: user_id,
        }
        axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Select_Favorites.php", data_to_send).then(res => {

            if (res.status == 200) {
                if(typeof(res.data) == typeof([])){ 
                    this.setState({
                        Categoris:res.data,
                        loading:false,
                    })
                } else{
                     this.setState({
                       
                         loading:false
                     })
                }
                
               
            } else {
                alert("Try again later")
            }

        })
    }


    Delete(like_id) {
        let Send_Data = {
            like_id: like_id,

        }
        axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Delete_Favorites.php", Send_Data).then(res => {
            if (res.status == 200) {
                alert(res.data)
            }
            else {
                alert("Try again later")
            }
        })
    }


    createTwoButtonAlert = (like_id,index) =>
    Alert.alert(
      "Do You Want to delete Item ",
      "",

      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: 'cancel',
        },
        { text: "Yes", onPress: () => {
        this.Delete(like_id)
        this.Delete_Item(index)
        }
       
     }
      ],
      { cancelable: false }
    );



    Delete_Item(index){
       
            let cart = this.state.Categoris
            let show=this.state.show 
            cart.splice(index, 1)
            this.setState({ Categoris: cart,show:show })   //sum:sum
    }





render() {
return (
    <>

        <StatusBar
            backgroundColor="#fff"  //#FF6C00
            barStyle="dark-content"
        />
   
     {
         this.state.loading ==false ?(
            <>
             <View style={styles.header}>

<View style={{ width: 40, height: 50, }}></View>

<Text style={{ fontSize: 24, fontWeight: 'bold', }}>Favorites</Text>
<TouchableOpacity
    onPress={() => {
        this.props.navigation.goBack()
    }}
>
    <Icon name="arrow-left" size={23} style={{ color: '#000' }} />
</TouchableOpacity>
</View>



<View style={styles.container}>
<ScrollView>

    

     {
    this.state.Categoris.map((data, index) =>

        <View style={styles.style_map}>
            <TouchableOpacity
                onPress={() => {
                    //    this.props.navigation.navigate("Page3")
                }}
            >
                <View style={{ flexDirection: 'row' }}>


                    <View style={{
                        width: windowWidth * .5,
                        height: windowHeight * .18,
                        //  backgroundColor:'#ddd',
                        marginRight: 25,
                        alignItems: 'flex-end',
                        justifyContent: 'space-around',
                        paddingTop: 7,
                        paddingRight: 5,
                        marginTop: windowWidth * .09

                    }}>
                        <Text style={{ fontSize: 21, fontWeight: 'bold', }}>{data.kind_name}</Text>
                        <Text style={{ fontSize: 16, }}>Spicy burgerpasta with pron</Text>
                        <Text style={{ fontSize: 21, fontWeight: 'bold', color: '#FF5100', }}>50  LE</Text>
                    </View>

                    <View style={{}}>
                        <TouchableOpacity
                            onPress={() => {
                               
                                this.createTwoButtonAlert(data.like_id,index)
                                this.get_Data(this.state.user_id)
                                // this.createTwoButtonAlert(index)
                            }}
                        >
                            <Icon name="trash-alt" size={22} style={{ marginRight: 10, marginTop: 5 }} />
                        </TouchableOpacity>
                        <Image source={{uri:data.kind_photo}}
                            style={{ width: windowWidth * .35, height: windowHeight * .2, resizeMode: 'contain' }}
                        />
                    </View>
                </View>

            </TouchableOpacity>
        </View>


    )
}

   

<View style={{ width: 50, height: 40 }}></View>

</ScrollView>
</View>
            </>
         ):(
            <View style={{width:windowWidth,height:windowHeight,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size={60} color="#FF5100">

                </ActivityIndicator>
            </View>
         )
     }


       

               

    </>
)
}
}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '8%',   //windowHeight * .08
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
    },
    container: {
        width: '100%',
        height: windowHeight,
        // backgroundColor: '#f0f',
        justifyContent: 'space-between',
        alignItems: 'center',


    },
    style_map: {
        width: windowWidth * .95,
        height: windowHeight * .25, //
        backgroundColor: '#fff',     //#F3F0F7
        marginTop: windowHeight * .04,
        justifyContent: 'space-around',
        // flexDirection:'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,

        borderRadius: 22,
        alignSelf: 'center'
    },
    check: {
        width: windowWidth * .7,
        height: 50,
        backgroundColor: '#FF5100',
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop:windowHeight*.1
    },
})