/* eslint-disable jsx-quotes */
/* eslint-disable react/self-closing-comp */
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
import React, {useState, useContext, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
  FlatList,
  Pressable,
  RefreshControl,
  StatusBar,
  ToastAndroid,
} from 'react-native';

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
import CircularProgress from 'react-native-circular-progress-indicator';
import {firebase} from '@react-native-firebase/auth';

import axios from 'axios';
import Loader from '../components/Loader';
import {API} from '../../Sever/sever';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = ({navigation}) => {
  const {user} = useContext(UserContext);
  const [listJobs, setListJobs] = useState([]);
  const [listData, setListData] = useState([]);
  const [listCareers, setListCareers] = useState([{title: 'Tất cả'}]);
  const [listSuggestion, setListSuggestion] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [SaveJobs, setSaveJobs] = useState(false);
  const [followedProducts, setFollowedProducts] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [check, setChek] = useState(false);
  const [postIndex, setPostIndex] = useState(0);
  const [listApplied, setListApplied] = useState([]);
  const [listAllAccept, setListAllAccpet] = useState([]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getAllData()
  //     getListNotification();
  //     getListApply();
  //     getListApply3();
  //   }, [])
  // );

  // const getToken = async () => {
  //   try {
  //     const User = auth().currentUser;
  //     if (User) {
  //       const token = await User.getIdToken();
  //       console.log('token: ', token);
  //       return token;
  //     }
  //   } catch (error) {
  //     console.log('error: ', error);
  //   }
  // };
  // getToken();
  

  useEffect(() => {
    getAllData();
    getListNotification();
    getListApply();
    getListApply3();
  }, []);

  const getAllData = async () => {
    try {
      const data = await AsyncStorage.getItem('user');
      const a = JSON.parse(data);
    
        console.log(a?.messagingToken);
      //list save
      axios({
        url: `${API}/savePost/list`,
        method: 'POST',
        data: {
          id: user._id,
        },
      }).then(async response => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data);
          await AsyncStorage.setItem('listMySavePost', data);
        }
      });
      //list save id
      axios({
        url: `${API}/savePost/list1`,
        method: 'POST',
        data: {
          id: user._id,
        },
      }).then(async response => {
        if (response.status === 200) {
          setFollowedProducts(response.data);
        }
      });
      //All Post allow
      axios({
        url: `${API}/posts/list`,
        method: 'GET',
      }).then(response => {
        if (response.status === 200) {
          setListJobs(response.data);
          setListData(response.data);
        }
      });
      //All my Suggestion
      axios({
        url: `${API}/posts/listSuggestionForApp`,
        method: 'POST',
        data: {
          data: user.favoriteCareers,
        },
      }).then(response => {
        if (response.status === 200) {
          setListSuggestion(response.data);
        }
      });
      //All Career
      const storedCareer = await AsyncStorage.getItem('listCareers');
      setPostIndex(0);
      if (!storedCareer) {
        axios({
          url: `${API}/careers/listCareersForApp`,
          method: 'GET',
        }).then(async response => {
          if (response.status === 200) {
            const data = JSON.stringify(response.data);
            await AsyncStorage.setItem('listCareers', data);
            setListCareers([...listCareers, ...response.data]);
          }
        });
      } else if (listCareers.length === 1) {
        axios({
          url: `${API}/careers/listCareersForApp`,
          method: 'GET',
        }).then(async response => {
          if (response.status === 200) {
            const data = JSON.stringify(response.data);
            await AsyncStorage.setItem('listCareers', data);
            setListCareers([...listCareers, ...response.data]);
          }
        });
      }
      //All WorkType
      axios({
        url: `${API}/workTypes/list`,
        method: 'GET',
      }).then(async response => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data);
          await AsyncStorage.setItem('listWorkTypes', data);
        }
      });
      //All PayForm
      axios({
        url: `${API}/payforms/list`,
        method: 'GET',
      }).then(async response => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data);
          await AsyncStorage.setItem('listPayForms', data);
        }
      });
      //All Academic
      axios({
        url: `${API}/acedemics/list`,
        method: 'GET',
      }).then(async response => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data);
          await AsyncStorage.setItem('listAcademics', data);
        }
      });
      //All Gender
      axios({
        url: `${API}/gender/list`,
        method: 'GET',
      }).then(async response => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data);
          await AsyncStorage.setItem('listGenders', data);
        }
      });
      //All Experience
      axios({
        url: `${API}/experiences/list`,
        method: 'GET',
      }).then(async response => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data);
          await AsyncStorage.setItem('listExperiences', data);
        }
      });
      //All my Notification
      const response = await axios.post(`${API}/notifications/list`, {
        receiver_id: user._id,
      });
      if (response.status === 200) {
        const data = JSON.stringify(response.data);
        await AsyncStorage.setItem('listNotifications', data);
      }
      //All CV
      //All my Post allow
      axios({
        url: `${API}/posts/listJobsIsDisplayForApp`,
        method: 'POST',
        data: {
          id: user._id,
        },
      }).then(async response => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data);
          await AsyncStorage.setItem('listJobsIsDisplay', data);
        }
      });
      //All my Post waiting
      axios({
        url: `${API}/posts/listJobsWaitingForApp`,
        method: 'POST',
        data: {
          id: user._id,
        },
      }).then(async response => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data);
          await AsyncStorage.setItem('listJobsWaiting', data);
        }
      });
      //All my Post denied
      axios({
        url: `${API}/posts/listJobsDeniedForApp`,
        method: 'POST',
        data: {
          id: user._id,
        },
      }).then(async response => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data);
          await AsyncStorage.setItem('listJobsDenied', data);
        }
      });
      //All my CV
      axios({
        url: `${API}/cvs/myCVs`,
        method: 'POST',
        data: {
          id: user._id,
        },
      }).then(async response => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data);
          await AsyncStorage.setItem('listCVs', data);
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  async function getListNotification() {
    try {
      const response = await axios.post(`${API}/notifications/listNoSeen`, {
        receiver_id: user._id,
      });
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
  const getPost = async item => {
    if (item.title === 'Tất cả') {
      setListJobs(listData);
    } else {
      try {
        const career_id = item?._id;
        const filteredJobs = listData.filter(
          job => job.career_id?._id === career_id,
        );
        setListJobs(filteredJobs);
      } catch (error) {
        console.log(error);
      }
    }
  };
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
  async function getListApply3() {
    try {
      const result = await axios.get(`${API}/apply//listAllAccept`);
      if (result.status === 200) {
        setListAllAccpet(result.data);
      }
    } catch (error) {
      console.log('Err : ', error);
    }
  }
  var number = 0;
  const list = () => {
    let a = (listAllAccept.length / listApplied.length) * 100;
    if (!isNaN(a) && isFinite(a)) {
      number = a;
    }
  };
  list();
  const fetchData = async () => {
    setRefreshing(true);
    setTimeout(() => {
      try {
        getListNotification();
        axios({
          url: `${API}/posts/list`,
          method: 'GET',
        }).then(response => {
          if (response.status === 200) {
            setListJobs(response.data);
            setListData(response.data);
          }
        });
        //All Career
        axios({
          url: `${API}/careers/listCareersForApp`,
          method: 'GET',
        }).then(async response => {
          if (response.status === 200) {
            const data = JSON.stringify(response.data);
            await AsyncStorage.setItem('listCareers', data);
            const newData = [{title: 'Tất cả'}, ...response.data];
            setListCareers(newData);
            setPostIndex(0);
          }
        });
        getListSave();
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
  const getListSave = async () => {
    try {
      axios({
        url: `${API}/savePost/list1`,
        method: 'POST',
        data: {
          id: user._id,
        },
      }).then(async response => {
        if (response.status === 200) {
          setFollowedProducts(response.data);
        }
      });
    } catch (error) {
      console.log('err', error);
    }
  };
  const handleSaveToggle = async itemId => {
    try {
      const savedata = {
        user_id: user._id,
        post_id: itemId,
      };
      const result = await axios.post(`${API}/savePost/add`, savedata);
      if (result.status === 200) {
        getListSave();
        ToastAndroid.show('Lưu thành công', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Err: ', error);
    }
  };
  const handleDelete = async post_id => {
    const deleteSave = {
      user_id: user._id,
      post_id: post_id,
    };
    const result = await axios.post(
      `${API}/savePost/deleteWithCondition`,
      deleteSave,
    );
    if (result.status === 200) {
      getListSave();
      ToastAndroid.show('Xóa thành công', ToastAndroid.SHORT);
    }
  };

  const isFollowed = productId => {
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
        contentContainerStyle={{
          gap: 20,
        }}
      />
    );
  };
  const FlatListb = () => {
    return (
      <FlatList
        data={listJobs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItemJob}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        ListEmptyComponent={() => (
          <View
            style={{alignItems: 'center', justifyContent: 'center', gap: 10}}>
            <ImageBackground
              source={require('../assets/images/5928293_2953962.jpg')}
              style={{width: '100%', height: 260}}
            />
            <Text
              style={{fontSize: 16, color: COLORS.primary, fontWeight: '500'}}>
              Không tìm thấy bài viết liên quan
            </Text>
          </View>
        )}
      />
    );
  };
  const renderItem = ({item}) => {
    const formattedWageMin = item.wageMin.toLocaleString('vi-VN');
    const formattedWageMax = item.wageMax.toLocaleString('vi-VN');
    const date = item.date.slice(0, 10);
    const ngayDang = new Date(date);
    const ngayHienTai = new Date();
    const soMiligiay = ngayHienTai.getTime() - ngayDang.getTime();
    const soNgay = Math.floor(soMiligiay / (1000 * 60 * 60 * 24));
    return (
      <TouchableOpacity
        style={{
          borderWidth: 0.5,
          borderColor: COLORS.grey,
          borderRadius: 20,
          marginBottom: 18,
          padding: 20,
          width: 350,
        }}
        onPress={() =>
          navigation.navigate('DetailsScreen', {
            postid: item._id,
            users_id: item.users_id,
            avatar: item.users_id.photo,
            address: item.address,
            business_name: item.businessName,
            gender: item?.gender,
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
            wage_min: formattedWageMin,
            wage_max: formattedWageMax,
            status_id: item.status_id,
            date: soNgay,
            time: item.time,
          })
        }>
        <View style={{flexDirection: 'row'}}>
          {item.image.map((imageUrl, index) => {
            if (index === 0) {
              return (
                <ImageBackground
                  key={index}
                  source={{uri: imageUrl}}
                  style={{width: 46, height: 46, marginBottom: 5}}
                  imageStyle={{borderRadius: 12}}
                />
              );
            }
          })}
          <View style={{height: '100%', marginStart: 20, flex: 1}}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 18,
                color: COLORS.black,
                fontFamily: 'BeVietnamPro-Medium',
                marginTop: -2,
              }}>
              {item.title}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 15,
                color: COLORS.black,
                opacity: 0.5,
                fontFamily: 'BeVietnamPro-Medium',
                marginTop: -2,
              }}>
              {item.address}
            </Text>
          </View>
          {isFollowed(item._id) ? (
            <TouchableOpacity onPress={() => handleDelete(item._id)}>
              <Icon name="bookmark-minus" size={35} color={COLORS.blue} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleSaveToggle(item._id)}>
              <Icon name="bookmark-plus" size={35} color={COLORS.blue} />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            height: 1,
            width: '99%',
            backgroundColor: COLORS.grey,
            opacity: 0.4,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        <View style={{width: '100%', paddingStart: '21%', gap: 10}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: COLORS.black,
              opacity: 0.6,
              fontFamily: 'BeVietnamPro-Medium',
              marginTop: -2,
            }}>
            {item.businessName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: COLORS.blue,
                fontSize: 14,
                fontFamily: 'BeVietnamPro-Medium',
                marginTop: -2,
              }}>
              {formattedWageMin}đ - {formattedWageMax}đ
            </Text>
            {item.payForm_id._id === '655de22b9a5b0ffa7ffd5132' ? (
              <Text
                style={{
                  color: COLORS.blue,
                  fontSize: 14,
                  fontFamily: 'BeVietnamPro-Medium',
                  marginTop: -2,
                }}>
                {' '}
                /giờ
              </Text>
            ) : (
              <Text
                style={{
                  color: COLORS.blue,
                  fontSize: 14,
                  fontFamily: 'BeVietnamPro-Medium',
                  marginTop: -2,
                }}>
                {' '}
                /tháng
              </Text>
            )}
          </View>
          <View
            style={{
              width: 85,
              height: 25,
              borderWidth: 1,
              borderColor: COLORS.grey,
              borderRadius: 7,
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {item.workType_id._id == '653e66b38e88b23b41388e3c' ? (
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'BeVietnamPro-Medium',
                  marginTop: -2,
                }}>
                Bán thời gian
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'BeVietnamPro-Medium',
                  marginTop: -2,
                }}>
                Toàn thời gian
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemJob = ({item}) => {
    const formattedWageMin = item.wageMin.toLocaleString('vi-VN');
    const formattedWageMax = item.wageMax.toLocaleString('vi-VN');
    const date = item.date.slice(0, 10);
    const ngayDang = new Date(date);
    const ngayHienTai = new Date();
    const soMiligiay = ngayHienTai.getTime() - ngayDang.getTime();
    const soNgay = Math.floor(soMiligiay / (1000 * 60 * 60 * 24));
    return (
      <TouchableOpacity
        style={{
          borderWidth: 0.5,
          borderColor: COLORS.grey,
          borderRadius: 20,
          marginBottom: 18,
          padding: 20,
        }}
        onPress={() =>
          navigation.navigate('DetailsScreen', {
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
            wage_min: formattedWageMin,
            wage_max: formattedWageMax,
            status_id: item.status_id,
            date: soNgay,
            time: item.time,
          })
        }>
        <View style={{flexDirection: 'row'}}>
          {item.image.map((imageUrl, index) => {
            if (index === 0) {
              return (
                <ImageBackground
                  key={index}
                  source={{uri: imageUrl}}
                  style={{width: 46, height: 46, marginBottom: 5}}
                  imageStyle={{borderRadius: 12}}
                />
              );
            }
          })}
          <View style={{height: '100%', marginStart: 20, flex: 1}}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 18,
                color: COLORS.black,
                fontFamily: 'BeVietnamPro-Medium',
                marginTop: -2,
              }}>
              {item.title}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 15,
                fontWeight: 'normal',
                color: COLORS.black,
                opacity: 0.5,
                fontFamily: 'BeVietnamPro-Medium',
                marginTop: -2,
              }}>
              {item.address}
            </Text>
          </View>
          {isFollowed(item._id) ? (
            <TouchableOpacity onPress={() => handleDelete(item._id)}>
              <Icon name="bookmark-minus" size={35} color={COLORS.blue} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleSaveToggle(item._id)}>
              <Icon name="bookmark-plus" size={35} color={COLORS.blue} />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            height: 1,
            width: '99%',
            backgroundColor: COLORS.grey,
            opacity: 0.4,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        <View style={{width: '100%', paddingStart: '21%', gap: 10}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              color: COLORS.black,
              opacity: 0.6,
              fontFamily: 'BeVietnamPro-Medium',
            }}>
            {item.businessName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: COLORS.blue,
                fontSize: 14,
                fontFamily: 'BeVietnamPro-Medium',
              }}>
              {formattedWageMin}đ - {formattedWageMax}đ
            </Text>
            {item.payForm_id._id === '655de22b9a5b0ffa7ffd5132' ? (
              <Text
                style={{
                  color: COLORS.blue,
                  fontSize: 14,
                  fontFamily: 'BeVietnamPro-Medium',
                }}>
                {' '}
                /giờ
              </Text>
            ) : (
              <Text
                style={{
                  color: COLORS.blue,
                  fontSize: 14,
                  fontFamily: 'BeVietnamPro-Medium',
                }}>
                {' '}
                /tháng
              </Text>
            )}
          </View>
          <View
            style={{
              width: 85,
              height: 25,
              borderWidth: 1,
              borderColor: COLORS.grey,
              borderRadius: 7,
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {item.workType_id._id == '653e66b38e88b23b41388e3c' ? (
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'BeVietnamPro-Medium',
                  marginTop: -2,
                }}>
                Bán thời gian
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'BeVietnamPro-Medium',
                  marginTop: -2,
                }}>
                Toàn thời gian
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const openNotification = () => {
    navigation.navigate('Notifications');
    setChek(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Header */}
      <View
        style={{
          paddingBottom: 5,
          paddingHorizontal: 18,
          paddingTop: 20,
          gap: 26,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <ImageBackground
            source={{uri: user.photo}}
            style={{width: 46, height: 46}}
            imageStyle={{borderRadius: 46}}
          />
          <View style={{flex: 1, height: 46, justifyContent: 'center'}}>
            <Text
              style={{
                color: '#7D7A7A',
                fontSize: 14,
                fontFamily: 'BeVietnamPro-Medium',
              }}
              numberOfLines={1}>
              Xin chào 👋
            </Text>
            {user.displayName == "" ? (
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 20,
                  fontFamily: 'BeVietnamPro-Bold',
                }}
                numberOfLines={1}>
                Người dùng
              </Text>
            ) : (
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 20,
                  fontFamily: 'BeVietnamPro-Bold',
                }}
                numberOfLines={1}>
                {user.displayName}
              </Text>
            )}
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
            onPress={() => openNotification()}>
            {/* <Feather name='bell' size={24} color={COLORS.black}/> */}
            {check ? (
              <IconWithBadge iconName="bell" badgeText="4" />
            ) : (
              <IconWithBadge iconName="bell" badgeText="" />
            )}
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
            borderColor: COLORS.white,
          }}>
          <Feather name="search" size={24} color={COLORS.grey} />
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              color: COLORS.grey,
              paddingHorizontal: 10,
              fontFamily: 'BeVietnamPro-Medium',
            }}>
            Tìm kiếm . . .
          </Text>
          <FontAwesome6 name="sliders" size={20} color={COLORS.primary} />
        </Pressable>
      </View>
      <View style={{paddingHorizontal: 20, paddingVertical: 24}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchData}
              colors={[COLORS.primary]} // Adjust the colors of the loading indicator
            />
          }>
          <View
            style={{
              height: 120,
              backgroundColor: '#6295FF',
              borderRadius: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{marginLeft: 30}}>
              <CircularProgress
                value={number}
                inActiveStrokeColor={COLORS.white}
                activeStrokeColor={'#FFC069'}
                progressValueColor={'#fff'}
                valueSuffix={'%'}
                radius={40}
                activeStrokeWidth={13}
                inActiveStrokeWidth={13}
                progressValueStyle={{
                  fontSize: 18,
                  fontFamily: 'BeVietnamPro-Medium',
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  marginLeft: 38,
                  color: COLORS.white,
                  fontSize: 21,
                  fontFamily: 'BeVietnamPro-Medium',
                }}>
                Thống kê việc làm
              </Text>
              <Text
                style={{
                  marginLeft: 38,
                  color: COLORS.white,
                  fontSize: 15,
                  marginTop: 2,
                  fontFamily: 'BeVietnamPro-Medium',
                }}>
                Tỉ lệ tìm được việc
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginBottom: 15,
              marginTop: 15,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontStyle: 'normal',
                color: COLORS.black,
                fontFamily: 'BeVietnamPro-Bold',
              }}>
              Công việc đề xuất
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={{
                  fontSize: 17,
                  color: COLORS.blue,
                  fontFamily: 'BeVietnamPro-Medium',
                }}>
                Tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <FlatLista />
          {/* All post */}
          <View
            style={{
              width: '100%',
              marginBottom: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontStyle: 'normal',
                color: COLORS.black,
                fontFamily: 'BeVietnamPro-Bold',
              }}>
              Công việc mới
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={{
                  fontSize: 17,
                  color: COLORS.blue,
                  fontWeight: '500',
                  fontFamily: 'BeVietnamPro-Medium',
                }}>
                Tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={listCareers}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
            }}
            renderItem={({item, index}) => {
              const isSelected = postIndex === index;
              return (
                <TouchableOpacity
                  onPress={async () => {
                    setPostIndex(index);
                    await getPost(item);
                  }}
                  style={{
                    backgroundColor: isSelected ? COLORS.primary : COLORS.card,
                    borderWidth: 1,
                    borderColor: isSelected ? COLORS.white : COLORS.primary,
                    borderRadius: 100,
                    paddingHorizontal: 24,
                    paddingBottom: 12,
                    paddingTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: isSelected ? COLORS.white : COLORS.primary,
                      fontSize: 14,
                      fontFamily: 'BeVietnamPro-Medium',
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <View style={{width: '100%', paddingBottom: '35%', marginTop: 30}}>
            <FlatListb />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
