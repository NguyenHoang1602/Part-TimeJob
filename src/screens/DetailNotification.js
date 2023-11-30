/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../assets/const/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DetailNotification = ({ route, navigation }) => {
    const datalist = {
        _id: route.params?._id,
        receiver_id: route.params?.receiver_id,
        sender_id: route.params?.sender_id,
        post_id: route.params?.post_id,
        cv_id: route.params?.cv_id,
        typeNotification: route.params?.typeNotification,
        date: route.params?.date,
        time: route.params?.time,
    };
    const [data, setData] = useState(datalist);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}>
            <View
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
                    <Text style={{ fontSize: 22, fontWeight: "600", color: COLORS.black }}>Thông tin người ứng tuyển</Text>
                </View>
            </View>

            <View style={{ marginVertical: 22, marginHorizontal: 24 }}>
                <Text>
                    {data?.cv_id.name}
                </Text>

                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ width: '45%', justifyContent: 'flex-start' }}>
                        <Text>
                            {data?.cv_id.year}
                        </Text>
                    </View>
                    <View style={{ width: '45%', marginStart: '9.5%' }}>
                        <Text>
                            {data?.cv_id.gender}
                        </Text>
                    </View>
                </View>

                <View style={{}}>
                    <Text>
                        {data?.cv_id.address}
                    </Text>
                    <Text>
                        {data?.cv_id.experience}
                    </Text>
                    <Text>
                        {data?.cv_id.introduce}
                    </Text>
                </View>
            </View>

            <View style={{
                paddingHorizontal: 18,
            }}>
                <Text>
                    Bài đăng đã được ứng tuyển
                </Text>

                <TouchableOpacity style={{
                    borderWidth: 0.5,
                    borderColor: COLORS.grey,
                    borderRadius: 8,
                    marginBottom: 18,
                    padding: 15,
                }}>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        {data?.post_id.image.map((imageUrl, index) => {
                            if (index === 0) {
                                return (
                                    <ImageBackground
                                        key={index}
                                        source={{ uri: imageUrl }}
                                        style={{ width: 46, height: 46, marginBottom: 5 }}
                                        imageStyle={{ borderRadius: 5 }}
                                    />
                                );
                            }
                        })}
                        <View style={{ width: '50%', height: '100%', marginStart: 20, flex: 1 }}>
                            <Text style={{ fontSize: 18, fontWeight: '400' }}>{data?.post_id.title}</Text>
                            <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '400', color: COLORS.grey }}>{data?.post_id.address}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ChatScreen', {item : data?.sender_id});
                    }}
                    style={{
                        backgroundColor: 'rgba(51, 123, 255, 0.20)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 64,
                        position: "relative",
                        width: 160,
                        paddingVertical: 15,
                        marginEnd: 15,
                    }}>
                    <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: "600" }}>Nhắn tin</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { }}
                    style={{
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 64,
                        position: "relative",
                        width: 160,
                        paddingVertical: 15,
                    }}>
                    <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600" }}>Gọi điện</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default DetailNotification