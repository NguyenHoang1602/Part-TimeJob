/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, ScrollView, TextInput, FlatList, Pressable } from 'react-native';

//
import Input from '../components/Input';
import COLORS from '../assets/const/colors';
import Button from '../components/Button';
//icon
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import UserContext from '../components/UserConText';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const HomeScreen = ({ navigation }) => {

  useFocusEffect(
    React.useCallback(() => {
      getAllData()
      getListCareers()
    }, [])
  );

  const { user } = useContext(UserContext);

  const [listJobs, setListJobs] = useState([]);
  const [listCareers, setListCareers] = useState([]);

  const search = () => {
    navigation.navigate('SearchScreen')
  }

  const getListCareers = async () => {
    const data = await AsyncStorage.getItem('listCareers')
    setListCareers(JSON.parse(data));
  }

  const FlatLista = () => {
    return (
      <FlatList
        data={listCareers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    );

  }
  const FlatListb = () => {
    return (
      <FlatList
        data={listJobs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItemJob}
        nestedScrollEnabled={true}
        scrollEnabled={false}
      />
    );
  }

  const renderItem = ({ item }) => (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity style={{ margin: 5, alignItems: 'center', width: 70, marginTop: 15, marginBottom: 10 }} onPress={() => { }}>
        <ImageBackground
          source={{ uri: item.image }}
          style={{ width: 46, height: 46, marginBottom: 5 }}
          imageStyle={{ borderRadius: 5 }}
        />
        <Text style={{ textAlign: 'center' }}>{item.c_title}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItemJob = ({ item }) => (
    <TouchableOpacity style={{
      width: 340,
      borderWidth: 0.5,
      borderColor: COLORS.grey,
      borderRadius: 20,
      marginBottom: 18,
      padding: 20,
    }}
      onPress={() => navigation.navigate('DetailsScreen', {
        users_id: item.users_id,
        address: item.address,
        business_name: item.business_name,
        image: item.image,
        quantity: item.quantity,
        title: item.title,
        career_id: item.career_id,
        payform_id: item.payform_id,
        experience_id: item.experience_id,
        acedemic_id: item.acedemic_id,
        worktype_id: item.worktype_id,
        describe: item.describe,
        age_min: item.age_min,
        age_max: item.age_max,
        wage_min: item.wage_min,
        wage_max: item.wage_max,
        status_id: item.status_id,
        date: item.date,
        time: item.time,
      })}>
      <View style={{ width: '100%', flexDirection: 'row' }}>
        {item.image.map((imageUrl, index) => {
          if (index === 0) {
            return (
              <ImageBackground
                key={index}
                source={{ uri: imageUrl }}
                style={{ width: 46, height: 46, marginBottom: 5 }}
                imageStyle={{ borderRadius: 5 }}
              />
            );
          }
        })}
        
        <View style={{ width: '50%', height: '100%', marginStart: 20, flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '400' }}>{item.title}</Text>
          <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '400', color: COLORS.grey }}>{item.address}</Text>
        </View>
        <TouchableOpacity onPress={() => { }}>
          <Icon name="bookmark-plus-outline" size={30} color={COLORS.blue} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 1, width: '99%', backgroundColor: COLORS.grey, opacity: 0.4, marginTop: 15, marginBottom: 8 }} />
      <View style={{ width: '100%', paddingStart: '22%' }}>
        <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.grey, width: 200, marginBottom: 5 }}>{item.business_name}</Text>
        <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}>${item.wage_min} - ${item.wage_max} /month</Text>
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
          {
            item.worktype_id._id == '653e66b38e88b23b41388e3c' ? (
              <Text style={{ fontSize: 10 }} >Parttime</Text>
            ) : (
              <Text style={{ fontSize: 10 }} >Fulltime</Text>
            )
          }
        </View>
      </View>

    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, color: COLORS.blue, backgroundColor: COLORS.white }}>
      <View style={{
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
      }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 18,
            marginTop: '10%',
            width: '100%',
            height: 60,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginStart: '2%',
              alignItems: 'center',
              width: '68%',
            }}>
            <ImageBackground
              source={{ uri: user.photo }}
              style={{ width: 46, height: 46 }}
              imageStyle={{ borderRadius: 46 }}
            />
            <View style={{ flexDirection: 'column', height: '100%', justifyContent: 'center', marginStart: 13 }}>
              <Text style={{ color: '#7D7A7A', fontSize: 16 }}>Xin chào 👋</Text>
              <Text style={{ color: COLORS.black, fontSize: 20, fontWeight: "600" }} numberOfLines={1}>{user.displayName}</Text>
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
        <Pressable
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}
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
            style={{ marginRight: 20 }}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Tìm kiếm việc làm"
            onFocus={search}
          />
          <TouchableOpacity
            style={{
              marginEnd: '2%',
            }}
            onPress={() => { }}>
            <FontAwesome6
              name="sliders"
              size={20}
              color={COLORS.blue}
              style={{
                opacity: 0.95,
              }}
            />
          </TouchableOpacity>
        </Pressable>
      </View>
      <View style={{ padding: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
          <View style={{ width: '100%', alignItems: 'center', marginBottom: 15 }}>
            <View style={{ width: '100%', marginBottom: 10 }}>
              <Text style={{ fontSize: 20, fontStyle: 'normal', color: COLORS.black, fontWeight: 'bold' }}>Danh mục ngành nghề</Text>
            </View>
            <FlatLista />
          </View>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ width: '100%', marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontStyle: 'normal', color: COLORS.black, fontWeight: 'bold' }}>Công việc mới</Text>
              <TouchableOpacity style={{ marginStart: '49%' }}
                onPress={() => { }}>
                <Text style={{ fontSize: 18, color: COLORS.blue, fontWeight: 'bold' }}>Tất cả</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%', paddingBottom: '50%' }}>
              <View style={{ alignItems: 'center' }}>
                <FlatListb />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;