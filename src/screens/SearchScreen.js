/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable comma-dangle */
/* eslint-disable no-shadow */
/* eslint-disable jsx-quotes */
/* eslint-disable eqeqeq */
/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-dupe-keys */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Pressable, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../assets/const/colors';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//lib
import Modal from "react-native-modal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SalaryRangeSelector from '../components/SalaryRangeSelector';
import { Dropdown } from 'react-native-element-dropdown';
import Collapsible from 'react-native-collapsible';

//
import CheckBox from '../components/CheckBox';
import CheckBoxCircle from '../components/CheckBoxCircle';

import axios from 'axios';
import { API } from '../../Sever/sever';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../components/UserConText';

const URL_IMG = "https://s3-alpha-sig.figma.com/img/acc1/c7a7/e9c43527e435b8c79bc8126d3d053264?Expires=1700438400&Signature=YkRmo~i-p6AZ1AulSOjpW4wA3UdrSHH2zV8WQihLw5uEordi8QWRvjnTz8mWYDq4ZkRCCVDBz1xuFXGQtgMqAStOpOvBGzkzNvHMeK4xw6AsufXB2uI2IIfmL2LgzBHgwk2l6IM3Rxb-4I9wdC8aSg1r9x9KwN~e31NOH19C3w1~A9jSJHDWJk9ECpnIqIrYRwzIfBR6nDOWxXZqjwn-Y8rg94RJb1UZYGQhSe9~MYAq1LzHKO0imJe1lpNv6dYv~amXSnfuuZW2awviacARGnYIjO~rDGmP339lgP9Df71ZKGUxsgIQpK26gCH0IoaFY1B9riTOaj2ENioGaqJurg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";

const data = [
  { label: 'Tất cả', value: '1' },
  { label: 'Thành phố Thủ Đức', value: '2' },
  { label: 'Quận 1', value: '1' },
  { label: 'Quận 2', value: '2' },
  { label: 'Quận 3', value: '3' },
  { label: 'Quận 4', value: '4' },
  { label: 'Quận 5', value: '5' },
  { label: 'Quận 6', value: '6' },
  { label: 'Quận 7', value: '7' },
  { label: 'Quận 8', value: '8' },
  { label: 'Quận 9', value: '9' },
  { label: 'Quận 10', value: '10' },
  { label: 'Quận 11', value: '11' },
  { label: 'Quận 12', value: '12' },
  { label: 'Quận Bình Tân', value: '13' },
  { label: 'Quận Bình Thạnh', value: '14' },
  { label: 'Quận Gò Vấp', value: '15' },
  { label: 'Quận Phú Nhuận', value: '16' },
  { label: 'Quận Tân Bình', value: '17' },
  { label: 'Quận Tân Phú', value: '18' },
  { label: 'Quận Bình Chánh', value: '19' },
  { label: 'Quận Cần Giờ', value: '20' },
  { label: 'Quận Củ Chi', value: '21' },
  { label: 'Quận Hóc Môn', value: '22' },
  { label: 'Quận Nhà Bè', value: '23' },
];

const MAX_PRICE = 50;

const SearchScreen = ({ navigation }) => {

  useEffect(() => {
    getData();
    getListSave();
  }, []);


  const { user } = useContext(UserContext);
  const [listJobs, setListJobs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [SaveJobs, setSaveJobs] = useState(false);
  const [followedProducts, setFollowedProducts] = useState([]);
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
  const isFollowed = (productId) => {
    const savePostIDlist = followedProducts.map(item => item.post_id);
    return savePostIDlist.some(post_id => post_id === productId);
  };

  const [list, setList] = useState([]);
  const [isFocusedSearch, setIsFocusedSearch] = useState(false);
  const [isSave, setSave] = useState(false);

  const [isSelectCareers, setIsSelectCareers] = useState(true);
  const [careers, setCareers] = useState(true);
  const toggleSelectCareers = () => {
    setIsSelectCareers(!isSelectCareers);
    setCareers(!careers);
  }

  const [isSelectWorkTypes, setIsSelectWorkTypes] = useState(true);
  const [workTypes, setWorkTypes] = useState(true);
  const toggleSelectWorkTypes = () => {
    setIsSelectWorkTypes(!isSelectWorkTypes);
    setWorkTypes(!workTypes);
  }
  const [isSelectPayForms, setIsSelectPayForms] = useState(true);
  const [payForms, setPayForms] = useState(true);
  const toggleSelectPayForms = () => {
    setIsSelectPayForms(!isSelectPayForms);
    setPayForms(!payForms);
  }
  const [isSelectAcademic, setIsSelectAcademic] = useState(true);
  const [academic, setAcademics] = useState(true);
  const toggleSelectAcademics = () => {
    setIsSelectAcademic(!isSelectAcademic);
    setAcademics(!academic);
  }
  const [isSelectExperiences, setIsSelectExperiences] = useState(true);
  const [experiences, setExperiences] = useState(true);
  const toggleSelectExperiences = () => {
    setIsSelectExperiences(!isSelectExperiences);
    setExperiences(!experiences);
  }
  const [isSelectGenders, setIsSelectGenders] = useState(true);
  const [genders, setGenders] = useState(true);
  const toggleSelectGenders = () => {
    setIsSelectGenders(!isSelectGenders);
    setGenders(!genders);
  }
  const [isSelect1, setIsSelect1] = useState(true);
  const [collapsed1, setCollapsed1] = useState(true);
  const toggleSelect1 = () => {
    setIsSelect1(!isSelect1);
    setCollapsed1(!collapsed1);
  }

  const [startPrice, setStartPrice] = useState(15);
  const [endPrice, setEndPrice] = useState(35);

  const [isModalVisibleSave, setModalVisibleSave] = useState(false);
  const [isModalVisibleFilter, setModalVisibleFiler] = useState(false);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusP, setIsFocusP] = useState(false);

  const [listSalaryUnit, setListSalaryUnit] = ([]);
  const [listCareers, setListCareers] = useState([]);
  const [listWorkTypes, setListWorkTypes] = useState([]);
  const [listPayForm, setListPayForm] = useState([]);
  const [listAcademics, setListAcademics] = useState([]);
  const [listExperiences, setListExperiences] = useState([]);
  const [listGenders, setListGenders] = useState([]);

  const [filter, setFilter] = React.useState({
    address: '',
    gender_id: '',
    career_id: '',
    workType_id: '',
    payForm_id: '655de22b9a5b0ffa7ffd5132',
    wageMin: startPrice,
    wageMax: endPrice,
    academic_id: '',
    experience_id: '',
  });

  const getData = async () => {

    const careers = await AsyncStorage.getItem('listCareers');
    setListCareers(JSON.parse(careers));

    const workTypes = await AsyncStorage.getItem('listWorkTypes');
    setListWorkTypes(JSON.parse(workTypes));

    const payForms = await AsyncStorage.getItem('listPayForms');
    setListPayForm(JSON.parse(payForms));

    const experiences = await AsyncStorage.getItem('listExperiences');
    setListExperiences(JSON.parse(experiences));

    const academics = await AsyncStorage.getItem('listAcademics');
    setListAcademics(JSON.parse(academics));

    const genders = await AsyncStorage.getItem('listGenders');
    setListGenders(JSON.parse(genders));
  };

  const toggleModalSave = () => {
    setModalVisibleSave(!isModalVisibleSave);
  };

  const toggleModalFilter = () => {
    setModalVisibleFiler(!isModalVisibleFilter);
    setCareers(true);
    setAcademics(true);
    setExperiences(true);
    setPayForms(true);
    setGenders(true);
    setCollapsed1(true);
    setIsSelect1(true);
    setIsSelectPayForms(true);
    setIsSelectExperiences(true);
    setIsSelectAcademic(true);
    setIsSelectCareers(true);
    setIsSelectGenders(true);
  };
  const toggleModalclose = (item) => {
    setModalVisibleFiler(!isModalVisibleFilter);
  };
  async function search(value) {
    try {
      const result = await axios.post(`${API}/posts/searchByKeyForApp`, { key: value });
      if (result.status === 200) {
        //
        setList(result.data);
        let data = result.data;
        if (data !== null) {
          // setForm(true)
        }
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  }
  async function handleFilter() {
    try {
      const result = await axios.post(`${API}/posts/filterForApp`, { filter });
      if (result.status === 200) {
        setList(result.data);
        toggleModalclose()
        let data = result.data;
        if (data !== null) {
          // setForm(true)
        }
      }
    } catch (error) {
      console.log("Err : ", error);
    }
  }
  const FlatListb = () => {
    return (
      <FlatList
        data={list}
        keyExtractor={(item) => item._id}
        renderItem={renderItemJob}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
            <ImageBackground
              source={require('../assets/images/5928293_2953962.jpg')}
              style={{ width: "100%", height: 430, }}
            />
            <Text style={{ fontSize: 22, color: '#000000', fontWeight: '700' }}>Empty</Text>
            <Text style={{ fontSize: 16, marginTop: 7, textAlign: 'center' }}>Sorry, the keyword you entered cannot be found, please check again or search with another keyword.</Text>
          </View>
        )}
      />
    );

  }
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
          <Text style={{ fontSize: 18, fontWeight: '400' }}>{item.title}</Text>
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
      <View style={{ width: '100%', paddingStart: '22%' }}>
        <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.grey, width: 200, marginBottom: 5 }}>{item.businessName}</Text>
        <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}>{item.wageMin} - {item.wageMax}đ/h</Text>
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
  );
  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 18, gap: 16, backgroundColor: 'white' }}>
      {/* Search */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 18,
          alignItems: 'center',
          gap: 12,
        }}>
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Ionicons name='chevron-back-outline' size={24} color={COLORS.grey} />
        </TouchableOpacity>

        {/* Search */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 50,
            borderRadius: 15,
            alignItems: 'center',
            paddingHorizontal: 18,
            backgroundColor: "#F5F5F5",
            backgroundColor: !isFocusedSearch ? COLORS.lightGrey : '#E9F0FF',
            borderWidth: 1,
            borderColor: !isFocusedSearch ? COLORS.white : COLORS.primary
          }}>
          <Feather name='search' size={24} color={!isFocusedSearch ? COLORS.grey : COLORS.primary} />
          <TextInput
            placeholder="Search . . ."
            onChangeText={value => {
              search(value)
            }}
            onFocus={() => { setIsFocusedSearch(!isFocusedSearch) }}
            onBlur={() => { setIsFocusedSearch(!isFocusedSearch) }}
            style={{ flex: 1, fontSize: 16, color: COLORS.black, paddingHorizontal: 10, }} />
          <TouchableOpacity onPress={() => {
            toggleModalFilter()
          }}>
            <FontAwesome6 name='sliders' size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Found Nav */}
      <View style={styles.foundNav}>
        <View style={{ flex: 1 }}>
          <Text style={styles.textFound}>
            {list.length} Found
          </Text>
        </View>
        <TouchableOpacity onPress={() => {

        }}>
          <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Show Search */}
      <View style={{ alignItems: 'center', flex: 1 }}>
        <FlatListb />
      </View>

      {/* Modal Save job */}
      <Modal isVisible={isModalVisibleSave} style={{ justifyContent: 'flex-end', margin: 0 }}>
        <View style={{ backgroundColor: 'white', padding: 18, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 25, borderTopLeftRadius: 25 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.black }}>Remove from Saved ?</Text>

          <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, marginVertical: 10, width: "100%" }} />

          <View style={{ paddingVertical: 18, width: "100%" }}>
            <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
              <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
                <Image source={{ uri: URL_IMG }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} numberOfLines={1}>
                    UI/UX Designer
                  </Text>
                  <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 4 }} numberOfLines={1}>
                    John Sena
                  </Text>
                </View>
                <TouchableOpacity>
                  <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
                </TouchableOpacity>
              </View>

              <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, }} />

              <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 12 }}>
                <View style={{ paddingStart: 60 }}>
                  <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} >
                    UI/UX Designer
                  </Text>
                  <Text style={{ fontSize: 16, color: COLORS.primary, paddingVertical: 4 }} >
                    $1000 - 2000/month
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
                    <Text style={{ fontSize: 10 }}>Partime</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            <TouchableOpacity
              onPress={toggleModalSave}
              style={{
                backgroundColor: COLORS.blue,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 64,
                position: "relative",
                width: 160,
                paddingVertical: 15,
                marginEnd: 15
              }}>
              <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: "600", }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 64,
                position: "relative",
                width: 160,
                paddingVertical: 15
              }}>
              <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600", }}>Yes, Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Filter */}
      <Modal isVisible={isModalVisibleFilter}
        style={{
          margin: 0,
        }}>
        <GestureHandlerRootView style={{ flex: 1, }}>
          <SafeAreaView style={{ backgroundColor: 'white', padding: 18, height: "100%", paddingBottom: 60 }}>

            {/* Tilter */}
            <View style={{ flexDirection: 'row', height: 40 }}>
              <Text style={{ paddingStart: 10, fontSize: 18, fontWeight: '700', color: COLORS.black, flex: 1 }}>Tùy chọn bộ lọc</Text>
              <TouchableOpacity style={{ marginEnd: 10 }} onPress={toggleModalclose}>
                <AntDesign name='close' size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            {/* Filter Options */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ alignItems: 'center' }}>
                {/* Location & Salary */}
                <Pressable style={{ paddingVertical: 18, width: "100%" }} onPress={toggleSelect1}>
                  <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.grey }}>
                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 15 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", }} numberOfLines={1}>
                          Địa chỉ & Mức lương
                        </Text>
                      </View>
                      <Feather name={!isSelect1 ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.primary} />
                    </View>
                    <Collapsible collapsed={collapsed1}>
                      <View style={{ borderTopWidth: 1, borderColor: COLORS.grey }} />
                      <View style={{ gap: 8, paddingVertical: 12 }}>
                        <Dropdown
                          style={[styles.dropdown, isFocus && { borderColor: COLORS.darkBlue }]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={data}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder={!isFocus ? 'Vị trí (TP HCM)' : '...'}
                          searchPlaceholder="Search..."
                          value={value}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                            setFilter({ ...filter, address: item.label })
                          }}
                        />

                        {/* Range Salary */}
                        <SalaryRangeSelector
                          minPrice={0}
                          maxPrice={MAX_PRICE}
                          startPrice={startPrice}
                          endPrice={endPrice}
                          onStartPriceChange={setStartPrice}
                          onEndPriceChange={setEndPrice}
                          salaryUnit={filter.payForm_id}
                        />

                        <Dropdown
                          style={[styles.dropdown, isFocusP && { borderColor: COLORS.darkBlue }]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          iconStyle={styles.iconStyle}
                          data={listPayForm}
                          maxHeight={300}
                          labelField="title"
                          valueField="_id"
                          placeholder={!isFocusP ? 'Hình thức trả lương' : '...'}
                          value={filter.payForm_id}
                          onFocus={() => setIsFocusP(true)}
                          onBlur={() => setIsFocusP(false)}
                          onChange={item => {
                            setIsFocusP(false);
                            setFilter({ ...filter, payForm_id: item._id })
                          }}
                        />
                      </View>
                    </Collapsible>
                  </View>
                </Pressable>

                {/* Career Type */}
                <Pressable style={{ paddingVertical: 18, width: "100%" }} onPress={toggleSelectCareers}>
                  <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.grey }}>
                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 15 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", fontFamily: 'Inter-VariableFont_slnt,wght' }} numberOfLines={1}>
                          Ngành nghề
                        </Text>
                      </View>
                      <Feather name={!isSelectCareers ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.primary} />
                    </View>
                    <Collapsible collapsed={careers}>
                      <View style={{ borderTopWidth: 1, borderColor: COLORS.grey }} />
                      <View style={{ gap: 8, paddingVertical: 12 }}>
                        <CheckBox options={listCareers} multiple={true} onchange={op => setFilter({ ...filter, career_id: op })} />
                      </View>
                    </Collapsible>
                  </View>
                </Pressable>

                {/* Work Type */}
                <Pressable style={{ paddingVertical: 18, width: "100%" }} onPress={toggleSelectWorkTypes}>
                  <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.grey }}>
                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 15 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", fontFamily: 'Inter-VariableFont_slnt,wght' }} numberOfLines={1}>
                          Loại công việc
                        </Text>
                      </View>
                      <Feather name={!isSelectWorkTypes ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.primary} />
                    </View>
                    <Collapsible collapsed={workTypes}>
                      <View style={{ borderTopWidth: 1, borderColor: COLORS.grey }} />
                      <View style={{ gap: 8, paddingVertical: 12 }}>
                        <CheckBoxCircle options={listWorkTypes} multiple={false} onchange={op => setFilter({ ...filter, workType_id: op })} />
                      </View>
                    </Collapsible>
                  </View>
                </Pressable>

                {/* Gender Type */}
                <Pressable style={{ paddingVertical: 18, width: "100%" }} onPress={toggleSelectGenders}>
                  <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.grey }}>
                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 15 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", fontFamily: 'Inter-VariableFont_slnt,wght' }} numberOfLines={1}>
                          Giới tính
                        </Text>
                      </View>
                      <Feather name={!isSelectGenders ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.primary} />
                    </View>
                    <Collapsible collapsed={genders}>
                      <View style={{ borderTopWidth: 1, borderColor: COLORS.grey }} />
                      <View style={{ gap: 8, paddingVertical: 12 }}>
                        <CheckBoxCircle options={listGenders} multiple={false} onchange={op => setFilter({ ...filter, gender_id: op })} />
                      </View>
                    </Collapsible>
                  </View>
                </Pressable>

                {/* Education */}
                <Pressable style={{ paddingVertical: 18, width: "100%" }} onPress={toggleSelectAcademics}>
                  <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.grey }}>
                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 15 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", fontFamily: 'Inter-VariableFont_slnt,wght' }} numberOfLines={1}>
                          Trình độ học vấn
                        </Text>
                      </View>
                      <Feather name={!isSelectAcademic ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.primary} />
                    </View>
                    <Collapsible collapsed={academic}>
                      <View style={{ borderTopWidth: 1, borderColor: COLORS.grey }} />
                      <View style={{ gap: 8, paddingVertical: 12 }}>
                        <CheckBoxCircle options={listAcademics} multiple={false} onchange={op => setFilter({ ...filter, academic_id: op })} />
                      </View>
                    </Collapsible>
                  </View>
                </Pressable>

                {/* Experence */}
                <Pressable style={{ paddingVertical: 18, width: "100%" }} onPress={toggleSelectExperiences}>
                  <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.grey }}>
                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 15 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", fontFamily: 'Inter-VariableFont_slnt,wght' }} numberOfLines={1}>
                          Kinh nghiệm làm việc
                        </Text>
                      </View>
                      <Feather name={!listExperiences ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.primary} />
                    </View>
                    <Collapsible collapsed={experiences}>
                      <View style={{ borderTopWidth: 1, borderColor: COLORS.grey }} />
                      <View style={{ gap: 8, paddingVertical: 12 }}>
                        <CheckBoxCircle options={listExperiences} multiple={false} onchange={op => setFilter({ ...filter, experience_id: op })} />
                      </View>
                    </Collapsible>
                  </View>
                </Pressable>

              </View>
            </ScrollView>

            {/* Footer */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              paddingHorizontal: 25,
              paddingVertical: 10,
              backgroundColor: 'white'
            }}>
              <TouchableOpacity
                onPress={toggleModalFilter}
                style={{
                  backgroundColor: '#E9F0FF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 64,
                  position: "relative",
                  width: 160,
                  paddingVertical: 15,

                }}>
                <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: "600" }}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleFilter()
                }}
                style={{
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 64,
                  position: "relative",
                  width: 160,
                  paddingVertical: 15,
                  shadowColor: COLORS.primary,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600" }}>Apply</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </GestureHandlerRootView>
      </Modal>
    </SafeAreaView>

  )
}

export default SearchScreen;

const styles = StyleSheet.create({
  foundNav: {
    flexDirection: 'row',
    paddingHorizontal: 20,

  },
  textFound: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  titleNoFound: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  show: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  imgNoFound: {
    height: 300,
    width: '100%',
  },
  textNoFound: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center'
  },
  dropdown: {
    height: 50,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 18,
    marginVertical: 13,
  },
  placeholderStyle: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 50,
    fontSize: 14,
    borderRadius: 6,
  },
  textWorkType: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    padding: 5
  },
});