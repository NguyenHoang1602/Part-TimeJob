/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, Text, ImageBackground, TouchableOpacity, View, StyleSheet, ToastAndroid, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation, useFocusEffect } from '@react-navigation/native';
import UserContext from '../components/UserConText';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import COLORS from '../assets/const/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "react-native-push-notification";

const MessageScreen = ({ navigation }) => {
    useEffect(() => {
        getUsers();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getUsers();
        }, [])
    );

    // PushNotification.configure({
    //     // (optional) Called when Token is generated (iOS and Android)
    //     onRegister: function (token) {
    //         getUsers();
    //     },
    // });

    const [users, setUsers] = useState([]);
    const { user } = useContext(UserContext);
    const [isFocusedSearch, setIsFocusedSearch] = useState(false);
    const [list, setList] = useState([]);
    const now = new Date();

    const handleSearch = async (key) => {
        const data = await AsyncStorage.getItem('listMess');
        if (key === "") {
            setUsers(JSON.parse(data));
            setList(JSON.parse(data));
        } else {
            try {
                const filteredData = list.filter((name) => {
                    const titleA = name.displayName.toLowerCase();
                    const keyA = key.toLowerCase();
                    const find = titleA.indexOf(keyA) !== -1;
                    return find;
                });
                setUsers(filteredData);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const getUsers = async () => {
        const tempData = [];
        firestore()
            .collection('users')
            .where('_id', '!=', user._id)
            .get()
            .then(async res => {
                if (res.docs.length != 0) {
                    for (const item of res.docs) {
                        const newData = item.data();
                        const last = await getLastMess(item.data());
                        const timeSend = last.createdAt;
                        const date = new Date(timeSend); // Tạo đối tượng Date từ số miligiây
                        newData.date = date;
                        const formattedDate = date.toLocaleTimeString(); // Chuyển đổi thành định dạng thời gian đọc được
                        console.log(formattedDate);
                        if (date.toDateString() === now.toDateString()) {
                            const time = formattedDate.slice(0, 5);
                            newData.time = time;
                        } else {
                            const formattedDate = date.toLocaleDateString(); // Lấy ngày từ đối tượng Date
                            newData.time = formattedDate;
                        }
                        newData.last = last;
                        tempData.push(newData);
                    }
                }
                checkAndSort(tempData);
            });
    };
    const getLastMess = async (items) => {
        return new Promise((resolve, reject) => {
            const subscriber = firestore()
                .collection('chats')
                .doc(user._id + items?._id)
                .collection('messages')
                .orderBy('createdAt', 'desc')
                .limit(1);

            subscriber.onSnapshot(querySnapshot => {
                const lastMess = querySnapshot.docs.map(item => {
                    return { ...item._data, createdAt: item._data.createdAt };
                });
                const lastText = lastMess.length > 0 ? lastMess[0] : '';
                resolve(lastText);
            }, error => {
                reject(error);
            });
        });
    };
    const checkAndSort = async (items = []) => {
        console.log("day : ", items);
        const tempData = [];
        items.map(async (item) => {
            if (item.last) {
                //console.log(item);
                tempData.push(item);
            }
        })
        tempData.sort((a, b) => {
            return b.date - a.date;
        })
        const data = JSON.stringify(tempData);
        await AsyncStorage.setItem('listMess', data);

        setUsers(tempData);
    }

    const FlatListb = () => {
        return (
            <FlatList
                data={users}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItemJob}
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 180 }}>
                        <ImageBackground
                            source={require('../assets/images/5928293_2953962.jpg')}
                            style={{ width: "100%", height: 300 }}
                        />
                        <Text style={{ fontSize: 22, color: COLORS.black, fontFamily: 'BeVietnamPro-Medium', marginTop: -2 }}>Không có tin nhắn</Text>
                    </View>
                )}
            />
        );
    }

    const renderItemJob = ({ item }) => (
        <View style={{ padding: 18, }}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('ChatScreen', {
                    id: item?._id,
                    displayName: item?.displayName,
                    photo: item?.photo
                })
            }}>
                <View style={{ flexDirection: 'row', gap: 18 }}>
                    <Image source={{ uri: item.photo }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontFamily: 'BeVietnamPro-Medium', marginTop: -2, }} numberOfLines={1}>
                            {item.displayName}
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 6 }} numberOfLines={1}>
                                {item.last.sendBy === user._id ? ("Bạn : " + item.last.text) : (item.displayName + " : " + item.last.text)}
                            </Text>
                            <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 6 }} numberOfLines={1}>
                                • {item.time}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

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
                        <Text style={{ color: COLORS.black, fontSize: 24, fontFamily: 'BeVietnamPro-Bold', marginTop: -5 }} numberOfLines={1}>Messages</Text>
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
            </View>
            {/* Search */}
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    borderRadius: 15,
                    alignItems: 'center',
                    paddingHorizontal: 18,
                    marginHorizontal: 18,
                    marginTop: 20,
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
                    style={{ flex: 1, fontSize: 16, fontFamily: 'BeVietnamPro-Medium', marginTop: -2, color: COLORS.black, paddingHorizontal: 10, }} />
                {/* <TouchableOpacity onPress={() => {

                }}>
                    <FontAwesome6 name='sliders' size={20} color={COLORS.primary} />
                </TouchableOpacity> */}
            </View>
            <FlatListb />
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: COLORS.blue,
        backgroundColor: COLORS.white,
    },
    header: {
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,

    },
    headera: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
        width: '100%',
        height: 60,
    },
    headeraLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: '1%',
        width: '68%',
        flex: 1,
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

export default MessageScreen;