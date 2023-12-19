/* eslint-disable eol-last */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, Alert, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../assets/const/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { API } from '../../Sever/sever';
import { useFocusEffect } from '@react-navigation/native';

const DetailsCVScreen = ({ navigation, route }) => {
  useFocusEffect(
    React.useCallback(() => {
      getListApply();
    }, [])
  );
  const datalist = {
    _id: route.params?.item?._id,
    title: route.params?.item?.title,
    name: route.params?.item?.name,
    phone: route.params?.item?.phone,
    year: route.params?.item?.year,
    gender_id: route.params?.item?.gender_id,
    email: route.params?.item?.email,
    career_id: route.params?.item?.career_id,
    address: route.params?.item?.address,
    experience_id: route.params?.item?.experience_id,
    academic_id: route.params?.item?.academic_id,
    introduce: route.params?.item?.introduce,
  };
  const [data, setData] = useState(datalist);
  const [listApplied, setListApplied] = useState([]);

  async function getListApply() {
    try {
      const result = await axios.get(`${API}/apply//listAll`);
      if (result.status === 200) {
        setListApplied(result.data);
      }
    } catch (error) {
      console.log('Err : ', error);
    }
  }
  const checkEdit = (id) => {
    const saveAppliedIDlist = listApplied.map(item => item.cv_id);
    if (saveAppliedIDlist.some(cv_id => cv_id === id) == true) {
      ToastAndroid.show('Xin lỗi, có vẻ như CV đang trong trạng thái ứng tuyển !', ToastAndroid.SHORT);
    } else {
      navigation.navigate('UpdateCvScreen', {item : data});
    }
  };
  const checkDelete = (id) => {
    const saveAppliedIDlist = listApplied.map(item => item.cv_id);
    if (saveAppliedIDlist.some(cv_id => cv_id === id) == true) {
      ToastAndroid.show('Xin lỗi, có vẻ như CV đang trong trạng thái ứng tuyển !', ToastAndroid.SHORT);
    } else {
      deleteCv();
    }
  };

  const deleteCv = () => {
    Alert.alert('Xóa CV', 'Bạn muốn xóa CV này ?', [
      { text: 'Không' },
      { text: 'Có', onPress: () => handleDelete() },
    ],
      { cancelable: false });
  };

  const handleDelete = async () => {
    axios({
      url: `${API}/cvs/delete`,
      method: "POST",
      data: {
        id: data._id,
      }
    }).then(async (response) => {
      if (response.status === 200) {
        navigation.goBack()
      }
    });
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 18,
          paddingBottom: 15,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <View style={{ marginLeft: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 22, fontWeight: "600", color: COLORS.black }}>Thông tin CV</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: 10, paddingVertical: 22, paddingHorizontal: 24, flex: 1, backgroundColor: COLORS.white }}>
          <View style={{ width: '115%', height: 70, backgroundColor: '#FF5D01', opacity: 0.7, position: 'absolute' }} />
          <View style={{ width: '100%', alignItems: 'center', marginBottom: 20, flex: 1 }}>
            {/* <ImageBackground
              source={{ uri: data?.cv_id.user_id.photo }}
              style={{ width: 90, height: 90, marginBottom: 10 }}
              imageStyle={{ borderRadius: 100 }} /> */}
            <Text style={{ fontSize: 20, fontWeight: '600', color: "white" }}>{data?.title}</Text>
          </View>
          <View style={styles.view1}>
            <Text style={styles.text1}>Tên: </Text>
            <Text style={{ fontSize: 16 }}>{data?.name}</Text>
          </View>
          <View style={styles.view1}>
            <Text style={styles.text2}>Số ĐT: </Text>
            <Text style={{ fontSize: 16, flex: 1 }}>{data?.phone}</Text>
            <Text style={styles.text2}>Năm sinh: </Text>
            <Text style={{ fontSize: 16, marginEnd: 25 }}>{data?.year}</Text>
          </View>
          <View style={styles.view1}>
            <Text style={styles.text2}>Giới tính: </Text>
            <Text style={{ fontSize: 16 }}>{data?.gender_id?.title}</Text>
          </View>
          <View style={styles.view1}>
            <Text style={styles.text2}>Email: </Text>
            <Text style={{ fontSize: 16 }}>{data?.email}</Text>
          </View>
          <View style={styles.view1}>
            <Text style={styles.text2}>Địa chỉ: </Text>
            <Text style={{ fontSize: 16 }}>{data?.address}</Text>
          </View>
          <View style={styles.view1}>
            <Text style={styles.text2}>Ngành nghề: </Text>
            <Text style={{ fontSize: 16 }}>{data?.career_id?.title}</Text>
          </View>
          <View style={styles.view1}>
            <Text style={styles.text2}>Kinh nghiệm: </Text>
            <Text style={{ fontSize: 16 }}>{data?.experience_id?.title}</Text>
          </View>
          <View style={styles.view1}>
            <Text style={styles.text2}>Trình độ học vấn: </Text>
            <Text style={{ fontSize: 16 }}>{data?.academic_id?.title}</Text>
          </View>
          <Text style={styles.text1}>Giới thiệu bản thân: </Text>
          <Text style={{ fontSize: 16, marginTop: 5, marginBottom: 20 }}>- {data?.introduce}</Text>
          <View style={{ width: '100%', height: 1, backgroundColor: '#FF5D01', opacity: 0.7, position: 'relative', }} />
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TouchableOpacity
            onPress={() => {
              checkDelete(data._id);
            }}
            style={{
              backgroundColor: 'rgba(51, 123, 255, 0.20)',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 64,
              position: "relative",
              width: 160,
              paddingVertical: 15,
              marginEnd: 15,
            }}>
            <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: "600" }}>Xóa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              checkEdit(data._id);
            }}
            style={{
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 64,
              position: "relative",
              width: 160,
              paddingVertical: 15,
            }}>
            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600" }}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  view1: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
  },
  text1: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 20,
  },
  text2: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 5,
  },
});
export default DetailsCVScreen

