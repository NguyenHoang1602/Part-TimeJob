/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Pressable, FlatList, Image, ScrollView, RefreshControl, ToastAndroid } from 'react-native';
import React, { useContext, useState } from 'react'
import COLORS from '../assets/const/colors';
import UserContext from '../components/UserConText';

import Input from '../components/Input';
import Button from '../components/Button';
//icon
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { Layout } from 'react-native-reanimated';
import { API } from '../../Sever/sever';
import { SafeAreaView } from 'react-native-safe-area-context';

const ApplicationsScreen = ({ route, navigation }) => {
    const { user } = useContext(UserContext);
    const [listApplied, setListApplied] = useState([]);
    const [list, setList] = useState([]);
    const [isFocusedSearch, setIsFocusedSearch] = useState(false);
    const [check, setChek] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            getAllApplied()
            getListNotification()
        }, [])
    );
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
    const openNotification = () => {
        navigation.navigate('Notifications');
        setChek(false);
    };
    const getAllApplied = async () => {
        try {
            const response = await axios.post(`${API}/apply/listMyApplied`, {
                id: user._id
            });
            if (response.status === 200) {
                const data = JSON.stringify(response.data);
                await AsyncStorage.setItem('listMyApplied', data)
                setListApplied(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleSearch = async (key) => {
        const data = await AsyncStorage.getItem('listMyApplied');
        if (key === "") {
            setListApplied(JSON.parse(data));
            setList(JSON.parse(data));
        } else {
            try {
                const filteredData = list.filter((apply) => {
                    const titleA = apply.post_id.title.toLowerCase();
                    const keyA = key.toLowerCase();
                    const find = titleA.indexOf(keyA) !== -1;
                    return find
                });
                setListApplied(filteredData);
            } catch (error) {
                console.log(error);
            }
        }
    }
    const fetchData = async () => {
        setRefreshing(true);
        setTimeout(async () => {
            try {
                const response = await axios.post(`${API}/apply/listMyApplied`, {
                    id: user._id
                });
                if (response.status === 200) {
                    const data = JSON.stringify(response.data);
                    await AsyncStorage.setItem('listMyApplied', data);
                    setListApplied(response.data);
                }
                setRefreshing(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setRefreshing(false);
            } finally {
                setRefreshing(false);
            }
            setRefreshing(false);
        }, 2000);
    };

    const renderItemApplications = ({ item }) => {
        const formattedWageMin = item?.post_id?.wageMin.toLocaleString('vi-VN');
        const formattedWageMax = item?.post_id?.wageMax.toLocaleString('vi-VN');
        const formattedBarSalary = item?.bargain_salary.toLocaleString('vi-VN');
        return (
            <TouchableOpacity style={styles.items}
                onPress={() => navigation.navigate('ApplicationsStage', {
                    id: item._id,
                    title: item?.post_id?.title,
                    businessName: item?.post_id?.businessName,
                    address: item?.post_id?.address,
                    wageMin: formattedWageMin,
                    wageMax: formattedWageMax,
                    workType_id: item?.post_id?.workType_id,
                    cv_id: item?.cv_id._id,
                    status: item?.status,
                    image: item?.post_id?.image,
                    bargain_Salary: formattedBarSalary,
                    feedback: item?.feedback,
                    post_id: item?.post_id?._id,
                    receiver_id: item?.receiver_id,
                })}>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>

                    {item?.post_id?.image.map((imageUrl, index) => {
                        if (index === 0) {
                            return (
                                <ImageBackground
                                    key={index}
                                    source={{ uri: imageUrl }}
                                    style={{ width: 54, height: 54, marginBottom: 5 }}
                                    imageStyle={{ borderRadius: 5 }}
                                />
                            );
                        }
                    })}
                    <View style={{ flex: 1, marginLeft: '5%' }}>
                        <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: '600', color: '#212121', width: '99%' }}>{item?.post_id?.title}</Text>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: '#616161', marginTop: 5 }} numberOfLines={1}>{item?.post_id?.businessName}</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                        }}>
                        <AntDesign name="right" size={21} color="#212121" />
                    </TouchableOpacity>
                </View>
                {
                    item?.status === 0 ? (
                        <View style={{
                            width: 80,
                            backgroundColor: '#E7EFFF',
                            borderRadius: 6,
                            padding: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginStart: '20%',
                            marginTop: '2%',
                        }}>
                            <Text style={{ fontSize: 9.5, color: '#246BFE' }} >Hồ sơ đã gửi</Text>
                        </View>
                    ) : item.status === 1 ? (
                        <View style={{
                            width: 100,
                            backgroundColor: '#FFF4CD',
                            borderRadius: 6,
                            padding: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginStart: '20%',
                            marginTop: '3%',
                        }}>
                            <Text style={{ fontSize: 9.5, color: '#FBCA17' }} >Hồ sơ đang xử lí</Text>
                        </View>
                    ) : item.status === 2 ? (
                        <View style={{
                            width: 105,
                            backgroundColor: '#FDD9DA',
                            borderRadius: 6,
                            padding: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginStart: '20%',
                            marginTop: '2%',
                        }}>
                            <Text style={{ fontSize: 9.5, color: '#F75656' }} >Hồ sơ bị từ chối</Text>
                        </View>
                    ) : item.status === 4 ? (
                        <View style={{
                            width: 100,
                            backgroundColor: '#FFCAA3',
                            borderRadius: 6,
                            padding: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginStart: '20%',
                            marginTop: '2%',
                        }}>
                            <Text style={{ fontSize: 9.5, color: '#FF6B00' }} >Đang thương lượng</Text>
                        </View>
                    ) :
                        <View style={{
                            width: 110,
                            backgroundColor: '#E7FEEE',
                            borderRadius: 6,
                            padding: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginStart: '20%',
                            marginTop: '2%',
                        }}>
                            <Text style={{ fontSize: 9.5, color: '#08BE75' }} >Ứng tuyển thành công</Text>
                        </View>
                }
                <View style={{ height: 1, width: '99%', backgroundColor: COLORS.grey, opacity: 0.4, marginTop: 15, marginBottom: 8 }} />


            </TouchableOpacity>
        )
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{
                paddingBottom: 5,
                paddingHorizontal: 18,
                paddingTop: 20,
                gap: 26,
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, }}>
                    <ImageBackground
                        source={require('../assets/images/SignIn/LogoSignInUp.png')}
                        style={{ width: 26, height: 26 }}
                        imageStyle={{ borderRadius: 46 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: COLORS.black, fontSize: 24, fontWeight: '600' }} numberOfLines={1}>Applications</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            ToastAndroid.show('Đang phát triển', ToastAndroid.SHORT);
                        }}
                        style={{
                            width: 46,
                            aspectRatio: 1,
                            borderRadius: 52,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            borderColor: COLORS.grey,
                        }}
                    >
                        <Entypo name='dots-three-vertical' size={20} color={COLORS.black} />
                    </TouchableOpacity>
                </View>
                {/* Search */}
                <View
                    style={{
                        flexDirection: 'row',
                        height: 50,
                        borderRadius: 15,
                        alignItems: 'center',
                        paddingHorizontal: 18,
                        backgroundColor: !isFocusedSearch ? COLORS.lightGrey : '#E9F0FF',
                        borderWidth: 1,
                        borderColor: !isFocusedSearch ? COLORS.white : COLORS.primary
                    }}>
                    <Feather name='search' size={24} color={!isFocusedSearch ? COLORS.grey : COLORS.primary} />
                    <TextInput
                        placeholder="Tìm kiếm . . ."
                        placeholderTextColor={COLORS.grey}
                        onChangeText={value => {
                            handleSearch(value)
                        }}
                        onFocus={() => { setIsFocusedSearch(!isFocusedSearch) }}
                        onBlur={() => { setIsFocusedSearch(!isFocusedSearch) }}
                        style={{ flex: 1, fontSize: 16, color: COLORS.black, paddingHorizontal: 10, }} />
                    <TouchableOpacity onPress={() => {

                    }}>
                        <FontAwesome6 name='sliders' size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.body}
                keyboardShouldPersistTaps={'always'}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={fetchData}
                    colors={['#0000ff']}
                />}>
                <FlatList
                    data={listApplied}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItemApplications}
                    nestedScrollEnabled={true}
                    scrollEnabled={false}
                    ListEmptyComponent={() => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ImageBackground
                                source={require('../assets/images/5928293_2953962.jpg')}
                                style={{ width: "100%", height: 430 }}
                            />
                            <Text style={{ fontSize: 22, color: COLORS.black, fontWeight: '600', textAlign: 'center'}}>Không tìm thấy công việc đã ứng tuyển</Text>
                        </View>
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: COLORS.blue,
        backgroundColor: COLORS.white,
    },
    header: {
        paddingHorizontal: 18,
        paddingTop: 10,
        gap: 5,
    },
    headerA: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
        width: '100%',
        height: 60,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: '1%',
        width: '68%',
    },
    headerRight: {
        width: 40,
        height: 40,
        borderWidth: 0.4,
        borderColor: COLORS.grey,
        borderRadius: 40,
        alignItems: 'center',
        marginRight: '1%',
        justifyContent: 'center',
        marginStart: '18%',
    },
    body: {
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
    },
    items: {
        marginTop: '3%',
    },
});

export default ApplicationsScreen;