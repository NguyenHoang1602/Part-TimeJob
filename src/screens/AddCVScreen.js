/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Keyboard, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, useWindowDimensions, FlatList, Image, StatusBar, Alert } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import Input from '../components/Input';
import InputMutiple from '../components/InputMutiple';
import COLORS from '../assets/const/colors';
import { Dropdown } from 'react-native-element-dropdown';
import UserContext from '../components/UserConText';
import axios from 'axios';
import { API } from '../../Sever/sever';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

const CVScreen = ({ route, navigation }) => {

  useEffect(() => {
    getListAcademic()
    getListCareers()
    getListExperience()
    getListPayForm()
    getListWorkType()
  }, []);
  const [loading, setLoading] = React.useState(false);
  const { user } = useContext(UserContext);
  const [listAcademic, setListAcademic] = useState([]);
  const [listCareers, setListCareers] = useState([]);
  const [listWorkType, setListWorkType] = useState([]);
  const [listPayForm, setListPayForm] = useState([]);
  const [listExperience, setListExperience] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [inputs, setInputs] = React.useState({
    user_id: user._id,
    title: '',
    name: user.displayName,
    phone: '',
    year: '',
    email: user.email,
    address: '',
    experience: '',
    introduce: '',
  });
  const getListCareers = async () => {
    const data = await AsyncStorage.getItem('listCareers')
    setListCareers(JSON.parse(data));
  }

  const getListWorkType = async () => {
    const data = await AsyncStorage.getItem('listWorkTypes');
    setListWorkType(JSON.parse(data));
  }

  const getListPayForm = async () => {
    const data = await AsyncStorage.getItem('listPayForms');
    setListPayForm(JSON.parse(data));
  }

  const getListAcademic = async () => {
    const data = await AsyncStorage.getItem('listAcademics');
    setListAcademic(JSON.parse(data));
  }

  const getListExperience = async () => {
    const data = await AsyncStorage.getItem('listExperiences');
    setListExperience(JSON.parse(data));
  }
  const [errors, setErrors] = React.useState({});


  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.title) {
      handleError('Vui lòng nhập tên CV', 'title');
      isValid = false;
    }

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
      handleUpNewCv();
      console.log(inputs);
    }
  };
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  const handleUpNewCv = async () => {
    setLoading(true);
    setTimeout(() => { 3000 });
    const response = await axios.post(`${API}/cvs/new`, inputs);
    if (response.status === 200) {
      setLoading(false);
      Alert.alert("Thành công");
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView>
        <View
          style={{
            backgroundColor: '#D9D9D9',
            height: 60,
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 16, marginStart: 20 }}>
            THÔNG TIN BẮT BUỘC
          </Text>
        </View>
        <View style={{ marginVertical: 22, marginHorizontal: 24 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'title')}
            onFocus={() => handleError(null, 'title')}
            placeholder="Tên CV"
            value={inputs.title}
            error={errors.title}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'name')}
            onFocus={() => handleError(null, 'name')}
            placeholder="Họ tên"
            value={user.displayName}
            error={errors.name}
          />
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={{ width: '45%', justifyContent: 'flex-start' }}>
              <Input
                keyboardType="numeric"
                onChangeText={text => handleOnchange(text, 'phone')}
                onFocus={() => handleError(null, 'phone')}
                placeholder="Số điện thoại"
                // value={user?.phone}
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
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            placeholder="Địa chỉ email"
            value={user?.email}
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
            value={inputs.address}
            error={errors.address}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: COLORS.darkBlue }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={listAcademic}
            labelField="a_title"
            valueField="_id"
            maxHeight={300}
            placeholder={!isFocus ? 'Trình độ học vấn' : '...'}
            value={listAcademic._id}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setIsFocus(false);
              handleOnchange(item._id, 'academic')
            }}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'experience')}
            onFocus={() => handleError(null, 'experience')}
            placeholder="Kinh nghiệm làm việc"
            value={inputs.experience}
            error={errors.experience}
          />
          <InputMutiple
            onChangeText={text => handleOnchange(text, 'introduce')}
            onFocus={() => handleError(null, 'introduce')}
            placeholder={"Giới thiệu bản thân\nHãy nêu ra kinh nghiệm, sở trường và mong muốn của bạn liên quan đến công việc để ghi điểm hơn trong mắt nhà tuyển dụng"}
            value={inputs.introduce}
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
              shadowOffset: { width: 10, height: 10 },
              shadowOpacity: 1,
              shadowRadius: 3,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: COLORS.white,
              }}>
              Lưu
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
    marginBottom: 13,
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
