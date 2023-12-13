/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable eqeqeq */
/* eslint-disable keyword-spacing */
/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable semi */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Pressable, FlatList, ActivityIndicator } from 'react-native';


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
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const NotificationScreen = ({ route, navigation }) => {

    const [notification, setNotification] = useState([]);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            getListNotification();
        }, [])
    );

    const getListNotification = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const data = await AsyncStorage.getItem('listNotifications');
            setNotification(JSON.parse(data))
            setLoading(false);
        } catch (error) {
            console.log("Err : ", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }
    const renderItem = ({ item }) => (
        <View style={{
            width: "100%",
            marginBottom: 18,
            // borderWidth: 0.5,
            // borderColor: COLORS.grey,
            // borderRadius: 10,
            padding: 10,
        }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('DetailNotification', {
                        _id: item._id,
                        receiver_id : item.receiver_id,
                        sender_id : item.sender_id,
                        post_id : item.post_id,
                        cv_id : item.cv_id,
                        typeNotification : item.typeNotification,
                        date : item.date,
                        time : item.time,
                    });
                }}>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View style={{ width: 60, height: 60, borderRadius: 60, alignItems: 'center', justifyContent: 'center' }}>
                        {item.typeNotification == 'problem1' ? (
                            <FontAwesome name='briefcase' size={30} color="#FD9B10" />
                        ) : item.typeNotification == 'problem2' ? (
                            <FontAwesome name='briefcase' size={30} color={COLORS.red} />
                        ) : <FontAwesome name='briefcase' size={30} color={COLORS.blue} />
                        }
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.black }}>Đơn ứng tuyển mới</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: COLORS.black, opacity: 0.5 }}>{item.time}</Text>
                    </View>
                    <View style={{ width: 40, height: 23, borderRadius: 5, backgroundColor: COLORS.blue, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 8, color: COLORS.white }}>News</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 16, fontWeight: '400', color: COLORS.black, opacity: 0.8 }}>{item.sender_id.displayName} đã ứng tuyển bài đăng {item.post_id.title} của bạn!</Text>
            </TouchableOpacity>
        </View>

    );
    return (
        <SafeAreaView style={{ flex: 1, paddingVertical: 18, backgroundColor: COLORS.white }}>
            {loading ? (
                <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <><View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 18,
                        paddingBottom: 15,
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={30} color={COLORS.black} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20, alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, fontWeight: "600", color: COLORS.black }}>Thông báo</Text>
                    </View>
                </View>
                    <FlatList
                        data={notification}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{ alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center' }}>
                                    <ImageBackground
                                        source={require('../assets/images/5928293_2953962.jpg')}
                                        style={{ width: "108%", height: 430, marginEnd: '9%', marginBottom: -25 }} />
                                    <Text style={{ fontSize: 22, color: COLORS.black, fontWeight: '700' }}>Empty</Text>
                                    <Text style={{ fontSize: 16, marginTop: 7, marginBottom: '50%' }}>You don’t have any notifications at this time</Text>
                                </View>
                            );
                        }} /></>
            )}
        </SafeAreaView>
    );
}
export default NotificationScreen;