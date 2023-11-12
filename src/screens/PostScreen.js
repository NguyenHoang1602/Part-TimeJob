/* eslint-disable quotes */
/* eslint-disable keyword-spacing */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Keyboard, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, useWindowDimensions, FlatList, Image } from 'react-native';

import Input from '../components/Input';
import InputMutiple from '../components/InputMutiple';
import COLORS from '../assets/const/colors';

import Button from '../components/Button';
//icon
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import BottomSheetContent from '../components/BottomSheetContent';
//picker
import ImagePicker from 'react-native-image-crop-picker';
//modal
import Modal from 'react-native-modal';
//slect drop-down
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
  });
  const [errors, setErrors] = React.useState({});
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.title) {
      handleError('Please input title', 'title');
      isValid = false;
    }
    if (!inputs.subtitle) {
      handleError('Please input subtitle', 'subtitle');
      isValid = false;
    }

    if (!inputs.price) {
      handleError('Please input phone price', 'price');
      isValid = false;
    }

    if (!inputs.details) {
      handleError('Please input details', 'details');
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
  const logimage = () => {
    console.log(selectedImages);
  }

  //const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [shouldShow, setshoulShow] = useState(false);
  const openImagePicker = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((images) => {
        // let imageList = images;
        // //console.log(imageList);
        // for (let i = 0; i < Object.keys(imageList).length; i++) {
        //   let data = imageList[String(i)];
        //   let image = {
        //     id: String(i+1),
        //     mime: data.mime,
        //     size: data.size,
        //     path: data.path,
        //   };
        //   let path = data.path.split('/');
        //   image.fileName = path[path.length - 1];
        //   setSelectedImages({
        //     id: image.id,
        //     mime: image.mime,
        //     size: image.size,
        //     path: image.path,
        //   });
        // }
        setSelectedImages(images);
        if (shouldShow == false) {
          setshoulShow(!shouldShow);
        } else {
          setshoulShow(true);
        }
        setBottomSheetVisible(!isBottomSheetVisible);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          <TouchableOpacity style={styles.panelButton} onPress={openImagePicker}>
            <Text style={styles.panelButtonTitle}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={''}>
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
              onChangeText={text => handleOnchange(text, 'subtitle')}
              onFocus={() => handleError(null, 'price')}
              placeholder="Tên doanh nghiệp"
              value=""
              error=""
            />
            <Input
              onChangeText={text => handleOnchange(text, 'subtitle')}
              onFocus={() => handleError(null, 'subtitle')}
              placeholder="Địa chỉ"
              // value={route.params?.subtitle}
              error={errors.subtitle}
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
                        keyExtractor={(item) => item.path}
                        horizontal
                        renderItem={({ item }) => (
                          <View style={{
                            width: 70,
                            marginLeft: 10,
                            alignItems: 'center',
                            flexDirection: 'column',
                          }}>
                            <Image
                              source={{ uri: item.path }}
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
              onChangeText={text => handleOnchange(text, 'subtitle')}
              onFocus={() => handleError(null, 'price')}
              placeholder="Tiêu đề tin đăng"
              value=""
              error=""
            />
            <Input
              onChangeText={text => handleOnchange(text, 'subtitle')}
              onFocus={() => handleError(null, 'subtitle')}
              placeholder="Số lượng tuyển dụng"
              // value={route.params?.subtitle}
              error={errors.subtitle}
            />
            {/* <Input
              onChangeText={text => handleOnchange(text, 'subtitle')}
              onFocus={() => handleError(null, 'subtitle')}
              placeholder="Ngành nghề"
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
            placeholder={!isFocus ? 'Ngành Ngề' : '...'}
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
            {/* <Input
              onChangeText={text => handleOnchange(text, 'subtitle')}
              onFocus={() => handleError(null, 'subtitle')}
              placeholder="Loại công việc"
              // value={route.params?.subtitle}
              error={errors.subtitle}
            />
            <Input
              onChangeText={text => handleOnchange(text, 'subtitle')}
              onFocus={() => handleError(null, 'subtitle')}
              placeholder="Hình thức trả lương"
              // value={route.params?.subtitle}
              error={errors.subtitle}
            /> */}
            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'subtitle')}
              onFocus={() => handleError(null, 'subtitle')}
              placeholder="Lương tối thiểu"
              // value={route.params?.subtitle}
              error={errors.subtitle}
            />
            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'subtitle')}
              onFocus={() => handleError(null, 'subtitle')}
              placeholder="Lương tối đa"
              // value={route.params?.subtitle}
              error={errors.subtitle}
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
                  onChangeText={text => handleOnchange(text, 'subtitle')}
                  onFocus={() => handleError(null, 'subtitle')}
                  placeholder="Độ tuổi tối thiểu"
                  // value={route.params?.subtitle}
                  error={errors.subtitle}
                />
              </View>
              <View style={{ width: '45%', marginStart: '9.5%' }}>
                <Input
                  keyboardType="numeric"
                  onChangeText={text => handleOnchange(text, 'subtitle')}
                  onFocus={() => handleError(null, 'subtitle')}
                  placeholder="Độ tuổi tối đa"
                  // value={route.params?.subtitle}
                  error={errors.subtitle}
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
            <Input
              onChangeText={text => handleOnchange(text, 'subtitle')}
              onFocus={() => handleError(null, 'subtitle')}
              placeholder="Các quyền lợi khác"
              // value={route.params?.subtitle}
              error={errors.subtitle}
            />
          </View>
          <View style={{ marginHorizontal: 24 }}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{ width: '40%', justifyContent: 'flex-start' }}>
                <Button title="Xem trước" onPress={logimage} />
              </View>
              <View style={{ width: '40%', marginStart: '10%' }}>
                <Button title="Đăng tin" onPress={validate} />
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
    marginBottom : 13,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
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



export default PostScreen;