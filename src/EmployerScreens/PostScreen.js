/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, Keyboard, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, useWindowDimensions, FlatList, Image, Alert } from 'react-native';

import Input from '../components/Input';
import InputMutiple from '../components/InputMutiple';
import COLORS from '../assets/const/colors';
import axios from 'axios';
import { API } from '../../Sever/sever';

import Button from '../components/Button';
//icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import BottomSheetContent from '../components/BottomSheetContent';
//picker
import ImagePicker from 'react-native-image-crop-picker';
//modal
import Modal from 'react-native-modal';
//slect drop-down
import { Dropdown } from 'react-native-element-dropdown';
import { useFocusEffect } from '@react-navigation/native';
import UserContext from '../components/UserConText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

const gender = [
  { label: 'Nam', value: 'Nam' },
  { label: 'Nữ', value: 'Nữ' },
  { label: 'Không yêu cầu', value: 'Không yêu cầu' },
];

const PostScreen = ({ navigation }) => {

  const { user } = useContext(UserContext);
  //drop-down
  const [loading, setLoading] = React.useState(false);

  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);
  const [isFocus4, setIsFocus4] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [listCareers, setListCareers] = useState([]);
  const [listWorkType, setListWorkType] = useState([]);
  const [listAcademic, setListAcademic] = useState([]);
  const [listExperience, setListExperience] = useState([]);
  const [inputs, setInputs] = React.useState({
    users_id: user._id,
    businessName: '',
    address: '',
    image: [],
    title: '',
    quantity: null,
    gender: '',
    career_id: '',
    workType_id: '',
    payForm_id: '',
    wageMin: null,
    wageMax: null,
    describe: '',
    ageMin: null,
    ageMax: null,
    academic_id: '',
    experience_id: '',
    status_id: '65423efa3f8e779b5ec14e51',
  });

  const getListCareers = async () => {
    const data = await AsyncStorage.getItem('listCareers')
    setListCareers(JSON.parse(data));
  }
  const getListWorkType = async () => {
    const data = await AsyncStorage.getItem('listWorkTypes');
    setListWorkType(JSON.parse(data));
  }

  const getListAcademic = async () => {
    const data = await AsyncStorage.getItem('listAcademics');
    setListAcademic(JSON.parse(data));
  }

  const getListExperience = async () => {
    const data = await AsyncStorage.getItem('listExperiences');
    setListExperience(JSON.parse(data));
  }

  // Validate
  const [errors, setErrors] = React.useState({});

  const validate = async () => {

    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.businessName) {
      handleError('Vui lòng nhập tên doanh nghiệp', 'businessName');
      isValid = false;
    }
    if (!inputs.address) {
      handleError('Vui lòng nhập địa chỉ', 'address');
      isValid = false;
    }
    if (!inputs.title) {
      handleError('Vui lòng nhập tiêu đề', 'title');
      isValid = false;
    }
    if (!inputs.quantity) {
      handleError('Vui lòng nhập số lượng', 'quantity');
      isValid = false;
    } else if (inputs.quantity <= 0) {
      handleError('Số lượng tuyển dụng phải lớn hơn 0', 'quantity');
      isValid = false;
    }
    if (!inputs.wageMin) {
      handleError('Vui lòng nhập lương', 'wageMin');
      isValid = false;
    } else if (inputs.wageMin < 15.000) {
      handleError('Lương tối thiểu phải lớn hơn hoặc bằng 15.000 đ', 'wageMin');
      isValid = false;
    }
    if (!inputs.wageMax) {
      handleError('Vui lòng nhập lương', 'wageMax');
      isValid = false;
    } else if (inputs.wageMax < inputs.wageMin) {
      handleError('Lương tối đa phải >= lương tối thiểu', 'wageMax');
      isValid = false;
    }
    if (!inputs.describe) {
      handleError('Vui lòng nhập mô tả', 'describe');
      isValid = false;
    }
    if (!inputs.ageMin) {
      handleError('Vui lòng nhập tuổi', 'ageMin');
      isValid = false;
    } else if (inputs.ageMin < 15) {
      handleError('Độ tuổi lao động tối thiểu phải đủ 15 tuổi', 'ageMin');
      isValid = false;
    }
    if (!inputs.ageMax) {
      handleError('Vui lòng nhập tuổi', 'ageMax');
      isValid = false;
    } else if (inputs.ageMax < inputs.ageMin || inputs.ageMax < 10) {
      handleError('Tuổi tối đa phải >= tuổi tối thiểu', 'ageMax');
      isValid = false;
    }
    else if (inputs.ageMax > 60) {
      handleError('Độ tuổi lao động tối đa phải nhỏ hơn hoặc bằng 60 tuổi', 'ageMax');
      isValid = false;
    }
    if (!inputs.image) {
      handleError('Vui lòng chọn ảnh', 'image');
      isValid = false;
    }
    if (!inputs.gender) {
      handleError('Vui lòng chọn giới tính', 'gender');
      isValid = false;
    }
    if (!inputs.career_id) {
      handleError('Vui lòng chọn loại ngành nghề', 'career_id');
      isValid = false;
    }
    if (!inputs.workType_id) {
      handleError('Vui lòng chọn loại công việc', 'workType_id');
      isValid = false;
    }
    if (!inputs.payForm_id) {
      handleError('Vui lòng chọn hình thức trả lương', 'payForm_id');
      isValid = false;
    }
    if (!inputs.academic_id) {
      handleError('Vui lòng chọn trình độ học vấn', 'academic_id');
      isValid = false;
    }
    if (!inputs.experience_id) {
      handleError('Vui lòng chọn mức độ kinh nghiệm', 'experience_id');
      isValid = false;
    }
    if (isValid) {
      uploadImages();
    }
  };
  console.log(inputs);
  const handleOnchange = (text, input) => {
    if (input === 'wageMin') {
      let formattedValue = text.replace(/\D/g, '');
      formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      setInputs(prevState => ({ ...prevState, [input]: formattedValue }));
    } else if (input === "wageMax") {
      let formattedValue = text.replace(/\D/g, '');
      formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      setInputs(prevState => ({ ...prevState, [input]: formattedValue }));
    } else {
      setInputs(prevState => ({ ...prevState, [input]: text }));
    }
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const handlePost = async () => {
    const result = await axios.post(`${API}/posts/postForApp`, inputs);
    if (result.status === 200) {
      setLoading(false);
      Alert.alert('Đăng tin thành công !', 'Đi tới trang quản lí tin?', [
        { text: 'Không' },
        { text: 'Có', onPress: () => navigation.navigate('Quản lý') },
      ],
        { cancelable: false });
    }
  }

  useEffect(() => {
    getListCareers()
    getListWorkType()
    getListAcademic()
    getListExperience()
    if (inputs.workType_id === "653e66b38e88b23b41388e3c") {
      setInputs(prevInputs => ({ ...prevInputs, payForm_id: "655de22b9a5b0ffa7ffd5132" }));
    } else if (inputs.workType_id === "6558634415be344ac80a3b40") {
      setInputs(prevInputs => ({ ...prevInputs, payForm_id: "355de22b9a5b0ffa7ffd5132" }));
    } else {
      setInputs(prevInputs => ({ ...prevInputs, payForm_id: "" }));
    }
  }, [inputs.workType_id]);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedImages([]);
      setInputs({
        users_id: user._id,
        businessName: '',
        address: '',
        image: [],
        title: '',
        quantity: '',
        gender: '',
        career_id: '',
        workType_id: '',
        payForm_id: '',
        wageMin: '',
        wageMax: '',
        describe: '',
        ageMin: '',
        ageMax: '',
        academic_id: '',
        experience_id: '',
        status_id: '65423efa3f8e779b5ec14e51',
      });
      setErrors([]);
    }, [])
  );
  const Checkdataimage = () => {
    if (selectedImages == "") {
      return false;
    } else {
      return true;
    }
  }
  const shouldShow = Checkdataimage();
  const openImagePicker = () => {
    setSelectedImages([]);
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((images) => {
        const newImages = images.map(image => ({
          uri: image.path,
          width: image.width,
          height: image.height,
        }));
        setSelectedImages(newImages);
        setBottomSheetVisible(!isBottomSheetVisible);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Upload image to Cloud
  const uploadImages = () => {
    setLoading(true)
    try {
      const CLOUD_NAME = "dxrv1gdit";
      const PRESET_NAME = "ParttimeJobs";
      const FOLDER_NAME = "Part-timeJobs";
      const api = 'https://api.cloudinary.com/v1_1/dxrv1gdit/image/upload';
      const formData = new FormData();

      formData.append("upload_preset", PRESET_NAME);
      formData.append("folder", FOLDER_NAME);
      selectedImages.forEach(async (image, index) => {
        formData.append("file", {
          uri: image.uri,
          type: 'image/jpeg',
          name: `image_${index + 1}.jpg`,
        });
        const response = await axios.post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        if (response.status === 200) {
          inputs.image.push(response.data.secure_url);
          if (inputs.image.length === selectedImages.length) {
            handlePost();
            setSelectedImages([]);
          }
        }
      })
    } catch (error) {
      console.log("Upload failed", error);
    }
  };
  // Pick Images
  const BottomSheetContent = ({ isVisible, onClose }) => {
    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </View>
        <View style={styles.panel}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.panelTitle}>Tải ảnh lên</Text>
            <Text style={styles.panelSubtitle}>Chọn hình ảnh nơi làm việc</Text>
          </View>
          <TouchableOpacity style={styles.panelButton} onPress={''}>
            <Text style={styles.panelButtonTitle}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={openImagePicker}>
            <Text style={styles.panelButtonTitle}>Chọn từ thư viện</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={onClose}>
            <Text style={styles.panelButtonTitle}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView>
        <View>
          <BottomSheetContent
            isVisible={isBottomSheetVisible}
            onClose={toggleBottomSheet}
          />
          <View style={{ backgroundColor: '#D9D9D9', height: 60, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, marginStart: 25, fontFamily: 'BeVietnamPro-Medium', marginTop: -4,  }}>THÔNG TIN NHÀ TUYỂN DỤNG</Text>
          </View>
          <View style={{ paddingTop: 22, marginHorizontal: 24 }}>
            <Input
              onChangeText={text => handleOnchange(text, 'businessName')}
              onFocus={() => handleError(null, 'businessName')}
              placeholder="Tên doanh nghiệp"
              value={inputs.businessName}
              error={errors.businessName}
            />
            <Input
              onChangeText={text => handleOnchange(text, 'address')}
              onFocus={() => handleError(null, 'address')}
              placeholder="Địa chỉ"
              value={inputs.address}
              error={errors.address}
            />
            <View style={{
              height: 120,
              marginBottom: 8,
            }}>{
                shouldShow ? (
                  <View style={{
                    height: 120,
                  }}>
                    <View style={{
                      width: 146,
                      height: 22,
                      backgroundColor: '#CFE0FE',
                      borderRadius: 3,
                      marginBottom: '4%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <Ionicons style={{ marginStart: 4 }} name="information-circle" size={16} color="#3E7CEF" />
                      <Text style={{ fontSize: 11, marginLeft: 3, marginBottom: 2, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>Hình ảnh nơi làm việc</Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                    }}>
                      <View style={{
                        width: 70,
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <View style={{
                          backgroundColor: '#D9D9D9',
                          height: 70,
                          width: 70,
                          borderRadius: 6,
                          borderWidth: 1,
                          borderStyle: 'dashed',
                          borderColor: '#7D7A7A66',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <TouchableOpacity onPress={toggleBottomSheet}>
                            <Icon
                              name="camera"
                              size={40}
                              color="#fff"
                              style={{
                                opacity: 0.8,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#fff',
                                borderRadius: 5,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                        <Text style={{ marginTop: '8%', fontSize: 11, color: '#7D7A7A', opacity: 0.8, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>Thêm ảnh</Text>
                      </View>
                      <FlatList
                        data={selectedImages}
                        keyExtractor={(item) => item.uri}
                        horizontal
                        renderItem={({ item }) => (
                          <View style={{
                            width: 70,
                            marginLeft: 10,
                            alignItems: 'center',
                            flexDirection: 'column',
                          }}>
                            <Image
                              source={{ uri: item.uri }}
                              style={{
                                width: 70,
                                height: 70,
                                margin: 5,
                                marginBottom: '8%',
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: '#7D7A7A66',
                                padding: 5,
                              }}
                            />
                            {/* <Text style={{fontSize: 11, color: '#7D7A7A', opacity: 0.8 }}>Ảnh {item.id}</Text> */}
                          </View>
                        )}
                      />
                    </View>
                  </View>
                ) : <View style={[{
                  backgroundColor: '#D9D9D9',
                  height: 120,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#7D7A7A66',
                }, errors.image && { borderColor: 'red' }]}>
                  <View style={{ alignItems: 'flex-end' }}>
                    <View style={styles.pickImage}>
                      <Ionicons style={{ marginStart: 4 }} name="information-circle" size={16} color="#3E7CEF" />
                        <Text style={{ fontSize: 9, marginLeft: 3, marginBottom: 2, fontFamily: 'BeVietnamPro-Medium', }}>Hình ảnh hợp lệ</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={toggleBottomSheet}>
                    <View style={{
                      width: 200,
                      height: 30,
                      backgroundColor: '#357AF9',
                      borderRadius: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: '4%',
                      opacity: 0.8,
                    }}>
                        <Text style={{ fontSize: 16, color: 'white', fontFamily: 'BeVietnamPro-Medium', }}>Hình nơi làm việc</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ alignItems: 'center' }}>
                      <Text style={{ fontSize: 12, color: '#7D7A7A', opacity: 0.7, fontFamily: 'BeVietnamPro-Medium', }}>ĐĂNG TỪ 01 ĐẾN 06 HÌNH</Text>
                  </View>
                </View>
              }
            </View>
            {errors.image ? <Text style={styles.error}>{errors.image}</Text> : null}
          </View>
          <View style={{ backgroundColor: '#D9D9D9', height: 60, justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 16, marginStart: 25, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>NỘI DUNG ĐĂNG TUYỂN</Text>
          </View>
          <View style={{ marginVertical: 22, marginHorizontal: 24 }}>
            <Input
              onChangeText={text => handleOnchange(text, 'title')}
              onFocus={() => handleError(null, 'title')}
              placeholder="Tiêu đề đăng tin"
              value={inputs.title}
              error={errors.title}
            />
            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'quantity')}
              onFocus={() => handleError(null, 'quantity')}
              placeholder="Số lượng tuyển dụng"
              value={inputs.quantity}
              error={errors.quantity}
            />
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: COLORS.darkBlue }, errors.gender && { borderColor: 'red' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={gender}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Giới tính' : '...'}
              value={inputs.gender}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setIsFocus(false);
                handleOnchange(item.label, 'gender')
                handleError(null, 'gender')
              }}
            />
            {errors.gender ? <Text style={styles.error}>{errors.gender}</Text> : null}
            <Dropdown
              style={[styles.dropdown, isFocus1 && { borderColor: COLORS.darkBlue }, errors.career_id && { borderColor: 'red' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={listCareers}
              maxHeight={300}
              labelField="title"
              valueField="_id"
              placeholder={!isFocus1 ? 'Ngành Nghề' : '...'}
              searchPlaceholder="Search..."
              value={inputs.career_id}
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={item => {
                setIsFocus1(false);
                handleOnchange(item._id, 'career_id')
                handleError(null, 'career_id')
              }}
            />
            {errors.career_id ? <Text style={styles.error}>{errors.career_id}</Text> : null}
            <Dropdown
              style={[styles.dropdown, isFocus2 && { borderColor: COLORS.darkBlue }, errors.workType_id && { borderColor: 'red' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={listWorkType}
              maxHeight={300}
              labelField="title"
              valueField="_id"
              placeholder={!isFocus2 ? 'Loại công việc' : '...'}
              searchPlaceholder="Search..."
              value={inputs.workType_id}
              onFocus={() => setIsFocus2(true)}
              onBlur={() => setIsFocus2(false)}
              onChange={item => {
                setIsFocus2(false);
                handleOnchange(item._id, 'workType_id')
                handleError(null, 'workType_id')
              }}
            />
            {errors.workType_id ? <Text style={styles.error}>{errors.workType_id}</Text> : null}
            <View style={styles.payForm}>
              <Text style={{ fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>
                {inputs.payForm_id === "" ? "Hình thức trả lương" : (inputs.payForm_id === "655de22b9a5b0ffa7ffd5132" ? "Theo giờ" : "Theo tháng")}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <Input
                keyboardType="numeric"
                onChangeText={text => handleOnchange(text, 'wageMin')}
                onFocus={() => handleError(null, 'wageMin')}
                placeholder="Lương tối thiểu"
                value={inputs.wageMin}
                error={errors.wageMin}
              />
              <Input
                keyboardType="numeric"
                onChangeText={text => handleOnchange(text, 'wageMax')}
                onFocus={() => handleError(null, 'wageMax')}
                placeholder="Lương tối đa"
                value={inputs.wageMax}
                error={errors.wageMax}
              />
            </View>
            <InputMutiple
              onChangeText={text => handleOnchange(text, 'describe')}
              onFocus={() => handleError(null, 'describe')}
              placeholder={"Mô tả công việc\nMô tả chi tiết một số đặc điểm nhân diện của công ty tuyển dụng:\n- Tên công ty, địa chỉ công ty, hình thức và mặt hàng kinh doanh."}
              value={inputs.describe}
              error={errors.describe}
            />
          </View>
          <View style={{ backgroundColor: '#D9D9D9', height: 60, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, marginStart: 25, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>THÔNG TIN THÊM</Text>
          </View>
          <View style={{ marginHorizontal: 24, marginTop: 22, flexDirection: 'row', gap: 20 }}>
            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'ageMin')}
              onFocus={() => handleError(null, 'ageMin')}
              placeholder="Độ tuổi tối thiểu"
              value={inputs.ageMin}
              error={errors.ageMin}
            />
            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'ageMax')}
              onFocus={() => handleError(null, 'ageMax')}
              placeholder="Độ tuổi tối đa"
              value={inputs.ageMax}
              error={errors.ageMax}
            />
          </View>

          <View style={{ marginHorizontal: 24 }}>
            <Dropdown
              style={[styles.dropdown, isFocus3 && { borderColor: COLORS.darkBlue }, errors.academic_id && { borderColor: 'red' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={listAcademic}
              maxHeight={300}
              labelField="title"
              valueField="_id"
              placeholder={!isFocus3 ? 'Trình độ học vấn' : '...'}
              searchPlaceholder="Search..."
              value={inputs.academic_id}
              onFocus={() => setIsFocus3(true)}
              onBlur={() => setIsFocus3(false)}
              onChange={item => {
                setIsFocus3(false);
                handleOnchange(item._id, 'academic_id')
                handleError(null, 'academic_id')
              }}
            />
            {errors.academic_id ? <Text style={styles.error}>{errors.academic_id}</Text> : null}
            <Dropdown
              style={[styles.dropdown, isFocus4 && { borderColor: COLORS.darkBlue }, errors.experience_id && { borderColor: 'red' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={listExperience}
              maxHeight={300}
              labelField="title"
              valueField="_id"
              placeholder={!isFocus4 ? 'Kinh nghiệm' : '...'}
              searchPlaceholder="Search..."
              value={inputs.experience_id}
              onFocus={() => setIsFocus4(true)}
              onBlur={() => setIsFocus4(false)}
              onChange={item => {
                setIsFocus4(false);
                handleOnchange(item._id, 'experience_id')
                handleError(null, 'experience_id')
              }}
            />
            {errors.experience_id ? <Text style={styles.error}>{errors.experience_id}</Text> : null}
          </View>
          <View style={{ marginHorizontal: 24 }}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{ width: '40%', justifyContent: 'flex-start' }}>
                <Button title="Hủy" onPress={() => navigation.navigate('Trang chủ')} />
              </View>
              <View style={{ width: '40%', marginStart: '10%' }}>
                <Button title="Đăng tin" onPress={validate} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.grey,
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    fontFamily: 'BeVietnamPro-Medium',
  },
  panelSubtitle: {
    fontSize: 14,
    color: COLORS.darkBlue,
    height: 30,
    marginBottom: 10,
    fontFamily: 'BeVietnamPro-Medium',
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'BeVietnamPro-Medium',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  dropdown: {
    height: 50,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  payForm: {
    height: 50,
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 18,
    marginBottom: 8,
    justifyContent: 'center',
    backgroundColor: COLORS.lightGrey
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey1,
    fontFamily: 'BeVietnamPro-Medium',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLORS.darkBlue,
    fontFamily: 'BeVietnamPro-Medium', 
    marginTop: -4,
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
  error: {
    fontSize: 11,
    color: 'red',
    paddingBottom: 12,
    fontFamily: 'BeVietnamPro-Medium', 
    marginTop: -2,
  },
  pickImage: {
    width: 96,
    height: 20,
    backgroundColor: '#CFE0FE',
    borderRadius: 3,
    marginRight: '2%',
    marginTop: '2%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputMutiple: {
    justifyContent: 'flex-end'
  },
});



export default PostScreen;