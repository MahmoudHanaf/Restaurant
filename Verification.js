import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, StatusBar,
   Dimensions,props } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { backgroundColor, button, chevron_left, header_text, next, personal, textInput } from  '../Tasks/Colors';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
  root: { flex: 1,  },
  title: { textAlign: 'center', fontSize: 30 },
  cell: {
    width: 50,
    height: 60,
    lineHeight: 70,
    fontSize: 24,
    borderBottomWidth: 1,
    borderColor: textInput,
    textAlign: 'center',
    color: '#000'
  },
  focusCell: {
    borderColor: '#000',
  },
});
const CELL_COUNT = 4;
const that = this
const Verification = () => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });


  

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor='#fff' />
      <ScrollView>
        <Text
          style={{
            fontSize: 25,
            marginTop: 60,
            alignSelf: 'center',
            color: '#000',

          }} >Enter verifications code</Text>
        <Text
          style={{
            fontSize: 19,
            textAlign: 'center',
            marginTop: 20,
            alignSelf: 'center',
            color: '#000',

          }} >The OPT code has been sent</Text>
        <Text
          style={{
            fontSize: 19,
            textAlign: 'center',
            alignSelf: 'center',
            color: '#000',

          }} >to your Email</Text>
        <View style={{ padding: 60, marginTop: 30 }}>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
       
          <Text
            style={{
              fontSize: 19,
              textAlign: 'center',
              color: '#000',

            }} >Didn't get the code ?</Text>
          <TouchableOpacity><Text style={{ fontSize: 19, textDecorationLine: 'underline', color: '#FF5100' ,textAlign:'center'}}>Resend</Text></TouchableOpacity>
       
        <TouchableOpacity
          onPress={
            () => {
              this.props.navigation.navigate("Page5")
            }
          }
          style={{
            width: width *.6,
            height: 50,
            backgroundColor: '#FF5100',
            alignSelf: 'center',
            marginTop: 50,
            borderRadius: 20,
            justifyContent:'center'
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 22,
              fontWeight: 'bold',
             // marginTop: 13,
              color: '#fff'
            }}>Verify</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};


export default Verification;
