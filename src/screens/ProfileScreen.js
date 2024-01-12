/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, FlatList, ScrollView, Alert, ToastAndroid, StatusBar } from 'react-native';

//
import Input from '../components/Input';
import COLORS from '../assets/const/colors';
import Button from '../components/Button';
import UserContext from '../components/UserConText';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

const ProfileScreen = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const [darkMode, setDarkMode] = useState(true);
  const Darkmode = () => {
    setDarkMode(!darkMode);
    ToastAndroid.show('Tính năng đang được phát triển !', ToastAndroid.SHORT)
  }

  const Logout = () => {
    Alert.alert('Đăng xuất', 'Bạn muốn đăng xuất ?', [
      { text: 'Không' },
      { text: 'Có', onPress: () => out() }
    ],
      { cancelable: false });

  };
  const out = async () => {
    try {
      //await messaging().deleteToken();
      await AsyncStorage.clear();
      const user = firebase.auth().currentUser;
      if (user) {
        firebase.auth().signOut();
      }
      await AsyncStorage.setItem('isFirstAccess', "1");
      navigation.replace('AuthStack');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 18,
        }}>
          <ImageBackground
            source={{ uri: user.photo }}
            style={{ width: 70, height: 70 }}
            imageStyle={{ borderRadius: 46 }}
          />
          <View style={{ flex: 1, marginStart: 22 }}>
            <Text numberOfLines={1} style={{ fontSize: 22, color: COLORS.black, width: '95%', fontFamily: 'BeVietnamPro-Bold', }}>{user.displayName}</Text>
            <Text style={{ color: '#7D7A7A', fontSize: 16, fontFamily: 'BeVietnamPro-Medium', }}>Xin chào 👋</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.account}>
          <Text style={styles.title}>TÀI KHOẢN</Text>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Cập nhật thông tin cá nhân')}>
            <FontAwesome name="user-o" size={24} color={COLORS.primary} />
            <Text style={styles.itemText}>Thông tin cá nhân</Text>
            <Feather name="chevron-right" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          {
            user?.role === 0 ? (
              <TouchableOpacity style={styles.item1} onPress={() => navigation.navigate('CVResumeScreen')}>
                <Ionicons name="document-text-outline" size={24} color={COLORS.primary} />
                <Text style={styles.itemText}>Quản lí CV</Text>
                <Feather name="chevron-right" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            ) : null
          }
          <TouchableOpacity style={styles.item1} onPress={() => navigation.navigate('MessageScreen')}>
            <AntDesign name="message1" size={24} color={COLORS.primary} />
            <Text style={styles.itemText}>Tin nhắn</Text>
            <Feather name="chevron-right" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          {
            user?.role === 1 ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('CurriculumVitaeScreen')}
                style={styles.item1}>
                <AntDesign name="pdffile1" size={24} color={COLORS.primary} />
                <Text style={styles.itemText}>Hồ sơ ứng tuyển</Text>
                <Feather name="chevron-right" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            ) : null
          }
        </View>
        <View style={styles.line} />
        <View style={styles.account}>
          <Text style={styles.title}>CÀI ĐẶT CHUNG</Text>
          <TouchableOpacity style={styles.item}
            onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
            <Text style={styles.itemText}>Thông báo</Text>
            <Feather name="chevron-right" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ToastAndroid.show('Tính năng đang được phát triển !', ToastAndroid.SHORT)}
            style={styles.item1}>
            <MaterialCommunityIcons name="google-translate" size={24} color={COLORS.primary} />
            <Text style={styles.itemText}>Ngôn ngữ</Text>
            <Feather name="chevron-right" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ToastAndroid.show('Tính năng đang được phát triển !', ToastAndroid.SHORT)}
            style={{
              width: '100%',
              flexDirection: 'row',
              marginTop: 8,
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}>
            <Feather name="moon" size={24} color={COLORS.primary} />
            <Text style={styles.itemText}>Chế độ tối</Text>
            <TouchableOpacity onPress={Darkmode}>
              {
                darkMode ? (
                  <Fontisto name="toggle-off" size={36} color='rgba(125, 122, 122, 0.25)' />
                ) : <Fontisto name="toggle-on" size={36} color={COLORS.primary} />
              }
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ToastAndroid.show('Tính năng đang được phát triển !', ToastAndroid.SHORT)}
            style={styles.item1}>
            <Feather name="help-circle" size={24} color={COLORS.primary} />
            <Text style={styles.itemText}>Trợ giúp & hỗ trợ</Text>
            <Feather name="chevron-right" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ToastAndroid.show('Tính năng đang được phát triển !', ToastAndroid.SHORT)}
            style={styles.item1}>
            <AntDesign name="staro" size={24} color={COLORS.primary} />
            <Text style={styles.itemText}>Đánh giá</Text>
            <Feather name="chevron-right" size={24} color={COLORS.primary} />
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
            paddingBottom: 15,
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
    marginTop: '4%',
  },
  account: {
    marginTop: '8%',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontFamily: 'BeVietnamPro-Bold',
    color: COLORS.black
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
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'BeVietnamPro-Medium',
    marginStart: 20,
    flex: 1,
    paddingBottom: 4,

  },
});
export default ProfileScreen;

