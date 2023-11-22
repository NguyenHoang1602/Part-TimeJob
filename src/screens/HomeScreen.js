/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, ScrollView, TextInput, FlatList, Pressable } from 'react-native';

//
import Input from '../components/Input';
import COLORS from '../assets/const/colors';
import Button from '../components/Button';
//icon
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import UserContext from '../components/UserConText';

import axios from 'axios';

const data = [
  { id: '1', title: 'Item 1', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '2', title: 'Item 2', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '3', title: 'Item 3', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '4', title: 'Item 4', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '5', title: 'Item 5', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '6', title: 'Item 6', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '7', title: 'Item 7', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '8', title: 'Item 8', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '9', title: 'Item 9', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '10', title: 'Item 10', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },

];
const Jobdata = [
  { id: '1', title: 'Freelancer 1', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '2', title: 'Freelancer 2', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '3', title: 'Freelancer 3', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '4', title: 'Freelancer 4', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '5', title: 'Freelancer 5', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
]

const HomeScreen = ({navigation}) => {

  const { user } = useContext(UserContext);
  const [list, setList] = useState([]);
  console.log(user);
  useFocusEffect(
    React.useCallback(() => {
      getList()
    }, [])
  );

  const search = () =>{
    navigation.navigate('SearchScreen')
  }

  const getList = () => {
    axios({
      url: "http://192.168.9.150:3000/posts/list",
      method: "GET",
    }).then((res) => {
      var response = res.data
      console.log(response);
      setList(response)
    })
  }

  const FlatLista = () => {
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal={true}
      />
    );

  }
  const FlatListb = () => {
    return (
      <FlatList
        data={Jobdata}
        keyExtractor={(item) => item.id}
        renderItem={renderItemJob}
        nestedScrollEnabled={true}
        scrollEnabled={false}
      />
    );

  }
  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ margin: 20, alignItems: 'center' }} onPress={()=>{}}>
      <ImageBackground
        source={{ uri: item.uri }}
        style={{ width: 46, height: 46, marginBottom: 5 }}
        imageStyle={{ borderRadius: 5 }}
      />
      <Text>{item.title}</Text>
    </TouchableOpacity>
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
      title: item.title,
      id: item.id,
      uri: item.uri,
      address: item.Address,
      wagemax: item.wagemax,
      wagemin: item.wagemin,
      worktype: item.worktype,
      Details: item.Details,
    })}>
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <ImageBackground
          source={{ uri: item.image }}
          style={{ width: 46, height: 46, marginBottom: 5 }}
          imageStyle={{ borderRadius: 5 }}
        />
        <View style={{ width: '50%', height: '100%', marginStart: 20, flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.grey }}>{item.Details}</Text>
        </View>
        <TouchableOpacity onPress={() => { }}>
          <Icon name="bookmark-plus-outline" size={30} color={COLORS.blue} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 1, width: '99%', backgroundColor: COLORS.grey, opacity: 0.4, marginTop: 15, marginBottom: 8 }} />
      <View style={{ width: '100%', paddingStart: '22%' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.grey }}>{item.Address}</Text>
        <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}>${item.wagemin} - ${item.wagemax} /month</Text>
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
            {/* <ImageBackground
              source={{ uri : user.photo }}
              style={{ width: 46, height: 46 }}
              imageStyle={{ borderRadius: 46 }}
            /> */}
            <View style={{ flexDirection: 'column', height: '100%', justifyContent: 'center', marginStart: 13 }}>
              <Text style={{ color: '#7D7A7A', fontSize: 16 }}>Good Morning 👋</Text>
              {/* <Text style={{ color: COLORS.black, fontSize: 20, fontWeight: "600" }} numberOfLines={1}>{user.displayName}</Text> */}
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
          style={{flex:1}}
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
          <FlatLista/>
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
              <FlatListb/>
            </View>
          </View>
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;