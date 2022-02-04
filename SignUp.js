

import React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, ScrollView, FlatList, Alert, TextInput,ActivityIndicator
} from 'react-native'
  ;

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LogIn from'../Tasks/LogIn'
import ResetePassword from'../Tasks/ResetePassword'
import Verification from "../Tasks/Verification";
import Screen1 from'../Tasks/Screen1'
// import { SlideFromRightIOS } from "react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/TransitionPresets";
// import {NavigationContainer, StackActions} from '@react-navigation/native'
//  import {createDrawerNavigator} from '@react-navigation/drawer'

//  import { createStackNavigator } from '@react-navigation/stack';

import axios  from "axios";


  export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      name: '',
      nameEroor:'',
      email: '',
      emailEroor:'',
      phone: '',
      phoneEroor:'',
      password: '',
      passwordEroor:'',
      showText: false,
      confrirm_password:'',
      confrirm_password_Eroor:'',
      loading:true,
    }
  }


  async setItem() {
    let email =this.state.email
    let password =this.state.password
   await AsyncStorage.setItem("email", JSON.stringify(email))
   await AsyncStorage.setItem("password", JSON.stringify(password))
 }
 
//  async getItem() {
  
//      let data = await AsyncStorage.getItem("data")
//      let password = await AsyncStorage.getItem("password")
//      data = JSON.parse(data)
//      password = JSON.parse(password)
    

//      if(data !=''){
//       this.props.navigation.navigate("Page4",{
//         email:data,
//         password:password,
//       })

//     }
//      else{
//       this.setState({ email: data, password:password})
//      }
    
//     //  this.setState({loading:false})
     
//  }

 


  componentDidMount(){
      // this.setItem()
      // this.setState({loading:false})
      // this.getItem()
      this.setState({loading:false})
  }


  validateEmail = email => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
    return false;
    } else {
    return true;
    }
    };


  SignUp(){
   
    let Eroors=0;


    //name
    if(this.state.name.trim()== ''){
      Eroors++
       this.setState({nameEroor:'You must enter name'})
    }else if((this.state.name.trim()).length <3){
      Eroors++
      this.setState({nameEroor:'Name must be 3 or more char'})
    }else{
      this.setState({nameEroor:''})
    }

    //email
    if(this.state.email== ''){
      Eroors++
      this.setState({emailEroor:'You must enter email'})
   }else if(!this.validateEmail(this.state.email)){
    Eroors++
     this.setState({emailEroor:'Please enter vailed email'})
   }else{
     this.setState({emailEroor:''})
   }
    
   //phone
   if(this.state.phone== ''){
    Eroors++;
    this.setState({phoneEroor:'You must enter phone number'})
    }else if( 
      this.state.phone.length !=11  || (
        !this.state.phone.startsWith("015") &&
        !this.state.phone.startsWith("011") &&
        !this.state.phone.startsWith("010") &&
        !this.state.phone.startsWith("012") 
      ) ||
      this.state.phone *0!=0
    )
    {
      Eroors++
      this.setState({phoneEroor:'Phone number not vailed'})
    }else{
      this.setState({phoneEroor:''})
    }
  

    //password
    if(this.state.password.trim()== ''){
      Eroors++;
      this.setState({passwordEroor:'You must enter Password'})
   }else if((this.state.password.trim()).length <6){
    Eroors++;
     this.setState({passwordEroor:'Password must be 6 or more '})
   }else{
   
     this.setState({passwordEroor:''})
   }

   //confirm Password

   if(this.state.confrirm_password != this.state.password){
    Eroors++;
    this.setState({confrirm_password_Eroor:'Confirm Password not correct'})
 }


if(Eroors ==0){
     
  let data_to_send={
    user_name:this.state.name,
    user_email:this.state.email,
    user_password:this.state.password,
    user_phone:this.state.phone,
    user_photo:'lkjhgf',
    
  }
  axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_SignUp.php",data_to_send).then(res=>{
        if(res.status ==200){
          // alert(res.data)
            
          this.setItem()
          this.props.navigation.navigate("Screen1")
          // alert(this.state.email)
          
        }
  })
  
}

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
              <>
              
        <ScrollView>
  
  <View style={styles.header}>
    <Icon name="user-circle" size={110} style={{ color: '#FF5100' }} />
  </View>
  
  

  <View style={styles.container}>
     <View style={{height:80,justifyContent:'space-between'}}>
    <View style={styles.text_input}>
      <Icon name="user-alt" style={{ marginLeft: 5 }} size={21} />
      <TextInput placeholder="Name"
        style={{ fontSize: 18 }}

        value={this.state.name}
        onChangeText={(value) => {
          this.setState({ name: value })
        }}
      />
    </View>
       <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>{this.state.nameEroor}</Text>
      </View>



  <View style={{height:80,justifyContent:'space-between'}}>
    <View style={styles.text_input}>
      <Icon name="envelope" style={{ marginLeft: 5 }} size={21} />
      <TextInput placeholder="Email"
        style={{ fontSize: 18 }}
         keyboardType='email-address'
        value={this.state.email}
        onChangeText={(value) => {
          this.setState({ email: value.trim() })
        }}
      />
    </View>
    <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>{this.state.emailEroor}</Text>
      </View>


      <View style={{height:80,justifyContent:'space-between'}}>
    <View style={styles.text_input}>
      <Icon name="mobile-alt" style={{ marginLeft: 5 }} size={22} />
      <TextInput placeholder="phone" keyboardType='number-pad'
        style={{ fontSize: 18 }}
        
        value={this.state.phone}
        onChangeText={(value) => {
          this.setState({ phone: value.trim() })
        }}
      />
    </View>
    <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>{this.state.phoneEroor}</Text>
      </View>

  <View style={{height:80,justifyContent:'space-between'}}>
    <View style={[styles.text_input, { justifyContent: 'space-between' }]}>

      <Icon name="lock" style={{ marginLeft: 5 }} size={20} />
      <View style={{ width: windowWidth * .615, }}>

        <TextInput placeholder="password"
          style={{ fontSize: 18 }}
          secureTextEntry={this.state.showText}
          value={this.state.password}
          onChangeText={(value) => {
            this.setState({ password: value })
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          this.setState({ showText: !this.state.showText })
        }} >
        <Icon name="eye-slash" size={20} style={{}} />
      </TouchableOpacity>
    </View>
    <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>{this.state.passwordEroor}</Text>
      </View>


      <View style={{height:80,justifyContent:'space-between'}}>
    <View style={[styles.text_input, { justifyContent: 'space-between' }]}>

      <Icon name="lock" style={{ marginLeft: 5 }} size={20} />
      <View style={{ width: windowWidth * .615, }}>

        <TextInput placeholder="confirm password"
          style={{ fontSize: 18 }}
          secureTextEntry={this.state.showText}
          value={this.state.confrirm_password}
          onChangeText={(value) => {
            this.setState({ confrirm_password: value })
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          this.setState({ showText: !this.state.showText })
        }} >
        <Icon name="eye-slash" size={20} style={{}} />
      </TouchableOpacity>
      </View>
     
      <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>{this.state.confrirm_password_Eroor}</Text>
      </View>
      
  </View>
  

  <Text style={{fontSize:17,fontWeight:'600',textAlign:'center',marginTop:5}} >Do you have account already ?</Text>
   <TouchableOpacity
     onPress={()=>{
       this.props.navigation.navigate("LogIn")
     }}
   >
  <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',color:'#FF5100',marginTop:8}} >Log in</Text>
   </TouchableOpacity>

  <TouchableOpacity
   onPress={()=>{
     this.SignUp()
   }}
  >
  <View style={{
    width:windowWidth*.55,
    height:50,
    backgroundColor:'#FF5100',
    borderRadius:20,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',  
    marginTop:13,
  }}>
      <Text style={{fontSize:22,fontWeight:'bold',color:'#fff'}}>Sign Up</Text>
  </View>
  </TouchableOpacity>

</ScrollView>
              </>
            )
}



      </>
    )
  }
}

// export default  createAppContainer(
//   createStackNavigator(
//     {
      
//       Page1: SignUp,
//       Page2: LogIn,
//       Page3:ResetePassword,
//       // Screen1:Screen1,
//     },
//     {
//       headerMode: 'none'
//     },
//     {
//       initialRouteName: 'page1'
//     }
//   ),
// )


const styles = StyleSheet.create({
  header: {
    width: windowWidth,
    height: windowHeight * .2,
     //backgroundColor:'#0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: windowWidth,
    height: windowHeight * .6,
    // backgroundColor:'#0ff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text_input: {
    width: windowWidth * .85,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF5100',
    paddingLeft: 10,
    paddingRight: 8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    alignSelf: 'center',
    // marginBottom:20,
  }

})