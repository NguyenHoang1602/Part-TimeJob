/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable semi */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

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
import Fontisto from 'react-native-vector-icons/Fontisto';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const DetailsScreen = ({ route, navigation }) => {

    const data = {
        title: route.params?.title,
        id: route.params?.id,
        uri: route.params?.uri,
        address: route.params?.address,
        wage_max: route.params?.wage_max,
        wage_min: route.params?.wage_min,
        worktype: route.params?.worktype_id,
        Details: route.params?.describe,
        age_min: route.params?.age_min,
        age_max: route.params?.age_max,
        business_name: route.params?.business_name,
        payform: route.params?.payform_id,
        experience: route.params?.experience_id,
        quantity: route.params?.quantity,
        status: route.params?.status_id,
        users: route.params?.users_id,
        careers: route.params?.career_id,
        acedemics: route.params?.acedemic_id,
    };

    return (
        <SafeAreaView style={{ flex: 1, paddingVertical: 18 }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 18, paddingBottom: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color={COLORS.black} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text></Text>
                </View>
                <TouchableOpacity onPress={console.log(data)}>
                    <Icon style={{ marginRight: 22 }} name="bookmark-plus-outline" size={30} color={COLORS.black} />
                </TouchableOpacity>
                <Ionicons name="ellipsis-horizontal-circle" size={30} color={COLORS.black} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 22 }}>
                <View style={{ width: '100%', height: 250, backgroundColor: COLORS.grey, marginBottom: 25 }}>
                </View>
                <View
                    style={{
                        width: '100%',
                        height: 165,
                        marginBottom: 25,
                        borderWidth: 0.8,
                        borderColor: COLORS.grey,
                        borderRadius: 20,
                        paddingTop: 9,
                        paddingLeft: 23,
                    }}>
                    <Text style={{ fontSize: 22, color: COLORS.black, fontWeight: 'bold' }}>{data.title}</Text>
                    <Text style={{ color: '#FA1300', fontSize: 14, marginTop: 5, marginBottom: 7, fontWeight: 'bold' }}>${data.wage_min} - {data.wage_max} /month</Text>
                    <Text style={{ fontSize: 14, color: COLORS.grey }}>Post 10 days ago, end in 31 Dec</Text>
                    <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', marginBottom: 34 }}>
                        <ImageBackground
                            source={require('../assets/images/homescreen/avatar.png')}
                            style={{ width: 48, height: 48 }}
                            imageStyle={{ borderRadius: 48 }}
                        />
                        <Text style={{ color: COLORS.black, fontSize: 16, marginStart: 10, fontWeight: 'bold' }}>{data.users_id.displayName }</Text>
                    </View>
                </View>
                <View style={{ height: 3, width: '100%', backgroundColor: COLORS.blue, borderRadius: 50, marginBottom: 20, opacity: 0.9 }} />
                <View style={{ width: '100%' }}>
                    <Text style={{ fontSize: 15, fontStyle: 'normal', color: COLORS.black, opacity: 0.8 }}>[Nhà Hàng Hải Sản]  {'\n'}{'\n'}
                        ✨ #Cần_tuyển:
                        {'\n'}{'\n'}
                        ♻ #Vị_trí : phục vụ, phụ bếp , tạp vụ, giữ xe .
                        {'\n'}{'\n'}
                        🕐 #Thời_gian_làm_việc: 13h đến Hết Khách .
                        {'\n'}{'\n'}
                        🗳 #Quyền_lợi : tips + doanh thu tháng, ưu đãi nhân viên,...
                        {'\n'}{'\n'}
                        💶 #Lương : trên 8 Triệu (tiền bo tiền tiếp Nữ : 300k - 500k/ngày)
                        {'\n'}{'\n'}
                        📲 #Hotline :gặp (#Anh_Tài & #Chị_Tuyết)
                        {'\n'}{'\n'}
                        🚦 Yêu cầu :{'\n'}{'\n'}
                        ✅ Chỉ nhận làm ở lại tại Quán{'\n'}{'\n'}
                        ✅ Gọi trực tiếp để nhận việc không tiếp tin nhắn .
                        {'\n'}{'\n'}
                        📍 CHI NHÁNH tuyển :{'\n'}{'\n'}
                        * Đường : Hải Thượng Lãn Ông , Quận 5 .{'\n'}{'\n'}
                        * Đường : Nguyễn Thiện Thuật , Quận 3 .{'\n'}{'\n'}
                        * Đường : Bông Sao , Quận 8 .{'\n'}{'\n'}
                        * Đường : Phạm Ngũ Lão , Quận 1</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <AntDesign name="creditcard" size={24} color={COLORS.blue} />
                    <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Hình thức trả lương: {data.payform }</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <Octicons name="log" size={24} color={COLORS.blue} />
                    <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Loại công việc: {data.worktype}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <SimpleLineIcons name="briefcase" size={24} color={COLORS.blue} />
                    <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Ngành nghề: { data.careers}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <AntDesign name="carryout" size={24} color={COLORS.blue} />
                    <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Kinh nghiệm: {data.experience }</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <Octicons name="mortar-board" size={24} color={COLORS.blue} />
                    <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Trình độ học vấn: {data.acedemics }</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <Fontisto name="venus-mars" size={24} color={COLORS.blue} />
                    <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Giới tính: Không yêu cầu</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <FontAwesome name="building-o" size={24} color={COLORS.blue} />
                    <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Tên Công ty: {data.business_name}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <Octicons name="people" size={24} color={COLORS.blue} />
                    <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Số lượng tuyển dụng: {data.quantity }</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <AntDesign name="leftsquareo" size={24} color={COLORS.blue} />
                    <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Tuổi tối thiểu: {data.age_min }</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <AntDesign name="rightsquareo" size={24} color={COLORS.blue} />
                    <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Tuổi đa: {data.age_max}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', width: '90%' }}>
                    <Feather name="map-pin" size={24} color={COLORS.blue} />
                    <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>{data.address}</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center', paddingVertical: 50 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Thông tin tuyển dụng')}
                        style={{
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
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: COLORS.white,
                            }}>
                            Apply
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default DetailsScreen;