






    import React from "react";
    import {
        Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView,
        FlatList, Alert, ActivityIndicator
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




    export default class All_Orders extends React.Component {
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
                loading: true,

                Categoris: [],
                email:'',
                password:'',

            }
        }


        componentDidMount() {
            let email=this.props.navigation.getParam("email")
            let password=this.props.navigation.getParam("password")
            this.setState({
              email:email,
              password:password,
            })

           


            let data_to_send = {
                email: email,
                password:password,
            }
            axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Select_My_Orders.php", data_to_send).then(res => {
                if (res.status == 200) {
                    // alert(res.data)
                    if(typeof(res.data) == typeof([])){ 
                        this.setState({
                            Categoris:res.data,
                            loading:false,
                        })
                    } else{
                         this.setState({
                           
                             loading:false
                         })
                    }

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

{
this.state.loading == true ?
    (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={60} color="#FF5D00" ></ActivityIndicator>
        </View>

    ) : (
        <View>
            <View style={styles.header}>

                <View style={{ width: 35, height: 50 }}></View>

                <Text style={{ fontSize: 22, fontWeight: 'bold', }}>My Orders</Text>
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
this.state.Categoris != [] ?
(
<>
    {
        this.state.Categoris.map((data, index) =>

            <View style={styles.style_map}>

                <View style={{ flexDirection: 'row' }}>


                    <View style={{
                        width: windowWidth * .5,
                        height: windowHeight * .23,
                        //  backgroundColor:'#ddd',
                        marginRight: 25,
                        alignItems: 'flex-end',
                        justifyContent: 'space-around',
                        paddingTop: 7,
                        paddingRight: 5,
                        marginTop: 10
                        // marginTop: windowWidth * .09

                    }}>
                        <Text style={{ fontSize: 21, fontWeight: 'bold', }}>{data.kind_name}</Text>
                        <Text style={{ fontSize: 16, }}>{data.kind_content}</Text>
                        <Text style={{ fontSize: 21, fontWeight: 'bold', color: '#FF5100', }}>{data.cart_price}  LE</Text>
                        <Text style={{ fontSize: 18, alignSelf: 'flex-end', marginLeft: 5 }}>number of pieces : {data.cart_count}</Text>
                    </View>

                    <View style={{ justifyContent: 'center' }}>

                        <Image source={{uri:data.kind_photo}}
                            style={{ width: windowWidth * .35, height: windowHeight * .2, resizeMode: 'contain', }}
                        />

                        <Text style={{ fontSize: 14, }}>{data.order_date}</Text>
                    </View>
                </View>

            </View>


                    )
                }
            </>
        ) : (
            <View style={{ width: windowWidth, height: windowHeight * .95, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FF5100' }}>There is No Data</Text>
            </View>
        )
}



<View style={{ width: 50, height: 40 }}></View>

</ScrollView>
</View>

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
            height: windowHeight,
            // backgroundColor: '#f0f',
            justifyContent: 'space-between',
            alignItems: 'center',


        },
        style_map: {
            width: windowWidth * .98,
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