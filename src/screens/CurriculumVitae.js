/* eslint-disable eol-last */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Pressable, ImageBackground, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import COLORS from '../assets/const/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import axios from 'axios';
import { API } from '../../Sever/sever';
import UserContext from '../components/UserConText';
import { useFocusEffect } from '@react-navigation/native';

//icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';

const CurriculumVitae = ({ navigation }) => {
  // useEffect(() => {
  //     getCV();
  // }, []);
  const { user } = useContext(UserContext);
  const [cv, setCv] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFocusedSearch, setIsFocusedSearch] = useState(false);

  const getFirst = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      const result = await axios.post(`${API}/apply/listApply`, { id: user._id });
      if (result.status === 200) {
        const sortedListApply = customQuickSort(result.data);
        const data = JSON.stringify(sortedListApply)
        await AsyncStorage.setItem('listApply', data);
        setCv(sortedListApply);
        setLoading(false);
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getFirst()
    }, [])
  );

  const handleUpdateStage = async (item) => {
    if (item.status === 0) {
      const id = item._id;
      const response = await axios.post(`${API}/apply/update`, { id: id });
      if (response.status === 200) {
        getFirst();
      }
    }
    navigation.navigate('StageCurriculumScreen', { item })
  };

  const handleSearch = async (key) => {
    const data = await AsyncStorage.getItem('listApply');
    if (key === "") {
      setCv(JSON.parse(data));
      setList(JSON.parse(data));
    } else {
      try {
        const filteredData = list.filter((cv) => {
          const titleA = cv.cv_id?.name.toLowerCase();
          const keyA = key.toLowerCase();
          const find = titleA.indexOf(keyA) !== -1;
          return find
        });
        setCv(filteredData);
      } catch (error) {
        console.log(error);
      }
    }
  }

  //
  function customQuickSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
      if (i === pivotIndex) {
        continue;
      }

      if (compare(arr[i], pivot) < 0) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    const sortedLeft = customQuickSort(left);
    const sortedRight = customQuickSort(right);

    return [...sortedLeft, pivot, ...sortedRight];
  }
  const careerOrder = {
    "6554b9b322054e51b8327165": 0,
    "6554b9ce22054e51b8327168": 1,
    "6554b9de22054e51b832716b": 2,
    "6554b9f522054e51b832716e": 3,
    "6554ba1922054e51b8327171": 4,
    "6558505e70f5b03183a9c903": 5,
    "6558620586d0490539c8353c": 6,
    "65586aa480b16af7fdeef6f3": 7,

  };
  const experienceOrder = {
    "653e64098e88b23b41388e37": 0,
    "653e64198e88b23b41388e38": 1,
    "655dea819a5b0ffa7ffd513c": 2,
    "655deab09a5b0ffa7ffd513e": 3,
    "655deac79a5b0ffa7ffd513f": 4,
  };

  const academicOrder = {
    "655de6289a5b0ffa7ffd5135": 0,
    "655de6059a5b0ffa7ffd5134": 1,
    "653e661f8e88b23b41388e3b": 2,
    "655de7129a5b0ffa7ffd5137": 3,
    "655de6fc9a5b0ffa7ffd5136": 4,
  };
  const genderOrder = {
    "Nam": 0,
    "Nữ": 1,
    "Không yêu cầu": 2,
  }

  function compare(a, b) {

    const cvExperienceA = a.cv_id.experience_id;
    const postExperienceA = a.post_id.experience_id;
    const cvExperienceB = b.cv_id.experience_id;
    const postExperienceB = b.post_id.experience_id;

    const cvExperienceOrderA = experienceOrder[cvExperienceA] || -1;
    const postExperienceOrderA = experienceOrder[postExperienceA] || -1;
    const cvExperienceOrderB = experienceOrder[cvExperienceB] || -1;
    const postExperienceOrderB = experienceOrder[postExperienceB] || -1;
    console.log(cvExperienceA, cvExperienceOrderA, postExperienceOrderA);
    if (cvExperienceOrderA > postExperienceOrderA && cvExperienceOrderB <= postExperienceOrderB) {
      return -1; // a đạt yêu cầu hơn b
    } else if (cvExperienceOrderA <= postExperienceOrderA && cvExperienceOrderB > postExperienceOrderB) {
      return 1; // b đạt yêu cầu hơn a
    } else if (cvExperienceOrderA < postExperienceOrderA && cvExperienceOrderB >= postExperienceOrderB) {
      console.log("ok");
      return 1; // b đạt yêu cầu hơn a
    }

    const cvAcademicA = a.cv_id.academic_id;
    const postAcademicA = a.post_id.academic_id;
    const cvAcademicB = b.cv_id.academic_id;
    const postAcademicB = b.post_id.academic_id;

    const cvAcademicOrderA = academicOrder[cvAcademicA] || -1;
    const postAcademicOrderA = academicOrder[postAcademicA] || -1;
    const cvAcademicOrderB = academicOrder[cvAcademicB] || -1;
    const postAcademicOrderB = academicOrder[postAcademicB] || -1;

    if (cvAcademicOrderA > postAcademicOrderA && cvAcademicOrderB <= postAcademicOrderB) {
      return -1; // a đạt yêu cầu hơn b
    } else if (cvAcademicOrderA <= postAcademicOrderA && cvAcademicOrderB > postAcademicOrderB) {
      return 1; // b đạt yêu cầu hơn a
    }

    const cvGenderA = a.cv_id.gender;
    const postGenderA = a.post_id.gender;
    const cvGenderB = b.cv_id.gender;
    const postGenderB = b.post_id.gender;
    const cvGenderOrderA = genderOrder[cvGenderA] || -1;
    const postGenderOrderA = genderOrder[postGenderA] || -1;
    const cvGenderOrderB = genderOrder[cvGenderB] || -1;
    const postGenderOrderB = genderOrder[postGenderB] || -1;

    // if (cvGenderOrderA < postGenderOrderA && cvGenderOrderB >= postGenderOrderB) {
    //   return -1; // a đạt yêu cầu hơn b
    // } else if (cvGenderOrderA >= postGenderOrderA && cvGenderOrderB < postGenderOrderB) {
    //   return 1; // b đạt yêu cầu hơn a
    // }

    return 0; // giữ nguyên thứ tự
  }

  const renderCareers = ({ item }) => {
    const ngayThang = item.date.slice(0, 10);
    const parts = ngayThang.split('-');
    const date = parts.reverse().join('-');
    return (
      <Pressable
        onPress={() => { handleUpdateStage(item) }}
        style={{ flexDirection: 'row', backgroundColor: 'rgba(90, 148, 255, 0.1)', borderRadius: 10, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, marginBottom: 10 }}>
        <ImageBackground
          source={require('../assets/images/google-docs.png')}
          style={{ width: 45, height: 45 }}
          imageStyle={{}} />
        <View style={{ marginLeft: 13, flex: 1 }}>
          <Text numberOfLines={1} style={{ fontSize: 16, color: COLORS.black, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>{item?.cv_id?.name}</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            {/* <Text numberOfLines={1} style={{ fontSize: 13 }}>Thời gian : </Text> */}
            <Text numberOfLines={1} style={{ fontSize: 13, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Ngày {date} lúc {item?.time}</Text>
          </View>
          {/* <View style={{ flexDirection: 'row', marginTop: 2 }}>
          <Text numberOfLines={1} style={{ fontSize: 13 }}>Ngày : </Text>
          <Text numberOfLines={1} style={{ fontSize: 13 }}>{item?.date}</Text>
        </View> */}
        </View>
      </Pressable>
    )
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            alignItems: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={COLORS.black} />
          <Text style={{ fontSize: 22, fontWeight: '400', color: COLORS.black, marginLeft: 20, fontFamily: 'BeVietnamPro-Bold', marginTop: -4 }}>Hồ sơ ứng tuyển</Text>
        </TouchableOpacity>
        {/* Search */}
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            borderRadius: 15,
            alignItems: 'center',
            paddingHorizontal: 18,
            marginTop: 10,
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
            style={{ flex: 1, fontSize: 16, color: COLORS.black, paddingHorizontal: 10, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }} />
        </View>

        <View style={{ marginTop: 10, gap: 14 }}>
          {loading ? (
            <View style={{ justifyContent: 'center', marginTop: 200 }}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : (
            <>
              {/* Found Nav */}
              <View style={styles.foundNav}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.textFound}>
                    Tổng ({cv.length})
                  </Text>
                </View>
                <TouchableOpacity onPress={() => {
                  ToastAndroid.show('Đã lọc theo mức độ phù hợp', ToastAndroid.LONG);
                }}>
                  <MaterialCommunityIcons name='sort' size={24} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={cv}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderCareers}
                ListEmptyComponent={() => (
                  <View style={{ alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 30 }}>
                    <ImageBackground
                      source={require('../assets/images/5928293_2953962.jpg')}
                      style={{ width: "100%", height: 260 }}
                    />
                    <Text style={{ fontSize: 20, color: COLORS.primary, fontFamily: 'BeVietnamPro-Bold', marginTop: -4 }}>Không tìm thấy hồ sơ liên quan</Text>
                  </View>
                )}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  item: {
    backgroundColor: 'pink',
    fontSize: 16,
    width: '100%',
    height: 80,
  },
  foundNav: {
    flexDirection: 'row',
    paddingHorizontal: 0,
  },
  textFound: {
    fontSize: 16,
    fontFamily: 'BeVietnamPro-Bold', 
    marginTop: -4,
    color: '#000000',
  },
})
export default CurriculumVitae;