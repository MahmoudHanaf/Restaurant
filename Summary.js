



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


import axios from "axios";
import MapView, {
    ProviderPropType,
    Marker,
    AnimatedRegion,
  } from 'react-native-maps';

  export default class Summary extends React.Component{
    constructor(props){
      super(props);
      this.state={

        initialRegion:{},
        cart:[],
        note:'',
        Total:0,
        order_user_id:0,
      }
    }


    componentDidMount(){
      let cart=this.props.navigation.getParam("cart")
      let initialRegion=this.props.navigation.getParam("initialRegion")
      let Total=this.props.navigation.getParam("Total")
      let order_user_id =  this.props.navigation.getParam("user_id")
      this.setState({
        cart:cart,
        initialRegion : initialRegion,
        Total: parseInt(Total) +10,
        order_user_id:order_user_id
      })
       
     
    }
    

   Insert_order(){
   
    let data_to_send={
      order_user_id:this.state.order_user_id,
      order_total:this.state.Total ,
      order_note:this.state.note,
      order_latitude:this.state.initialRegion.latitude,
      order_longitude:this.state.initialRegion.longitude,
      order_latitudeDelta:this.state.initialRegion.latitudeDelta,
      order_longitudeDelta:this.state.initialRegion.longitudeDelta,
    }
    axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Insert_Order.php",data_to_send).then(res=>{
       
    if(res.status == 200){
        //  alert(res.data)
        // alert("Your order is dlivered")
        this.props.navigation.navigate("Rented")
      
    }else{
      alert("Try again later")
    }
    })

   }


    


    

    
    render(){
      return(
        <>
         <StatusBar
          backgroundColor="#fff"  //#FF6C00
          barStyle="dark-content"
        />
          
          <View style={styles.header}>
              <View style={{width:40,height:50,}}></View>
          <Text style={{ fontSize: 23, fontWeight: 'bold', }}>My Order</Text>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
            <Icon name="arrow-left" size={23} style={{ color: '#000' }} />
          </TouchableOpacity>
        </View>
            

<ScrollView>
       
        <View  style={[styles.sub_view,{height:48,marginTop:20,
            shadowColor: "#000",
           
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            backgroundColor:'#fff',
            borderRadius:10,
            marginTop:10,
            paddingLeft:10,
            paddingRight:10,
            marginBottom:10,
        }]} >


             <Text style={{fontSize:18,fontWeight:'bold',color:'#FF5D00'}}>Price</Text>
             <Text style={{fontSize:18,fontWeight:'bold',marginRight:55,color:'#FF5D00'}}>Quantity</Text>
             <Text style={{fontSize:18,fontWeight:'bold',color:'#FF5D00'}}>Item</Text>
          </View>


          {
                 this.state.cart.map((item,index)=>

                 <View style={[styles.sub_view,{paddingLeft:10,paddingRight:10,marginTop:10}]}>

                  <View style={{width:windowWidth*.18,alignItems:'flex-start',paddingLeft:5}}>
                 <Text style={{fontSize:17,fontWeight:'bold'}}>{item.cart_price}</Text>
                 </View>
                 <View style={{width:windowWidth*.18,alignSelf:'center'}}>
                 <Text style={{fontSize:17,fontWeight:'bold'}}>{item.cart_count}</Text>
                 </View>

                 <View style={{width:windowWidth*.46,}}>
                 <Text style={{fontSize:17,fontWeight:'bold'}}>{item.kind_name}</Text>
                 </View>
               
              </View>

                 )
               }



          <View style={[styles.sub_view,{marginTop:25,justifyContent:'center'}]}>

          <View style={{ width:windowWidth*.93,backgroundColor:'#fff',height:windowHeight*.23,
              
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
              borderRadius: 10,
              marginLeft:0,
              marginTop:5
          }}>
          <View  style={[styles.sub_view,{ width:windowWidth*.9,alignSelf:'center',
              marginTop:10,
              paddingLeft:15,
              paddingRight:10,
              marginBottom:10,
          }]} >
                  <Text style={{fontSize:17,fontWeight:'bold'}}>5 %</Text>
                  <Text style={{fontSize:17,fontWeight:'bold'}}>Discount :</Text>
            </View>

            <View  style={[styles.sub_view,{ width:windowWidth*.9,alignSelf:'center',
              paddingLeft:15,
              paddingRight:10,
              marginBottom:10,
              marginTop:5
          }]} >
                  <Text style={{fontSize:17,fontWeight:'bold'}}>40 LE</Text>
                  <Text style={{fontSize:17,fontWeight:'bold'}}>Delivery Cost :</Text>
            </View>


            <View  style={[styles.sub_view,{ width:windowWidth*.9,alignSelf:'center',
              paddingLeft:15,
              paddingRight:10,
              marginBottom:10,
              marginTop:5
            }]} >
                  <Text style={{fontSize:17,fontWeight:'bold'}}>45 minute</Text>
                  <Text style={{fontSize:17,fontWeight:'bold'}}>Order Time :</Text>
            </View>


            <View  style={[styles.sub_view,{ width:windowWidth*.9,alignSelf:'center',
              paddingLeft:15,
              paddingRight:10,
              marginBottom:10,
              marginTop:5
          }]} >
                  <Text style={{fontSize:17,fontWeight:'bold'}}>{this.state.Total} LE</Text>
                  <Text style={{fontSize:17,fontWeight:'bold'}}>Total :</Text>
            </View>

            </View>
            </View>


            <View style={{height:80,justifyContent:'space-between', marginTop:25,}}>
            <View style={styles.text_input}>
              <Icon name="clipboard" style={{ marginLeft: 5 ,marginTop:12}} size={21} />
              <TextInput placeholder="Enter Your Notes"
                style={{ fontSize: 17 }}
                
                value={this.state.note}
                onChangeText={(value) => {
                  this.setState({ note: value })
                }}
              />
            </View>
            {/* <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>{this.state.eroorNote}</Text> */}
              </View>



            <TouchableOpacity
            onPress={()=>{
               this.Insert_order()
               
            }}
          >
          <View style={{
            width:windowWidth*.65,
            height:50,
            backgroundColor:'#FF5100',
            borderRadius:10,
            alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',  
            marginTop:windowWidth*.1,
          }}>
              <Text style={{fontSize:21,fontWeight:'bold',color:'#fff'}}>Confirm Order</Text>
          </View>
          </TouchableOpacity>


      </ScrollView>
 
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
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: 'row',
    },
    sub_view:{
      width:'95%',
      // height:windowHeight*.2,
      // backgroundColor:'#0ff',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      alignSelf:'center',
      
    },
    text_input: {
      width: windowWidth * .93,
      height:windowHeight*.1,
      backgroundColor: '#fff',
      borderRadius: 20,
      paddingLeft: 10,
      paddingRight: 8,
      alignItems:'flex-start',
      flexDirection: 'row-reverse',
      alignSelf: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      borderRadius: 10,
      marginLeft:0,
     
      // marginBottom:20,
    }
  });