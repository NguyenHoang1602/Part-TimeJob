/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const URL_IMG = "https://manofmany.com/wp-content/uploads/2021/05/Best-Short-Hairstyles-for-Men.jpg";

const TopTab = createMaterialTopTabNavigator();

function TopTabScreen1() {
  const [inputText, setInputText] = 
  useState();

  console.log(inputText);

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        gap: 18
      }}>
      <View style={{ paddingHorizontal: 18, }}>
        <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
          <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
            <Image source={{ uri: URL_IMG }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} numberOfLines={1}>
                UI/UX Designer
              </Text>
              <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 4 }} numberOfLines={1}>
                John Sena
              </Text>
            </View>
          </View>

          <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, }} />

          <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 12 }}>
            <View style={{ paddingStart: 60 }}>
              <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} numberOfLines={1}>
                UI/UX Designer
              </Text>
              <Text style={{ fontSize: 16, color: COLORS.primary, paddingVertical: 4 }} numberOfLines={1}>
                $1000 - 5000/month
              </Text>
              <View style={{
                width: 60,
                borderWidth: 0.5,
                borderColor: COLORS.grey,
                borderRadius: 7,
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 10 }}>Fulltime</Text>
              </View>
            </View>
          </View>
        </View>

        <TextInput
          style={{ borderWidth: 1, borderColor: 'gray', height: 100 }}
          multiline={true}
          numberOfLines={4} // Số dòng tối đa bạn muốn hiển thị
          value={inputText}
          placeholder="Nhập văn bản ở đây"
        />
        <Text>Mô tả: {inputText}</Text>
      </View>
    </SafeAreaView>
  );
}

const ManagementScreen = ({route, navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      {/* Header */}
      <View style={{ padding: 18, flexDirection: 'row', alignItems: 'center', gap: 8, borderBottomWidth: 0.5, borderColor: COLORS.grey, }}>
        <Image source={{ uri: URL_IMG }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, marginBottom: 5, color: COLORS.grey, }} numberOfLines={1}>
            Good Day 👋
          </Text>
          <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} numberOfLines={1}>
            Nguyễn Văn Chức
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 52,
            aspectRatio: 1,
            borderRadius: 52,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: COLORS.grey,
          }}>
          <Fontisto name='bell' size={24} color={COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 52,
            aspectRatio: 1,
            borderRadius: 52,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: COLORS.grey,
          }}>
          <FontAwesome name='send-o' size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <TopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500'
          },
          tabBarItemStyle: {
            width: 'auto',
          },
          lazyPlaceholder: true,
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: COLORS.primary
        }}
      >
        <TopTab.Screen name="Đang hiện thị (2)" component={TopTabScreen1} />
        <TopTab.Screen name="Đang chờ duyệt (1)" component={TopTabScreen1} />
        <TopTab.Screen name="Bị từ chối (3)" component={TopTabScreen1} />
      </TopTab.Navigator>



    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ManagementScreen;