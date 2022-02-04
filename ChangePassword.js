




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




export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        searchText: '',
        name: '',
        nameEroor:'',
        newPassword: '',
        newPasswordEroor:'',
        emailEroor:'',
        phone: '',
        phoneEroor:'',
        password: '',
        passwordEroor:'',
        showText: false,
        confrirm_password:'',
        email:'',
        confrirm_password_Eroor:'',
    }
  }



  componentDidMount(){
    let email =this.props.navigation.getParam("email")
   this.setState({
     email:email,
   })
  }


  async setItem() {
    let data =this.state.email
    let password =this.state.newPassword
   await AsyncStorage.setItem("data", JSON.stringify(data))
   await AsyncStorage.setItem("password", JSON.stringify(password))
 }


  



  validateEmail = email => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
    return false;
    } else {
    return true;
    }
    };


  myData(){
   
    let Eroors=0;

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

   //new password
   
    if(this.state.newPassword.trim()== ''){
      Eroors++;
      this.setState({newPasswordEroor:'You must enter Password'})
   }else if((this.state.newPassword.trim()).length <6){
    Eroors++;
     this.setState({newPasswordEroor:'Password must be 6 or more '})
   }else{
   
     this.setState({newPasswordEroor:''})
   }

   //confirm Password

   if(this.state.confrirm_password != this.state.newPassword){
    Eroors++;
    this.setState({confrirm_password_Eroor:'Confirm Password not correct'})
 }


if(Eroors ==0){
  let data_to_send={
    user_email:this.state.email,
    user_password:this.state.password,
    new_password:this.state.newPassword,
  }
  axios.post("https://engineermahmoud.000webhostapp.com/Project/Restaurant_Update_Password_Profile.php",data_to_send).then(res=>{
        if(res.status ==200){
            
           alert(res.data)
           this.setItem()
           this.props.navigation.navigate("Page4")
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

        <View style={styles.header}>

            <View style={{width:25,height:40}}></View>
          <Text style={{ fontSize: 21, fontWeight: 'bold', }}>Change Password</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
             <Icon name="arrow-left" size={21} style={{  }} />
          </TouchableOpacity>
        </View>

        <ScrollView>


          <View style={styles.container}>


          <View style={{height:80,justifyContent:'space-between',marginTop:20}}>
            <View style={[styles.text_input, { justifyContent: 'space-between' }]}>

              <Icon name="lock" style={{ marginLeft: 5 }} size={20} />
              <View style={{ width: windowWidth * .615, }}>

                <TextInput placeholder="Old password"
                  style={{ fontSize: 17 }}
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


           
          <View style={{height:80,justifyContent:'space-between',}}>
            <View style={[styles.text_input, { justifyContent: 'space-between' }]}>

              <Icon name="lock" style={{ marginLeft: 5 }} size={20} />
              <View style={{ width: windowWidth * .615, }}>

                <TextInput placeholder="New password"
                  style={{ fontSize: 17 }}
                  
                  value={this.state.newPassword}
                  onChangeText={(value) => {
                    this.setState({ newPassword: value })
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
            <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>{this.state.newPasswordEroor}</Text>
              </View>



              <View style={{height:80,justifyContent:'space-between'}}>
            <View style={[styles.text_input, { justifyContent: 'space-between' }]}>

                <Icon name="lock" style={{ marginLeft: 5 }} size={20} />
                <View style={{ width: windowWidth * .615, }}>

                <TextInput placeholder="confirm password"
                    style={{ fontSize: 17 }}
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

         
          

          <TouchableOpacity
            onPress={()=>{
                this.myData()
             
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
            marginTop:windowWidth*.1,
          }}>
              <Text style={{fontSize:22,fontWeight:'bold',color:'#fff'}}>Save</Text>
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
    height: windowHeight * .43,
    // backgroundColor:'#0ff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text_input: {
    width: windowWidth * .85,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF5100',
    paddingLeft: 10,
    paddingRight: 8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    alignSelf: 'center',
    // marginBottom:20,
  },
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

})