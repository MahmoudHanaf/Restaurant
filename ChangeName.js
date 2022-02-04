
import * as React from 'react'
import {
    Text, StyleSheet, View, ScrollView, Switch, TextInput, Dimensions,
    StatusBar, Image, TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { backgroundColor, border_color2, text, border_color } from '../Tasks/Colors';
import axios  from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class ChangeName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:  '',
            nameEroor:'',
            email:'',
            password:'',
        }
    }



    componentDidMount(){
      let name =this.props.navigation.getParam("name")
      let email =this.props.navigation.getParam("email")
      let password =this.props.navigation.getParam("password")
      this.setState({
      name :name,
      email:email,
      password:password
      })
    }


    myData(){
   
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
     
  
  
  if(Eroors ==0){
    let data_to_send={
       name :this.state.name,
       email:this.state.email,
       password:this.state.password
    }
     axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Change_name.php",data_to_send).then(res=>{
        
     if(res.status ==200){
      //  alert(res.data)
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
          <Text style={{ fontSize: 21, fontWeight: 'bold', }}>Change Name</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
             <Icon name="arrow-left" size={21} style={{  }} />
          </TouchableOpacity>
        </View>
              
         <ScrollView >
                       
                   
             <View style={{height:80,justifyContent:'space-between'}}>
            <View style={styles.text_input}>
              <Icon name="user-alt" style={{ marginLeft: 5 }} size={19} />
              <TextInput placeholder="Name"
                style={{ fontSize: 18 }}

                value={this.state.name}
                onChangeText={(value) => {
                  this.setState({ name: value })
                }}
              />
            </View>
               <Text style={{fontSize:17,fontWeight:'bold',textAlign:'center',marginTop:10}}>{this.state.nameEroor}</Text>
              </View>

              <TouchableOpacity
            onPress={()=>{
               this.myData()
               this.props.navigation.goBack()
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
            marginTop:windowWidth*.3
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
   
    text_input: {
        width: windowWidth * .85,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 8,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop:windowWidth*.1,
        // marginBottom:20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      
        elevation: 3,
          
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



});

