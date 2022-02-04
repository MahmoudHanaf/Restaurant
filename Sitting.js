




import React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,
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




export default class Sitting extends React.Component {
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
      count:0,
      cart:[],
      profile_name:'Mahmoud Nabeh',
      profile_email:'Mahmuoudhanafy@gmail.com',
    }
  }
 render(){
     return(
         <>
              <StatusBar
          backgroundColor="#fff"  //#FF6C00
          barStyle="dark-content"
        />

        <View style={styles.header}>

            <View style={{width:25,height:40}}></View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', }}>Sitting</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
            <Icon name="arrow-left" size={23} style={{ color: '#000' }} />
          </TouchableOpacity>
        </View>
 
              <View style={{
                width:windowWidth*.85,
                height:50,
                flexDirection:'row',
               // backgroundColor:'#ff0',
                alignSelf:'flex-end',
                alignItems:'center',
                justifyContent:'space-between',
                marginTop:8
                }}>

              
              <TouchableOpacity>
                  <View style={{width:50,height:50,justifyContent:'center',alignItems:'center'}}>
                    <Icon  name="toggle-on" size={28} style={{}}/>
                  </View>
              </TouchableOpacity>

              <View style={[styles.style_view,{width:windowWidth*.41,marginTop:13}]}>
                 <Text style={{fontSize:19,fontWeight:'bold',}}>Notifiation</Text>
                 <Icon name="bell" size={22} style={{}}/>
              </View>
              </View>


              <View style={{
                width:windowWidth*.85,
                height:50,
                flexDirection:'row',
               // backgroundColor:'#ff0',
                alignSelf:'flex-end',
                alignItems:'center',
                justifyContent:'space-between',
                marginTop:8
                }}>

              <TouchableOpacity>
                  <View style={{width:50,height:50,justifyContent:'center',alignItems:'center'}}>
                    <Icon  name="toggle-on" size={28} style={{}}/>
                  </View>
              </TouchableOpacity>

              <View style={[styles.style_view,{width:windowWidth*.41,marginTop:13}]}>
                 <Text style={{fontSize:19,fontWeight:'bold',}}>Dark Mode</Text>
                 <Icon name="moon" size={22} style={{}}/>
              </View>
              </View>

              
              

              
         </>
     )
 }
}

const styles=StyleSheet.create({
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
      photo_view:{
         width:windowWidth*.48,
         height:windowHeight*.21,
         backgroundColor:'#F1E5E0',
         justifyContent:"center",
          alignItems:"center",
          marginTop:windowHeight*.08,
          alignSelf:"center",
          borderRadius:20,
     },

     style_view:{
      width:windowWidth*.36,
      height:50,
      alignSelf:'flex-end',
    // backgroundColor:'#ddd',
      justifyContent:'space-around',
      alignItems:'center',
      flexDirection:'row',
      paddingRight:10,
     },
})
