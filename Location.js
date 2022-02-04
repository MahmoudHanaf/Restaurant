


import * as React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList, Platform, ToastAndroid,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import AppIntroSlider from 'react-native-app-intro-slider';

// import {NavigationContainer, StackActions} from '@react-navigation/native'
//  import {createDrawerNavigator} from '@react-navigation/drawer'

//  import { createStackNavigator } from '@react-navigation/stack';

import { backgroundColor, next, button, textInput } from './Tasks/Colors'



import MapView, {
    ProviderPropType,
    Marker,
    AnimatedRegion,
  } from 'react-native-maps';

  export default class Location extends React.Component{
    constructor(props){
      super(props);
      this.state={
        
        cart:[],

        initialRegion:{
          latitude: 	30.94226470,
          longitude: 30.81574230  ,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,   //0.0421
        },
        Total:0,
        user_id:0,
   
      }
    }

     componentDidMount(){
       let cart =this.props.navigation.getParam("cart")
       let Total =this.props.navigation.getParam("Total")
       let user_id = this.props.navigation.getParam("user_id")

       this.setState({
         cart:cart,
         Total:Total,
         user_id:user_id
      })
   
     }
     

    onChangeValue =initialRegion =>{
      ToastAndroid.show(JSON.stringify(initialRegion),ToastAndroid.SHORT)

      this.setState({
        initialRegion
      })

    }


  

    render(){
      return(
        <>
         <StatusBar
          backgroundColor="#fff"  //#FF6C00
          barStyle="dark-content"
        />

        <View style={styles.container}>
      <MapView style={styles.map} 
         
         initialRegion={this.state.initialRegion}
         onRegionChangeComplete={this.onChangeValue}
          ref={ref => this.map =ref}

      />

      <View style={{left:'50%',marginLeft:-24,marginTop:-24,position:'absolute'}}>
        <Image source={require('../img/m1.png')}
          style={{width:45,height:40,resizeMode:'contain'}} 
        />
      </View>

      <TouchableOpacity
            onPress={()=>{
              this.props.navigation.navigate("Summary",{
                cart:this.state.cart,
                initialRegion:this.state.initialRegion,
                 Total:this.state.Total,
                 user_id:this.state.user_id,
                 
              })
             
            }}
          >
          <View style={{
            width:windowWidth*.55,
            height:50,
            backgroundColor:'#FF5100',
            borderRadius:15,
            alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',  
           marginTop:15
          }}>
              <Text style={{fontSize:22,fontWeight:'bold',color:'#fff'}}>Next</Text>
          </View>
          </TouchableOpacity>


    </View>
        </>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height*.879,
    },
  });