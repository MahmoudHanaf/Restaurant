




import React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, ScrollView, FlatList, Alert, TextInput
} from 'react-native'
  ;

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




export default class ResetePassword extends React.Component {
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
        eroor:'',
    }
  }

  validateEmail = email => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
    return false;
    } else {
    return true;
    }
    };


    async setItem() {
      let email =this.state.email
      let password =this.state.password
     await AsyncStorage.setItem("email", JSON.stringify(email))
     await AsyncStorage.setItem("password", JSON.stringify(password))
   }

   


  myData(){
   
    let Eroors=0;


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
  user_email:this.state.email,
  user_password:this.state.password,
}
axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Update_Password.php",data_to_send).then(res=>{
      if(res.status ==200){
            if(res.data ==this.state.email){
              this.setItem()
              this.props.navigation.navigate("Screen1")

            }else{
              this.setState({eroor:'This email is not found'})
            }
           
      }else{
        alert("Try again later")
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
        <ScrollView>

          <View style={styles.header}>
            <Icon name="user-circle" size={110} style={{ color: '#FF5100' }} />
          </View>



          <View style={styles.container}>

           

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
            <View style={[styles.text_input, { justifyContent: 'space-between' }]}>

              <Icon name="lock" style={{ marginLeft: 5 }} size={20} />
              <View style={{ width: windowWidth * .615, }}>

                <TextInput placeholder="New password"
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

          <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>{this.state.eroor}</Text>
         
          

          <TouchableOpacity
            onPress={()=>{
                this.myData()
             
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
            marginTop:windowWidth*.09,
          }}>
              <Text style={{fontSize:22,fontWeight:'bold',color:'#fff'}}>Send</Text>
          </View>
          </TouchableOpacity>

        </ScrollView>
      </>
    )
  }
}




const styles = StyleSheet.create({
  header: {
    width: windowWidth,
    height: windowHeight * .23,
    // backgroundColor:'#0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: windowWidth,
    height: windowHeight * .42,
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