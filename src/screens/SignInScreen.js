/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable eol-last */
import React, {useState} from 'react';
import { View, Text, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';


const SignInScreen = () => {
    const [search, setsearch] = useState('');
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Sign In Screen</Text>
        <View
          style={{
            flexDirection: 'row',
            borderColor: '#C6C6C6',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
            <Feather
            name="search"
            size={20}
            color="#C6C6C6"
            style={{marginRight: 5}}
          />
          <TextInput
            placeholder="Search" 
            onChangeText={value => {
            setsearch(value);
          }}/>
        </View>
      </View>
    );
  };

  export default SignInScreen;