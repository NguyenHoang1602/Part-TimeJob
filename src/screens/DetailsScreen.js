/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable semi */
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Image, FlatList, Alert, Pressable, StyleSheet, TextInput, Keyboard, StatusBar, ToastAndroid } from 'react-native';

//
import Input from '../components/Input';
import COLORS from '../assets/const/colors';
import Button from '../components/Button';
//icon
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIntroSlider from "react-native-app-intro-slider";
import Modal from "react-native-modal";
import CheckBoxCircle from '../components/CheckBoxCircle';
import { SIZES } from '../constants/theme';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import axios from 'axios';
import { API } from '../../Sever/sever';
import UserContext from '../components/UserConText';
import { useFocusEffect } from '@react-navigation/native';

const DetailsScreen = ({ route, navigation }) => {
    const { user } = useContext(UserContext);
    const datalist = {
        postid: route.params?.postid,
        users_id: route.params?.users_id,
        address: route.params?.address,
        avatar: route.params?.avatar,
        displayName: route.params?.users_id.displayName,
        business_name: route.params?.business_name,
        image: route.params?.image,
        quantity: route.params?.quantity,
        title: route.params?.title,
        gender: route.params?.gender,
        career_id: route.params?.career_id.title,
        payform_id: route.params?.payform_id?.title,
        experience_id: route.params?.experience_id.title,
        acedemic_id: route.params?.acedemic_id.title,
        worktype_id: route.params?.worktype_id.title,
        describe: route.params?.describe,
        age_min: route.params?.age_min,
        age_max: route.params?.age_max,
        wage_min: route.params?.wage_min,
        wage_max: route.params?.wage_max,
        status_id: route.params?.status_id,
        date: route.params?.date,
        time: route.params?.time,
    };
    const [data, setdataset] = useState(datalist);
    const [loading, setLoading] = React.useState(false);
    const [cv, setCv] = useState([]);
    const [salary, setSalary] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [sender, setSender] = useState(null);
    const [listApplied, setListApplied] = useState([]);
    const [followedProducts, setFollowedProducts] = useState([]);
    const handlePress = (itemId) => {
        setSelectedItem(itemId === selectedItem ? null : itemId);
    };
    const getAllApplied = async () => {
        try {
            const response = await axios.post(`${API}/apply/listMyApplied`, {
                id: user._id,
            });
            setListApplied(response.data);
        } catch (error) {
            console.log(error);
        }
    };
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
    const handleSaveToggle = async (post_id) => {
        try {
            const savedata = {
                user_id: user._id,
                post_id: post_id,
            };
            const result = await axios.post(`${API}/savePost/add`, savedata);
            if (result.status === 200) {
                getListSave();
                ToastAndroid.show('Lưu tin thành công !', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log('Err: ', error);
        }
    };
    const isSave = (postid) => {
        const savePostIDlist = followedProducts.map(item => item.post_id);
        return savePostIDlist.some(post_id => post_id === postid);
    };
    useFocusEffect(
        React.useCallback(() => {
            getCV()
            getAllApplied()
            getListSave()
            setErrors('')
        }, [])
    );
    const handleOnChangeSalary = (value) => {
        let formattedValue = value.replace(/\D/g, '');
        formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        setSalary(formattedValue);
    }
    // validate
    const [errors, setErrors] = useState('');

    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        if (selectedItem === null) {
            ToastAndroid.show("Bạn chưa chọn CV", ToastAndroid.LONG);
        } else {
            if (!salary) {
                setErrors('Vui lòng nhập lương mong muốn')
                isValid = false;
            } else if (salary < 1.000){
                setErrors('Lương mong muốn phải lớn hơn 1.000đ')
                isValid = false;
            }
            if (isValid) {
                handleApply()
            }
        }

    };
    // const validate = async () => {

    //     Keyboard.dismiss();
    //     let isValid = true;

    //     if (!salary) {
    //       handleError('Vui lòng nhập lương mong muốn', 'salary');
    //       isValid = false;
    //     if (isValid) {
    //       handleApply()
    //     }
    // };
    const handleApply = async () => {
        const apply = {
            receiver_id: data.users_id._id,
            sender_id: sender,
            post_id: data.postid,
            cv_id: selectedItem,
            salary: salary,
        };

        if (selectedItem) {
            setModalVisible(false);
            setLoading(true);
            setTimeout(() => { 3000 });
            const result = await axios.post(`${API}/apply/add`, apply);
            if (result.status === 200) {
                getAllApplied();
                setLoading(false);
                setErrors('');
                Alert.alert('Ứng tuyển thành công!')
            }
        }
    };

    const getCV = async () => {
        axios({
            url: `${API}/cvs/myCVs`,
            method: 'POST',
            data: {
                id: user._id,
            },
        }).then(async (response) => {
            if (response.status === 200) {
                setCv(response.data);
            }
        })
    }
    const isFollowed = (productId) => {
        const savePostIDlist = listApplied.map(item => item.post_id._id);
        return savePostIDlist.some(post_id => post_id === productId);
    };
    const handleDelete = async (post_id) => {
        const deleteSave = {
            user_id: user._id,
            post_id: post_id,
        }
        const result = await axios.post(`${API}/savePost/deleteWithCondition`, deleteSave);
        if (result.status === 200) {
            getListSave();
            ToastAndroid.show('Xóa tin đã lưu thành công !', ToastAndroid.SHORT);
            console.log("Thành công");
        }
    }
    const renderCV = ({ item }) => {
        const isSelected = item._id === selectedItem;
        return (
            <Pressable
                onPress={() => {
                    handlePress(item._id);
                    setSender(item.user_id);
                }}
                style={({ pressed }) => ({
                    borderColor: isSelected ? COLORS.primary : 'transparent',
                    opacity: pressed ? 0.5 : 1,
                    marginBottom: 18,
                    padding: 10,
                    borderWidth: 0.8,
                    borderRadius: 5,
                    backgroundColor: isSelected ? 'rgba(51, 123, 255, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                })}
            >
                {({ pressed }) => (
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name="document-text-outline" size={24} color={COLORS.black} />
                        <Text numberOfLines={1} style={{ flex: 1, fontSize: 16, fontWeight: '400', marginLeft: 25, color: COLORS.black }}>{item.title}</Text>
                        {
                            isSelected ? (
                                <AntDesign name="checkcircle" size={24} color={COLORS.primary} />
                            ) : null
                        }
                    </View>
                )}
            </Pressable>
        );
    };
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModalclose = () => {
        setModalVisible(!isModalVisible);
    };
    // datacheck();
    const cvscreen = () => {
        navigation.navigate('Thông tin tuyển dụng', {
            postid: data.postid,
        })
        setModalVisible(!isModalVisible);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} />
            <View style={styles.headers}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={28} color={COLORS.white} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text></Text>
                </View>
                {
                    isSave(data.postid) ? (
                        <TouchableOpacity
                            onPress={() => handleDelete(data.postid)}
                        >
                            <Icons style={{ marginRight: 22 }} name="bookmark-remove" size={28} color={COLORS.white} />
                        </TouchableOpacity>
                    ) : <TouchableOpacity
                        onPress={() => handleSaveToggle(data.postid)}
                    >
                        <Icons style={{ marginRight: 22 }} name="bookmark-add" size={28} color={COLORS.white} />
                    </TouchableOpacity>
                }
                <Entypo name="dots-vertical" size={26} color={COLORS.white} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.white }}>
                <AppIntroSlider
                    style={{ width: '100%', height: 280 }}
                    showSkipButton={false}
                    showDoneButton={false}
                    showNextButton={false}
                    data={data.image}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ marginBottom: 5 }}>
                                <Image
                                    source={{ uri: item }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    resizeMode="cover"
                                />
                            </View>
                        )
                    }}
                    activeDotStyle={styles.activeDotStyle}
                    dotStyle={styles.dotStyle}
                />
                <View style={{ width: '100%', paddingHorizontal: 15 }}>
                    <View
                        style={styles.postHeaders}>
                        <Text style={styles.title}>{data.title}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: COLORS.red, fontSize: 16, marginVertical: 9 }}>{data.wage_min}đ - {data.wage_max}đ</Text>
                            {
                                data.payform_id === '655de22b9a5b0ffa7ffd5132' ? (
                                    <Text style={{ color: COLORS.red, fontSize: 16, marginVertical: 9 }}> /giờ</Text>
                                ) : (
                                    <Text style={{ color: COLORS.red, fontSize: 16, marginVertical: 9 }}> /tháng</Text>
                                )
                            }
                        </View>
                        <Text style={styles.datetime}>Đã đăng {data.date} ngày trước vào lúc {data.time}</Text>
                        <View style={styles.user}>
                            <ImageBackground
                                source={{ uri: data.avatar }}
                                style={{ width: 48, height: 48 }}
                                imageStyle={{ borderRadius: 48 }}
                            />
                            <Text style={styles.usertitle}>{data.displayName}</Text>
                        </View>
                    </View>
                    <View style={styles.dot} />
                    <View style={{ width: '100%' }}>
                        <Text style={styles.describe}>{data.describe}</Text>
                    </View>
                    <View style={styles.item1}>
                        <AntDesign name="creditcard" size={24} color={COLORS.blue} />
                        <Text style={styles.itemText}>Hình thức trả lương: {data.payform_id}</Text>
                    </View>
                    <View style={styles.item}>
                        <Octicons name="log" size={24} color={COLORS.blue} />
                        <Text style={styles.itemText}>Loại công việc: {data.worktype_id}</Text>
                    </View>
                    <View style={styles.item}>
                        <SimpleLineIcons name="briefcase" size={24} color={COLORS.blue} />
                        <Text style={styles.itemText}>Ngành nghề: {data.career_id}</Text>
                    </View>
                    <View style={styles.item}>
                        <AntDesign name="carryout" size={24} color={COLORS.blue} />
                        <Text style={styles.itemText}>Kinh nghiệm: {data.experience_id}</Text>
                    </View>
                    <View style={styles.item}>
                        <Octicons name="mortar-board" size={24} color={COLORS.blue} />
                        <Text style={styles.itemText}>Trình độ học vấn: {data.acedemic_id}</Text>
                    </View>
                    <View style={styles.item}>
                        <Fontisto name="venus-mars" size={24} color={COLORS.blue} />
                        <Text style={styles.itemText}>Giới tính: {data.gender}</Text>
                    </View>
                    <View style={styles.item}>
                        <FontAwesome name="building-o" size={24} color={COLORS.blue} />
                        <Text style={styles.itemText}>Tên Công ty: {data.business_name}</Text>
                    </View>
                    <View style={styles.item}>
                        <Octicons name="people" size={24} color={COLORS.blue} />
                        <Text style={styles.itemText}>Số lượng tuyển dụng: {data.quantity}</Text>
                    </View>
                    <View style={styles.item}>
                        <AntDesign name="leftsquareo" size={24} color={COLORS.blue} />
                        <Text style={styles.itemText}>Tuổi tối thiểu: {data.age_min}</Text>
                    </View>
                    <View style={styles.item}>
                        <AntDesign name="rightsquareo" size={24} color={COLORS.blue} />
                        <Text style={styles.itemText}>Tuổi đa: {data.age_max}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', width: '90%' }}>
                        <Feather name="map-pin" size={24} color={COLORS.blue} />
                        <Text style={styles.itemText}>{data.address}</Text>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', paddingVertical: 50 }}>
                        {isFollowed(data?.postid) ? (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Ứng tuyển')}
                                style={styles.btnApply}>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                        color: COLORS.white,
                                    }}>
                                    Xem trạng thái ứng tuyển
                                </Text>
                            </TouchableOpacity>
                        ) : <TouchableOpacity
                            onPress={() => toggleModal()}
                            style={styles.btnApply}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color: COLORS.white,
                                }}>
                                Nộp hồ sơ
                            </Text>
                        </TouchableOpacity>
                        }

                    </View>
                </View>
            </ScrollView>
            <Modal
                onBackdropPress={toggleModalclose}
                isVisible={isModalVisible}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}>
                <View style={styles.headerModal}>
                    <View style={{
                        alignItems: 'center',
                    }}>
                        <View style={styles.headerModala} />
                    </View>
                </View>
                <View style={{ backgroundColor: '#FFFFFF' }}>
                    <View style={styles.addcv}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.black }}>Hồ sơ ứng tuyển</Text>
                        <View style={styles.add}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 5,
                                }}
                                onPress={cvscreen}
                            >
                                <AntDesign name="addfile" size={30} color={COLORS.primary} />
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, color: '#7D7A7A', opacity: 0.7 }}>Tạo hồ sơ mới</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ marginStart: '7%', fontSize: 16 }}>Hồ sơ của bạn</Text>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: 200, paddingHorizontal: 30, marginTop: 20 }}>
                        <FlatList
                            data={cv}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderCV}
                            nestedScrollEnabled={true}
                            scrollEnabled={false}
                        />
                    </ScrollView>
                    {
                        selectedItem != null ? (
                            <View style={{ alignItems: 'center' }}>
                                <TextInput
                                    keyboardType='numeric'
                                    style={{ backgroundColor: "#F5F5F5", width: '80%', paddingHorizontal: 13, paddingVertical: 11, borderRadius: 5 }}
                                    placeholder="Nhập lương mong muốn"
                                    onChangeText={handleOnChangeSalary}
                                    value={salary}
                                />
                            </View>
                        ) : null
                    }
                    {
                        errors != '' && (
                            <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12, marginLeft: 40 }}>
                                {errors}
                            </Text>
                        )
                    }
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginVertical: 20,
                    }}>
                        <TouchableOpacity
                            onPress={toggleModalclose}
                            style={{
                                backgroundColor: 'rgba(51, 123, 255, 0.20)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 64,
                                position: 'relative',
                                width: 160,
                                paddingVertical: 15,
                                marginEnd: 15,
                            }}>
                            <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: '600' }}>Hủy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                validate()
                            }}
                            style={{
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 64,
                                position: 'relative',
                                width: 160,
                                paddingVertical: 15,
                            }}>
                            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '600' }}>Ứng tuyển</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 18,
        backgroundColor: COLORS.primary,
        marginBottom: '-5%',
    },
    headers: {
        flexDirection: 'row',
        paddingHorizontal: 18,
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        alignItems: 'center',
    },
    activeDotStyle: {
        backgroundColor: COLORS.white,
        width: 7,
        height: 7,
        marginTop: 30,
    },
    dotStyle: {
        backgroundColor: '#D9D9D9',
        opacity: 0.5,
        width: 7,
        height: 7,
        marginTop: 30,
    },
    postHeaders: {
        width: '100%',
    },
    title: {
        fontSize: 19,
        color: COLORS.black,
        fontWeight: '600',
    },
    wage: {
        color: '#FA1300',
        fontSize: 14,
        marginTop: 5,
        marginBottom: 7,
        fontWeight: 'bold',
    },
    datetime: {
        fontSize: 14,
        color: COLORS.grey,
    },
    user: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
        marginBottom: 34,
    },
    usertitle: {
        color: COLORS.black,
        fontSize: 16,
        marginStart: 10,
        fontWeight: 'bold',
    },
    dot: {
        height: 1.5,
        width: '100%',
        backgroundColor: COLORS.blue,
        borderRadius: 50,
        marginBottom: 20,
        opacity: 0.9,
    },
    describe: {
        fontSize: 15,
        fontStyle: 'normal',
        color: COLORS.black,
        opacity: 0.8,
    },
    item: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
    item1: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    itemText: {
        marginStart: 15,
        fontSize: 15,
        color: COLORS.black,
        opacity: 0.8,
    },
    btnApply: {
        backgroundColor: COLORS.blue,
        padding: 5,
        width: '85%',
        height: 50,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    headerModal: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headerModala: {
        width: 40,
        height: 6,
        borderRadius: 4,
        backgroundColor: COLORS.grey,
        marginBottom: 10,
    },
    addcv: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        alignItems: 'center',
    },
    add: {
        backgroundColor: 'rgba(125, 122, 122, 0.1)',
        height: 120,
        borderRadius: 6,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#7D7A7A66',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    btncancel: {
        backgroundColor: 'rgba(51, 123, 255, 0.20)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 64,
        position: 'relative',
        width: 160,
        paddingVertical: 15,
        marginEnd: 15,
    },
    btn_apply: {
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 64,
        position: 'relative',
        width: 160,
        paddingVertical: 15,
    },

});
export default DetailsScreen;