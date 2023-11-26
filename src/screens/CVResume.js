import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../assets/const/colors';
import { ScrollView } from 'react-native-gesture-handler';
import CVitem from './CVitem';

const CVResume = (props) => {
  const [peoples, setPeoples] = useState([
    { name: 'Hồng Nhân', value: '825 Kb', url: 'https://play.google.com/store/apps/details?id=com.rizwan.simplepdfreader2018&hl=vi' },
    { name: 'Hoàng Nguyên', value: '630 Kb', url: 'https://play.google.com/store/apps/details?id=com.rizwan.simplepdfreader2018&hl=vi'},
    { name: 'Văn Chức',value: '748 Kb', url: 'https://play.google.com/store/apps/details?id=com.rizwan.simplepdfreader2018&hl=vi'},
  ]);
  return (
    <SafeAreaView style={{
        flex: 1,
        paddingVertical: 18,
        backgroundColor: COLORS.white,
        paddingLeft: 20,
        paddingRight: 20,
      }}>
        <Text style={{fontSize: 16,fontWeight: '400', marginTop: 40 ,color: COLORS.black}}>Upload CV/Resume</Text>
        <TouchableOpacity style={{flexDirection: 'column', backgroundColor: '#EEEEEE', width: '100%', height: 120, borderRadius: 10, borderWidth: 1, borderColor: '#DDDDDD' , marginTop: 20}}>
            <Ionicons name="push-outline" size={30} color = {COLORS.blue} style={{textAlign: 'center', marginTop: 40}} />
            <Text style={{fontSize: 14,fontWeight: '400',color: '#808080', textAlign: 'center', marginTop: 10}}>Browse File</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          {peoples.map(eachPeople => <CVitem people = {eachPeople}/>)}
        </TouchableOpacity>
        {/* <TouchableOpacity
              onPress={{}}
              style={{
                backgroundColor: COLORS.blue,
                padding: 5,
                width: '100%',
                height: 50,
                borderRadius: 30,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: COLORS.black,
                shadowOffset: {width: 10, height: 10},
                shadowOpacity: 1,
                shadowRadius: 3,
                marginTop: 500
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: COLORS.white,
                }}>
                Lưu
              </Text>
        </TouchableOpacity> */}
        
    </SafeAreaView>
  )
}

export default CVResume

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'pink',
    fontSize: 16,
    width: '100%',
    height: 80,
  }
})