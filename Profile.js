


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
import * as ImagePicker from 'react-native-image-picker';
// import {NavigationContainer, StackActions} from '@react-navigation/native'
//  import {createDrawerNavigator} from '@react-navigation/drawer'

//  import { createStackNavigator } from '@react-navigation/stack';
import axios from "axios";



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
      count:0,
      cart:[],
      name:'',
      email:'',
      password:'',
      photo_uri:'',
      Data:{},
    }
  }


  


  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          // title: 'Cool Photo App Camera Permission',
          // message:
          //   'Cool Photo App needs access to your camera ' +
          //   'so you can take awesome pictures.',
          // buttonNeutral: 'Ask Me Later',
          // buttonNegative: 'Cancel',
          // buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  async componentDidMount() {
    this.requestCameraPermission();

    let email=this.props.navigation.getParam("email")
    let password=this.props.navigation.getParam("password")
    this.setState({
      email:email,
      password:password,
    })

    this.Select(email,password);
    
  }

  select_first_photo() {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary({options, includeBase64: true}, res => {
      // console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        if (this.state.photo_uri == this.state.defaultPhoto_uri) {
          this.state.options.push({
            text: 'مسح الصورة',
            destructive: true,
            onPress: () => {
              this.setState({
                photo_uri: this.state.defaultPhoto_uri,
                V_uri: false,
              });
              
              ToastAndroid.showWithGravity(
                'تم مسح صورة البروفايل',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
              this.state.options.pop();
            },
          });
        }
            
        this.setState({
          photo_data: res.assets[0],
          photo_uri: res.assets[0].uri,
        });

      }

      /// send uri of photo to sever

      // alert(res.assets[0].uri)
      // alert(this.state.email)
      let  data_to_send={
        photo_uri: res.assets[0].uri,
        email:this.state.email,
        password:this.state.password,
        
      }
      axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Insert_photo.php",data_to_send).then(res=>{
        if(res.status ==200){
            
          //  alert(res.data)
        }else{
          alert("Try again later")
        }
  
      })
      this.Select(this.state.email,this.state.password)
      ////

    });

  }

  launchCamera = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
    };
    ImagePicker.launchCamera(options, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        if (this.state.photo_uri == this.state.defaultPhoto_uri) {
          this.state.options.push({
            text: 'مسح الصورة',
            destructive: true,
            onPress: () => {
              this.setState({
                photo_uri: this.state.defaultPhoto_uri,
                V_uri: false,
              });
              ToastAndroid.showWithGravity(
                'تم مسح صورة البروفايل',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
              this.state.options.pop();
            },
          });
        }
        
        this.setState({
          photo_data: res.assets[0],
          photo_uri: res.assets[0].uri,
        });
      
      }
    });
  };




Insert_photo(){
 let  data_to_send={
    email:this.state.email,
    password:this.state.password,
    photo_uri:this.state.photo_uri,
  }
  axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Insert_photo.php",data_to_send).then(res=>{
    if(res.status ==200){
      // this.setState({
      //   Data:res.data,
      // })

    }else{
      alert("Try again later")
    }
  })
}


Select(email,password){
  let  data_to_send={
     email:email,
     password:password,
   }
   axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Resaturant_Select_Profile.php",data_to_send).then(res=>{
     if(res.status ==200){
         if(typeof(res.data) == typeof({}) && res.data != null){
          this.setState({
            Data:res.data,
          })
         }
 
     }else{
       alert("Try again later")
     }
   })
 }



 Log_Out(){
  let  data_to_send={
    email:this.state.email,
    password:this.state.password,
  }
  axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Log_Out.php",data_to_send).then(res=>{
    if(res.status ==200){
     this.setState({
       Data:{},
     })

    }else{
      alert("Try again later")
    }
  })
 }


 createTwoButtonAlert = () =>
 Alert.alert(
   "Do You Want to Log out ",
   "",

   [
     {
       text: "No",
       onPress: () => console.log("Cancel Pressed"),
       style: 'cancel',
     },
     { text: "Yes", onPress: () => {
     this.Log_Out()
     this.setState({Data:{}})
     this.props.navigation.navigate("SignUp")
    
     }
    
  }
   ],
   { cancelable: false }
 );
  

 componentDidUpdate(){  // update value sequncely 
  this.Select(this.state.email,this.state.password)
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
          <Text style={{ fontSize: 22, fontWeight: 'bold', }}>My Profile</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
            <Icon name="arrow-left" size={21} style={{ color: '#000' }} />
          </TouchableOpacity>
        </View>

<ScrollView>    
        <View style={styles.photo_view}>
          
          {
            this.state.Data.user_photo =='' || this.state.Data == null ?(
              <Icon name ='user-circle' size={90} style={{color:'#fff'}}/>
            ):(
              <Image source={{uri:this.state.Data.user_photo}}
              style={{
                  width:windowWidth*.42,
                  height:windowHeight*.17,
                  resizeMode:'contain',
                  borderRadius:15
               }}
            />
            )
          }
            
            

{/* //{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSufOKKnOlUtMAaD1JNvT56vVKFN6zNhAHZbf5T1bxLh1CDPnjOpRlXyroHTPOh9vwczXs&usqp=CAU'} */}
           
             <View style={{
                 width:35
                ,height:35,
                backgroundColor:'#fff',
                alignSelf:'flex-start',
                justifyContent:'center',
                alignItems:'center',
                marginTop:-windowWidth*.07,
                borderRadius:10,
                marginLeft:8,
                }}>
                   <TouchableOpacity
                      onPress={()=>{
                        this.select_first_photo()
                        // this.state.Data.user_photo =''
                        // this.setState({Data:{}})
                         
                        // alert(this.state.photo_uri)
                        
                        // this.Insert_photo()
                      }}
                   >
                 <Icon name="pencil-alt" size={20} style={{color:'#FF5100'}}  />
                 </TouchableOpacity>
             </View>
              
        </View>
              

              <Text style={{fontSize:21,fontWeight:'bold',textAlign:'center',marginTop:5}}>{this.state.Data.user_name}</Text>
              <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',marginTop:10}}>{this.state.email}</Text>
              
           

              <TouchableOpacity
               onPress={()=>{
                 this.props.navigation.navigate("ChangeName",{
                  name:this.state.Data.user_name,
                  email:this.state.email,
                  password:this.state.password,
                 })

                 
               }}
              >
              <View style={[styles.style_view,{marginTop:40,width:windowWidth*.5,}]}>
                 <Text style={{fontSize:19,fontWeight:'bold',}}>Change Name</Text>
                 <Icon name="user-alt" size={20} style={{}}/>
              </View>
              </TouchableOpacity>

            

              <TouchableOpacity
                onPress={()=>{
                  this.props.navigation.navigate("All_Orders")
                }}
              >
              <View style={[styles.style_view,{width:windowWidth*.47,marginTop:13}]}>
                 <Text style={{fontSize:19,fontWeight:'bold',}}>Order History</Text>
                 <Icon name="shopping-bag" size={20} style={{}}/>
              </View>
              </TouchableOpacity>

              
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



              <TouchableOpacity
                onPress={()=>{
                  this.createTwoButtonAlert()
                }}
              >
              <View style={[styles.style_view,{marginTop:13,}]}>
                 <Text style={{fontSize:20,fontWeight:'bold',}}>Log out</Text>
                 <Icon name="sign-out-alt" size={25} style={{}}/>
              </View>
              </TouchableOpacity>

              </ScrollView>
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
         width:windowWidth*.46,
         height:windowHeight*.21,
         backgroundColor:'#F2ECFF',
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
