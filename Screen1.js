


import * as React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList, ActivityIndicator
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import AsyncStorage from '@react-native-community/async-storage'
import axios from "axios";
// import { createDrawerNavigator } from 'react-navigation-drawer';
// import {NavigationContainer, StackActions} from '@react-navigation/native'
//  import {createDrawerNavigator} from '@react-navigation/drawer'

//  import { createStackNavigator } from '@react-navigation/stack';

//import { createBottomTabNavigator } from 'react-navigation-tabs';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
//createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

import Screen2 from '../Tasks/Screen2'
import Details from '../Tasks/Details'
import Cart from '../Tasks/Cart'
import Profile from '../Tasks/Profile'
import Location from '../Tasks/Location'
import Summary from '../Tasks/Summary'
import Favorite from "../Tasks/Favorite"
import MyOrders from '../Tasks/MyOrders'
import Sitting from '../Tasks/Sitting'
import ChangeName from '../Tasks/ChangeName'
import ChangePassword from '../Tasks/ChangePassword'
import All_Orders from'../Tasks/All_Orders'
import Rented from'../Tasks/Rented'
import SignUp from "../Tasks/SignUp";
// import SignUp from "../Tasks/SignUp";

//import { Item } from "react-native-paper/lib/typescript/components/List/List";

class Screen1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      isVisible: true,
      tirmnate: true,
      searchText: '',
      show: 1,
      showText: false,
      check: 1,
      Drawer_Visible: false,
      loading: true,

      Categoris: [],
      email:'',
      password:'',
      Data:{},
    }
  }

  componentDidMount() {
    this.get_Categoris()
    this.getItem()
   
    // let email=this.props.navigation.getParam("email")
    // let password=this.props.navigation.getParam("password")

    // this.setState({email:email,password:password})
  
  }


  componentDidUpdate(){  // update value sequncely 
    this.Select_User(this.state.email,this.state.password)
   }



  async getItem() { 
    let email = await AsyncStorage.getItem("email")
    let password = await AsyncStorage.getItem("password")
    email = JSON.parse(email)
    password = JSON.parse(password)
    this.setState({email:email,password:password})
     /// select user Data
     this.Select_User(email,password)
   

}
  

Select_User(email,password){
  let data_to_send={
    email:email,
    password:password,
  }
  axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Select_User.php",data_to_send).then(res => {

    if (res.status == 200) {
     this.setState({
       Data:res.data
     })

    } else {
      alert("Try again later")
    }
  })
}




  get_Categoris() {
    axios.get("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Categoris.php").then(res => {

      if (res.status == 200) {
        this.setState({
          Categoris: res.data,
          loading: false
        })

      } else {
        alert("Try again later")
      }

    })
  }


 



  search(searchText) {
    let list = this.state.Categoris;
    let check = this.state.check = 0;
    let data = []
    for (let i = 0; i < list.length; i++) {
      if ((list[i].categoris_name.toUpperCase()).includes((searchText.trim()).toUpperCase())) {
        list[i].categoris_show = 1;
        // return list[i]
        check++;
      } else {
        list[i].categoris_show= 0;
        this.state.check = 0
      }
    }

    this.setState({ Categoris: list, check: check });
  }



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
                      this.state.Drawer_Visible == false ? (
                        this.setState({ Drawer_Visible: true })
                      ) : (
                        this.setState({ Drawer_Visible: false })
                      )

                    }}
                  >
                    <Icon name="align-justify" size={26} style={{}} />
                  </TouchableOpacity>

                  <Text style={{ fontSize: 24, fontWeight: 'bold', }}>Home</Text>

                  {
                     this.state.Data.user_photo == '' || this.state.Data.user_photo =='lkjhgf'?(
                      <Icon name ='user-circle' size={40} style={{}}/>
                     ):(
                      <Image source={{ uri: this.state.Data.user_photo }}
                      style={{ width: 50, height:50, borderRadius: 25 }}
                    />
                     )
                  }
                 

                
                </View>

                {
                  this.state.Drawer_Visible == true ?
                    (
                      <View style={{
                        width: windowWidth * .78,
                        height: windowHeight * .917,
                        left: 0, marginLeft: -24,
                        borderBottomEndRadius: 15,
                        position: 'relative',
                        backgroundColor: '#fff',
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,
                        alignItems: 'center'
                      }}>


                        <View style={{ width: '90%', justifyContent: 'flex-end', alignSelf: 'center', marginTop: 15 }}>
                          <TouchableOpacity
                            onPress={() => {
                              this.state.Drawer_Visible == false ? (
                                this.setState({ Drawer_Visible: true })
                              ) : (
                                this.setState({ Drawer_Visible: false })
                              )

                            }}
                          >
                            <Icon name="times" size={26} style={{}} />
                          </TouchableOpacity>
                        </View>


                        <Image source={require('../img/m3.png')}
                          style={{ width: windowWidth * .64, height: windowHeight * .29, resizeMode: 'contain' }}
                        />

                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate("All_Orders",{
                              email:this.state.email,
                              password:this.state.password
                            })
                            this.setState({ Drawer_Visible: false })
                          }}
                        >
                          <View style={styles.drwer_view}>
                            <Text style={{ fontSize: 21, fontWeight: 'bold', }}>My Orders</Text>

                            <View style={{
                              width: windowWidth * .29, justifyContent: 'center',
                              alignItems: 'center'
                            }}>
                              <Icon name="clipboard-list" size={25} style={{ marginLeft: 16 }} />
                            </View>

                          </View>
                        </TouchableOpacity>


                        <TouchableOpacity
                          onPress={() => {
                            // this.props.navigation.navigate("Page5")
                            // this.setState({Drawer_Visible:false})
                          }}
                        >
                          <View style={styles.drwer_view}>
                            <Text style={{ fontSize: 21, fontWeight: 'bold', }}>About Us</Text>

                            <View style={{
                              width: windowWidth * .29, justifyContent: 'center',
                              alignItems: 'center'
                            }}>

                              <Icon name="exclamation-circle" size={22} style={{ marginLeft: 16 }} />
                            </View>
                          </View>
                        </TouchableOpacity>


                        <TouchableOpacity
                          onPress={() => {
                            // this.props.navigation.navigate("Page6")
                            // this.setState({Drawer_Visible:false})
                          }}
                        >
                          <View style={styles.drwer_view}>
                            <Text style={{ fontSize: 21, fontWeight: 'bold', }}>Contact Us</Text>
                            <View style={{
                              width: windowWidth * .29, justifyContent: 'center',
                              alignItems: 'center'
                            }}>
                              <Icon name="phone-alt" size={23} style={{ marginLeft: 16 }} />
                            </View>
                          </View>
                        </TouchableOpacity>

                      </View>

                    ) : null
                }

                <View style={styles.container}>
                  <ScrollView>

                    <View style={styles.search}>
                      <Icon name="search" size={21} style={{ color: '#FF5D00' }} />
                      <TextInput
                        onChangeText={(value) => {
                          this.setState({ searchText: value })
                          this.search(value)

                        }}
                        placeholder="Search"
                        style={{ fontSize: 18, marginLeft: 5 }}
                      />
                    </View>

                    {this.state.check != 0 ? (

                      <>
                        {
                          this.state.Categoris.map((data, index) =>
                          <>
                             {
                               data.categoris_show == 1?(
                                <View style={styles.style_map}>
                                <TouchableOpacity activeOpacity={.4}
  
                                  onPress={() => {
                                  
                                    this.props.navigation.navigate("Page2", {
                                      name: data.categoris_name,
                                      photo: data.categoris_photo,
                                      categoris_id: data.categoris_id,
                                      user_id:this.state.Data.user_id,
                                      email:this.state.email,
                                      password:this.state.password,
                                    })
                                  }}
  
  
                                >
                                  <Image source={{ uri: data.categoris_photo }}
                                    style={{
                                      width: windowWidth * .9, height: windowHeight * .26,
                                      borderRadius: 20, resizeMode: 'contain'
                                    }}
                                  />
                                  <Text style={{
                                    fontSize: 22, fontWeight: 'bold', color: '#FF6C00',
                                    textAlign: 'center'
                                  }}>{data.categoris_name}</Text>
                                </TouchableOpacity>
                              </View>

                               ):
                               null
                             }
                          </>
                           

                          )
                        }
                        <View style={{ width: 50, height: 40 }}></View>
                      </>

                    ) : (
                      <View style={{ width: windowWidth, height: windowHeight * .7, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FF6C00' }}>There is no items</Text>
                      </View>
                    )
                    }
                  </ScrollView>
                </View>


                <View style={styles.tap_view}>

                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Sitting")
                    }}
                  >
                    <Icon name="cog" size={25} style={{ color: '#8E8EA0' }} />
                  </TouchableOpacity>


                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Profile",{
                        email:this.state.email,
                        password:this.state.password,
                      })
                    }}
                  >
                    <Icon name="user-alt" size={25} style={{ color: '#8E8EA0' }} />
                  </TouchableOpacity>

                  <View style={styles.view_icon}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("Page1")
                      }}
                    >
                      <Icon name="home" size={30} style={{ color: '#fff' }} />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('MyOrders',{
                        email:this.state.email,
                        password:this.state.password,
                      })
                    }}
                  >
                    <Icon name="shopping-bag" size={25} style={{ color: '#8E8EA0' }} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Favorite",{
                        user_id:this.state.Data.user_id,
                      })
                    }}  >
                    <Icon name="heart" size={25} style={{ color: '#8E8EA0' }} />
                  </TouchableOpacity>

                </View>
              </View>


            )
        }






      </>
    )
  }
}


export default createAppContainer(
  createStackNavigator(
    {
      Page1: Screen1,
      Page2: Screen2,
      Page3: Details,
      Page4: Cart,
      Location: Location,
      Profile: Profile,
      Summary: Summary,
      Favorite: Favorite,
      MyOrders: MyOrders,
      Sitting: Sitting,
      ChangeName: ChangeName,
      ChangePassword: ChangePassword,
      All_Orders:All_Orders,
      SignUp:SignUp,
      Rented:Rented,
    },
    {
      headerMode: 'none'
    },
    {
      initialRouteName: 'page1'
    }
  ),
)

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
  container: {
    width: '100%',
    height: '84.2%',
    // backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  style_map: {
    width: windowWidth * .88,
    height: windowHeight * .32, //
    backgroundColor: '#fff',     //#F3F0F7
    marginTop: windowHeight * .04,
    justifyContent: 'space-around',
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
  search: {
    width: windowWidth * .73,
    height: windowHeight * .07,    //#F3F0F7
    backgroundColor: '#fff',
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  tap_view: {
    width: '100%',
    height: windowHeight * .078,
    backgroundColor: '#fff',   //#F3F0F7
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 13,
    paddingRight: 13,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  view_icon: {
    width: 70,
    height: 70,
    backgroundColor: '#FF5100',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
    borderRadius: 40,
    alignSelf: 'flex-end'

  },
  drwer_view: {
    width: windowWidth * .78,
    height: windowHeight * .09,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 28,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

  },

})



