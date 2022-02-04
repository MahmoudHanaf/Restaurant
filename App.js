


import * as React from "react";
import {
  Text, View, TouchableOpacity, Image,StyleSheet,StatusBar,TextInput,ScrollView,FlatList
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage'
import { createAppContainer,createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import AppIntroSlider from 'react-native-app-intro-slider';

import axios  from "axios";

// import {NavigationContainer, StackActions} from '@react-navigation/native'
//  import {createDrawerNavigator} from '@react-navigation/drawer'

//  import { createStackNavigator } from '@react-navigation/stack';

import { backgroundColor, next, button, textInput } from './Tasks/Colors'

import Screen2 from './Tasks/Screen2'
import Screen1 from './Tasks/Screen1'
import Details from './Tasks/Details'
import Cart from './Tasks/Cart'
import Profile from './Tasks/Profile'
import Location from './Tasks/Location'
import Summary from './Tasks/Summary'
import Favorite from "./Tasks/Favorite"
import MyOrders from './Tasks/MyOrders'
import Sitting from './Tasks/Sitting'
import ChangeName from './Tasks/ChangeName'
import ChangePassword from './Tasks/ChangePassword'
import SignUp from './Tasks/SignUp';
import LogIn from'./Tasks/LogIn'
import ResetePassword from'./Tasks/ResetePassword'
import Verification from "./Tasks/Verification";
import { ChevronLeftIcon } from "native-base";

const slides = [
  {
    key: 'one',
    title: 'Eat from the best\n restaurants',
    text: 'Access all the best restaurants\naround you and enjoy their\ncuisine at home',
    image: require('./img/m6.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Choose the best food\nyou love ',
    text: 'Our delivery service offers you\nawide range of frech meals\nprepared at moment',
    image:  require('./img/m7.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'Sit back\ndinner is on way',
    text: 'Get ready and comfortable\nwhilst our bikers bring your\nmeal at your door',
    image:  require('./img/m8.png'),
    backgroundColor: '#22bcb5',
  }
];



 class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showRealApp: false,
      isVisible: true,
      tirmnate: true,
      show:false,
      tirmnate_intro:'',
      email:'',
      password:'',
    }
  }


 




//   async setData() {
//     let data =this.state.tirmnate_intro
//    await AsyncStorage.setItem("data", JSON.stringify(data))
//  }
 
 async getItem() { 
     let email = await AsyncStorage.getItem("email")
     let password = await AsyncStorage.getItem("password")
     email = JSON.parse(email)
     password = JSON.parse(password)

    

     let data_to_send={
      email:email,
      password:password,
    }
    axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Check_Auth.php",data_to_send).then(res => {

      if (res.status == 200) {
        if(typeof(res.data) == typeof([])){
          this.setState({email:email,password:password})
         
        }else{
          this.setState({email:'',password:''})
        }
      
  
      } else {
        alert("Try again later")
      }
    })



    
 
 }


//  Intro(){
//    let tirmnate_intro=this.state.tirmnate_intro
//    tirmnate_intro =1;
//    this.setState({tirmnate_intro:tirmnate_intro})
//    this.setData()
//    alert(tirmnate_intro)
//  }
 

 componentDidMount() {
 
  var that = this;
  setTimeout(function () {
    that.Hide_Splash_Screen();
  }, 3000);

  this.getItem()
  // this.setItem()
 

}



  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false
    });
  }

  


    Splash_Screen = ()=>{
      return(
        <View style={styles.SplashScreen_RootView}>
      <StatusBar
        hidden={true}
      />
      <View style={styles.SplashScreen_ChildView}>

        <Image source={require('./img/m8.png')}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
      </View>
    </View>
      )
      
    }

    // {
    //   (this.state.isVisible === true) ? this.Splash_Screen : null
    // } 
   

  _renderItem = ({ item }) => {
 
     
    return (
     <>
     {
        this.state.isVisible == false? (
          <>
          {
            this.state.email ==''?(
              <View style={{ backgroundColor: next, flex: 1 }} >
              <StatusBar backgroundColor={next} barStyle='dark-content' />
              <Image source={item.image} style={{ width:windowWidth*.85, height:windowHeight*.28, 
              alignSelf: 'center', marginTop:windowHeight*.2,
              resizeMode:'contain' }} />
              <Text style={{ color: backgroundColor, marginTop: 15, textAlign: 'center',
               fontSize: 21, fontWeight: 'bold' }}>{item.title}</Text>
              <Text style={{ color: backgroundColor, marginTop: 10, alignSelf: 'center',
               fontSize: 18, textAlign: 'center' }} >{item.text}</Text>
            </View>

            ):
            null
          }
          
      
      </>
        ):(
        null
        )
     }
      
      
    </> 

    );
  }
  _onDone = () => {
    this.setState({ showRealApp: true });
  }
  _renderNextButton = () => {
    return (
      
      this.state.isVisible == false? (
        <>
         {
            this.state.email ==''?(
              <View>
              <Text style={{ color:'#FF5100', fontSize: 20, marginTop: 10 }}
              >Next</Text>
            </View>
            ):
           null
         }

      
      </>
      ):(
        null
      )
    );
  };
  _renderBackButton = () => {
    return (
      this.state.isVisible == false? (
        <>

       {
            this.state.email ==''?
            (
              <View>
              <Text style={{ color:'#FF5100', fontSize: 20, marginTop: 10 }}
              >Back</Text>
            </View>
            ):
            null
      }
     
      </>
      ):(
        null
      )

    );
  };
  _renderDoneButton = () => {
    return (
      this.state.isVisible == false? (
        <>
        {
            this.state.email ==''?
            (
              <View>
              <TouchableOpacity
                onPress={
                  () => {
                    // this.Intro()
                    this.props.navigation.navigate('Page2')
                  }
                }>
                <Text style={{ color:'#FF5100', fontSize: 20, marginTop: 10 }}
                >Done</Text>
              </TouchableOpacity>
            </View>
            ):
            null
        }
     
      </>
      ):(
        null
      )
    );
  };
  render() {
   
     
   if( this.state.isVisible ==true){
      return(
      
          <View style={styles.SplashScreen_RootView}>
          <StatusBar
            hidden={true}
          />
          <View style={[styles.SplashScreen_ChildView,{backgroundColor:'#fff'}]}>
    
            <Image source={require('./img/mm4.png')}
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
          </View>
        </View>
       
      )

    }else if(this.state.email ==''){

      if (this.state.showRealApp) {
        return <App />
          ;
  
      } else {
        return <AppIntroSlider renderItem={this._renderItem} data={slides} 
        onDone={this._onDone} dotStyle={{ backgroundColor: textInput }} 
        showPrevButton={true} renderNextButton={this._renderNextButton} 
        renderPrevButton={this._renderBackButton}
         renderDoneButton={this._renderDoneButton} 
         activeDotStyle={{ backgroundColor:'#FF5100'}} />;
  
      }
     
    }
    
    
    else{
      return(
        <>
         {
           this.state.email=='' ?(
            this.props.navigation.navigate("SignUp")
           ):(
            this.props.navigation.navigate("Screen1",{
              email:this.state.email,
              password:this.state.password,
             
            })
           )
          
         
         }
         
        
         </>
      )
    }


    
  }
}

const styles= StyleSheet.create({
  slide:{
    flex:1,backgroundColor:'#fff'
  },
  title:{
    fontSize:20,
    fontWeight:'bold'
  },

    MainContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#fff',
      paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },

    SplashScreen_RootView:
    {
      justifyContent: 'center',
      flex: 1,
       backgroundColor:'#fff',
      position: 'absolute',
      width: '100%',
      height: '100%',
    },

    SplashScreen_ChildView:
    {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#fff',
      backgroundColor: '#D6D4D9',
      flex: 1,
    },

})


const App_Screen= (
  createStackNavigator(
    {
      Page1:App,
      Page2:Screen1,
      Page3: Screen2,
      Page4: Details,
      Page5: Cart,
      Location: Location,
      Profile: Profile,
      Summary: Summary,
      Favorite: Favorite,
      MyOrders: MyOrders,
      Sitting: Sitting,
      ChangeName: ChangeName,
      ChangePassword: ChangePassword
    },
    {
      headerMode: 'none'
    },
    {
      initialRouteName: 'page1'
    }
   
  )
)



const Auth =(
  createStackNavigator(
    {
      Page1:App,
      Page2: SignUp,
      Page3: LogIn,
      Page4:ResetePassword,
      Page5:Verification,
     

    },
    {
      headerMode: 'none'
    },
    {
      initialRouteName: 'page1'
    }
    
  )
)

/*
  Page1: App,
      Page2: SignUp,
      Page3: LogIn,
      Page4:ResetePassword,
      Page5:Verification,
*/


export default  createAppContainer(
  createSwitchNavigator(
    {
      Auth:Auth,
      Screens:App_Screen,
      Screen1:Screen1,
      SignUp:SignUp,
      LogIn: LogIn,
      ResetePassword:ResetePassword,

    },
    {
      headerMode: 'none'
    },
    {
      initialRouteName: 'page1'
    }
  ),
)




// ////////////////////////////////////////////////////////////////////////////////////////


// // import * as React from "react";
// // import {
// //   Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList
// // } from 'react-native'

// // import Icon from 'react-native-vector-icons/FontAwesome5';
// // import { Dimensions } from 'react-native';
// // const windowWidth = Dimensions.get('window').width;
// // const windowHeight = Dimensions.get('window').height;

// // import { createAppContainer } from 'react-navigation'
// // import { createStackNavigator } from 'react-navigation-stack'
// // import AppIntroSlider from 'react-native-app-intro-slider';

// // // import {NavigationContainer, StackActions} from '@react-navigation/native'
// // //  import {createDrawerNavigator} from '@react-navigation/drawer'

// // //  import { createStackNavigator } from '@react-navigation/stack';

// // import { backgroundColor, next, button, textInput } from './Tasks/Colors'

// // import Screen1 from './Tasks/Screen1'
// // import Screen2 from './Tasks/Screen2'
// // import Details from './Tasks/Details';
// // import SignUp from './Tasks/SignUp';
// // import LogIn from './Tasks/LogIn'
// // import ResetePassword from './Tasks/ResetePassword'
// // import Verification from "./Tasks/Verification";
// // import { ChevronLeftIcon } from "native-base";





// // class App extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       showRealApp: false,
// //       isVisible: true,
// //       tirmnate: true,
// //       index:0,

// //       slides :[
// //         {
// //           key: 'one',
// //           title: 'Eat from the best\n restaurants',
// //           text: 'Access all the best restaurants\naround you and enjoy their\ncuisine at home',
// //           image: require('./img/m6.png'),
// //           backgroundColor: '#59b2ab',
// //         },
// //         {
// //           key: 'two',
// //           title: 'Choose the best food\nyou love ',
// //           text: 'Our delivery service offers you\nawide range of frech meals\nprepared at moment',
// //           image: require('./img/m7.png'),
// //           backgroundColor: '#febe29',
// //         },
// //         {
// //           key: 'three',
// //           title: 'Sit back\ndinner is on way',
// //           text: 'Get ready and comfortable\nwhilst our bikers bring your\nmeal at your door',
// //           image: require('./img/m8.png'),
// //           backgroundColor: '#22bcb5',
// //         }
// //       ],
// //     }
// //   }




// //   Hide_Splash_Screen = () => {
// //     this.setState({
// //       isVisible: false
// //     });
// //   }

// //   componentDidMount() {
// //     var that = this;
// //     setTimeout(function () {
// //       that.Hide_Splash_Screen();
// //     }, 3000);
// //   }

// //   Next(index){
  
// //     let data=this.state.slides
// //      index+=1;
// //     data[index]
// //     this.setState({slides:data,})
// //   }

// //   render() {
// //     return (
// //       <>
// //         <StatusBar backgroundColor={next} barStyle='dark-content' />
      
// //         {
// //           this.state.slides.map((item, index) =>
      
// //             <View style={{ backgroundColor: next, width:windowWidth,height:windowHeight,
// //              }} >
// //               <Image source={item.image} style={{
// //                 width: windowWidth * .85, height: windowHeight * .28,
// //                 alignSelf: 'center', marginTop: windowHeight * .2,
// //                 resizeMode: 'contain'
// //               }} />
// //               <Text style={{
// //                 color: backgroundColor, marginTop: 15, textAlign: 'center',
// //                 fontSize: 21, fontWeight: 'bold'
// //               }}>{item.title}</Text>
// //               <Text style={{
// //                 color: backgroundColor, marginTop: 10, alignSelf: 'center',
// //                 fontSize: 18, textAlign: 'center'
// //               }} >{item.text}</Text>


// //               <TouchableOpacity
// //                 onPress={()=>{
// //                    this.Next(index)
// //                 }}
// //               >
// //               <View style={{
// //                 alignSelf:'flex-end',
// //               height:50,
// //               //backgroundColor:'#ddd',
// //               width:70,
// //               marginTop:windowHeight*.22,
// //               justifyContent:'center',
// //               alignItems:'center'
              
// //               }}>
// //               <Text style={{ color:'#FF5100', fontSize: 20, }}
// //               >Next</Text>
// //             </View>
// //             </TouchableOpacity>


// //             </View>

        
        


       
// //           )
// //         }

// //       </>
// //     )
// //   }

// // }

// // const styles = StyleSheet.create({
// //   slide: {
// //     flex: 1, backgroundColor: '#fff'
// //   },
// //   title: {
// //     fontSize: 20,
// //     fontWeight: 'bold'
// //   },

// //   MainContainer:
// //   {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     paddingTop: (Platform.OS === 'ios') ? 20 : 0
// //   },

// //   SplashScreen_RootView:
// //   {
// //     justifyContent: 'center',
// //     flex: 1,

// //     position: 'absolute',
// //     width: '100%',
// //     height: '100%',
// //   },

// //   SplashScreen_ChildView:
// //   {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#D6D4D9',
// //     flex: 1,
// //   },

// // })

// // export default createAppContainer(
// //   createStackNavigator(
// //     {
// //       Page1: App,
// //       Page2: SignUp,
// //       Page3: LogIn,
// //       Page4: ResetePassword,
// //       Page5: Verification,

// //     },
// //     {
// //       headerMode: 'none'
// //     },
// //     {
// //       initialRouteName: 'page1'
// //     }
// //   ),
// // )






// //export default function () {
//   // const Stack = createStackNavigator()
//   // function MyStack(){
//   //   return (
//   //     <NavigationContainer>
//   //   <Stack.Navigator 
//   //   screenOptions={{
//   //       headerShown: false
//   //     }} 
//   //   >
//   //     <Stack.Screen
//   //       name="Screen1"
//   //       component={Screen1}

//   //     />

//   //   <Stack.Screen
//   //       name="Screen2"
//   //       component={Screen2}

//   //     />
//   //     <Stack.Screen
//   //       name="Details"
//   //       component={Details}
//   //     />

//   //      </Stack.Navigator>
//   //      </NavigationContainer>

//   //   );

//   // }


// // const Stack = createStackNavigator();
// // const Main = ({navigation}) => (

// //   <Stack.Navigator

// //   screenOptions={{
// //       headerShown: false
// //   }}
// // >
// //   <Stack.Screen
// //       name="Screen1"
// //       component={Screen1}


// //   />

// // </Stack.Navigator>

// // )

// // const Drawer = createDrawerNavigator()

// // function App  ()  {
// //   return (

//     // <NavigationContainer >
//     //   {/* drawerContent ={props => <DrawerContent {...props}/>} */}
//     //   <Drawer.Navigator 
//     //   //  hideStatusBar={true}
//     //      // drawerContent ={props => <DrawerContent {...props}/>}
//     //         // drawerContent={(props) => (
//     //         //   <DrawerContent {...props} />
//     //         // )}
//     //       //  drawerStyle={{backgroundColor:'#ddd'}}


//     //   >


//     //   <Drawer.Screen name='Screen1' component={Main} />




//     //     {/* <Drawer.Screen name ="Home" component={Screens} /> */}
//     //   </Drawer.Navigator>
//     // </NavigationContainer>


// //    <Screen1/>
// //   );
// // }
//////////////////////////////////////////////////////////////////////////////////////////

// import React from "react";
// import {
//     View,
//     Text,
//     Image,
//     TouchableOpacity
// } from "react-native";
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import MapViewDirections from "react-native-maps-directions";

// import { COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY } from "./constants"

// const OrderDelivery = ({ route, navigation }) => {

//     const mapView = React.useRef()

//     const [restaurant, setRestaurant] = React.useState(null)
//     const [streetName, setStreetName] = React.useState("")
//     const [fromLocation, setFromLocation] = React.useState(null)
//     const [toLocation, setToLocation] = React.useState(null)
//     const [region, setRegion] = React.useState(null)

//     const [duration, setDuration] = React.useState(0)
//     const [isReady, setIsReady] = React.useState(false)
//     const [angle, setAngle] = React.useState(0)

//     React.useEffect(() => {
//       const [restaurant, setRestaurant] = React.useState(null);
//     const [currentLocation, setCurrentLocation] = React.useState(null);

//         let fromLoc = currentLocation.gps
//         let toLoc = restaurant.location
//         let street = currentLocation.streetName

//         let mapRegion = {
//             latitude: (fromLoc.latitude + toLoc.latitude) / 2,
//             longitude: (fromLoc.longitude + toLoc.longitude) / 2,
//             latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
//             longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2
//         }

//         setRestaurant(restaurant)
//         setStreetName(street)
//         setFromLocation(fromLoc)
//         setToLocation(toLoc)
//         setRegion(mapRegion)

//     }, [])

//     function calculateAngle(coordinates) {
//         let startLat = coordinates[0]["latitude"]
//         let startLng = coordinates[0]["longitude"]
//         let endLat = coordinates[1]["latitude"]
//         let endLng = coordinates[1]["longitude"]
//         let dx = endLat - startLat
//         let dy = endLng - startLng

//         return Math.atan2(dy, dx) * 180 / Math.PI
//     }

//     function zoomIn() {
//         let newRegion = {
//             latitude: region.latitude,
//             longitude: region.longitude,
//             latitudeDelta: region.latitudeDelta / 2,
//             longitudeDelta: region.longitudeDelta / 2
//         }

//         setRegion(newRegion)
//         mapView.current.animateToRegion(newRegion, 200)
//     }

//     function zoomOut() {
//         let newRegion = {
//             latitude: region.latitude,
//             longitude: region.longitude,
//             latitudeDelta: region.latitudeDelta * 2,
//             longitudeDelta: region.longitudeDelta * 2
//         }

//         setRegion(newRegion)
//         mapView.current.animateToRegion(newRegion, 200)
//     }

//     function renderMap() {
//         const destinationMarker = () => (
//             <Marker
//                 coordinate={toLocation}
//             >
//                 <View
//                     style={{
//                         height: 40,
//                         width: 40,
//                         borderRadius: 20,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         backgroundColor: COLORS.white
//                     }}
//                 >
//                     <View
//                         style={{
//                             height: 30,
//                             width: 30,
//                             borderRadius: 15,
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             backgroundColor: COLORS.primary
//                         }}
//                     >
//                         <Image
//                             source={icons.pin}
//                             style={{
//                                 width: 25,
//                                 height: 25,
//                                 tintColor: COLORS.white
//                             }}
//                         />
//                     </View>
//                 </View>
//             </Marker>
//         )

//         const carIcon = () => (
//             <Marker
//                 coordinate={fromLocation}
//                 anchor={{ x: 0.5, y: 0.5 }}
//                 flat={true}
//                 rotation={angle}
//             >
//                 <Image
//                     source={icons.car}
//                     style={{
//                         width: 40,
//                         height: 40
//                     }}
//                 />
//             </Marker>
//         )

//         return (
//             <View style={{ flex: 1 }}>
//                 <MapView
//                     ref={mapView}
//                     provider={PROVIDER_GOOGLE}
//                     initialRegion={region}
//                     style={{ flex: 1 }}
//                 >
//                     <MapViewDirections
//                         origin={fromLocation}
//                         destination={toLocation}
//                         apikey={GOOGLE_API_KEY}
//                         strokeWidth={5}
//                         strokeColor={COLORS.primary}
//                         optimizeWaypoints={true}
//                         onReady={result => {
//                             setDuration(result.duration)

//                             if (!isReady) {
//                                 // Fit route into maps
//                                 mapView.current.fitToCoordinates(result.coordinates, {
//                                     edgePadding: {
//                                         right: (SIZES.width / 20),
//                                         bottom: (SIZES.height / 4),
//                                         left: (SIZES.width / 20),
//                                         top: (SIZES.height / 8)
//                                     }
//                                 })

//                                 // Reposition the car
//                                 let nextLoc = {
//                                     latitude: result.coordinates[0]["latitude"],
//                                     longitude: result.coordinates[0]["longitude"]
//                                 }

//                                 if (result.coordinates.length >= 2) {
//                                     let angle = calculateAngle(result.coordinates)
//                                     setAngle(angle)
//                                 }

//                                 setFromLocation(nextLoc)
//                                 setIsReady(true)
//                             }
//                         }}
//                     />
//                     {destinationMarker()}
//                     {carIcon()}
//                 </MapView>
//             </View>
//         )
//     }

//     function renderDestinationHeader() {
//         return (
//             <View
//                 style={{
//                     position: 'absolute',
//                     top: 50,
//                     left: 0,
//                     right: 0,
//                     height: 50,
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                 }}
//             >
//                 <View
//                     style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         width: SIZES.width * 0.9,
//                         paddingVertical: SIZES.padding,
//                         paddingHorizontal: SIZES.padding * 2,
//                         borderRadius: SIZES.radius,
//                         backgroundColor: COLORS.white
//                     }}
//                 >
//                     <Image
//                         source={icons.red_pin}
//                         style={{
//                             width: 30,
//                             height: 30,
//                             marginRight: SIZES.padding
//                         }}
//                     />

//                     <View style={{ flex: 1 }}>
//                         <Text style={{ ...FONTS.body3 }}>{streetName}</Text>
//                     </View>

//                     <Text style={{ ...FONTS.body3 }}>{Math.ceil(duration)} mins</Text>
//                 </View>
//             </View>
//         )
//     }

//     function renderDeliveryInfo() {
//         return (
//             <View
//                 style={{
//                     position: 'absolute',
//                     bottom: 50,
//                     left: 0,
//                     right: 0,
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                 }}
//             >
//                 <View
//                     style={{
//                         width: SIZES.width * 0.9,
//                         paddingVertical: SIZES.padding * 3,
//                         paddingHorizontal: SIZES.padding * 2,
//                         borderRadius: SIZES.radius,
//                         backgroundColor: COLORS.white
//                     }}
//                 >
//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         {/* Avatar */}
//                         <Image
//                             source={restaurant?.courier.avatar}
//                             style={{
//                                 width: 50,
//                                 height: 50,
//                                 borderRadius: 25
//                             }}
//                         />

//                         <View style={{ flex: 1, marginLeft: SIZES.padding }}>
//                             {/* Name & Rating */}
//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                                 <Text style={{ ...FONTS.h4 }}>{restaurant?.courier.name}</Text>
//                                 <View style={{ flexDirection: 'row' }}>
//                                     <Image
//                                         source={icons.star}
//                                         style={{ width: 18, height: 18, tintColor: COLORS.primary, marginRight: SIZES.padding }}
//                                     />
//                                     <Text style={{ ...FONTS.body3 }}>{restaurant?.rating}</Text>
//                                 </View>
//                             </View>

//                             {/* Restaurant */}
//                             <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{restaurant?.name}</Text>
//                         </View>
//                     </View>

//                     {/* Buttons */}
//                     <View
//                         style={{
//                             flexDirection: 'row',
//                             marginTop: SIZES.padding * 2,
//                             justifyContent: 'space-between'
//                         }}
//                     >
//                         <TouchableOpacity
//                             style={{
//                                 flex: 1,
//                                 height: 50,
//                                 marginRight: 10,
//                                 backgroundColor: COLORS.primary,
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 borderRadius: 10
//                             }}
//                             onPress={() => navigation.navigate("Home")}
//                         >
//                             <Text style={{ ...FONTS.h4, color: COLORS.white }}>Call</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={{
//                                 flex: 1,
//                                 height: 50,
//                                 backgroundColor: COLORS.secondary,
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 borderRadius: 10
//                             }}
//                             onPress={() => navigation.goBack()}
//                         >
//                             <Text style={{ ...FONTS.h4, color: COLORS.white }}>Cancel</Text>
//                         </TouchableOpacity>
//                     </View>

//                 </View>
//             </View>
//         )
//     }

//     function renderButtons() {
//         return (
//             <View
//                 style={{
//                     position: 'absolute',
//                     bottom: SIZES.height * 0.35,
//                     right: SIZES.padding * 2,
//                     width: 60,
//                     height: 130,
//                     justifyContent: 'space-between'
//                 }}
//             >
//                 {/* Zoom In */}
//                 <TouchableOpacity
//                     style={{
//                         width: 60,
//                         height: 60,
//                         borderRadius: 30,
//                         backgroundColor: COLORS.white,
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                     }}
//                     onPress={() => zoomIn()}
//                 >
//                     <Text style={{ ...FONTS.body1 }}>+</Text>
//                 </TouchableOpacity>

//                 {/* Zoom Out */}
//                 <TouchableOpacity
//                     style={{
//                         width: 60,
//                         height: 60,
//                         borderRadius: 30,
//                         backgroundColor: COLORS.white,
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                     }}
//                     onPress={() => zoomOut()}
//                 >
//                     <Text style={{ ...FONTS.body1 }}>-</Text>
//                 </TouchableOpacity>
//             </View>

//         )
//     }

//     return (
//         <View style={{ flex: 1 }}>
//             {renderMap()}
//             {renderDestinationHeader()}
//             {renderDeliveryInfo()}
//             {renderButtons()}
//         </View>
//     )
// }

// export default OrderDelivery;
//////////////////////////////////////////////////////////////



// import * as React from "react";
// import {
//   Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList, Platform,
// } from 'react-native'

// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { Dimensions } from 'react-native';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// import { createAppContainer } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack'
// import AppIntroSlider from 'react-native-app-intro-slider';

// // import {NavigationContainer, StackActions} from '@react-navigation/native'
// //  import {createDrawerNavigator} from '@react-navigation/drawer'

// //  import { createStackNavigator } from '@react-navigation/stack';

// import { backgroundColor, next, button, textInput } from './Tasks/Colors'

// import Screen1 from './Tasks/Screen1'
// import Screen2 from './Tasks/Screen2'
// import Details from './Tasks/Details';
// import SignUp from './Tasks/SignUp';
// import LogIn from './Tasks/LogIn'
// import ResetePassword from './Tasks/ResetePassword'
// import Verification from "./Tasks/Verification";
// import { ChevronLeftIcon } from "native-base";

// import MapView, {
//     ProviderPropType,
//     Marker,
//     AnimatedRegion,
//   } from 'react-native-maps';



//   const ASPECT_RATIO = windowWidth.width / windowHeight.height;
//   const LATITUDE =  30.78833360;
//   const LONGITUDE = 30.99850190;
//   const LATITUDE_DELTA = 0.0922;
//   const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         coordinate: new AnimatedRegion({
//             latitude: LATITUDE,
//             longitude: LONGITUDE,
//           }),
//     }
// }

// onRegionChange(region) {
//     this.setState({ region:region });
   
//   }




//   animate() {
//     const { coordinate } = this.state;
//     const newCoordinate = {
//       latitude: LATITUDE + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
//       longitude: LONGITUDE + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2),
//     };

//     if (Platform.OS === 'android') {
//       if (this.marker) {
//         this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
//       }
//     } else {
//       // `useNativeDriver` defaults to false if not passed explicitly
//       coordinate.timing({ ...newCoordinate, useNativeDriver: true }).start();
//     }
//   }

 

// render(){
//     return(
//         <>
//              <View style={styles.container}>
//       <MapView style={styles.map} 
//         provider={this.props.provider}

//      // region={this.state.region}
//       //onRegionChange={this.onRegionChange}
         
//       initialRegion={{
//         latitude: LATITUDE,
//         longitude: LONGITUDE,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA,
//       }}
      
//       >

//       <Marker.Animated
      
//             ref={marker => {
//               this.marker = marker;
//             }}
//             coordinate={this.state.coordinate}
//           />

//  </MapView>

//  <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             onPress={() => this.animate()}
//             style={[styles.bubble, styles.button]}
//           >
//             <Text>Animate</Text>
//           </TouchableOpacity>
//         </View>

        

//     </View>
        
//         </>
//     )
// }
// }



// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     map: {
//       width: Dimensions.get('window').width,
//       height: Dimensions.get('window').height,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         marginVertical: 20,
//         backgroundColor: 'transparent',
//       },
//       button: {
//         width: 80,
//         paddingHorizontal: 12,
//         alignItems: 'center',
//         marginHorizontal: 10,
//       },
//       bubble: {
//         flex: 1,
//         backgroundColor: 'rgba(255,255,255,0.7)',
//         paddingHorizontal: 18,
//         paddingVertical: 12,
//         borderRadius: 20,
//       },
//   });

///////////////////////////////////////////////////////////////////



// import * as React from "react";
// import {
//   Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList, Platform, ToastAndroid,
// } from 'react-native'

// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { Dimensions } from 'react-native';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// import { createAppContainer } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack'
// import AppIntroSlider from 'react-native-app-intro-slider';

// // import {NavigationContainer, StackActions} from '@react-navigation/native'
// //  import {createDrawerNavigator} from '@react-navigation/drawer'

// //  import { createStackNavigator } from '@react-navigation/stack';

// import { backgroundColor, next, button, textInput } from './Tasks/Colors'

// import Screen1 from './Tasks/Screen1'
// import Screen2 from './Tasks/Screen2'
// import Details from './Tasks/Details';
// import SignUp from './Tasks/SignUp';
// import LogIn from './Tasks/LogIn'
// import ResetePassword from './Tasks/ResetePassword'
// import Verification from "./Tasks/Verification";
// import { ChevronLeftIcon } from "native-base";

// import MapView, {
//     ProviderPropType,
//     Marker,
//     AnimatedRegion,
//   } from 'react-native-maps';

//   export default class App extends React.Component{
//     constructor(props){
//       super(props);
//       this.state={

//         initialRegion:{
//           latitude: 	30.94226470,
//           longitude: 30.81574230  ,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,   //0.0421
//         }
//       }
//     }


//     // componentDidMount() {
//     //   navigator.geolocation.getCurrentPosition((position) => {
//     //     var lat = parseFloat(position.coords.latitude)
//     //     var long = parseFloat(position.coords.longitude)
  
//     //     var initialRegion = {
//     //       latitude: lat,
//     //       longitude: long,
//     //       latitudeDelta: LATITUDE_DELTA,
//     //       longitudeDelta: LONGITUDE_DELTA,
//     //     }
  
//     //     this.setState({initialPosition: initialRegion})
//     //   },
//     //   (error) => alert(JSON.stringify(error)),
//     //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
//     // }
  






//     // componentDidMount(){
//     //   this.handleUserLocation()
//     // }

//     // handleUserLocation =() =>{
//     //   navigator.geolocation.getCurrentPosition(() =>{
//     //      alert("True")
//     //   })
      
//     // }


//     /*
//      this.map.animateToRegion({
//           ...this.state.initialRegion,
//           latitude: pos.coords.latitude,
//           longitude: pos.coords.longitude
//       })
//       this.setState({
//         ...this.state.initialRegion,
//         latitude:pos.coords.longitude,
//         longitude:pos.coords.longitude
//       })
//     */


//     onChangeValue =initialRegion =>{
//       ToastAndroid.show(JSON.stringify(initialRegion),ToastAndroid.SHORT)

//       this.setState({
//         initialRegion
//       })

     
//     }

//     render(){
//       return(
//         <>
//          <StatusBar
//           backgroundColor="#fff"  //#FF6C00
//           barStyle="dark-content"
//         />

//         <View style={styles.container}>
//       <MapView style={styles.map} 
         
//          initialRegion={this.state.initialRegion}
//          onRegionChangeComplete={this.onChangeValue}
//           ref={ref => this.map =ref}

//       />

//       <View style={{left:'50%',marginLeft:-24,marginTop:-24,position:'absolute'}}>
//         <Image source={require('./img/m1.png')}
//           style={{width:45,height:40,resizeMode:'contain'}} 
//         />
//       </View>

//       <TouchableOpacity
//             onPress={()=>{
//               // this.LogIn()
//             }}
//           >
//           <View style={{
//             width:windowWidth*.55,
//             height:50,
//             backgroundColor:'#FF5100',
//             borderRadius:15,
//             alignSelf:'center',
//             justifyContent:'center',
//             alignItems:'center',  
//            marginTop:15
//           }}>
//               <Text style={{fontSize:22,fontWeight:'bold',color:'#fff'}}>Next</Text>
//           </View>
//           </TouchableOpacity>


//     </View>
//         </>
//       )
//     }
//   }

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     map: {
//       width: Dimensions.get('window').width,
//       height: Dimensions.get('window').height*.879,
//     },
//   });
////////////////////////////////////////////////////////////////////////

// import * as React from "react";
// import {
//   Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList, Platform,
// } from 'react-native'

// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { Dimensions } from 'react-native';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// import { createAppContainer } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack'
// import AppIntroSlider from 'react-native-app-intro-slider';

// // import {NavigationContainer, StackActions} from '@react-navigation/native'
// //  import {createDrawerNavigator} from '@react-navigation/drawer'

// //  import { createStackNavigator } from '@react-navigation/stack';

// import { backgroundColor, next, button, textInput } from './Tasks/Colors'

// import Screen1 from './Tasks/Screen1'
// import Screen2 from './Tasks/Screen2'
// import Details from './Tasks/Details';
// import SignUp from './Tasks/SignUp';
// import LogIn from './Tasks/LogIn'
// import ResetePassword from './Tasks/ResetePassword'
// import Verification from "./Tasks/Verification";
// import { ChevronLeftIcon } from "native-base";

// import MapView, {
//     ProviderPropType,
//     Marker,
//     AnimatedRegion,
//   } from 'react-native-maps';

//   export default class App extends React.Component{

//     render(){
//       return(
//         <Screen1 />
//       )
//     }
//   }

 

