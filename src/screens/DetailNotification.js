/* eslint-disable eol-last */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ScrollView } from 'react-native';
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
                paddingBottom: 20,
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ margin: 10, paddingVertical: 22, paddingHorizontal: 24, flex: 1, backgroundColor: COLORS.white }}>
                    <View style={{ width: '115%', height: 70, backgroundColor: '#FF5D01', opacity: 0.7, position: 'absolute' }} />
                    <View style={{ width: '100%', alignItems: 'center', marginBottom: 20, flex: 1 }}>
                        <ImageBackground
                            source={{ uri: data?.cv_id.user_id.photo }}
                            style={{ width: 90, height: 90, marginBottom: 10 }}
                            imageStyle={{ borderRadius: 100 }} />
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>{data?.cv_id.title}</Text>
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text1}>Tên: </Text>
                        <Text style={{ fontSize: 16 }}>{data?.cv_id.name}</Text>
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Năm sinh: </Text>
                        <Text style={{ fontSize: 16, marginEnd: 25 }}>{data?.cv_id.year}</Text>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '500',
                            marginRight: 5,
                            marginLeft: '15%',
                        }}>Giới tính: </Text>
                        {
                            data?.cv_id.gender_id === '655f260103fd0dec424b970d' ? (
                                <Text style={{ fontSize: 16, marginEnd: 25 }}>Nam</Text>
                            ) : data?.cv_id.gender_id === '655f261603fd0dec424b970e' ? (
                                <Text style={{ fontSize: 16, marginEnd: 25 }}>Nữ</Text>
                            ) : <Text style={{ fontSize: 16, marginEnd: 25 }}>Khác</Text>
                        }
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Số ĐT: </Text>
                        <Text style={{ fontSize: 16, flex: 1 }}>{data?.cv_id.phone}</Text>
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Email: </Text>
                        <Text style={{ fontSize: 16 }}>{data?.cv_id.email}</Text>
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Địa chỉ: </Text>
                        <Text style={{ fontSize: 16 }}>{data?.cv_id.address}</Text>
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Trình dộ học vấn: </Text>
                        {
                            data?.cv_id.academic_id == '653e661f8e88b23b41388e3b' ? (
                                <Text style={{ fontSize: 16 }}>Trung cấp - Nghề</Text>
                            ) : data?.cv_id.academic_id == '655de6059a5b0ffa7ffd5134' ? (
                                <Text style={{ fontSize: 16 }}>Cấp 3</Text>
                            ) : data?.cv_id.academic_id == '655de6289a5b0ffa7ffd5135' ? (
                                <Text style={{ fontSize: 16 }}>Không yêu cầu</Text>
                            ) : data?.cv_id.academic_id == '655de6fc9a5b0ffa7ffd5136' ? (
                                <Text style={{ fontSize: 16 }}>Đại học</Text>
                            ) : data?.cv_id.academic_id == '655de7129a5b0ffa7ffd5137' ? (
                                <Text style={{ fontSize: 16 }}>Cao đẳng</Text>
                            ) : null
                        }
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Ngành nghề: </Text>
                        {
                            data?.cv_id.career_id == '6554b9b322054e51b8327165' ? (
                                <Text style={{ fontSize: 16 }}>Tạp vụ</Text>
                            ) : data?.cv_id.career_id == '6554b9ce22054e51b8327168' ? (
                                <Text style={{ fontSize: 16 }}> Nhân viên kho vận</Text>
                            ) : data?.cv_id.career_id == '6554b9de22054e51b832716b' ? (
                                <Text style={{ fontSize: 16 }}> Công nhân may</Text>
                            ) : data?.cv_id.career_id == '6554b9f522054e51b832716e' ? (
                                <Text style={{ fontSize: 16 }}> Bảo vệ</Text>
                            ) : data?.cv_id.career_id == '6554ba1922054e51b8327171' ? (
                                <Text style={{ fontSize: 16 }}> Pha chế</Text>
                            ) : data?.cv_id.career_id == '6558505e70f5b03183a9c903' ? (
                                <Text style={{ fontSize: 16 }}> Bán hàng</Text>
                            ) : data?.cv_id.career_id == '6558620586d0490539c8353c' ? (
                                <Text style={{ fontSize: 16 }}> Nhân viên phục vụ</Text>
                            ) : data?.cv_id.career_id == '65586aa480b16af7fdeef6f3' ? (
                                <Text style={{ fontSize: 16 }}> Nhân viên</Text>
                            ) : null
                        }
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Kinh nghiệm: </Text>
                        {
                            data?.cv_id.experience_id == '653e64098e88b23b41388e37' ? (
                                <Text style={{ fontSize: 16 }}>Không có</Text>
                            ) : data?.cv_id.experience_id == '653e64198e88b23b41388e38' ? (
                                <Text style={{ fontSize: 16 }}> dưới 1 năm</Text>
                            ) : data?.cv_id.experience_id == '655dea819a5b0ffa7ffd513c' ? (
                                <Text style={{ fontSize: 16 }}> Từ 1 - 2 năm</Text>
                            ) : data?.cv_id.experience_id == '655deab09a5b0ffa7ffd513e' ? (
                                <Text style={{ fontSize: 16 }}> Từ 3 - 4 năm</Text>
                            ) : data?.cv_id.experience_id == '655deac79a5b0ffa7ffd513f' ? (
                                <Text style={{ fontSize: 16 }}> Trên 4 năm</Text>
                            ) : null
                        }
                    </View>
                    <Text style={styles.text1}>Giới thiệu bản thân: </Text>
                    <Text style={{ fontSize: 16, marginTop: 5, marginBottom: 20 }}>- {data?.cv_id.introduce}</Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#FF5D01', opacity: 0.7, position: 'relative', }} />
                </View>

                <View style={{
                    paddingHorizontal: 18,
                }}>
                    <Text style={{ fontSize: 16, marginBottom: 15 }}>
                        Bài đăng đã được ứng tuyển :
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
                                <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: '400' }}>{data?.post_id.title}</Text>
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
                            navigation.navigate('ChatScreen', {
                                id: data?.sender_id?._id,
                                displayName: data?.sender_id?.displayName,
                                photo: data?.sender_id?.photo
                            });
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
                        onPress={() => navigation.navigate('CurriculumVitaeScreen')}
                        style={{
                            backgroundColor: COLORS.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 64,
                            position: "relative",
                            width: 160,
                            paddingVertical: 15,
                        }}>
                        <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600" }}>Hồ sơ</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    view1: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 15,
    },
    text1: {
        fontSize: 16,
        fontWeight: '500',
        marginRight: 20,
    },
    text2: {
        fontSize: 16,
        fontWeight: '500',
        marginRight: 5,
    },
});

export default DetailNotification;