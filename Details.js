


import React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,Alert
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage' 
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import axios from "axios";


// import {NavigationContainer, StackActions} from '@react-navigation/native'
//  import {createDrawerNavigator} from '@react-navigation/drawer'

//  import { createStackNavigator } from '@react-navigation/stack';




export default class App extends React.Component {
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
      count:1,
      cart:[],
      price:0,
      sum:0,
      kind_id:0,
      order_id:0,
      email:'',
      password:'',
      user_id:0,
    }
  }


//  async setData(){
//     let items= this.state.cart
//       await AsyncStorage.setItem("data",JSON.stringify(items))
//   }

//   async getData(){

//     if(items !=null){
//     let items = await AsyncStorage.getItem("data")
//     items =JSON.parse(items)
//     this.setState({cart:items})
//     }
//   }


  componentDidMount() {
    let Item =this.props.navigation.getParam("Item")
    let kind_id =this.props.navigation.getParam("kind_id")
    let user_id =  this.props.navigation.getParam("user_id")
    let email =  this.props.navigation.getParam("email")
    let password =  this.props.navigation.getParam("password")
    this.setState({
      Item: Item,
      kind_id:kind_id,
      user_id:user_id,
      email:email,
      password:password,
    })
    
    this.get_order_id();
  }


get_order_id(){
   axios.get("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Select_Order_id.php").then(res=>{
      
   if(res.status == 200){
       this.setState({
        order_id:res.data
       })
     
   }else{
     alert("Try again later")
   }
   })
}
 

Add_to_cart(){

 

  let data_to_send ={
    cart_price: this.state.price ==0? this.state.Item.kind_small : this.state.price,
    cart_count:this.state.count,
    order_id:  JSON.parse(this.state.order_id) +1 ,
    kind_id:this.state.kind_id,
  }
 
 
  axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Insert_Cart.php",data_to_send).then(res=>{

      if(res.status ==200){
       
        // alert(res.data)
      }else{
        alert("Try again later")
      }
  })
  
}


  plus(){
    let count =this.state.count
    count++;
    this.setState({count:count})
  }

  minus(){
    let count =this.state.count
    if(count==0){
      count=0;
    }else{
      count--;
    }
    
    this.setState({count:count})
  }



  Small(){
    let kind_price=this.state.Item.kind_small
     this.setState({price:kind_price})
  }

  Middle(){
    let kind_price=this.state.Item.kind_middle
    this.setState({price:kind_price})
  }

  Large(){
    let kind_price=this.state.Item.kind_large
    this.setState({price:kind_price})
  }
 


  Insert_like(){
    let data_to_send={
      user_id: this.state.user_id,
      kind_id:this.state.kind_id,
     }
     axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Insert_Likes.php",data_to_send).then(res =>{
   
       if (res.status == 200) {
        //  alert(res.data)
   
       } else {
         alert("Try again later")
       }
   
     })
 
  }


  
  render() {
    return (
      <>
        <StatusBar
          backgroundColor="#fff"  //#FF6C00
          barStyle="dark-content"
        />

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => {
              // this.props.navigation.navigate("Page4",{
              //   cart:this.state.cart
              // })
            }}
          >
            <Icon name="cart-arrow-down" size={26} style={{ color: '#000' }} />
          </TouchableOpacity>

          <Text style={{ fontSize: 24, fontWeight: 'bold', }}>Food</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
            <Icon name="arrow-left" size={23} style={{ color: '#000' }} />
          </TouchableOpacity>
        </View>

        <View style={{ alignSelf: 'center',
        width:windowWidth, justifyContent:'center',alignItems:'center',marginTop:15 }}>
          <Image source={{ uri: this.state.Item.kind_photo }}
            style={{ width: windowWidth * .8, height: windowHeight * .23,resizeMode:'contain' }}
          />
        </View>

        <View style={styles.couter}>
          <TouchableOpacity
            onPress={()=>{
              this.plus()
            }}
          >
          <Icon name="plus"  size={19} style={{}}/>
          </TouchableOpacity>
          <Text style={{fontSize:20,fontWeight:'bold'}}>{this.state.count}</Text>
          <TouchableOpacity
             onPress={()=>{
               this.minus()
             }}
          >
          <Icon name="minus"  size={18} style={{}}/>
          </TouchableOpacity>
        </View>

       
      <View style={{
        width:windowWidth*.92,
        height:65,
        // backgroundColor:'#ddd',
         justifyContent:'space-between',
         alignItems:'center',
         alignSelf:'center',
         flexDirection:'row',
         marginTop:10,
      }}>
        <View style={{
          width:windowWidth*.2,
          height:80,
         // backgroundColor:'#f00',
          alignItems:'center',
          justifyContent:'space-between',
          flexDirection:'row',
          }}>
             <Text style={{fontSize:20,color:'#FF5100'}}>{this.state.Item.kind_rating}</Text>
        <Image source={require('../img/star.png')}
          style={{width:30,height:30,}}
        />
        </View>
         <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}>{this.state.Item.kind_name}</Text>
      </View>

      <View style={styles.container} >
        <TouchableOpacity 
          onPress={()=>{
            this.Large()
          }}
        >
         <View style={[styles.style_view,{backgroundColor:'#FFDDDE'}]}>
         <Text style={{fontSize:23,fontWeight:'bold',color:'#000'}}>L</Text>
         </View>
         </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>{
              this.Middle()
            }}
          >
         <View style={[styles.style_view,{backgroundColor:'#FF5100'}]}>
           <Text style={{fontSize:22,fontWeight:'bold',color:'#fff'}}>M</Text>
         </View>
         </TouchableOpacity>

         <TouchableOpacity
           onPress={()=>{
             this.Small()
           }}
         >
         <View style={[styles.style_view,{backgroundColor:'#FFDDDE'}]}>
          <Text style={{fontSize:23,fontWeight:'bold',color:'#000'}}>S</Text>
         </View>
         </TouchableOpacity>
      </View>

      
      <Text style={{marginRight:21,marginTop:15,fontWeight:'bold',fontSize:22,color:'#FF5100'}}>
        {
        this.state.price ==0? 
        this.state.Item.kind_small :
         this.state.price}  LE</Text>
      
      <Text style={{marginRight:21,marginTop:10,fontWeight:'900',fontSize:20,color:'#000'}}>
     Description :</Text>

     <Text numberOfLines={3}
     style={{marginRight:21,marginTop:6,fontWeight:'600',fontSize:18,color:'#000'}}>
       {this.state.Item.kind_details}
    </Text>


    <View style={[styles.container,{height:60,alignItems:'flex-start',marginTop:20}]}>
      <TouchableOpacity
        onPress={()=>{
         // this.props.navigation.navigate("Page4")
        //  this.Add_to_cart() 
        this.Add_to_cart() 
         this.props.navigation.navigate("Page4",{
           order_id:  JSON.parse(this.state.order_id) +1 ,
           user_id:this.state.user_id,
           email:this.state.email,
           password:this.state.password,
           user_id:this.state.user_id,
        })
            
        }}
      >
       <View style={styles.card_view}>
          <Text style={{fontSize:20,fontWeight:'800',color:'#fff'}}>Add to Cart</Text>
       </View>
       </TouchableOpacity>

       <TouchableOpacity
         onPress={()=>{
           this.Insert_like()
         }}
       >
       <View style={{
         width:50,
         height:50,
         backgroundColor:'#FF5100',
         borderRadius:25,
         justifyContent:'center',
         alignItems:'center',
         }}>
            <Icon name ="heart" style={{color:'#fff'}} size={22} />
       </View>
       </TouchableOpacity>
    </View>
      
      
     
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
  couter: {
    width: windowWidth * .6,
    height: 50,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: '#fff', //#F3F0F7
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 15,
    justifyContent:'space-around',
    alignItems:'center',
    flexDirection:'row',
  },
  container:{
   width:windowWidth,
   height:windowHeight*.1,
  // backgroundColor:'#ddd',
   justifyContent:'space-around',
   alignItems:'center',
   flexDirection:'row',
  },
  style_view:{
    width:windowWidth*.25,
    height:50,
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center',
  },
  card_view:{
    width:windowWidth*.58,
    height:50,
    backgroundColor:'#FF5100',
    borderRadius:23,
    justifyContent:'center',
    alignItems:'center',
  },
})