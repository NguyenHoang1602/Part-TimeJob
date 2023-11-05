/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { FlatList, Image, TextInput, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';

import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'

const URL_IMG = "https://manofmany.com/wp-content/uploads/2021/05/Best-Short-Hairstyles-for-Men.jpg";

const HomeScreen = () => {

  const [password, setPassword] = useState('');

  const [isFocusedPass, setIsFocusedPass] = useState(false);

  return (

    <SafeAreaView style={{ paddingVertical: 18, gap: 16, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
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

      {/* Search */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 18,
          gap: 12,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderRadius: 15,
            alignItems: 'center',
            paddingHorizontal: 18,
            backgroundColor: "#F5F5F5",
            backgroundColor: !isFocusedPass ? COLORS.lightGrey : COLORS.blue,
            borderWidth: 1,
            borderColor: !isFocusedPass ? COLORS.white : COLORS.primary
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
      </View>

      <ScrollView>

        <View style={{ paddingHorizontal: 18 }}>
          {/* Title */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: "700", color: COLORS.text }}>Job Category</Text>
            <TouchableOpacity>
              <Text>See all</Text>
            </TouchableOpacity>
          </View>

        </View>
        
      </ScrollView>

    </SafeAreaView>

  )
}

export default HomeScreen;