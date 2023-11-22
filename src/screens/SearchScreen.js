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
import React, { useState } from 'react';
import { FlatList, Image, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity, View,ImageBackground, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

//lib
import Modal from "react-native-modal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SalaryRangeSelector from '../components/SalaryRangeSelector';
import { Dropdown } from 'react-native-element-dropdown';
import Collapsible from 'react-native-collapsible';

//
import CheckBox from '../components/CheckBox';
import CheckBoxCircle from '../components/CheckBoxCircle';

const URL_IMG = "https://s3-alpha-sig.figma.com/img/acc1/c7a7/e9c43527e435b8c79bc8126d3d053264?Expires=1700438400&Signature=YkRmo~i-p6AZ1AulSOjpW4wA3UdrSHH2zV8WQihLw5uEordi8QWRvjnTz8mWYDq4ZkRCCVDBz1xuFXGQtgMqAStOpOvBGzkzNvHMeK4xw6AsufXB2uI2IIfmL2LgzBHgwk2l6IM3Rxb-4I9wdC8aSg1r9x9KwN~e31NOH19C3w1~A9jSJHDWJk9ECpnIqIrYRwzIfBR6nDOWxXZqjwn-Y8rg94RJb1UZYGQhSe9~MYAq1LzHKO0imJe1lpNv6dYv~amXSnfuuZW2awviacARGnYIjO~rDGmP339lgP9Df71ZKGUxsgIQpK26gCH0IoaFY1B9riTOaj2ENioGaqJurg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";

const MAX_PRICE = 500;

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const Jobdata = [
  { id: '1', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '2', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '3', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '4', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
  { id: '5', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
]

const SavedJobsScreen = ({ navigation }) => {

  const [password, setPassword] = useState('');
  const [isFocusedPass, setIsFocusedPass] = useState(false);

  const [isSave, setSave] = useState(false);
  const [isSelect1, setIsselect1] = useState(true);
  const [collapsed1, setCollapsed1] = useState(true);
  const toggleSelect1 = () => {
    setIsselect1(!isSelect1);
    setCollapsed1(!collapsed1);
  }
  const [isSelect2, setIsselect2] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const toggleSelect2 = () => {
    setIsselect2(!isSelect2);
    setCollapsed2(!collapsed2);
  }
  const [isSelect3, setIsselect3] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
  const toggleSelect3 = () => {
    setIsselect3(!isSelect3);
    setCollapsed3(!collapsed3);
  }
  const [isSelect4, setIsselect4] = useState(true);
  const [collapsed4, setCollapsed4] = useState(true);
  const toggleSelect4 = () => {
    setIsselect4(!isSelect4);
    setCollapsed4(!collapsed4);
  }
  const [isSelect5, setIsselect5] = useState(true);
  const [collapsed5, setCollapsed5] = useState(true);
  const toggleSelect5 = () => {
    setIsselect5(!isSelect5);
    setCollapsed5(!collapsed5);
  }
  const [isSelect, setIsselect] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const toggleSelect = () => {
    setIsselect(!isSelect);
    setCollapsed(!collapsed);
  }

  const [startPrice, setStartPrice] = useState(50);
  const [endPrice, setEndPrice] = useState(250);

  const [isModalVisibleSave, setModalVisibleSave] = useState(false);
  const [isModalVisibleFilter, setModalVisibleFiler] = useState(false);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const Checkdata = () => {
    if (Jobdata == "") {
      return false;
    } else {
      return true;
    }
  }

  const isFound = Checkdata();

  const optionsWorkType = [
    { id: '01', text: 'Part-time (Công việc bán thời gian)' },
    { id: '02', text: 'Full-time (Công việc toàn thời gian)' },
  ];
  const optionsSex = [
    { id: '01', text: 'Nam' },
    { id: '02', text: 'Nữ' },
    { id: '03', text: 'Không yêu cầu' },
  ];
  const optionsEducation = [
    { id: '01', text: 'Không yêu cầu' },
    { id: '02', text: 'Cấp 1' },
    { id: '03', text: 'Cấp 2' },
    { id: '04', text: 'Cấp 3' },
    { id: '05', text: 'Trung cấp - Nghề' },
    { id: '06', text: 'Cao đẳng' },
    { id: '07', text: 'Đại học' },
  ];
  const optionsExperience = [
    { id: '01', text: 'Không yêu cầu' },
    { id: '02', text: 'Dưới 1 năm' },
    { id: '03', text: '1 - 2 năm' },
    { id: '04', text: '3 - 5 năm' },
    { id: '05', text: '6 - 10 năm' },
    { id: '06', text: 'Trên 10 năm' },
  ];
  const optionsPaysForm = [
    { id: '01', text: 'Tấ cả' },
    { id: '02', text: 'Theo giờ' },
    { id: '03', text: 'Theo ngày' },
    { id: '04', text: 'Theo tháng' },
    { id: '05', text: 'Lương khoán' },
  ];

  const toggleModalSave = () => {
    setModalVisibleSave(!isModalVisibleSave);
  };

  const toggleModalFilter = () => {
    setModalVisibleFiler(!isModalVisibleFilter);
    setCollapsed(true);
    setCollapsed2(true);
    setCollapsed3(true);
    setCollapsed4(true);
    setCollapsed5(true);
    setCollapsed1(true);
    setIsselect1(true);
    setIsselect2(true);
    setIsselect3(true);
    setIsselect4(true);
    setIsselect5(true);
    setIsselect(true);
  };
  const toggleModalclose = (item) => {
    setModalVisibleFiler(!isModalVisibleFilter);
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

    <View style={{ padding: 18, }}>
      <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity, borderCurve: 'continuous' }}>
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
          <TouchableOpacity onPress={toggleModalSave}>
            <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, }} />

        <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 12 }}>
          <View style={{ paddingStart: 60 }}>
            <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} numberOfLines={1}>
              UI/UX Designer
            </Text>
            <Text style={{ fontSize: 16, color: COLORS.primary, paddingVertical: 4 }} numberOfLines={1}>
              ${item.wagemin} - {item.wagemax} /month
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

    <SafeAreaView style={{ paddingVertical: 18, gap: 16, backgroundColor: 'white', height: '100%' }}>

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
            borderColor: !isFocusedPass ? COLORS.white : COLORS.primary
          }}>
          <AntDesign name='search1' size={24} color={!isFocusedPass ? COLORS.grey : COLORS.primary} />
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
            0 Found
          </Text>
        </View>
        <TouchableOpacity onPress={() => {

        }}>
          <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Show Search */}

      {isFound ?
        //Found
        <View style={styles.found}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
            <FlatListb />
          </ScrollView>
        </View>
        :
        //No Found
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <ImageBackground
            source={require('../assets/images/5928293_2953962.jpg')}
            style={{ width: "108%", height: 430, marginEnd: '9%', marginBottom: -25 }}
          />
          <Text style={{ fontSize: 22, color: COLORS.black, fontWeight: '700' }}>Empty</Text>
          <Text style={{ fontSize: 16, marginTop: 7, marginBottom: '50%' }}>Sorry, the keyword you entered cannot be found, please check again or search with another keyword.</Text>
        </View>
      }

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
                  <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600",}} numberOfLines={1}>
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
      <Modal isVisible={isModalVisibleFilter} style={{ margin: 0 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView style={{ backgroundColor: 'white', padding: 18 }}>
            {/* Tilter */}

            <View style={{ flexDirection: 'row', alignItems: 'flex-start', height: 40 }}>
              <Text style={{ paddingStart: 10, fontSize: 18, fontWeight: '700', color: COLORS.black, flex: 1 }}>Filter Options</Text>
              <TouchableOpacity style={{ marginEnd: 10 }} onPress={toggleModalclose}>
                <AntDesign name='close' size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            {/* Filter Options */}
            <ScrollView style={{height: '100%'}} showsVerticalScrollIndicator={false}>
              <View style={{ alignItems: 'center'}}>
                {/* Location & Salary */}
                <Pressable style={{ paddingVertical: 18, width: "100%" }} onPress={toggleSelect1}>
                  <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 15 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", }} numberOfLines={1}>
                          Location & Salary
                        </Text>
                      </View>
                      <Feather name={!isSelect1 ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.grey1} />
                    </View>
                    <Collapsible collapsed={collapsed1}>
                      <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity }} />
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
                          placeholder={!isFocus ? 'Vị trí' : '...'}
                          searchPlaceholder="Search..."
                          value={value}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
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
                        />
                      </View>
                    </Collapsible>
                  </View>
                </Pressable>
                {/* Work Type */}
                <Pressable style={{ paddingVertical: 18, width: "100%" }} onPress={toggleSelect2}>
                  <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 15 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", fontFamily: 'Inter-VariableFont_slnt,wght' }} numberOfLines={1}>
                          Loại công việc
                        </Text>
                      </View>
                      <Feather name={!isSelect2 ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.grey1} />
                    </View>
                    <Collapsible collapsed={collapsed2}>
                      <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity }} />
                      <View style={{ gap: 8, paddingVertical: 12 }}>
                        <CheckBoxCircle options={optionsWorkType} multiple={false} onchange={op => console.log("Loại CV: " + op)} />
                      </View>
                    </Collapsible>
                  </View>
                </Pressable>
                {/* Sex Type */}
                <Pressable style={{ paddingVertical: 18, width: "100%" }} onPress={toggleSelect3}>
                  <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 15 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", fontFamily: 'Inter-VariableFont_slnt,wght' }} numberOfLines={1}>
                          Giới tính
                        </Text>
                      </View>
                      <Feather name={!isSelect3 ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.grey1} />
                    </View>
                    <Collapsible collapsed={collapsed3}>
                      <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity }} />
                      <View style={{ gap: 8, paddingVertical: 12 }}>
                        <CheckBoxCircle options={optionsSex} multiple={false} onchange={op => console.log("GT: " + op)} />
                      </View>
                    </Collapsible>
                  </View>
                </Pressable>
                {/* education */}
                <Pressable style={{ paddingVertical: 18, width: "100%" }} onPress={toggleSelect4}>
                  <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 15 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", fontFamily: 'Inter-VariableFont_slnt,wght' }} numberOfLines={1}>
                          Trình độ học vấn
                        </Text>
                      </View>
                      <Feather name={!isSelect4 ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.grey1} />
                    </View>
                    <Collapsible collapsed={collapsed4}>
                      <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity }} />
                      <View style={{ gap: 8, paddingVertical: 12 }}>
                        <CheckBox options={optionsEducation} multiple={false} onchange={op => console.log("TDHV: " + op)} />
                      </View>
                    </Collapsible>
                  </View>
                </Pressable>
                {/* experence */}
                <Pressable style={{ paddingVertical: 18, width: "100%" }} onPress={toggleSelect5}>
                  <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 15 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", fontFamily: 'Inter-VariableFont_slnt,wght' }} numberOfLines={1}>
                          Kinh nghiệm làm việc
                        </Text>
                      </View>
                      <Feather name={!isSelect5 ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.grey1} />
                    </View>
                    <Collapsible collapsed={collapsed5}>
                      <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity }} />
                      <View style={{ gap: 8, paddingVertical: 12 }}>
                        <CheckBox options={optionsExperience} multiple={false} onchange={op => console.log("KNLV: " + op)} />
                      </View>
                    </Collapsible>
                  </View>
                </Pressable>
                {/* Payform */}
                <Pressable style={{ paddingVertical: 18, width: "100%" }} onPress={toggleSelect}>
                  <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 15 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", fontFamily: 'Inter-VariableFont_slnt,wght' }} numberOfLines={1}>
                          Hình thức trả lương
                        </Text>
                      </View>
                      <Feather name={!isSelect ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.grey1} />
                    </View>
                    <Collapsible collapsed={collapsed}>
                      <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity }} />
                      <View style={{ gap: 8, paddingVertical: 12 }}>
                        <CheckBox options={optionsPaysForm} multiple={false} onchange={op => console.log("HTTL: " + op)} />
                      </View>
                    </Collapsible>
                  </View>
                </Pressable>
                {/* Button */}
                <View style={{
                  flexDirection: 'row',
                  marginTop: '40%',
                  marginBottom: 40,
                  shadowColor: 'red',
                }}>
                  <TouchableOpacity
                    onPress={toggleModalFilter}
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
                    <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: "600"}}>Reset</Text>
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
                    <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600"}}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </GestureHandlerRootView>
      </Modal>
    </SafeAreaView>

  )
}

export default SavedJobsScreen;

const styles = StyleSheet.create({
  foundNav: {
    flexDirection: 'row',
    paddingHorizontal: 20,

  },
  textFound: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
  },
  titleNoFound: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
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
    color: COLORS.black,
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
    color: COLORS.black,
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
    color: COLORS.black,
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