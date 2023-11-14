/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { FlatList, Image, TextInput, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Button, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';

import Modal from "react-native-modal";

const URL_IMG = "https://manofmany.com/wp-content/uploads/2021/05/Best-Short-Hairstyles-for-Men.jpg";



const Jobdata = [
  { id: '1', title: 'Freelancer 1', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '2', title: 'Freelancer 2', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '3', title: 'Freelancer 3', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '4', title: 'Freelancer 4', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '5', title: 'Freelancer 5', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
]

const SavedJobsScreen = (navigation) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [password, setPassword] = useState('');
  const [search, setsearch] = useState('');
  const [isFocusedPass, setIsFocusedPass] = useState(false);

  const [isSave, setSave] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = (item) => {
    setModalVisible(!isModalVisible);
    setSelectedItem(item);
  };
  const toggleModalclose = (item) => {
    setModalVisible(!isModalVisible);
  };
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

  const renderItemJob = ({ item }) => (

    <View style={{ padding: 18 }}>
      <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
        <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
          <Image source={{ uri: item.uri }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600" }} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 4 }} numberOfLines={1}>
              {item.Details}
            </Text>
          </View>
          <TouchableOpacity onPress={()=>{
            toggleModal(item)
          }}>
            <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity }} />

        <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 12 }}>
          <View style={{ paddingStart: 60 }}>
            <Text style={{ fontSize: 18, color: COLORS.grey, fontWeight: "600" }} numberOfLines={1}>
              {item.Address}
            </Text>
            <Text style={{ fontSize: 16, color: COLORS.primary, paddingVertical: 4 }} numberOfLines={1}>
              ${item.wagemin} - ${item.wagemax} /month
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
              <Text style={{ fontSize: 10 }}>{item.worktype}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (

    <SafeAreaView style={{ paddingVertical: 18, gap: 16, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ padding: 18, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {/* <Image source={{ uri: URL_IMG }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} /> */}
        <ImageBackground
          source={require('../assets/images/homescreen/avatar.png')}
          style={{ width: 46, height: 46 }}
          imageStyle={{ borderRadius: 46 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, marginBottom: 5, color: COLORS.grey }} numberOfLines={1}>
            Good Day 👋
          </Text>
          <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600" }} numberOfLines={1}>
            Hồng Nhân
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 46,
            height: 46,
            borderWidth: 0.4,
            borderColor: COLORS.grey,
            borderRadius: 46,
            alignItems: 'center',
            marginRight: '2%',
            justifyContent: 'center',
          }}
          onPress={() => { }}>
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
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => { }}>
          {/* <AntDesign name='message1' size={24} color={COLORS.black}/> */}
          <IconWithBadgeAntDesign iconName="message1" badgeText="" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      {/* <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 18,
          gap: 12,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 50,
            borderRadius: 15,
            alignItems: 'center',
            paddingHorizontal: 18,
            backgroundColor: "#F5F5F5",
            backgroundColor: !isFocusedPass ? COLORS.lightGrey : COLORS.blue,
            borderWidth: 1,
            borderColor: !isFocusedPass ? COLORS.white : COLORS.primary,
          }}>
          <AntDesign name='search1' size={24} color={COLORS.grey} />
          <TextInput
            placeholder="Search . . ."
            value={password}
            onChangeText={(value) => {
              setPassword(value)
            }}
            onFocus={() => { setIsFocusedPass(!isFocusedPass) }}
            onBlur={() => { setIsFocusedPass(!isFocusedPass) }}
            style={{ flex: 1, fontSize: 16, color: COLORS.black, paddingHorizontal: 10, }} />
          <TouchableOpacity onPress={() => {

          }}>
            <Ionicons name='filter' size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View> */}
      <View
        style={{
          flexDirection: 'row',
          borderColor: '#C6C6C6',
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 10,
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        <Feather
          name="search"
          size={20}
          color="#C6C6C6"
          style={{ marginRight: 20 }}
        />
        <TextInput
          placeholder="Search for a job or compamny"
          onChangeText={value => {
            setsearch(value);
          }} />
        <TouchableOpacity
          style={{
            marginLeft: '18%',
          }}
          onPress={() => { }}>
          <FontAwesome6
            name="sliders"
            size={20}
            color={COLORS.primary}
            style={{
              opacity: 0.95,
            }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
        <FlatListb />
      </ScrollView>
      <Modal onBackdropPress={toggleModalclose} isVisible={isModalVisible} style={{ justifyContent: 'flex-end', margin: 0 }}>
        <View style={{
          backgroundColor: '#FFFFFF',
          shadowColor: '#333333',
          shadowOffset: { width: -1, height: -3 },
          shadowRadius: 2,
          shadowOpacity: 0.4,
          // elevation: 5,
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
          <View style={{
            alignItems: 'center',
          }}>
            <View style={{
              width: 40,
              height: 6,
              borderRadius: 4,
              backgroundColor: COLORS.grey,
              marginBottom: 10,
            }} />
          </View>
        </View>
        <View style={{
          padding: 20,
          backgroundColor: '#FFFFFF',
          paddingTop: 20,
          alignItems:'center',
        }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.black }}>Remove from Saved ?</Text>
          <View style={{ borderColor: COLORS.blackOpacity, marginVertical: 10, width: "100%" }} />
          <View style={{ paddingVertical: 18, width: "100%" }}>
            <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
              <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
                <Image source={{ uri: selectedItem?.uri}} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600" }} numberOfLines={1}>
                    {selectedItem?.title}
                  </Text>
                  <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 4 }} numberOfLines={1}>
                    {selectedItem?.Details}
                  </Text>
                </View>
                <TouchableOpacity>
                  <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
              <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity }} />
              <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 12 }}>
                <View style={{ paddingStart: 60 }}>
                  <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600" }} >
                    {selectedItem?.Address}
                  </Text>
                  <Text style={{ fontSize: 16, color: COLORS.primary, paddingVertical: 4 }} >
                    ${selectedItem?.wagemin} - ${selectedItem?.wagemax} /moth
                  </Text>
                  <View style={{
                    width: 70,
                    borderWidth: 0.5,
                    borderColor: COLORS.grey,
                    borderRadius: 7,
                    padding: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{ fontSize: 10 }}>{selectedItem?.worktype}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
          }}>
            <TouchableOpacity
              onPress={toggleModalclose}
              style={{
                backgroundColor: COLORS.blue,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 64,
                position: "relative",
                width: 160,
                paddingVertical: 15,
                marginEnd: 15,
              }}>
              <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: "600" }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 64,
                position: "relative",
                width: 160,
                paddingVertical: 15,
              }}>
              <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600" }}>Yes, Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>

  )
}

export default SavedJobsScreen;