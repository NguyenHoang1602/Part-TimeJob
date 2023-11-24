/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EditAccount from './EditAccount';

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const CV = [
    { id: '1', name: 'CV01' },
    { id: '2', name: 'CV02' },
    { id: '3', name: 'CV03' },
  ];
  const renderCV = ({ item }) => (

    <View style={{ marginBottom: 18, flexDirection: 'row' }}>
      <Ionicons name='document-text-outline' size={24} color={COLORS.black} />
      <Text numberOfLines={1} style={{ flex: 1, fontSize: 16, fontWeight: '400', marginLeft: 25, color: COLORS.black }}>{item.name}</Text>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 18, backgroundColor: COLORS.white, paddingLeft: 20, paddingRight: 20 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 20,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={{ fontSize: 23, fontWeight: '700', color: COLORS.black }}>Applications</Text>
        </View>
        <TouchableOpacity style={{ marginEnd: 10 }} onPress={() => navigation.navigate('Cài đặt')}>
          <AntDesign name="setting" size={30} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      {/* body */}
      <View style={{
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <ImageBackground
          source={{ uri: user.photo }}
          style={{ width: 70, height: 70 }}
          imageStyle={{ borderRadius: 46 }}
        />
        <View style={{ flex: 1, marginStart: 22 }}>
          <Text numberOfLines={1} style={{ fontSize: 20, fontWeight: '600', color: COLORS.black }}>{user.displayName}</Text>
          <Text style={{ color: '#7D7A7A', fontSize: 16 }}>Xin chào 👋</Text>
        </View>
      </View>
      <View style={{
        width: '100%',
        borderWidth: 0.5,
        borderColor: COLORS.grey,
        borderRadius: 15,
        marginTop: 40,
        padding: 18,
      }}>
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="user" size={30} color={COLORS.primary} />
          <Text style={{ flex: 1, fontSize: 20, fontWeight: '600', marginLeft: 25, color: COLORS.black }}>Thông tin cá nhân</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cập nhật thông tin cá nhân')} style={{}}>
            <Feather name="edit" size={24} color={COLORS.blue} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 25 }}>
          <View style={{ flexDirection: 'row' }}>
            <Feather name="map-pin" size={22} color={COLORS.black} />
            <Text numberOfLines={1} style={{ flex: 1, fontSize: 16, fontWeight: '400', marginLeft: 25, color: COLORS.black }}>355/49 Lê Trọng Tấn, Bình Hưng Hòa, Bình Tân, TP. HCM</Text>
          </View>
          {
            user.email != "" ? (
              <View style={{ flexDirection: 'row', marginVertical: 18 }}>
                <Feather name="phone" size={22} color={COLORS.black} />
                <Text numberOfLines={1} style={{ flex: 1, fontSize: 16, fontWeight: '400', marginLeft: 25, color: COLORS.black }}>+08123456789</Text>
              </View>
            ) : null
          }
          <View style={{ flexDirection: 'row' }}>
            <Feather name="mail" size={22} color={COLORS.black} />
            <Text numberOfLines={1} style={{ flex: 1, fontSize: 16, fontWeight: '400', marginLeft: 25, color: COLORS.black }}>{user.email}</Text>
          </View>
        </View>
      </View>
      <View style={{
        width: '100%',
        borderWidth: 0.5,
        borderColor: COLORS.grey,
        borderRadius: 15,
        marginTop: 30,
        padding: 18,
      }}>
        <View style={{ flexDirection: 'row', marginBottom: 25 }}>
          <Ionicons name="document-text" size={30} color={COLORS.primary} />
          <Text style={{ flex: 1, fontSize: 20, fontWeight: '700', marginLeft: 25, color: COLORS.black }}>CV/Resume</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cập nhật CV cá nhân')} style={{}}>
            <Feather name="edit" size={24} color={COLORS.blue} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={CV}
          keyExtractor={(item) => item.id}
          renderItem={renderCV}
          nestedScrollEnabled={true}
          scrollEnabled={false}
        />

      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

