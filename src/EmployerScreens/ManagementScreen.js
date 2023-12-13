/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import axios from 'axios';
import { API } from '../../Sever/sever';

import TopTabScreenIsDisplay from '../screens/TopTabScreenIsDisplayIsDisplay';
import TopTabScreenWaiting from '../screens/TopTabScreenWaitingenWaiting';
import TopTabScreenDenied from '../screens/TopTabScreenDeniedeenDenied';
import UserContext from '../components/UserConText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const TopTab = createMaterialTopTabNavigator();
const ManagementScreen = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const [listIsDisplay, setListIsDisplay] = useState([]);
  const [listWaiting, setListWaiting] = useState([]);
  const [listDenied, setListDenied] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getListIsDisplay();
      getListWaiting();
      getListDenied();
    }, [])
  );
  // useEffect(() => {
  //   // This will select the first tab when the component mounts
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     navigation.navigate('Tab1'); // Change 'Tab1' to the name of your first tab
  //   });
  //   return unsubscribe;
  // }, []);
  async function getListIsDisplay() {
    try {
      axios({
        url: `${API}/posts/listJobsIsDisplayForApp`,
        method: "POST",
        data: {
          id: user._id,
        },
      }).then(async (response) => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data);
          await AsyncStorage.setItem('listJobsIsDisplay', data);
          setListIsDisplay(response.data);
        }
      })

    } catch (error) {
      console.log("Err : ", error);
    }
  }

  async function getListWaiting() {
    try {
      axios({
        url: `${API}/posts/listJobsWaitingForApp`,
        method: "POST",
        data: {
            id: user._id,
        },
    }).then(async (response) => {
        if (response.status === 200) {
            const data = JSON.stringify(response.data);
            await AsyncStorage.setItem('listJobsWaiting', data);
            setListWaiting(response.data);
        }
    })
    } catch (error) {
      console.log("Err : ", error);
    }
  }

  async function getListDenied() {
    try {
      axios({
        url: `${API}/posts/listJobsDeniedForApp`,
        method: "POST",
        data: {
          id: user._id,
        },
      }).then(async (response) => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data)
          await AsyncStorage.setItem('listJobsDenied', data);
          setListDenied(response.data);
        }
      })

    } catch (error) {
      console.log("Err : ", error);
    }
  }


  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
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
              source={{ uri: user.photo }}
              style={{ width: 46, height: 46 }}
              imageStyle={{ borderRadius: 46 }} />
            <View style={{ flexDirection: 'column', height: '100%', justifyContent: 'center', marginStart: 13 }}>
              <Text style={{ color: '#7D7A7A', fontSize: 16 }}>Xin chào 👋</Text>
              <Text numberOfLines={1} style={{ color: COLORS.black, fontSize: 20, fontWeight: '600' }}>{user.displayName}</Text>
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
            onPress={() => navigation.navigate('MessageScreen')}>
            {/* <AntDesign name='message1' size={24} color={COLORS.black}/> */}
            <IconWithBadgeAntDesign iconName="message1" badgeText="" />
          </TouchableOpacity>
        </View>
      </View><TopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500',
          },
          tabBarItemStyle: {
            width: 'auto',
          },
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: COLORS.primary,
        }}
      >
        <TopTab.Screen name={"Đang hiện thị  (" + listIsDisplay.length + ")"} component={TopTabScreenIsDisplay} />
        <TopTab.Screen name={"Đang chờ duyệt (" + listWaiting.length + ")"} component={TopTabScreenWaiting} />
        <TopTab.Screen name={"Bị từ chối (" + listDenied.length + ")"} component={TopTabScreenDenied} />
      </TopTab.Navigator>
      {/* Header */}
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