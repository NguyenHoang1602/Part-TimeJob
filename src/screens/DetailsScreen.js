/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable semi */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Image } from 'react-native';

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
import AppIntroSlider from "react-native-app-intro-slider";
import { SIZES } from '../constants/theme';

const DetailsScreen = ({ route, navigation }) => {

    const data = {
        users_id: route.params?.users_id,
        address: route.params?.address,
        business_name: route.params?.business_name,
        image: route.params?.image,
        quantity: route.params?.quantity,
        title: route.params?.title,
        career_id: route.params?.career_id,
        payform_id: route.params?.payform_id,
        experience_id: route.params?.experience_id,
        acedemic_id: route.params?.acedemic_id,
        worktype_id: route.params?.worktype_id,
        describe: route.params?.describe,
        age_min: route.params?.age_min,
        age_max: route.params?.age_max,
        wage_min: route.params?.wage_min,
        wage_max: route.params?.wage_max,
        status_id: route.params?.status_id,
        date: route.params?.date,
        time: route.params?.time,
    };
    return (
        <SafeAreaView style={{ flex: 1, paddingBottom: 18, backgroundColor: COLORS.white }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 18, backgroundColor: COLORS.white, paddingVertical: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color={COLORS.black} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text></Text>
                </View>
                <TouchableOpacity>
                    <Icon style={{ marginRight: 22 }} name="bookmark-plus-outline" size={30} color={COLORS.black} />
                </TouchableOpacity>
                <Ionicons name="ellipsis-horizontal-circle" size={30} color={COLORS.black} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.white }}>
                <AppIntroSlider
                    showSkipButton={false}
                    showDoneButton={false}
                    showNextButton={false}
                    data={data.image}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ marginBottom: 25 }}>
                                <Image
                                    source={{ uri: item }}
                                    style={{
                                        width: '100%',
                                        height: 250,
                                    }}
                                />
                            </View>
                        )
                    }}
                    activeDotStyle={{
                        backgroundColor: COLORS.white,
                        width: 7,
                        height: 7,
                        marginTop: 5,
                    }}
                    dotStyle={{
                        backgroundColor: '#D9D9D9',
                        opacity: 0.5,
                        width: 7,
                        height: 7,
                        marginTop: 5,
                    }}
                />
                <View style={{ width: '100%', paddingHorizontal: 15 }}>
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
                        <Text style={{ fontSize: 14, color: COLORS.grey }}>{data.date} {data.time}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', marginBottom: 34 }}>
                            <ImageBackground
                                source={require('../assets/images/homescreen/avatar.png')}
                                style={{ width: 48, height: 48 }}
                                imageStyle={{ borderRadius: 48 }}
                            />
                            <Text style={{ color: COLORS.black, fontSize: 16, marginStart: 10, fontWeight: 'bold' }}>{data.users_id.displayName}</Text>
                        </View>
                    </View>
                    <View style={{ height: 3, width: '100%', backgroundColor: COLORS.blue, borderRadius: 50, marginBottom: 20, opacity: 0.9 }} />
                    <View style={{ width: '100%' }}>
                        <Text style={{ fontSize: 15, fontStyle: 'normal', color: COLORS.black, opacity: 0.8 }}>{data.describe}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <AntDesign name="creditcard" size={24} color={COLORS.blue} />
                        <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Hình thức trả lương: {data.payform_id.pf_title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <Octicons name="log" size={24} color={COLORS.blue} />
                        <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Loại công việc: {data.worktype}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <SimpleLineIcons name="briefcase" size={24} color={COLORS.blue} />
                        <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Ngành nghề: {data.career_id.c_title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <AntDesign name="carryout" size={24} color={COLORS.blue} />
                        <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Kinh nghiệm: {data.experience_id.e_title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <Octicons name="mortar-board" size={24} color={COLORS.blue} />
                        <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Trình độ học vấn: {data.acedemic_id.a_title}</Text>
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
                        <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Số lượng tuyển dụng: {data.quantity}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <AntDesign name="leftsquareo" size={24} color={COLORS.blue} />
                        <Text style={{ marginStart: 15, fontSize: 15, color: COLORS.black, opacity: 0.8 }}>Tuổi tối thiểu: {data.age_min}</Text>
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
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default DetailsScreen;