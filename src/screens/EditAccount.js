/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
  FlatList,
  Image,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { TextInput } from 'react-native-paper';
import Input from '../components/Input';
import InputMutiple from '../components/InputMutiple';
import COLORS from '../assets/const/colors';

import Button from '../components/Button';
//icon
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import UserContext from '../components/UserConText';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { API } from '../../Sever/sever';

const EditAccount = ({ navigation }) => {
  const [value, setValue] = useState(null);
  const [gender, setGender] = useState([]);
  const [valueDate, setValueDate] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const { user } = useContext(UserContext);
  const [inputs, setInputs] = React.useState({
    id: user?._id,
    name: user?.displayName,
    birthDay: user?.birthDay,
    phone: '0' + user?.phone,
    gender: user?.gender,
    email: user?.email,
  });
  const [errors, setErrors] = React.useState({});

  useFocusEffect(
    React.useCallback(() => {
      getGender();
    }, [])
  );

  const getGender = async () => {
    const result = await axios.get(`${API}/gender/list`);
    setGender(result.data);
  }
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.name) {
      handleError('Vui lòng nhập họ tên', 'name');
      isValid = false;
    }

    if (!inputs.gender) {
      handleError('Vui lòng chọn giới tính', 'gender');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Vui lòng nhập số điện thoại', 'phone');
      isValid = false;
    }

    if (!inputs.birthDay) {
      handleError('Vui lòng chọn ngày sinh', 'birthDay');
      isValid = false;
    } else {
      const ngayHienTai = new Date();
      const fomat = new Date(date);
      const year = fomat.getFullYear();
      const month = String(fomat.getMonth() + 1).padStart(2, '0');
      const day = String(fomat.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      const ngaySinh = new Date(formattedDate);
      let soTuoi = ngayHienTai.getFullYear() - ngaySinh.getFullYear();
      if (
        ngayHienTai.getMonth() < ngaySinh.getMonth() ||
        (ngayHienTai.getMonth() === ngaySinh.getMonth() &&
          ngayHienTai.getDate() < ngaySinh.getDate())
      ) {
        soTuoi = soTuoi - 1;
      }
      if (soTuoi < 15) {
        handleError('Số tuổi phải đủ 15 tính từ ngày sinh', 'birthDay');
        isValid = false;
      }
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
      handleError('Vui lòng giới thiệu bản thân', 'introduce');
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
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setValueDate(formattedDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView>
        <View
          style={{
            backgroundColor: '#D9D9D9',
            height: 60,
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 16, marginStart: 20 }}>THÔNG TIN CÁ NHÂN</Text>
        </View>
        <View style={{ marginTop: 22, marginHorizontal: 24 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'name')}
            onFocus={() => handleError(null, 'name')}
            placeholder="Họ tên"
            value={inputs.name}
            error={errors.name}
          />
          <View style={{ width: '100%' }}>
            {/* <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: COLORS.darkBlue }, errors.gender && { borderColor: 'red' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={gender}
              maxHeight={300}
              labelField="title"
              valueField="_id"
              placeholder={!isFocus ? 'Giới tính' : '...'}
              value={inputs.gender}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setIsFocus(false);
                handleOnchange(item._id, 'gender')
                handleError(null, 'gender')
              }}
            />
            {errors.gender ? <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 11, fontFamily: 'BeVietnamPro-Medium', }}>{errors.gender}</Text> : null} */}
            <Input
              value={inputs?.birthDay}
              onFocus={() => handleError(null, 'birthDay')}
              placeholder="Năm sinh"
              onPress={showDatepicker}
            />
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>
        <View style={{ marginHorizontal: 24 }}>
          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            placeholder="Số điện thoại"
            value={inputs?.phone.toString()}
            error={errors.phone}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            placeholder="Địa chỉ email"
            value={inputs.email}
            error={errors.email}
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
            onPress={() => {
              ToastAndroid.show('Đang phát triển', ToastAndroid.SHORT);
            }}
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
              Chỉnh sửa
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditAccount;

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
