/* eslint-disable quotes */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Keyboard, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, useWindowDimensions, FlatList, Image, Alert } from 'react-native';

import Input from '../components/Input';
import InputMutiple from '../components/InputMutiple';
import COLORS from '../assets/const/colors';
import axios from 'axios';

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

const data = [
  { label: 'Item 1', value: 'Item 1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const payForm = [
  { value: 'Theo giờ' },
  { value: 'Theo ngày' },
  { value: 'Theo tháng' },
  { value: 'Lương khoán' },
];

const PostScreen = ({ navigation }) => {

  //drop-down
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [inputs, setInputs] = React.useState({
    id: '',
    title: '',
    subtitle: '',
    price: '',
    details: '',
    sex: '',
  });
  const [errors, setErrors] = React.useState({});
  const [validateSex, setValidateSex] = useState('');
  const [validateCareers, setValidateCareers] = useState('');
  const [validateWorkTypes, setValidateWorkTypes] = useState('');
  const [validatePayForm, setValidatePayForm] = useState('');
  const [validateAcademicLv, setValidateAcademicLv] = useState('');
  const [validateExp, setValidateExp] = useState('');
  

  const validateAll = () => {
    validate();
    VLDSex();
  }
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.bussiness_name) {
      handleError('Vui lòng nhập tên doanh nghiệp', 'bussiness_name');
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
    }
    if (!inputs.wagemin) {
      handleError('Vui lòng nhập lương', 'wagemin');
      isValid = false;
    }
    if (!inputs.wagemax) {
      handleError('Vui lòng nhập lương', 'wagemax');
      isValid = false;
    }
    if (!inputs.subtitle) {
      handleError('Vui lòng nhập mô tả', 'subtitle');
      isValid = false;
    }
    if (!inputs.agemin) {
      handleError('Vui lòng nhập tuổi', 'agemin');
      isValid = false;
    }
    if (!inputs.agemax) {
      handleError('Vui lòng nhập tuổi', 'agemax');
      isValid = false;
    }
    if (!inputs.Engraved_benefits) {
      handleError('Vui lòng nhập quyền lợi', 'Engraved_benefits');
      isValid = false;
    }
    if (isValid) {
      console.log(' oce ');
    }

  };
  const VLDSex = (value) => {
    if (!value) {
      setValidateSex('Vui lòng chọn giới tính');
    } else {
      setValidateSex('');
    }
  };
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  const logimage = () => {
    console.log(selectedImages);
  }
console.log(inputs);
  //const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Clean up the state when the component loses focus
        setSelectedImages([]);
      };
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
  const uploadImages = async () => {
    try {
      const CLOUD_NAME = "dxrv1gdit";
      const PRESET_NAME = "ParttimeJobs";
      const urls = [];
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
            "Content-Type" : "multipart/form-data",
          },
        })
        urls.push(response.data.secure_url);
        console.log("image url :" + urls);
      });
      Alert.alert("Upload Image Succesfuly !");
      setSelectedImages([]);
      return urls;
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
      <ScrollView>
        <View>
          <BottomSheetContent
            isVisible={isBottomSheetVisible}
            onClose={toggleBottomSheet}
          />
          <View style={{ backgroundColor: '#D9D9D9', height: 60, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, marginStart: 25 }}>THÔNG TIN NHÀ TUYỂN DỤNG</Text>
          </View>
          <View style={{ marginVertical: 22, marginHorizontal: 24 }}>
            <Input
              onChangeText={text => handleOnchange(text, 'bussiness_name')}
              onFocus={() => handleError(null, 'bussiness_name')}
              placeholder="Tên doanh nghiệp"
              error={errors.bussiness_name}
            />
            <Input
              onChangeText={text => handleOnchange(text, 'address')}
              onFocus={() => handleError(null, 'address')}
              placeholder="Địa chỉ"
              // value={route.params?.subtitle}
              error={errors.address}
            />
            <View style={{
              height: 120,
            }}>{
                shouldShow ? (
                  <View style={{
                    height: 120,
                  }}>
                    <View style={{
                      width: 145,
                      height: 22,
                      backgroundColor: '#CFE0FE',
                      borderRadius: 3,
                      marginBottom: '4%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <Ionicons style={{ marginStart: 4 }} name="information-circle" size={16} color="#3E7CEF" />
                      <Text style={{ fontSize: 11, marginLeft: 3, marginBottom: 2 }}>Hình ảnh nơi làm việc</Text>
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
                        <Text style={{ marginTop: '8%', fontSize: 11, color: '#7D7A7A', opacity: 0.8 }}>Thêm ảnh</Text>
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
                ) : <View style={{
                  backgroundColor: '#D9D9D9',
                  height: 120,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#7D7A7A66',
                }}>
                  <View style={{ alignItems: 'flex-end' }}>
                    <View style={{
                      width: 96,
                      height: 20,
                      backgroundColor: '#CFE0FE',
                      borderRadius: 3,
                      marginRight: '2%',
                      marginTop: '2%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <Ionicons style={{ marginStart: 4 }} name="information-circle" size={16} color="#3E7CEF" />
                      <Text style={{ fontSize: 9, marginLeft: 3, marginBottom: 2 }}>Hình ảnh hợp lệ</Text>
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
                      <Text style={{ fontSize: 16, color: 'white' }}>Hình nơi làm việc</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: '#7D7A7A', opacity: 0.7 }}>ĐĂNG TỪ 01 ĐẾN 06 HÌNH</Text>
                  </View>
                </View>
              }
            </View>
          </View>
          <View style={{ backgroundColor: '#D9D9D9', height: 60, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, marginStart: 25 }}>NỘI DUNG ĐĂNG TUYỂN</Text>
          </View>
          <View style={{ marginVertical: 22, marginHorizontal: 24 }}>
            <Input
              onChangeText={text => handleOnchange(text, 'title')}
              onFocus={() => handleError(null, 'title')}
              placeholder="Tiêu đề đăng tin"
              error={errors.title}
            />
            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'quantity')}
              onFocus={() => handleError(null, 'quantity')}
              placeholder="Số lượng tuyển dụng"
              // value={route.params?.subtitle}
              error={errors.quantity}
            />
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: COLORS.darkBlue }, validateSex && { borderColor: 'red' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Giới tính' : '...'}
              value={inputs.sex}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setIsFocus(false);
                VLDSex(item.value)
                handleOnchange(item.label, 'sex')
              }}

            />
            {validateSex ? <Text style={styles.error}>{validateSex}</Text> : null}
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
              placeholder={!isFocus ? 'Loại công việc' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
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
            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'wagemin')}
              onFocus={() => handleError(null, 'wagemin')}
              placeholder="Lương tối thiểu"
              // value={route.params?.subtitle}
              error={errors.wagemin}
            />
            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'wagemax')}
              onFocus={() => handleError(null, 'wagemax')}
              placeholder="Lương tối đa"
              // value={route.params?.subtitle}
              error={errors.wagemax}
            />
            <InputMutiple
              onChangeText={text => handleOnchange(text, 'subtitle')}
              onFocus={() => handleError(null, 'subtitle')}
              placeholder={"Mô tả công việc\nMô tả chi tiết một số đặc điểm nhân diện của công ty tuyển dụng:\n- Tên công ty, địa chỉ công ty, hình thức và mặt hàng kinh doanh."}
              // value={route.params?.subtitle}
              error={errors.subtitle}
            />
          </View>
          <View style={{ backgroundColor: '#D9D9D9', height: 60, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, marginStart: 25 }}>THÔNG TIN THÊM</Text>
          </View>
          <View style={{ marginHorizontal: 24, marginTop: 22 }}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
              <View style={{ width: '45%', justifyContent: 'flex-start' }}>
                <Input
                  keyboardType="numeric"
                  onChangeText={text => handleOnchange(text, 'agemin')}
                  onFocus={() => handleError(null, 'agemin')}
                  placeholder="Độ tuổi tối thiểu"
                  // value={route.params?.subtitle}
                  error={errors.agemin}
                />
              </View>
              <View style={{ width: '45%', marginStart: '9.5%' }}>
                <Input
                  keyboardType="numeric"
                  onChangeText={text => handleOnchange(text, 'agemax')}
                  onFocus={() => handleError(null, 'agemax')}
                  placeholder="Độ tuổi tối đa"
                  // value={route.params?.subtitle}
                  error={errors.agemax}
                />
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 24 }}>
            {/* <Input
              onChangeText={text => handleOnchange(text, 'subtitle')}
              onFocus={() => handleError(null, 'subtitle')}
              placeholder="Trình độ học vấn"
              // value={route.params?.subtitle}
              error={errors.subtitle}
            /> */}
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
              placeholder={!isFocus ? 'Kinh nghiệm' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
            {/* <Input
              onChangeText={text => handleOnchange(text, 'subtitle')}
              onFocus={() => handleError(null, 'subtitle')}
              placeholder="Kinh nghiệm"
              // value={route.params?.subtitle}
              error={errors.subtitle}
            /> */}
          </View>
          <View style={{ marginHorizontal: 24 }}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{ width: '40%', justifyContent: 'flex-start' }}>
                <Button title="Xem trước" onPress={uploadImages} />
              </View>
              <View style={{ width: '40%', marginStart: '10%' }}>
                <Button title="Đăng tin" onPress={validateAll} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
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
  },
  panelSubtitle: {
    fontSize: 14,
    color: COLORS.darkBlue,
    height: 30,
    marginBottom: 10,
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
  error: {
    fontSize: 12,
    color: 'red',
    paddingBottom: 12
  },
});



export default PostScreen;