/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import COLORS from '../assets/const/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';



const SettingScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: 18,
        backgroundColor: COLORS.white,
        paddingLeft: 20,
        paddingRight: 20,
      }}>
      <View>
        <Text style={{fontSize: 16,fontWeight: '500', marginLeft: 5,marginTop: 50,color: '#808080'}}>Tài khoản</Text>
        <TouchableOpacity style={{width: '100%', flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
            <Ionicons name="person-outline" size={26} color = {COLORS.black} />
            <Text style={{fontSize: 16, fontWeight: 500, marginStart: 20, flex: 1, color: COLORS.black}}>Thông tin cá nhân</Text>
            <Feather name="chevron-right" size={26} color = {COLORS.black} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{fontSize: 16,fontWeight: '500', marginLeft: 5,marginTop: 30,color: '#808080'}}>Tổng quát</Text>
        <TouchableOpacity style={{width: '100%', flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
            <Ionicons name="notifications-outline" size={26} color = {COLORS.black} />
            <Text style={{fontSize: 16, fontWeight: 500, marginStart: 20, flex: 1, color: COLORS.black}}>Thông báo</Text>
            <Feather name="chevron-right" size={26} color = {COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
            <Ionicons name="briefcase-outline" size={26} color = {COLORS.black} />
            <Text style={{fontSize: 16, fontWeight: 500, marginStart: 20, flex: 1, color: COLORS.black}}>Vấn đề ứng dụng</Text>
            <Feather name="chevron-right" size={26} color = {COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
            <Ionicons name="time-outline" size={26} color = {COLORS.black} />
            <Text style={{fontSize: 16, fontWeight: 500, marginStart: 20, flex: 1, color: COLORS.black}}>Múi giờ</Text>
            <Feather name="chevron-right" size={26} color = {COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
            <Ionicons name="shield-checkmark-outline" size={26} color = {COLORS.black} />
            <Text style={{fontSize: 16, fontWeight: 500, marginStart: 20, flex: 1, color: COLORS.black}}>Bảo mật</Text>
            <Feather name="chevron-right" size={26} color = {COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
            <Ionicons name="language-outline" size={26} color = {COLORS.black} />
            <Text style={{fontSize: 16, fontWeight: 500, marginStart: 20, flex: 1, color: COLORS.black}}>Ngôn ngữ</Text>
            <Text style={{fontSize: 16, fontWeight: 500, marginStart: 20, flex: 1, color: COLORS.black}}>English (US)</Text>
            <Feather name="chevron-right" size={26} color = {COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
            <Ionicons name="eye-outline" size={26} color = {COLORS.black} />
            <Text style={{fontSize: 16, fontWeight: 500, marginStart: 20, flex: 1, color: COLORS.black}}>Chế độ tối</Text>
            <Ionicons name="toggle-outline" size={26} color = {COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
            <Ionicons name="alert-circle-outline" size={26} color = {COLORS.black} />
            <Text style={{fontSize: 16, fontWeight: 500, marginStart: 20, flex: 1, color: COLORS.black}}>Trung tâm trợ giúp</Text>
            <Feather name="chevron-right" size={26} color = {COLORS.black} />
        </TouchableOpacity>
        <View style={{borderColor: COLORS.grey, width: '90%', borderRadius: 1, borderWidth: 0.5, marginTop: 20}}/>
        <TouchableOpacity style={{width: '100%', flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
            <Ionicons name="lock-closed-outline" size={26} color = {COLORS.red} />
            <Text style={{fontSize: 16, fontWeight: 500, marginStart: 20, flex: 1, color: COLORS.red}}>Huỷ kích hoạt tài khoản của tôi</Text>
            <Feather name="chevron-right" size={26} color = {COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={26} color = {COLORS.red} />
            <Text style={{fontSize: 16, fontWeight: 500, marginStart: 20, flex: 1, color: COLORS.red}}>Đăng xuất</Text>
            <Feather name="chevron-right" size={26} color = {COLORS.black} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;
