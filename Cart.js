


import React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList, Alert, ActivityIndicator
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

import axios from "axios";
import { user } from "./Colors";



export default class Cart extends React.Component {
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
      order_id: 0,
      Total: 0,
      loading: true,
      email:'',
      password:'',
      user_id:0,
      show:true,
    }
  }


  componentDidMount() {
    let order_id = this.props.navigation.getParam("order_id")
    let user_id =  this.props.navigation.getParam("user_id")
    let email =  this.props.navigation.getParam("email")
    let password =  this.props.navigation.getParam("password")
  
    
    this.setState({ 
      order_id: order_id ,
      user_id:user_id,
      email:email,
      password:password,
    })


    /// get  Cart Data
    let data_to_send = {
      order_id: order_id,
      email:email,
      password:password,
    }
    axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Select_Cart.php", data_to_send).then(res => {

      if (res.status == 200) {
        this.setState({
          cart: res.data
        })
        // alert(res.data)

      } else {
        alert("Try again later")
      }
    })


    ///get Total
    let data = {
      order_id: order_id,
    }
    axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Select_Total.php", data).then(res => {

      if (res.status == 200) {
        this.setState({
          Total: res.data,
          loading: false
        })

      } else {
        alert("Try again later")
      }
    })

  }






  get_Cart() {
    let data_to_send = {
      order_id: this.state.order_id,
      email:this.state.email,
      password:this.state.password,
    }
    axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Select_Cart.php", data_to_send).then(res => {

      if (res.status == 200) {
        this.setState({
          cart: res.data
        })

      } else {
        alert("Try again later")
      }
    })

  }

  get_Total() {
    let data = {
      order_id: this.state.order_id,
    
    }
    axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Select_Total.php", data).then(res => {

      if (res.status == 200) {
        this.setState({
          Total: res.data,
          // loading: false
        })

      } else {
        alert("Try again later")
      }
    })
  }




  sum() {
    let cart = this.state.cart
    let sum = 0
    for (let i = 0; i < cart.length; i++) {
      sum += (cart[i].price * cart[i].count)
    }
    this.setState({ sum: sum })
  }




  plus(index) {
    let data = this.state.cart
    data[index].cart_count++;

    this.setState({ cart: data, })

  }

  minus(index) {
    let data = this.state.cart

    if (data[index].cart_count <= 1) {
      data[index].cart_count = 1;
    } else {
      data[index].cart_count--;
    }

    this.setState({ cart: data, })
  }

  Delete(index) {
    let cart = this.state.cart
    let show=this.state.show 
    if(cart.length !=1){
      cart.splice(index, 1)
    }else{
      show= false
    }
    
    this.setState({ cart: cart,show:show })   //sum:sum

  }


  //delete server
  Delete_Items(cart_id){
    let Send_Data = {
      cart_id: cart_id,
     
    }
    axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Delete_Cart.php", Send_Data).then(res => {
      if (res.status == 200) {
           //return total and cart
           this.get_Cart()
            this.get_Total()
      }
      else {
        alert("Try again later")
      }
    })
  }


  
 createTwoButtonAlert = (cart_id,index) =>
 Alert.alert(
   "Do You Want to delete item ",
   "",

   [
     {
       text: "No",
       onPress: () => console.log("Cancel Pressed"),
       style: 'cancel',
     },
     { text: "Yes", onPress: () => {
     this.Delete(index)
     this.Delete_Items(cart_id)

     }
    
  }
   ],
   { cancelable: false }
 );
  




  render() {
    return (
      <>

        <StatusBar
          backgroundColor="#fff"  //#FF6C00
          barStyle="dark-content"
        />
        {
          this.state.loading == true ?
            (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={60} color="#FF5D00" ></ActivityIndicator>
              </View>

            ) : (
              <View>

                <View style={styles.header}>

                  <TouchableOpacity
                    onPress={() => {
                      //  this.props.navigation.goBack()
                    }}
                  >
                    <Icon name="cart-arrow-down" size={26} style={{ color: '#000' }} />
                  </TouchableOpacity>

                  <Text style={{ fontSize: 24, fontWeight: 'bold', }}>Cart</Text>
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
                       this.state.show ==true ?(
                         <>
                          {
                      this.state.cart.map((mycart, index) =>

                        <View style={styles.style_map}>

                          <View style={{ flexDirection: 'row' }}>

                            <View style={{
                              width: windowWidth * .13,
                              height: windowHeight * .2,
                              backgroundColor: '#FF5100',
                              borderRadius: 20,
                              justifyContent: 'space-around',
                              alignItems: 'center',
                              marginTop: 10
                            }}>

                              <TouchableOpacity
                                onPress={() => {
                                  this.minus(index)

                                  // update count in server
                                  let data = {
                                    cart_id: mycart.cart_id,
                                    cart_count: mycart.cart_count,
                                   
                                  }
                                  axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Update_Count.php", data).then(res => {

                                    if (res.status == 200) {
                                         /// update total
                                      this.get_Total()
                                    } else {
                                      alert("Try again later")
                                    }
                                  })
                                
                                 

                                }}
                              >
                                <Icon name="minus" size={18} style={{ color: '#fff' }} />
                              </TouchableOpacity>

                              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{mycart.cart_count}</Text>

                              <TouchableOpacity
                                onPress={() => {
                                  this.plus(index)

                                  // update count in server
                                  let data = {
                                    cart_id: mycart.cart_id,
                                    cart_count: mycart.cart_count,
                                   
                                  }
                                  axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Update_Count.php", data).then(res => {

                                    if (res.status == 200) {
                                       /// update total
                                      this.get_Total()
                                    } else {
                                      alert("Try again later")
                                    }
                                  })
                                 
                                 

                                }}
                              >
                                <Icon name="plus" size={19} style={{ color: '#fff' }} />
                              </TouchableOpacity>
                            </View>


                            <View style={{
                              width: windowWidth * .45,
                              height: windowHeight * .2,
                              // backgroundColor:'#ddd',
                              //alignItems:'center',
                              justifyContent: 'space-around',
                              paddingTop: 7,
                              paddingRight: 5,

                            }}>
                              <Text style={{ fontSize: 21, fontWeight: 'bold', }}>{mycart.kind_name}</Text>
                              <Text style={{ fontSize: 16, }}>Spicy burgerpasta with pron</Text>
                              <Text style={{ fontSize: 21, fontWeight: 'bold', color: '#FF5100', }}>{mycart.cart_price}  LE</Text>
                            </View>

                            <View style={{}}>
                              <TouchableOpacity
                                onPress={() => {
                                 //Delete from server and design
                                    this.createTwoButtonAlert(mycart.cart_id,index)
                                }}
                              >
                                <Icon name="trash-alt" size={22} style={{ marginRight: 10, marginTop: 5 }} />
                              </TouchableOpacity>
                              <Image source={{ uri: mycart.kind_photo }}
                                style={{ width: windowWidth * .35, height: windowHeight * .2, resizeMode: 'contain' }}
                              />
                            </View>
                          </View>


                        </View>
                        

                      )
                    }

                  <Text style={{ fontSize: 21, fontWeight: 'bold', marginTop: 15, }}>Total :  {this.state.Total}  {'\t'}

                  <Text style={{ fontSize: 21, fontWeight: 'bold', marginTop: 15, color: '#FF5100' }}>LE</Text>
                  </Text>

                  <View style={{ width: 50, height: 40 }}></View>
                 </>
                       ):(
                         <View style={{width:windowWidth,height:windowHeight*.8,justifyContent:'center',alignItems:'center'}}>
                           <Text style={{fontSize:22,fontWeight:'bold',color:'#FF5100'}}>There Is No Itemes</Text>
                        </View>
                       )
                    }

                  </ScrollView>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Location", {
                      cart: this.state.cart,
                      Total: this.state.Total,
                      user_id:this.state.user_id,
                    })
                  
                  }}

                >
                  <View style={styles.check}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>Order location</Text>
                  </View>
                </TouchableOpacity>

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
    height: windowHeight * .8,
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