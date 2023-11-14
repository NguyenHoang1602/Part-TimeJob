/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ImageBackground, FlatList, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
const URL_IMG = "https://manofmany.com/wp-content/uploads/2021/05/Best-Short-Hairstyles-for-Men.jpg";

const TopTab = createMaterialTopTabNavigator();
const Jobdata = [
  { id: '1', title: 'Freelancer 1', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '2', title: 'Freelancer 2', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '3', title: 'Freelancer 3', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '4', title: 'Freelancer 4', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '5', title: 'Freelancer 5', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
]

function TopTabScreen1() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: -10,
      }}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}
        style={{
          backgroundColor: COLORS.white,
        }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <FlatList
            data={Jobdata}
            keyExtractor={(item) => item.id}
            renderItem={renderItemJob}
            nestedScrollEnabled={true}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
function TopTabScreen2() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: -10,
      }}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}
        style={{
          backgroundColor: COLORS.white,
        }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <FlatList
            data={Jobdata}
            keyExtractor={(item) => item.id}
            renderItem={renderItemJob}
            nestedScrollEnabled={true}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
function TopTabScreen3() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: -10,
      }}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}
        style={{
          backgroundColor: COLORS.white,
        }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <FlatList
            data={Jobdata}
            keyExtractor={(item) => item.id}
            renderItem={renderItemJob}
            nestedScrollEnabled={true}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const renderItemJob = ({ item }) => (
  <TouchableOpacity style={{
    width: 340,
    borderWidth: 0.5,
    borderColor: COLORS.grey,
    borderRadius: 20,
    marginBottom: 18,
    padding: 20,
  }}
  // onPress={() => navigation.navigate('DetailsScreen', {
  //   title: item.title,
  //   id: item.id,
  //   uri: item.uri,
  //   address: item.Address,
  //   wagemax: item.wagemax,
  //   wagemin: item.wagemin,
  //   worktype: item.worktype,
  //   Details: item.Details,
  // })}
  >
    <View style={{ width: '100%', flexDirection: 'row' }}>
      <ImageBackground
        source={{ uri: item.uri }}
        style={{ width: 46, height: 46, marginBottom: 5 }}
        imageStyle={{ borderRadius: 5 }}
      />
      <View style={{ width: '50%', height: '100%', marginStart: 20, flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.grey }}>{item.Details}</Text>
      </View>
      <TouchableOpacity onPress={() => { }}>
        <Icon name="bookmark-plus-outline" size={30} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
    <View style={{ height: 1, width: '99%', backgroundColor: COLORS.grey, opacity: 0.4, marginTop: 15, marginBottom: 8 }} />
    <View style={{ width: '100%', paddingStart: '22%' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.grey }}>{item.Address}</Text>
      <Text style={{ color: COLORS.primary, fontSize: 16, marginVertical: 9 }}>${item.wagemin} - ${item.wagemax} /month</Text>
      <View style={{
        width: 60,
        height: 25,
        borderWidth: 0.5,
        borderColor: COLORS.grey,
        borderRadius: 7,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{ fontSize: 10 }}>{item.worktype}</Text>
      </View>
    </View>

  </TouchableOpacity>
);

const ManagementScreen = ({ route, navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      {/* Header */}
      <View style={{
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(170, 170, 170, 1)',
      }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 18,
            width: '100%',
            height: 60,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginStart: '2%',
              alignItems: 'center',
              width: '68%',
            }} onPress={() => { }}>
            <ImageBackground
              source={require('../assets/images/homescreen/avatar.png')}
              style={{ width: 46, height: 46 }}
              imageStyle={{ borderRadius: 46 }}
            />
            <View style={{ flexDirection: 'column', height: '100%', justifyContent: 'center', marginStart: 13 }}>
              <Text style={{ color: '#7D7A7A', fontSize: 16 }}>Good Morning 👋</Text>
              <Text style={{ color: COLORS.black, fontSize: 20, fontWeight: "600" }}>Hồng Nhân</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 46,
              height: 46,
              borderWidth: 0.4,
              borderColor: COLORS.grey,
              borderRadius: 46,
              alignItems: 'center',
              marginRight: '5%',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('Notifications')}>
            {/* <Feather name='bell' size={24} color={COLORS.black}/> */}
            <IconWithBadge iconName="bell" badgeText="2" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 46,
              height: 46,
              borderWidth: 0.4,
              borderColor: COLORS.grey,
              borderRadius: 46,
              marginEnd: '2%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('ChatScreen')}>
            {/* <AntDesign name='message1' size={24} color={COLORS.black}/> */}
            <IconWithBadgeAntDesign iconName="message1" badgeText="" />
          </TouchableOpacity>
        </View>
      </View>

      <TopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500',
          },
          tabBarItemStyle: {
            width: 'auto',
          },
          lazyPlaceholder: true,
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: COLORS.primary,
        }}
      >
        <TopTab.Screen name="Đang hiện thị (2)" component={TopTabScreen1} />
        <TopTab.Screen name="Đang chờ duyệt (1)" component={TopTabScreen2} />
        <TopTab.Screen name="Bị từ chối (3)" component={TopTabScreen3} />
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