/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
import React, { useState, useContext, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Alert, ActivityIndicator, TextInput, FlatList, Pressable, RefreshControl, StyleSheet } from 'react-native';

//
import Input from '../components/Input';
import COLORS from '../assets/const/colors';
import Button from '../components/Button';
//icon
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import UserContext from '../components/UserConText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Vector from '../assets/images/undraw_festivities_tvvj.svg';
import CircularProgress from 'react-native-circular-progress-indicator';

import axios from 'axios';
import Loader from '../components/Loader';
import { API } from '../../Sever/sever';
import { SafeAreaView } from 'react-native-safe-area-context';

const EmployerHome = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [listIsDisplay, setListIsDisplay] = useState([]);
    const [listWaiting, setListWaiting] = useState([]);
    const [listDenied, setListDenied] = useState([]);
    const [listUnRead, setListUnread] = useState([]);
    const [listPending, setListPending] = useState([]);
    const [listReject, setListReject] = useState([]);
    const [listAccept, setListAccept] = useState([]);
    const [listBargain, setListBargain] = useState([]);
    const [listApplied, setListApplied] = useState([]);
    const [listAllAccept, setListAllAccpet] = useState([]);
    const [listNotifications, setListNotifications] = useState([]);
    const [Notifications, setNotifications] = useState('');
    const [check, setChek] = useState(false);
    //const [ quantity, setQuantity ] = useState();
    useFocusEffect(
        React.useCallback(() => {
            setChek(false);
            getListIsDisplay();
            getListWaiting();
            getListDenied();
            getListApplyStatus0();
            getListApplyStatus1();
            getListApplyStatus2();
            getListApplyStatus3();
            getListApplyStatus4();
            getListNotification();
            getListApply();
            getAllData();
            getListApply3();
        }, [])
    );
    const getAllData = async () => {
        try {
            //All Career
            axios({
                url: `${API}/careers/listCareersForApp`,
                method: "GET",
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data)
                    await AsyncStorage.setItem('listCareers', data);
                }
            })
            //All WorkType
            axios({
                url: `${API}/workTypes/list`,
                method: "GET",
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data)
                    await AsyncStorage.setItem('listWorkTypes', data);
                }
            })
            //All PayForm
            axios({
                url: `${API}/payforms/list`,
                method: "GET",
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data)
                    await AsyncStorage.setItem('listPayForms', data);
                }
            })
            //All Academic
            axios({
                url: `${API}/acedemics/list`,
                method: "GET"
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data)
                    await AsyncStorage.setItem('listAcademics', data);
                }
            })
            //All Gender
            axios({
                url: `${API}/gender/list`,
                method: "GET"
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data)
                    await AsyncStorage.setItem('listGenders', data);
                }
            })
            //All Experience
            axios({
                url: `${API}/experiences/list`,
                method: "GET"
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data)
                    await AsyncStorage.setItem('listExperiences', data);
                }
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    async function getListIsDisplay() {
        try {
            axios({
                url: `${API}/posts/listJobsIsDisplayForApp`,
                method: "POST",
                data: {
                    id: user._id,
                },
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data);
                    await AsyncStorage.setItem('listJobsIsDisplay', data);
                    setListIsDisplay(response.data);
                }
            })

        } catch (error) {
            console.log("Err : ", error);
        }
    }

    async function getListWaiting() {
        try {
            axios({
                url: `${API}/posts/listJobsWaitingForApp`,
                method: "POST",
                data: {
                    id: user._id,
                },
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data);
                    await AsyncStorage.setItem('listJobsWaiting', data);
                    setListWaiting(response.data);
                }
            })
        } catch (error) {
            console.log("Err : ", error);
        }
    }

    async function getListDenied() {
        try {
            axios({
                url: `${API}/posts/listJobsDeniedForApp`,
                method: "POST",
                data: {
                    id: user._id,
                },
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data)
                    await AsyncStorage.setItem('listJobsDenied', data);
                    setListDenied(response.data);
                }
            })

        } catch (error) {
            console.log("Err : ", error);
        }
    }

    async function getListApplyStatus0() {
        try {
            const result = await axios.post(`${API}/apply//unRead`, { id: user._id });
            if (result.status === 200) {
                setListUnread(result.data)
            }
        } catch (error) {
            console.log('Err : ', error);
        }
    }
    async function getListApplyStatus1() {
        try {
            const result = await axios.post(`${API}/apply//Pending`, { id: user._id });
            if (result.status === 200) {
                setListPending(result.data);
            }
        } catch (error) {
            console.log('Err : ', error);
        }
    }
    async function getListApplyStatus2() {
        try {
            const result = await axios.post(`${API}/apply//Reject`, { id: user._id });
            if (result.status === 200) {
                setListReject(result.data);
            }
        } catch (error) {
            console.log('Err : ', error);
        }
    }
    async function getListApplyStatus3() {
        try {
            const result = await axios.post(`${API}/apply//Accept`, { id: user._id });
            if (result.status === 200) {
                setListAccept(result.data);
            }
        } catch (error) {
            console.log('Err : ', error);
        }
    }
    async function getListApplyStatus4() {
        try {
            const result = await axios.post(`${API}/apply//Bargain`, { id: user._id });
            if (result.status === 200) {
                setListBargain(result.data);
            }
        } catch (error) {
            console.log('Err : ', error);
        }
    }
    async function getListNotification() {
        try {
            const response = await axios.post(`${API}/notifications/listNoSeen`, { receiver_id: user._id });
            if (response.status === 200) {
                const data = [...response.data];
                if (data.length > 0) {
                    setChek(!check);
                }
            }
        } catch (error) {
            console.log('err', error);
        }
    }
    async function getListApply() {
        try {
            const result = await axios.get(`${API}/apply//listAll`);
            if (result.status === 200) {
                setListApplied(result.data);
            }
        } catch (error) {
            console.log('Err : ', error);
        }
    }
    async function getListApply3() {
        try {
            const result = await axios.get(`${API}/apply//listAllAccept`);
            if (result.status === 200) {
                setListAllAccpet(result.data);
            }
        } catch (error) {
            console.log('Err : ', error);
        }
    }
    const openNotification = () => {
        navigation.navigate('Notifications');
        setChek(false);
    };
    var number = 0;
    const list = () => {
        let a = listAllAccept.length / listApplied.length * 100;
        if (!isNaN(a) && isFinite(a)) {
           number = a;
        }
    }
    list();
    return (
        <SafeAreaView style={styles.container}>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 18,
                    marginTop: '2%',
                    width: '100%',
                    height: 60,
                    paddingLeft: 20,
                    paddingRight: 20,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        marginStart: '2%',
                        alignItems: 'center',
                        width: '68%',
                    }}>
                    <ImageBackground
                        source={{ uri: user.photo }}
                        style={{ width: 46, height: 46 }}
                        imageStyle={{ borderRadius: 46 }} />
                    <View style={{ flexDirection: 'column', height: 46, justifyContent: 'center', marginStart: 13, }}>
                        <Text style={{ color: '#7D7A7A', fontSize: 16, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>Xin chào 👋</Text>
                        <Text style={{width:'55%', color: COLORS.black, fontSize: 20, fontFamily: 'BeVietnamPro-Bold', marginTop: -4, }} numberOfLines={1}>{user.displayName}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        width: 46,
                        height: 46,
                        borderWidth: 0.4,
                        borderColor: COLORS.grey,
                        borderRadius: 46,
                        alignItems: 'center',
                        marginRight: '5%',
                        justifyContent: 'center',
                    }}
                    onPress={() => openNotification()}>
                    {/* <Feather name='bell' size={24} color={COLORS.black}/> */}
                    {
                        check ? (
                            <IconWithBadge iconName="bell" badgeText="4" />
                        ) : <IconWithBadge iconName="bell" badgeText="" />
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 46,
                        height: 46,
                        borderWidth: 0.4,
                        borderColor: COLORS.grey,
                        borderRadius: 46,
                        marginEnd: '2%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => navigation.navigate('MessageScreen')}>
                    {/* <AntDesign name='message1' size={24} color={COLORS.black}/> */}
                    <IconWithBadgeAntDesign iconName="message1" badgeText="2" />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}
                style={styles.scroll}>
                <View style={{ marginTop: 15, height: 100, backgroundColor: '#6295FF', borderRadius: 15, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginLeft: 30 }}>
                        <CircularProgress
                            value={number}
                            inActiveStrokeColor={COLORS.white}
                            activeStrokeColor={'#FFC069'}
                            progressValueColor={'#fff'}
                            valueSuffix={'%'}
                            radius={33}
                            activeStrokeWidth={11}
                            inActiveStrokeWidth={11}
                            progressValueStyle={{ fontWeight: '500', fontSize: 16 }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ marginLeft: 38, color: COLORS.white, fontSize: 19, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>Thống kê tuyển dụng</Text>
                        <Text style={{ marginLeft: 38, color: COLORS.white, fontSize: 14, fontFamily: 'BeVietnamPro-Medium', marginTop: 2, }}>Tỉ lệ tìm được nhân sự</Text>
                    </View>
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginBottom: 15, marginTop: 15 }}>
                    <View style={{ width: '100%', marginBottom: 10 }}>
                        <Text style={{ fontSize: 20, fontStyle: 'normal', color: COLORS.black, fontFamily: 'BeVietnamPro-Bold', marginTop: -4, }}>Quản lý bài đăng</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 80,
                                flexDirection: 'row',
                                borderRadius: 15,
                                paddingHorizontal: 15,
                                backgroundColor: '#DEE9FF',
                                paddingVertical: 10,
                                alignItems: 'center',
                                borderColor: COLORS.grey,
                            }}>
                            <View style={{ width: 6, height: '90%', backgroundColor: '#246BFD', borderRadius: 20 }} />
                            <View style={{ marginLeft: '5%' }}>
                                <Text style={{ marginBottom: '3%', fontSize: 16, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, color: COLORS.black }}>Bài đăng đã được duyệt</Text>
                                <Text style={{ fontSize: 14, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>{listIsDisplay.length} tin</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 80,
                                flexDirection: 'row',
                                borderRadius: 15,
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                alignItems: 'center',
                                marginVertical: 15,
                                backgroundColor: '#FFFBED',
                                borderColor: COLORS.grey,
                            }}>
                            <View style={{ width: 6, height: '90%', backgroundColor: '#FBCD17', borderRadius: 20 }} />
                            <View style={{ marginLeft: '5%' }}>
                                <Text style={{ marginBottom: '3%', fontSize: 16, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, color: COLORS.black }}>Bài đăng đang chờ duyệt</Text>
                                <Text style={{ fontSize: 14, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>{listWaiting.length} tin</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 80,
                                flexDirection: 'row',
                                borderRadius: 15,
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                alignItems: 'center',
                                backgroundColor: '#FFF2F2',
                                borderColor: COLORS.grey,
                            }}>
                            <View style={{ width: 6, height: '90%', backgroundColor: '#F75555', borderRadius: 20 }} />
                            <View style={{ marginLeft: '5%' }}>
                                <Text style={{ marginBottom: '3%', fontSize: 16, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, color: COLORS.black }}>Bài đăng bị từ chối</Text>
                                <Text style={{ fontSize: 14, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>{listDenied.length} tin</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ width: '100%', alignItems: 'center', marginBottom: 15, marginTop: 5 }}>
                    <View style={{ width: '100%', marginBottom: 15 }}>
                        <Text style={{ fontSize: 20, fontStyle: 'normal', color: COLORS.black, fontFamily: 'BeVietnamPro-Bold', marginTop: -4, }}>Hồ sơ ứng tuyển</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 165,
                                backgroundColor: '#246BFD',
                                borderRadius: 20,
                                marginRight: 10,
                                paddingVertical: 10,
                            }}
                        >
                            {/* <ImageBackground
                                source={require('../assets/images/E.png')}
                                style={{ width: '100%', height: '100%', borderRadius: 15 }}
                                imageStyle={{ position: 'absolute', borderRadius: 20 }}
                            /> */}
                            <View style={{ flex: 1 }} />
                            <Text style={{ width: '50%', fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, marginBottom: '3%', marginHorizontal: 10, color: COLORS.white }}>Chưa xem</Text>
                            <Text style={{ fontSize: 14, marginHorizontal: 10, color: COLORS.white, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>{listUnRead.length}</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 165,
                                backgroundColor: '#FBCA17',
                                borderRadius: 20,
                                marginRight: 10,
                                paddingVertical: 10,
                            }}
                        >
                            {/* <ImageBackground
                                source={require('../assets/images/E.png')}
                                style={{ width: '100%', height: '100%', borderRadius: 15 }}
                                imageStyle={{ position: 'absolute', borderRadius: 20 }}
                            /> */}
                            <View style={{ flex: 1 }} />
                            <Text style={{ width: '33%', fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginBottom: '3%', marginHorizontal: 10, marginTop: '-60%', color: COLORS.white }}>Chờ xử lý</Text>
                            <Text style={{ fontSize: 14, marginHorizontal: 10, color: COLORS.white, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>{listPending.length}</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 165,
                                backgroundColor: '#F75656',
                                borderRadius: 20,
                                marginRight: 10,
                                paddingVertical: 10,
                            }}
                        >
                            {/* <ImageBackground
                                source={require('../assets/images/E.png')}
                                style={{ width: '100%', height: '100%', borderRadius: 15 }}
                                imageStyle={{ position: 'absolute', borderRadius: 20 }}
                            /> */}
                            <View style={{ flex: 1 }} />
                            <Text style={{ width: '40%', fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginBottom: '3%', marginHorizontal: 10, marginTop: '-60%', color: COLORS.white }}>Từ chối</Text>
                            <Text style={{ fontSize: 14, marginHorizontal: 10, color: COLORS.white, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>{listReject.length}</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 165,
                                backgroundColor: '#FF852D',
                                borderRadius: 20,
                                marginRight: 10,
                                paddingVertical: 10,
                            }}
                        >
                            {/* <ImageBackground
                                source={require('../assets/images/E.png')}
                                style={{ width: '100%', height: '100%', borderRadius: 15 }}
                                imageStyle={{ position: 'absolute', borderRadius: 20 }}
                            /> */}
                            <View style={{ flex: 1 }} />
                            <Text style={{ width: '60%', fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginBottom: '3%', marginHorizontal: 10, marginTop: '-60%', color: COLORS.white }}>Thương lượng</Text>
                            <Text style={{ fontSize: 14, marginHorizontal: 10, color: COLORS.white, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>{listBargain.length}</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 165,
                                backgroundColor: '#08BE75',
                                borderRadius: 20,
                                paddingVertical: 10,
                            }}
                        >
                            {/* <ImageBackground
                                source={require('../assets/images/R.jpg')}
                                style={{ width: '100%', height: '100%', borderRadius: 15 }}
                                imageStyle={{ position: 'absolute', borderRadius: 20 }}
                            /> */}
                            <View style={{ flex: 1 }} />
                            <Text style={{ width: '50%', fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginBottom: '3%', marginHorizontal: 10, marginTop: '-60%', color: COLORS.white }}>Đã duyệt</Text>
                            <Text style={{ fontSize: 14, marginHorizontal: 10, color: COLORS.white, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>{listAccept.length}</Text>

                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    scroll: {
        paddingHorizontal: 20,
    },
});
export default EmployerHome;