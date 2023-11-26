import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../assets/const/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CVitem = (props) => {
    let {name, value} = props.people
  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row', backgroundColor: '#EEE0E5', height: 80, borderRadius: 10, alignItems: 'center', padding: 15}}>
          <AntDesign name="pdffile1" size={26} color = {COLORS.red}/>
          <View style={{marginLeft: 15, flex: 1}}>
            <Text style={{fontSize: 18, color: COLORS.black}}>{name}</Text>
            <Text>{value}</Text>
          </View>
          <Ionicons name="close-outline" size={26} color = {COLORS.red}/>
        </View>
    </SafeAreaView>
  )
}

export default CVitem