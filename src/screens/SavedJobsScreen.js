/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext, useEffect } from 'react';
import { FlatList, Image, TextInput, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Button, ImageBackground, RefreshControl, Pressable, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconWithBadge from '../components/IconWithBadge';
import Entypo from 'react-native-vector-icons/Entypo';
import { API } from '../../Sever/sever';

import Modal from "react-native-modal";
import UserContext from '../components/UserConText';

import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../assets/const/colors';


const SavedJobsScreen = ({ navigation }) => {

  const { user } = useContext(UserContext);
  const [listSaveJobs, setListSaveJobs] = useState([]);
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFocusedSearch, setIsFocusedSearch] = useState(false);
  const [isSave, setSave] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [check, setChek] = useState(false);

  const toggleModal = (item) => {
    setModalVisible(!isModalVisible);
    setSelectedItem(item);
  };
  const toggleModalclose = (item) => {
    setModalVisible(!isModalVisible);
  };
  useFocusEffect(
    React.useCallback(() => {
      getListSave()
      getListNotification()
    }, [])
  );
  async function getListNotification() {
    try {
      const response = await axios.post(`${API}/notifications/listNoSeen`, { receiver_id: user._id });
      if (response.status === 200) {
        const data = [...response.data];
        if (data.length > 0) {
          setChek(!check);
        }
      }
    } catch (error) {
      console.log('err', error);
    }
  }
  const openNotification = () => {
    navigation.navigate('Notifications');
    setChek(false);
  };
  const fetchData = async () => {
    setRefreshing(true);
    setTimeout(() => {
      try {
        axios({
          url: `${API}/savePost/list`,
          method: "POST",
          data: {
            id: user._id,
          }
        }).then(async (response) => {
          if (response.status === 200) {
            const data = JSON.stringify(response.data)
            await AsyncStorage.setItem('listMySavePost', data);
            setListSaveJobs(response.data);
          }
        })
        setRefreshing(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setRefreshing(false);
      } finally {
        setRefreshing(false);
      }
      setRefreshing(false);
    }, 2000);
  };
  //List
  const getListSave = async () => {
    try {
      axios({
        url: `${API}/savePost/list`,
        method: "POST",
        data: {
          id: user._id,
        }
      }).then(async (response) => {
        if (response.status === 200) {
          setListSaveJobs(response.data);
        }
      })
    } catch (error) {
      console.log("err", error);
    }
  }
  const handleSearch = async (key) => {
    const data = await AsyncStorage.getItem('listMySavePost');
    if (key === "") {
      setListSaveJobs(JSON.parse(data));
      setList(JSON.parse(data));
    } else {
      try {
        const filteredData = list.filter((post) => {
          const titleA = post.post_id.title.toLowerCase();
          const keyA = key.toLowerCase();
          const find = titleA.indexOf(keyA) !== -1;
          return find
        });
        setListSaveJobs(filteredData);
      } catch (error) {
        console.log(error);
      }
    }
  }
  const handlePost = async () => {
    console.log(selectedItem._id);
    // setLoading(true);
    // setTimeout(() => { 3000 });
    const result = await axios.post(`${API}/savePost/delete`, { id: selectedItem._id });
    if (result.status === 200) {
      // setLoading(false);
      toggleModalclose();
      fetchData();
      ToastAndroid.show('Xóa thành công !', ToastAndroid.SHORT);
    }
  }
  const FlatListSaveJobs = () => {
    return (
      <FlatList
        data={listSaveJobs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItemJob}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <ImageBackground
              source={require('../assets/images/5928293_2953962.jpg')}
              style={{ width: "100%", height: 430 }}
            />
            <Text style={{ fontSize: 20, color: COLORS.primary, fontFamily: 'BeVietnamPro-Bold' }}>Không tìm thấy công việc đã lưu</Text>
          </View>
        )}
      />
    );
  }
  const renderItemJob = ({ item }) => {
    const formattedWageMin = item.post_id.wageMin.toLocaleString('vi-VN');
    const formattedWageMax = item.post_id.wageMax.toLocaleString('vi-VN');
    return (
      <TouchableOpacity
        style={{
          padding: 20,
        }}
        onPress={() => navigation.navigate('DetailsScreen', {
          postid: item?.post_id._id,
          users_id: item.post_id.users_id,
          avatar: item.post_id.users_id.photo,
          address: item?.post_id.address,
          business_name: item?.post_id.businessName,
          gender: item?.post_id.gender,
          image: item?.post_id.image,
          quantity: item?.post_id.quantity,
          title: item?.post_id.title,
          career_id: item?.post_id.career_id,
          payform_id: item?.post_id.payForm_id,
          experience_id: item?.post_id.experience_id,
          acedemic_id: item?.post_id.academic_id,
          worktype_id: item?.post_id.workType_id,
          describe: item?.post_id.describe,
          age_min: item?.post_id.ageMin,
          age_max: item?.post_id.ageMax,
          wage_min: formattedWageMin,
          wage_max: formattedWageMax,
          status_id: item?.post_id.status_id,
          date: item?.post_id.date,
          time: item?.post_id.time,
        })}>
        <View style={{ borderRadius: 15, borderWidth: 0.5, padding: 18, borderColor: COLORS.grey }}>
          <View style={{ flexDirection: 'row', gap: 20 }}>
            {item?.post_id.image.map((imageUrl, index) => {
              if (index === 0) {
                return (
                  <Image
                    key={index}
                    source={{ uri: imageUrl }}
                    style={{ width: 46, aspectRatio: 1, borderRadius: 12 }}
                  />
                );
              }
            })}
            <View style={{ flex: 1 }}>
              <Text numberOfLines={2} style={{ fontSize: 18,  fontFamily: 'BeVietnamPro-Medium',marginTop:-2, color: COLORS.black }}>
                {item.post_id.title}
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium',marginTop:-2, color: COLORS.black, opacity: 0.5 }}>
                {item.post_id.address}
              </Text>
            </View>
            <TouchableOpacity onPress={() => {
              toggleModal(item)
            }}>
              <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={35} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={{ borderTopWidth: 0.5, borderColor: COLORS.grey, marginVertical: 8 }} />

          <View style={{ flexDirection: 'row', gap: 10, }}>
            <View style={{ paddingStart: '21%' }}>
              <Text numberOfLines={1} style={{ fontSize: 16, fontFamily: 'BeVietnamPro-Medium',marginTop:-2, color: COLORS.black, opacity: 0.6, }}>
                {item.post_id.businessName}
              </Text>
              <View style={{ flexDirection: 'row', marginVertical: 9 }}>
                <Text style={{ color: COLORS.blue, fontSize: 16,fontFamily: 'BeVietnamPro-Medium',marginTop:-2 }}>{formattedWageMin}đ - {formattedWageMax}đ</Text>
                {
                  item.post_id.payForm_id._id === '655de22b9a5b0ffa7ffd5132' ? (
                    <Text style={{ color: COLORS.blue, fontSize: 16,fontFamily: 'BeVietnamPro-Medium',marginTop:-2 }}> /giờ</Text>
                  ) : (
                    <Text style={{ color: COLORS.blue, fontSize: 16 ,fontFamily: 'BeVietnamPro-Medium',marginTop:-2}}> /tháng</Text>
                  )
                }
              </View>
              <View style={{
                width: 85,
                height: 25,
                borderWidth: 1,
                borderColor: COLORS.grey,
                borderRadius: 7,
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {
                  item.post_id.workType_id._id === '653e66b38e88b23b41388e3c' ? (
                    <Text style={{ fontSize: 10,fontFamily: 'BeVietnamPro-Medium',marginTop:-2 }} >Bán thời gian</Text>
                  ) : (
                    <Text style={{ fontSize: 10,fontFamily: 'BeVietnamPro-Medium',marginTop:-2 }} >Toàn thời gian</Text>
                  )
                }
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity >
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      <View style={{
        paddingBottom: 5,
        paddingHorizontal: 18,
        paddingTop: 20,
        gap: 26,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, }}>
          <ImageBackground
            source={require('../assets/images/SignIn/LogoSignInUp.png')}
            style={{ width: 26, height: 26 }}
            imageStyle={{ borderRadius: 46 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: COLORS.black, fontSize: 24, fontFamily: 'BeVietnamPro-Bold',marginTop:-6 }} numberOfLines={1}>Save Jobs</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              ToastAndroid.show('Đang phát triển', ToastAndroid.SHORT);
            }}
            style={{
              width: 46,
              aspectRatio: 1,
              borderRadius: 52,
              alignItems: 'flex-end',
              justifyContent: 'center',
              borderColor: COLORS.grey,
            }}
          >
            <Entypo name='dots-three-vertical' size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        {/* Search */}
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            borderRadius: 15,
            alignItems: 'center',
            paddingHorizontal: 18,
            backgroundColor: !isFocusedSearch ? COLORS.lightGrey : '#E9F0FF',
            borderWidth: 1,
            borderColor: !isFocusedSearch ? COLORS.white : COLORS.primary
          }}>
          <Feather name='search' size={24} color={!isFocusedSearch ? COLORS.grey : COLORS.primary} />
          <TextInput
            placeholder="Tìm kiếm . . ."
            placeholderTextColor={COLORS.grey}
            onChangeText={value => {
              handleSearch(value)
            }}
            onFocus={() => { setIsFocusedSearch(!isFocusedSearch) }}
            onBlur={() => { setIsFocusedSearch(!isFocusedSearch) }}
            style={{ flex: 1, fontSize: 16,fontFamily: 'BeVietnamPro-Medium',marginTop:-2, color: COLORS.black, paddingHorizontal: 10, }} />
          <TouchableOpacity onPress={() => {

          }}>
            <FontAwesome6 name='sliders' size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={fetchData}
          colors={[COLORS.primary]}
        />}
      >
        <FlatListSaveJobs />
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
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.black }}>Xóa công việc đã lưu ?</Text>
          <View style={{ borderColor: COLORS.blackOpacity, marginVertical: 10, width: "100%" }} />
          <View style={{ paddingVertical: 18, width: "100%" }}>
            <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.grey }}>
              <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
                {selectedItem?.post_id.image.map((imageUrl, index) => {
                  if (index === 0) {
                    return (
                      <Image
                        key={index}
                        source={{ uri: imageUrl }}
                        style={{ width: 52, aspectRatio: 1, borderRadius: 5 }}
                      />
                    );
                  }
                })}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600" }} numberOfLines={1}>
                    {selectedItem?.post_id.title}
                  </Text>
                  <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 4 }} numberOfLines={1}>
                    {selectedItem?.post_id.address}
                  </Text>
                </View>
                <TouchableOpacity>
                  <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
              <View style={{ borderTopWidth: 1, borderColor: COLORS.grey }} />
              <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 12 }}>
                <View style={{ paddingStart: 60 }}>
                  <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600" }} >
                    {selectedItem?.post_id.businessName}
                  </Text>
                  <View style={{ flexDirection: 'row', paddingVertical: 4  }}>
                    <Text style={{ fontSize: 16, color: COLORS.primary}} >
                      {selectedItem?.post_id.wageMin.toLocaleString('vi-VN')}đ - {selectedItem?.post_id.wageMax.toLocaleString('vi-VN')}đ
                    </Text>
                    {
                      selectedItem?.post_id?.payForm_id?._id === '655de22b9a5b0ffa7ffd5132' ? (
                        <Text style={{ color: COLORS.blue, fontSize: 16 }}> /giờ</Text>
                      ) : (
                        <Text style={{ color: COLORS.blue, fontSize: 16 }}> /tháng</Text>
                      )
                    }
                  </View>
                  <View style={{
                    width: 80,
                    borderWidth: 0.5,
                    borderColor: COLORS.grey,
                    borderRadius: 7,
                    padding: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {
                      selectedItem?.post_id.workType_id._id == '653e66b38e88b23b41388e3c' ? (
                        <Text style={{ fontSize: 10 }} >Bán thời gian</Text>
                      ) : (
                        <Text style={{ fontSize: 10 }} >Toàn thời gian</Text>
                      )
                    }
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
                backgroundColor: 'rgba(51, 123, 255, 0.20)',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 64,
                position: "relative",
                width: 160,
                paddingVertical: 15,
                marginEnd: 15,
              }}>
              <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: "600" }}>Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePost}
              style={{
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 64,
                position: "relative",
                width: 160,
                paddingVertical: 15,
              }}>
              <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600" }}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: COLORS.blue,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 10,
    gap: 5,
  },
  headerA: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    width: '100%',
    height: 60,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: '1%',
    width: '68%',
  },
  headerRight: {
    width: 40,
    height: 40,
    borderWidth: 0.4,
    borderColor: COLORS.grey,
    borderRadius: 40,
    alignItems: 'center',
    marginRight: '1%',
    justifyContent: 'center',
    marginStart: '18%',
  },
  body: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },
  items: {
    marginTop: '3%',
  },
});

export default SavedJobsScreen;