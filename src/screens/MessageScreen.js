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
import { FlatList, Image, Text, ImageBackground, TouchableOpacity, View, StyleSheet, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation, useFocusEffect } from '@react-navigation/native';
import UserContext from '../components/UserConText';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MessageScreen = ({ navigation }) => {
    useEffect(() => {
        getUsers();
    }, [])
    useFocusEffect(
        React.useCallback(() => {
            getUsers();
        }, [])
    );


    const [users, setUsers] = useState([]);
    const { user } = useContext(UserContext);
    const now = new Date();

    const getUsers = async () => {
        // const id = user._id;
        // const chatRef = firestore().collection('chats');
        // const chatSnapshot = await chatRef.where('participants', 'array-contains', id).get();
        // console.log(chatSnapshot);
        // const userIds = chatSnapshot.docs.map(doc => {
        //     const participants = doc.data().participants;
        //     return participants.filter(participantId => participantId !== user._id)[0];
        // });
        // const usersSnapshot = await firestore().collection('users').where('_id', 'in', userIds).get();
        // const users = usersSnapshot.docs.map(doc => doc.data());
        // setUsers(users);
        let tempData = [];
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
                        const formattedDate = date.toLocaleString(); // Chuyển đổi thành định dạng thời gian đọc được
                        if (date.toDateString() === now.toDateString()) {
                            const time = formattedDate.slice(0, 5);
                            newData.time = time;
                        } else {
                            const formattedDate = date.toLocaleDateString(); // Lấy ngày từ đối tượng Date
                            console.log(formattedDate);
                            newData.time = formattedDate;
                        }
                        newData.last = last;
                        tempData.push(newData);
                    }
                }
                setUsers(tempData);
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
                navigation.navigate('ChatScreen', { item })
            }}>
                <View style={{ flexDirection: 'row', gap: 18 }}>
                    <Image source={{ uri: item.photo }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontFamily: 'BeVietnamPro-Medium', marginTop: -2, }} numberOfLines={1}>
                            {item.displayName}
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 6 }} numberOfLines={1}>
                                {item.last.text}
                            </Text>
                            <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 6 }} numberOfLines={1}>
                                • {item.time}
                            </Text>
                        </View>

                    </View>
                    <View style={{ alignItems: "flex-end", marginEnd: 3 }}>
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
                            <Entypo name='dots-three-vertical' size={14} color={COLORS.grey} />
                        </TouchableOpacity>
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