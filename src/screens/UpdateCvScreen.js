/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, Keyboard, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, useWindowDimensions, FlatList, Image, StatusBar, Alert } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import Input from '../components/Input';
import InputMutiple from '../components/InputMutiple';
import COLORS from '../assets/const/colors';
import { Dropdown } from 'react-native-element-dropdown';
import UserContext from '../components/UserConText';
import axios from 'axios';
import { API } from '../../Sever/sever';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';

const UpdateCvScreen = ({ navigation, route }) => {
    useEffect(() => {
        getListAcademic()
        getListCareers()
        getListExperience()
        getListGender()
    }, []);

    const { user } = useContext(UserContext);
    const [listAcademic, setListAcademic] = useState([]);
    const [listCareers, setListCareers] = useState([]);
    const [listExperience, setListExperience] = useState([]);
    const [listGender, setListGender] = useState([]);
    const [inputs, setInputs] = React.useState({
        _id: route?.params?.item?._id,
        title: route?.params?.item?.title,
        name: route?.params?.item?.name,
        phone: route?.params?.item?.phone,
        year: route?.params?.item?.year,
        gender_id: route?.params?.item?.gender_id?._id,
        email: route?.params?.item?.email,
        career_id: route?.params?.item?.career_id?._id,
        address: route?.params?.item?.address,
        experience_id: route?.params?.item?.experience_id?._id,
        academic_id: route?.params?.item?.academic_id?._id,
        introduce: route?.params?.item?.introduce,
    });
    console.log(inputs);
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [isFocusGender, setIsFocusGender] = useState(false);
    const [isFocusCareer, setIsFocusCareer] = useState(false);
    const [isFocusExp, setIsFocusExp] = useState(false);
    const [isFocusAcademic, setIsFocusAcademic] = useState(false);

    const getListCareers = async () => {
        const data = await AsyncStorage.getItem('listCareers')
        setListCareers(JSON.parse(data));
    }

    const getListAcademic = async () => {
        const data = await AsyncStorage.getItem('listAcademics');
        setListAcademic(JSON.parse(data));
    }

    const getListExperience = async () => {
        const data = await AsyncStorage.getItem('listExperiences');
        setListExperience(JSON.parse(data));
    }
    const getListGender = async () => {
        const data = await AsyncStorage.getItem('listGenders');
        setListGender(JSON.parse(data));
    }

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
        if (!inputs.gender_id) {
            handleError('Vui lòng chọn giới tính', 'gender_id');
            isValid = false;
        }
        if (!inputs.career_id) {
            handleError('Vui lòng chọn ngành nghề', 'career_id');
            isValid = false;
        }
        if (!inputs.address) {
            handleError('Vui lòng nhập địa chỉ', 'address');
            isValid = false;
        }
        if (!inputs.experience_id) {
            handleError('Vui lòng nhập kinh nghiệm', 'experience_id');
            isValid = false;
        }
        if (!inputs.academic_id) {
            handleError('Vui lòng chọn trình độ học vấn', 'academic_id');
            isValid = false;
        }
        if (!inputs.introduce) {
            handleError('Vui lòng nhập giới thiệu bản thân', 'introduce');
            isValid = false;
        }
        if (isValid) {
            handleUpdateCv();
        }
    };
    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    const handleUpdateCv = async () => {
        setLoading(true);
        setTimeout(() => { 3000 });
        const response = await axios.post(`${API}/cvs/update`, inputs);
        if (response.status === 200) {
            setLoading(false);
            Alert.alert("Thành công");
            navigation.navigate('CVResumeScreen');
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 10, backgroundColor: COLORS.white }}>
            <Loader visible={loading} />
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: 18,
                    paddingBottom: 15,
                    alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <View style={{ marginLeft: 20, alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, fontWeight: "600", color: COLORS.black }}>Chỉnh sửa CV</Text>
                </View>
            </View>

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
                        value={inputs?.name}
                        error={errors.name}
                    />
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ width: '45%', justifyContent: 'flex-start' }}>
                            <Input
                                keyboardType="numeric"
                                onChangeText={text => handleOnchange(text, 'phone')}
                                onFocus={() => handleError(null, 'phone')}
                                placeholder="Số điện thoại"
                                value={inputs?.phone}
                                error={errors.phone}
                            />
                        </View>
                        <View style={{ width: '45%', marginStart: '9.5%' }}>
                            <Input
                                keyboardType="numeric"
                                onChangeText={text => handleOnchange(text, 'year')}
                                onFocus={() => handleError(null, 'year')}
                                placeholder="Năm sinh"
                                value={inputs?.year}
                                error={errors.year}
                            />
                        </View>
                    </View>
                    <Dropdown
                        style={[styles.dropdown, isFocusGender && { borderColor: COLORS.darkBlue }, errors.gender_id && { borderColor: 'red' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={listGender}
                        labelField="title"
                        valueField="_id"
                        maxHeight={300}
                        placeholder={!isFocusGender ? 'Giới tính' : '...'}
                        value={inputs.gender_id}
                        onFocus={() => setIsFocusGender(true)}
                        onBlur={() => setIsFocusGender(false)}
                        onChange={item => {
                            setIsFocusGender(false);
                            handleOnchange(item._id, 'gender_id')
                            handleError(null, 'gender_id')
                        }}
                    />
                    {errors.gender_id ? <Text style={styles.error}>{errors.gender_id}</Text> : null}
                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        placeholder="Địa chỉ email"
                        value={user?.email}
                        error={errors.email}
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocusCareer && { borderColor: COLORS.darkBlue }, errors.career_id && { borderColor: 'red' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={listCareers}
                        maxHeight={300}
                        labelField="title"
                        valueField="_id"
                        placeholder={!isFocusCareer ? 'Ngành Nghề' : '...'}
                        searchPlaceholder="Search..."
                        value={inputs.career_id}
                        onFocus={() => setIsFocusCareer(true)}
                        onBlur={() => setIsFocusCareer(false)}
                        onChange={item => {
                            setIsFocusCareer(false);
                            handleOnchange(item._id, 'career_id')
                            handleError(null, 'career_id')
                        }}
                    />
                    {errors.career_id ? <Text style={styles.error}>{errors.career_id}</Text> : null}
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
                        style={[styles.dropdown, isFocusExp && { borderColor: COLORS.darkBlue }, errors.experience_id && { borderColor: 'red' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={listExperience}
                        maxHeight={300}
                        labelField="title"
                        valueField="_id"
                        placeholder={!isFocusExp ? 'Kinh nghiệm' : '...'}
                        searchPlaceholder="Search..."
                        value={inputs.experience_id}
                        onFocus={() => setIsFocusExp(true)}
                        onBlur={() => setIsFocusExp(false)}
                        onChange={item => {
                            setIsFocusExp(false);
                            handleOnchange(item._id, 'experience_id')
                            handleError(null, 'experience_id')
                        }}
                    />
                    {errors.experience_id ? <Text style={styles.error}>{errors.experience_id}</Text> : null}
                    <Dropdown
                        style={[styles.dropdown, isFocusAcademic && { borderColor: COLORS.darkBlue }, errors.academic_id && { borderColor: 'red' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={listAcademic}
                        labelField="title"
                        valueField="_id"
                        maxHeight={300}
                        placeholder={!isFocusAcademic ? 'Trình độ học vấn' : '...'}
                        value={inputs.academic_id}
                        onFocus={() => setIsFocusAcademic(true)}
                        onBlur={() => setIsFocusAcademic(false)}
                        onChange={item => {
                            setIsFocusAcademic(false);
                            handleOnchange(item._id, 'academic_id')
                            handleError(null, 'academic_id')
                        }}
                    />
                    {errors.academic_id ? <Text style={styles.error}>{errors.academic_id}</Text> : null}
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


export default UpdateCvScreen

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
    error: {
        fontSize: 12,
        color: 'red',
        paddingBottom: 12,
    },
});