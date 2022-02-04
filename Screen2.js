





import React from "react";
import {
  Text, View, TouchableOpacity, Image,StyleSheet,StatusBar,TextInput,ScrollView,FlatList,ActivityIndicator
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
      searchText:'',
      name: '',
      Kinds:[],
      index:0,
      photo:'',
      showText: false,
      check: 1,
      cart:[],
      categoris_id:1,
      loading:true,
      user_id:0,
      email:'',
      password:'',
    }
  }

  

  componentDidMount(){
     this.get_data()
   
  }


  get_data(){
    let categoris_id= this.props.navigation.getParam("categoris_id")
    let name= this.props.navigation.getParam("name")
    let photo =  this.props.navigation.getParam("photo")
    let user_id =  this.props.navigation.getParam("user_id")
    let email =  this.props.navigation.getParam("email")
    let password =  this.props.navigation.getParam("password")
  
       this.setState({
        categoris_id:categoris_id,
        name:name,
        photo:photo,
        user_id:user_id,
        email:email,
        password:password,
       })

      // select data
       let data_to_send={
        categoris_id: categoris_id
       }
       axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_kinds.php",data_to_send).then(res =>{
     
         if (res.status == 200) {
           this.setState({
             Kinds: res.data,
             loading: false
           })
          // alert(res.data)
     
         } else {
           alert("Try again later")
         }
     
       })
   
  }




  Insert_like(kind_id){
    let data_to_send={
      user_id: this.state.user_id,
      kind_id:kind_id,
     }
     axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Insert_Likes.php",data_to_send).then(res =>{
   
       if (res.status == 200) {
        //  alert(res.data)
   
       } else {
         alert("Try again later")
       }
   
     })
 
  }


  search(searchText) {
    let list = this.state.Kinds;
    let check = this.state.check = 0;
    let data = []
    for (let i = 0; i < list.length; i++) {
      if ((list[i].kind_name.toUpperCase()).includes((searchText.trim()).toUpperCase())) {
        list[i].show = true;
        // return list[i]
        check++;
      } else {
        list[i].show = false;
        this.state.check = 0
      }
    }

    this.setState({ Kinds: list, check: check });
  }



  render(){
    return(
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
         
         <Image source={{uri:this.state.photo}}
          style={{width:60,height:55,resizeMode:'contain'}}
         />
        <Text style={{ fontSize: 24, fontWeight: 'bold', }}>{this.state.name}</Text>
        <TouchableOpacity 
          onPress={()=>{
            this.props.navigation.goBack()
          }}
        >
         <Icon name ="arrow-left" size={23} style={{color:'#000'}}/>
         </TouchableOpacity>
      </View>




      <View style={styles.container}>
        <ScrollView>
              {
                this.state.Kinds.map((item, index) =>
               
                    <View style={styles.style_map}>
                      <TouchableOpacity activeOpacity={.4}
                       onPress={()=>{
                         this.props.navigation.navigate("Page3",{
                           Item:item,
                           kind_id:item.kind_id,
                           user_id:this.state.user_id,
                           email:this.state.email,
                           password:this.state.password,
                         })
                       }}
                      >
                        <View style={{flexDirection:'row',paddingRight:25,}}>
                        <Image source={{ uri: item.kind_photo }}
                          style={{ width: windowWidth * .56, height: windowHeight * .2,
                             borderRadius:80,marginLeft:windowWidth*.17,resizeMode:'contain' }}
                        />
                          
                          <TouchableOpacity
                            onPress={()=>{
                              this.Insert_like(item.kind_id)
                            }}
                          >
                          <View style={{
                            width:40,
                            height:40,
                            backgroundColor:'#FF5100',
                            borderRadius:20,
                            justifyContent:'center',
                            alignItems:'center',
                            marginTop:10,
                            marginRight:0
                            }}>
                                <Icon name ="heart" style={{color:'#fff'}} size={20} />
                          </View>
                          </TouchableOpacity>

                        </View>



                       <View style={{
                         width:windowWidth*.83,
                       // backgroundColor:'#ddd',
                         flexDirection:'row',
                         justifyContent:'space-between',
                         alignItems:'center',
                         alignSelf:'center',
                         paddingLeft:5,
                         paddingRight:5,
                         }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FF6C00',
                         textAlign: 'center' }}>{item.kind_name}</Text>

                     <View style={{
                        width:windowWidth*.17,
                        height:80,
                       //  backgroundColor:'#f00',
                        alignItems:'center',
                        justifyContent:'space-between',
                        flexDirection:'row',
                        }}>
                      <Image source={require('../img/star.png')}
                        style={{width:25,height:25,}}
                      />
                      <Text style={{fontSize:18,color:'#FF5100'}}>{item.kind_rating}</Text>
                      </View>
                       
                      </View>


                      </TouchableOpacity>
                    </View>
                 

                )
              }
              <View style={{ width: 50, height: 100 }}></View>
         
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
                user_id:this.state.user_id,
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

const styles=StyleSheet.create({
  header: {
    width: '100%',
    height: '8%',   //windowHeight * .08
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 15,
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    height: '84.2%',
    //backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  style_map: {
    width: windowWidth * .88,
    height: windowHeight * .31, //
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
    height: windowHeight * .07,    //
    backgroundColor: '#F3F0F7',
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 18,
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
    marginTop:-50,
    borderRadius: 40,
    alignSelf: 'flex-end'

  },
})