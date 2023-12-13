/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ImageBackground, FlatList, ScrollView, Alert } from 'react-native';
//
import Input from '../components/Input';
import COLORS from '../assets/const/colors';
import Button from '../components/Button';
import UserContext from '../components/UserConText';
import axios from 'axios';
//icon
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import EditAccount from './EditAccount';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const [darkMode, setDarkMode] = useState(true);
  const Darkmode = () =>{
    setDarkMode(!darkMode);
  }
  const CV = [
    { id: '1', name: 'CV01' },
    { id: '2', name: 'CV02' },
    { id: '3', name: 'CV03' },
  ];
  const renderCV = ({ item }) => (

    <View style={{ marginBottom: 18, flexDirection: 'row' }}>
      <Ionicons name='document-text-outline' size={24} color={COLORS.black} />
      <Text numberOfLines={1} style={{ flex: 1, fontSize: 16, fontWeight: '400', marginLeft: 25, color: COLORS.black }}>{item.title}</Text>
    </View>
  );
  const Logout =  () => {
    Alert.alert('Đăng xuất','Bạn muốn đăng xuất ?',[
      {text: 'Không'},
      {text: 'Có', onPress: ()=> out()}
    ],
    { cancelable: false });

  };
  const out = async () =>{
    await GoogleSignin.signOut();
    AsyncStorage.clear();
    navigation.replace('AuthStack');
  }
  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 18, backgroundColor: COLORS.white, paddingLeft: 30, paddingRight: 30 }}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{
          marginTop: '20%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <ImageBackground
            source={{ uri: user.photo }}
            style={{ width: 70, height: 70 }}
            imageStyle={{ borderRadius: 46 }}
          />
          <View style={{ flex: 1, marginStart: 22 }}>
            <Text numberOfLines={1} style={{ fontSize: 20, fontWeight: '600', color: COLORS.black, width: '95%' }}>{user.displayName}</Text>
            <Text style={{ color: '#7D7A7A', fontSize: 16 }}>Xin chào 👋</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.account}>
          <Text style={styles.title}>Tài khoản</Text>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Cập nhật thông tin cá nhân')}>
            <FontAwesome name="user-o" size={24} color='rgba(125, 122, 122, 1)' />
            <Text style={styles.itemText}>Thông tin cá nhân</Text>
            <Feather name="chevron-right" size={24} color='rgba(125, 122, 122, 1)' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item1} onPress={() => navigation.navigate('CVResumeScreen') }>
            <Ionicons name="document-text-outline" size={24} color='rgba(125, 122, 122, 1)' />
            <Text style={styles.itemText}>Quản lí CV</Text>
            <Feather name="chevron-right" size={24} color='rgba(125, 122, 122, 1)' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item1} onPress={() => navigation.navigate('MessageScreen')}>
            <AntDesign name="message1" size={24} color='rgba(125, 122, 122, 1)' />
            <Text style={styles.itemText}>Tin nhắn</Text>
            <Feather name="chevron-right" size={24} color='rgba(125, 122, 122, 1)' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item1}>
            <AntDesign name="pdffile1" size={24} color='rgba(125, 122, 122, 1)' />
            <Text style={styles.itemText}>Hồ sơ ứng tuyển</Text>
            <Feather name="chevron-right" size={24} color='rgba(125, 122, 122, 1)' />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={styles.account}>
          <Text style={styles.title}>Cài đặt chung</Text>
          <TouchableOpacity style={styles.item}
          onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={24} color='rgba(125, 122, 122, 1)' />
            <Text style={styles.itemText}>Thông báo</Text>
            <Feather name="chevron-right" size={24} color='rgba(125, 122, 122, 1)' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item1}>
            <MaterialCommunityIcons name="google-translate" size={24} color='rgba(125, 122, 122, 1)' />
            <Text style={styles.itemText}>Ngôn ngữ</Text>
            <Feather name="chevron-right" size={24} color='rgba(125, 122, 122, 1)' />
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: '100%',
            flexDirection: 'row',
            marginTop: 8,
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 8,
          }}>
            <Feather name="moon" size={24} color='rgba(125, 122, 122, 1)' />
            <Text style={styles.itemText}>Chế độ tối</Text>
            <TouchableOpacity onPress={Darkmode}>
              {
                darkMode ? (
                  <Fontisto name="toggle-on" size={36} color= {COLORS.primary} />
                ) : <Fontisto name="toggle-off" size={36} color='rgba(125, 122, 122, 0.25)' />
              }
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item1}>
            <Feather name="help-circle" size={24} color='rgba(125, 122, 122, 1)' />
            <Text style={styles.itemText}>Trợ giúp & hỗ trợ</Text>
            <Feather name="chevron-right" size={24} color='rgba(125, 122, 122, 1)' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item1}>
            <AntDesign name="staro" size={24} color='rgba(125, 122, 122, 1)' />
            <Text style={styles.itemText}>Đánh giá</Text>
            <Feather name="chevron-right" size={24} color='rgba(125, 122, 122, 1)' />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={styles.account}>
          <TouchableOpacity style={{
            width: '100%',
            flexDirection: 'row',
            marginBottom: 5,
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 12,
          }}
          onPress={Logout}>
            <Ionicons name="log-out-outline" size={24} color={COLORS.red} />
            <Text style={{ fontSize: 18, fontWeight: '400', marginStart: 20, flex: 1, color: COLORS.red }}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  line: {
    borderColor: COLORS.grey,
    width: '100%',
    borderRadius: 1,
    borderWidth: 0.25,
    marginTop: '8%',
  },
  account: {
    marginTop: '8%',
    width: '100%',
  },
  title: {
    fontSize: 15,
    fontFamily: 'BeVietnamPro-Medium',
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  item1: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '400',
    marginStart: 20,
    flex: 1,
  },
});
export default ProfileScreen;

