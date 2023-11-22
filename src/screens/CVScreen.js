/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Keyboard, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, useWindowDimensions, FlatList, Image, StatusBar } from 'react-native';
import React, { useState } from 'react';
import {TextInput} from 'react-native-paper';
import Input from '../components/Input';
import InputMutiple from '../components/InputMutiple';
import COLORS from '../assets/const/colors';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

import Button from '../components/Button';
//icon
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';

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

const CVScreen = ({ navigation }) => {
  
  useFocusEffect(
    React.useCallback(() => {
      getListCareers();
    })
  )


  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [inputs, setInputs] = React.useState({
    id: '',
    title: '',
    subtitle: '',
    price: '',
    details: '',
  });
  const [errors, setErrors] = React.useState({});
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.name) {
      handleError('Vui lòng nhập họ tên', 'name');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Vui lòng nhập số điện thoại', 'phone');
      isValid = false;
    }

    if (!inputs.year) {
      handleError('Vui lòng nhập năm sinh', 'year');
      isValid = false;
    }

    if (!inputs.email) {
      handleError('Vui lòng nhập email', 'email');
      isValid = false;
    }

    if (!inputs.address) {
      handleError('Vui lòng nhập địa chỉ', 'address');
      isValid = false;
    }

    if (!inputs.experience) {
      handleError('Vui lòng nhập kinh nghiệm', 'experience');
      isValid = false;
    }

    if (!inputs.introduce) {
      handleError('Vui lòng nhập giới thiệu bản thân', 'introduce');
      isValid = false;
    }
    if (isValid) {
      console.log(' oce ');
    }
  };
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const [listCareers, setListCareers] = useState([]);



  const getListCareers = async () => { 
    axios({
      url: "http://192.168.9.49:3000/careers/list",
      method: "GET"
    }).then((res) => {
      setListCareers(res.data);
    })
    console.log(listCareers);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
          <View
            style={{
              backgroundColor: '#D9D9D9',
              height: 60,
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, marginStart: 20}}>
              THÔNG TIN BẮT BUỘC
            </Text>
          </View>
          <View style={{ marginVertical: 22, marginHorizontal: 24 }}>
            <Input
              onChangeText={text => handleOnchange(text, 'name')}
              onFocus={() => handleError(null, 'name')}
              placeholder="Họ tên"
              value=""
              error={errors.name}
            />
            <View style={{ width: '100%', flexDirection: 'row' }}>
              <View style={{ width: '45%', justifyContent: 'flex-start' }}>
                <Input
                  keyboardType="numeric"
                  onChangeText={text => handleOnchange(text, 'phone')}
                  onFocus={() => handleError(null, 'phone')}
                  placeholder="Số điện thoại"
                  // value={route.params?.subtitle}
                  error={errors.phone}
                />
              </View>
              <View style={{ width: '45%', marginStart: '9.5%' }}>
                <Input
                  keyboardType="numeric"
                  onChangeText={text => handleOnchange(text, 'year')}
                  onFocus={() => handleError(null, 'year')}
                  placeholder="Năm sinh"
                  // value={route.params?.subtitle}
                  error={errors.year}
                />
              </View>
            </View>
            <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: COLORS.darkBlue }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={listCareers}
            search
            maxHeight={300}
            labelField="c_title"
            valueField="_id"
            placeholder={!isFocus ? 'Ngành Nghề' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
          <Input
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              placeholder="Địa chỉ email"
              value=""
              error={errors.email}
            />
          </View>
          <View style={{ backgroundColor: '#D9D9D9', height: 60, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, marginStart: 25 }}>THÔNG TIN THÊM</Text>
          </View>
          <View style={{ marginVertical: 22, marginHorizontal: 24 }}>
            <Input
              onChangeText={text => handleOnchange(text, 'address')}
              onFocus={() => handleError(null, 'address')}
              placeholder="Địa chỉ hiện tại"
              value=""
              error={errors.address}
            />
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
            placeholder={!isFocus ? 'Trình độ học vấn' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
          <Input
              onChangeText={text => handleOnchange(text, 'experience')}
              onFocus={() => handleError(null, 'experience')}
              placeholder="Kinh nghiệm làm việc"
              value=""
              error={errors.experience}
            />
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
            placeholder={!isFocus ? 'Hình thức trả lương' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
          <InputMutiple
              onChangeText={text => handleOnchange(text, 'introduce')}
              onFocus={() => handleError(null, 'introduce')}
              placeholder={"Giới thiệu bản thân\nHãy nêu ra kinh nghiệm, sở trường và mong muốn của bạn liên quan đến công việc để ghi điểm hơn trong mắt nhà tuyển dụng"}
              // value={route.params?.subtitle}
              error={errors.introduce}
            />
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingVertical: 20,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={validate}
              style={{
                backgroundColor: COLORS.blue,
                padding: 5,
                width: '80%',
                height: 50,
                borderRadius: 30,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: COLORS.black,
                shadowOffset: {width: 10, height: 10},
                shadowOpacity: 1,
                shadowRadius: 3,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: COLORS.white,
                }}>
                Ứng tuyển
              </Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CVScreen;

const styles = StyleSheet.create({
  button: {
    width: 380,
    height: 48,
    backgroundColor: '#357AF9',
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  header: {
    height: 60,
    backgroundColor: '#357AF9',
  },
  textInput: {
    height: 48,
    backgroundColor: 'white',
    borderRadius: 6,
    borderColor: '#7D7A7A',
    borderWidth: 1,
    marginTop: 20,
    marginLeft: 24,
    marginRight: 26,
  },
  dropdown: {
    height: 50,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 18,
    marginBottom : 13,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey1,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLORS.darkBlue,
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
});
