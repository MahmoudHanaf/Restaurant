import * as React from 'react'
import { Text, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity, Modal, FlatList, Alert, Dimensions, StatusBar, Rad } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { backgroundColor, chevron_left, header_text, personal, textInput, user, button, next, border_color, border_color2, radio, text, plus } from '../Tasks/Colors'
const { width, height } = Dimensions.get('screen');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//import { Container, Header, Content, ListItem, Radio, Right, Left, Badge } from 'native-base';
//import * as ImagePicker from 'react-native-image-picker';
export default class Rented extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }



    render() {

        return (
            <>

                <View style={{  flex: 1 }}>
                    <ScrollView>
                        <StatusBar backgroundColor="#fff" />

                        
                        <View style={{ flex:1,justifyContent:'center',alignItems:'center',height:windowHeight*.85,width:windowWidth }}>
                            {/* <Image source={require('../img/check-mark.png')}
                                style={{
                                    alignSelf: 'center',
                                    marginTop: '50%'
                                }}
                            ></Image> */}
                            <Icon name="check-circle"  size={100}  style={{color:'#FF5100'}} />
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    // marginRight: 26,
                                   
                                    marginBottom: 17,
                                    marginTop: '8%',
                                    textAlign: 'center',
                                    marginLeft:20,marginRight:20
                                }}
                            >Thank You !{'\n'}Your Order Is delivered and will arrive in 45 minutes</Text>
                        </View>

                        
                     <TouchableOpacity
                        onPress={()=>{
                          this.props.navigation.navigate("Page1")
                        
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
                        <Text style={{fontSize:21,fontWeight:'bold',color:'#fff'}}>Home</Text>
                    </View>
                    </TouchableOpacity>


                    </ScrollView>
                </View>

            </>
        )
    }
}
