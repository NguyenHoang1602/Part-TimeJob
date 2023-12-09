/* eslint-disable comma-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Alert, ActivityIndicator, TextInput, FlatList, Pressable, RefreshControl } from 'react-native';

//
import Input from '../components/Input';
import COLORS from '../assets/const/colors';
import Button from '../components/Button';
//icon
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import UserContext from '../components/UserConText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Vector from '../assets/images/undraw_festivities_tvvj.svg';

import axios from 'axios';
import Loader from '../components/Loader';
import { API } from '../../Sever/sever';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {

  const { user } = useContext(UserContext);
  const [listJobs, setListJobs] = useState([]);
  const [listCareers, setListCareers] = useState([]);
  const [listSuggestion, setListSuggestion] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [SaveJobs, setSaveJobs] = useState(false);
  const [followedProducts, setFollowedProducts] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getAllData()
    }, [])
  );
  const getAllData = async () => {
    try {
      //list save
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
        }
      })
      //list save id
      axios({
        url: `${API}/savePost/list1`,
        method: "POST",
        data: {
          id: user._id,
        }
      }).then(async (response) => {
        if (response.status === 200) {
          setFollowedProducts(response.data);
        }
      })
      //All Post allow
      axios({
        url: `${API}/posts/list`,
        method: "GET",
      }).then((response) => {
        if (response.status === 200) {
          setListJobs(response.data)
        }
      })
      //All my Suggestion
      axios({
        url: `${API}/posts/listSuggestionForApp`,
        method: "POST",
        data: {
          data: user.favoriteCareers,
        }
      }).then((response) => {
        if (response.status === 200) {
          setListSuggestion(response.data)
        }
      })
      //All Career
      axios({
        url: `${API}/careers/listCareersForApp`,
        method: "GET",
      }).then(async (response) => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data)
          await AsyncStorage.setItem('listCareers', data);
          setListCareers(response.data);
        }
      })
      //All WorkType
      axios({
        url: `${API}/workTypes/list`,
        method: "GET",
      }).then(async (response) => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data)
          await AsyncStorage.setItem('listWorkTypes', data);
        }
      })
      //All PayForm
      axios({
        url: `${API}/payforms/list`,
        method: "GET",
      }).then(async (response) => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data)
          await AsyncStorage.setItem('listPayForms', data);
        }
      })
      //All Academic
      axios({
        url: `${API}/acedemics/list`,
        method: "GET"
      }).then(async (response) => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data)
          await AsyncStorage.setItem('listAcademics', data);
        }
      })
      //All Gender
      axios({
        url: `${API}/gender/list`,
        method: "GET"
      }).then(async (response) => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data)
          await AsyncStorage.setItem('listGenders', data);
        }
      })
      //All Experience
      axios({
        url: `${API}/experiences/list`,
        method: "GET"
      }).then(async (response) => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data)
          await AsyncStorage.setItem('listExperiences', data);
        }
      })
      //All my Notification
      const response = await axios.post(`${API}/notifications/list`, { receiver_id: user._id });
      if (response.status === 200) {
        const data = JSON.stringify(response.data)
        await AsyncStorage.setItem('listNotifications', data);
      }
      //All CV
      //All my Post allow
      axios({
        url: `${API}/posts/listJobsIsDisplayForApp`,
        method: "POST",
        data: {
          id: user._id,
        },
      }).then(async (response) => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data)
          await AsyncStorage.setItem('listJobsIsDisplay', data);
        }
      })
      //All my Post waiting
      axios({
        url: `${API}/posts/listJobsWaitingForApp`,
        method: "POST",
        data: {
          id: user._id,
        },
      }).then(async (response) => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data)
          await AsyncStorage.setItem('listJobsWaiting', data);
        }
      })
      //All my Post denied
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
        }
      })
      //All my CV
      axios({
        url: `${API}/cvs/myCVs`,
        method: "POST",
        data: {
          id: user._id,
        }
      }).then(async (response) => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data)
          await AsyncStorage.setItem('listCVs', data);
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchData = async () => {
    setRefreshing(true);
    setTimeout(() => {
      try {
        axios({
          url: `${API}/posts/list`,
          method: "GET",
        }).then((response) => {
          if (response.status === 200) {
            setListJobs(response.data)
          }
        })
        //All Career
        axios({
          url: `${API}/careers/listCareersForApp`,
          method: "GET",
        }).then(async (response) => {
          if (response.status === 200) {
            const data = JSON.stringify(response.data)
            await AsyncStorage.setItem('listCareers', data);
            setListCareers(response.data);
          }
        })
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
            setFollowedProducts(response.data);
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
    }, 1000);
  };
  const search = () => {
    navigation.navigate('SearchScreen')
  }
  const getListSave = async () => {
    try {
      axios({
        url: `${API}/savePost/list1`,
        method: "POST",
        data: {
          id: user._id,
        }
      }).then(async (response) => {
        if (response.status === 200) {
          setFollowedProducts(response.data);
        }
      })
    } catch (error) {
      console.log("err", error);
    }
  }
  const handleSaveToggle = async (itemId) => {
    try {
      const savedata = {
        user_id: user._id,
        post_id: itemId,
      };
      const result = await axios.post(`${API}/savePost/add`, savedata);
      if (result.status === 200) {
        getListSave();
        Alert.alert('Lưu tin thành công !')
        console.log("Thành công");
      }
    } catch (error) {
      console.log('Err: ', error);
    }
  };
  const getCV = async (item) => {
    const data = {
      userId: user._id,
      career_id: item._id,
    };
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      const result = await axios.post(`${API}/cvs/myCVsByCareer`, { data });
      if (result.status === 200) {
        // setListJobs(result.data);
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  };

  const isFollowed = (productId) => {
    const savePostIDlist = followedProducts.map(item => item.post_id);
    return savePostIDlist.some(post_id => post_id === productId);
  };

  const FlatLista = () => {
    return (
      <FlatList
        data={listSuggestion}
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
  const renderItem = ({ item }) => {
    const formattedWageMin = item.wageMin.toLocaleString('vi-VN');
    const formattedWageMax = item.wageMax.toLocaleString('vi-VN');
    return (
      <TouchableOpacity style={{
        borderWidth: 0.5,
        borderColor: COLORS.grey,
        borderRadius: 20,
        marginBottom: 18,
        padding: 20,
      }}
        onPress={() => navigation.navigate('DetailsScreen', {
          postid: item._id,
          users_id: item.users_id,
          avatar: item.users_id.photo,
          address: item.address,
          business_name: item.businessName,
          gender: item.gender,
          image: item.image,
          quantity: item.quantity,
          title: item.title,
          career_id: item.career_id,
          payform_id: item.payForm_id,
          experience_id: item.experience_id,
          acedemic_id: item.academic_id,
          worktype_id: item.workType_id,
          describe: item.describe,
          age_min: item.ageMin,
          age_max: item.ageMax,
          wage_min: item.wageMin,
          wage_max: item.wageMax,
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
            <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: '400' }}>{item.title}</Text>
            <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '400', color: COLORS.grey }}>{item.address}</Text>
          </View>
          <TouchableOpacity onPress={() => handleSaveToggle(item._id)}>
            {isFollowed(item._id) ? (
              <MaterialIcons name="bookmark-remove" size={30} color={COLORS.blue} />
            ) : <MaterialIcons name="bookmark-add" size={30} color={COLORS.blue} />
            }
          </TouchableOpacity>
        </View>
        <View style={{ height: 1, width: '99%', backgroundColor: COLORS.grey, opacity: 0.4, marginTop: 15, marginBottom: 8 }} />
        <View style={{ width: '100%', paddingStart: '21%' }}>
          <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.grey, width: 200, marginBottom: 5 }}>{item.businessName}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}>{formattedWageMin}đ - {formattedWageMax}đ</Text>
            {
              item.payForm_id === '655de22b9a5b0ffa7ffd5132' ? (
                <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}> /giờ</Text>
              ) : (
                <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}> /tháng</Text>
              )
            }
          </View>
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
              item.workType_id._id == '653e66b38e88b23b41388e3c' ? (
                <Text style={{ fontSize: 10 }} >Parttime</Text>
              ) : (
                <Text style={{ fontSize: 10 }} >Fulltime</Text>
              )
            }
          </View>
        </View>

      </TouchableOpacity>

    )

  };

  const renderItemJob = ({ item }) => {
    const formattedWageMin = item.wageMin.toLocaleString('vi-VN');
    const formattedWageMax = item.wageMax.toLocaleString('vi-VN');
    return (
      <TouchableOpacity style={{
        borderWidth: 0.5,
        borderColor: COLORS.grey,
        borderRadius: 20,
        marginBottom: 18,
        padding: 20,
      }}
        onPress={() => navigation.navigate('DetailsScreen', {
          postid: item._id,
          users_id: item.users_id,
          avatar: item.users_id.photo,
          address: item.address,
          business_name: item.businessName,
          gender: item.gender,
          image: item.image,
          quantity: item.quantity,
          title: item.title,
          career_id: item.career_id,
          payform_id: item.payForm_id,
          experience_id: item.experience_id,
          acedemic_id: item.academic_id,
          worktype_id: item.workType_id,
          describe: item.describe,
          age_min: item.ageMin,
          age_max: item.ageMax,
          wage_min: item.wageMin,
          wage_max: item.wageMax,
          status_id: item.status_id,
          date: item.date,
          time: item.time,
        })}>
        <View style={{ flexDirection: 'row' }}>
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
            <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: '400' }}>{item.title}</Text>
            <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '400', color: COLORS.grey }}>{item.address}</Text>
          </View>
          <TouchableOpacity onPress={() => handleSaveToggle(item._id)}>
            {isFollowed(item._id) ? (
              <Icon name="bookmark-minus" size={30} color={COLORS.blue} />
            ) : <Icon name="bookmark-plus" size={30} color={COLORS.blue} />
            }
          </TouchableOpacity>
        </View>
        <View style={{ height: 1, width: '99%', backgroundColor: COLORS.grey, opacity: 0.4, marginTop: 15, marginBottom: 8 }} />
        <View style={{ width: '100%', paddingStart: '21%' }}>
          <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.grey, width: 200, marginBottom: 5 }}>{item.businessName}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}>{formattedWageMin}đ - {formattedWageMax}đ</Text>
            {
              item.payForm_id === '655de22b9a5b0ffa7ffd5132' ? (
                <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}> /giờ</Text>
              ) : (
                <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}> /tháng</Text>
              )
            }
          </View>
          <View style={{
            width: 80,
            height: 25,
            borderWidth: 0.5,
            borderColor: COLORS.grey,
            borderRadius: 7,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {
              item.workType_id._id == '653e66b38e88b23b41388e3c' ? (
                <Text style={{ fontSize: 10 }} >Bán thời gian</Text>
              ) : (
                <Text style={{ fontSize: 10 }} >Toàn thời gian</Text>
              )
            }
          </View>
        </View>

      </TouchableOpacity>
    )
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
            source={{ uri: user.photo }}
            style={{ width: 46, height: 46 }}
            imageStyle={{ borderRadius: 46 }} />
          <View style={{ flex: 1, height: 46 }}>
            <Text style={{ color: '#7D7A7A', fontSize: 16 }} numberOfLines={1}>
              Xin chào 👋
            </Text>
            <Text style={{ color: COLORS.black, fontSize: 20, fontWeight: "600" }} numberOfLines={1}>
              {user.displayName}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 46,
              aspectRatio: 1,
              borderRadius: 52,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: COLORS.grey,
            }}
            onPress={() => navigation.navigate('Notifications')}>
            <IconWithBadge iconName="bell" badgeText="2" />
          </TouchableOpacity>
        </View>
        {/* Search */}
        <Pressable
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}
          style={{
            flexDirection: 'row',
            height: 50,
            borderRadius: 15,
            alignItems: 'center',
            paddingHorizontal: 18,
            backgroundColor: COLORS.lightGrey,
            borderWidth: 1,
            borderColor: COLORS.white
          }}>
          <Feather name='search' size={24} color={COLORS.grey} />
          <Text style={{ flex: 1, fontSize: 16, color: COLORS.grey, paddingHorizontal: 10, }} >
            Tìm kiếm . . .
          </Text>
          <FontAwesome6 name='sliders' size={20} color={COLORS.primary} />
        </Pressable>
      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 24 }}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={fetchData}
            colors={['#0000ff']} // Adjust the colors of the loading indicator
          />}>
          <View style={{ height: 150, backgroundColor: '#6295FF', borderRadius: 30 }}>
          </View>
          <View style={{ width: '100%', alignItems: 'center', marginBottom: 15, marginTop: 15 }}>
            <View style={{ width: '100%', marginBottom: 10 }}>
              <Text style={{ fontSize: 20, fontStyle: 'normal', color: COLORS.black, fontWeight: 'bold' }}>Công việc đề xuất</Text>
            </View>
            <FlatLista />
          </View>
          {/* All post */}
          <View style={{ width: '100%', marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontStyle: 'normal', color: COLORS.black, fontWeight: 'bold' }}>Công việc mới</Text>
            <TouchableOpacity style={{ marginStart: '49%' }}
              onPress={() => { }}>
              <Text style={{ fontSize: 18, color: COLORS.blue, fontWeight: 'bold' }}>Tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={listCareers}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
            }}
            renderItem={({ item, index }) => {
              const isSelected = categoryIndex === index;
              return (
                <TouchableOpacity
                  onPress={async () => {
                    setCategoryIndex(index);
                    await getCV(item);
                  }}
                  style={{
                    backgroundColor: isSelected ? COLORS.primary : COLORS.card,
                    borderWidth: 1,
                    borderColor: isSelected ? COLORS.white : COLORS.primary,
                    borderRadius: 100,
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                  }}>
                  <Text
                    style={{
                      color: isSelected ? COLORS.white : COLORS.primary,
                      fontSize: 14,
                      fontWeight: "600",
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )
            }}
          />
          <View style={{ width: '100%', paddingBottom: '50%', marginTop: 30 }}>
            <FlatListb />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;