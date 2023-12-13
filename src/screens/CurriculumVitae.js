/* eslint-disable eol-last */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator, Pressable, ImageBackground, TextInput } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import COLORS from '../assets/const/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import axios from 'axios';
import { API } from '../../Sever/sever';
import UserContext from '../components/UserConText';
import { useFocusEffect } from '@react-navigation/native';

//icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';

const CurriculumVitae = ({ navigation }) => {
  // useEffect(() => {
  //     getCV();
  // }, []);
  const { user } = useContext(UserContext);
  const [cv, setCv] = useState([]);
  const [listCareers, setListCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [isSelectCareers, setIsSelectCareers] = React.useState({
    userId: user._id,
    career_id: '6554b9b322054e51b8327165',
  });
  const getFirst = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      const result = await axios.post(`${API}/apply//listApply`, { id: user._id });
      if (result.status === 200) {
        setCv(result.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  };
  const getCV = async (item) => {
    const data = {
      userId: user._id,
      career_id: item._id,
    };
    console.log(data);
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      console.log("Ra : ", data);
      const result = await axios.post(`${API}/cvs/myCVsByCareer`, { data });
      if (result.status === 200) {
        setCv(result.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  };
  const getListCareers = async () => {
    const data = await AsyncStorage.getItem('listCareers')
    setListCareers(JSON.parse(data));
  }

  useFocusEffect(
    React.useCallback(() => {
      getListCareers();
      getFirst()
    }, [])
  );

  const handleUpdateStage = async (item) => {
    if (item.status === 0) {
      const id = item._id
      const response = await axios.post(`${API}/apply/update`, { id: id });
      if (response.status === 200) {
        getFirst();
      }
    }
    navigation.navigate('StageCurriculumScreen', {item})
  };

  const renderCareers = ({ item }) => (
    <Pressable
      onPress={() => { handleUpdateStage(item) }}
      style={{ flexDirection: 'row', backgroundColor: 'rgba(51, 123, 255, 0.20)', height: 60, borderRadius: 10, alignItems: 'center', padding: 15, marginBottom: 10 }}>
      <AntDesign name="filetext1" size={26} color={COLORS.primary} />
      <View style={{ marginLeft: 15, flex: 1 }}>
        <Text numberOfLines={1} style={{ fontSize: 16, color: COLORS.black }}>{item.cv_id.title}</Text>
        <Text numberOfLines={1} style={{ fontSize: 16, color: COLORS.black }}>{item.cv_id.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('ProfileScreen')}>
        <AntDesign name="arrowleft" size={24} color={COLORS.black} />
        <Text style={{ fontSize: 22, fontWeight: '400', color: COLORS.black, marginLeft: 20 }}>Hồ sơ ứng tuyển</Text>
      </TouchableOpacity>
      {/* Search */}
      <View
        style={{
          marginTop: 20,
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
          placeholder="Tìm kiếm CV"
        />
        <TouchableOpacity
          style={{
            marginEnd: '3%',
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

      <View style={{ marginTop: 20, gap: 14 }}>
        {loading ? (
          <View style={{ justifyContent: 'center', marginTop: 200 }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <><FlatList
            data={cv}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCareers}
            ListEmptyComponent={() => (
              <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                <ImageBackground
                  source={require('../assets/images/5928293_2953962.jpg')}
                  style={{ width: 100, height: 100}}
                />
                <Text style={{ fontSize: 22, color: COLORS.black, fontWeight: '700' }}>Không có hồ sơ ứng tuyển</Text>
              </View>
            )}
          />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 18,
    backgroundColor: COLORS.white,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 45,
  },
  item: {
    backgroundColor: 'pink',
    fontSize: 16,
    width: '100%',
    height: 80,
  },
})
export default CurriculumVitae;