/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, FlatList, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Modal from 'react-native-modal';
import COLORS from '../assets/const/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Sever/sever';
import UserContext from '../components/UserConText';

const TopTabScreenWaiting = ({ navigation }) => {

    const { user } = useContext(UserContext);
    const [list, setList] = useState([]);
    const [isForm, setForm] = useState(false);
    const [loading, setLoading] = React.useState(false);

    const [selectedItem, setSelectedItem] = useState(null);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = (item) => {
        setModalVisible(!isModalVisible);
        setSelectedItem(item);
    };
    const toggleModalclose = (item) => {
        setModalVisible(!isModalVisible);
    };

    useFocusEffect(
        React.useCallback(() => {
            getListJobs()
        }, [])
    );

    async function getListJobs() {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
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
                    setList(response.data);
                    setLoading(false);
                }
            })
        } catch (error) {
            console.log("Err : ", error);
            setLoading(false);
        }
    }

    const FlatListJobs = () => {
        return (
            <FlatList
                data={isForm ? list.reverse() : list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItemJob}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                        <ImageBackground
                            source={require('../assets/images/5928293_2953962.jpg')}
                            style={{ width: "100%", height: 430, }}
                        />
                        <Text style={{ fontSize: 22, color: COLORS.black, fontWeight: '700' }}>Không tìm thấy</Text>
                        <Text style={{ fontSize: 16, marginTop: 7, textAlign: 'center' }}>Rất tiếc, không tìm thấy bài đăng đang chờ duyệt</Text>
                    </View>
                )}
            />
        );

    };
    const deletePost = async (id) => {
        try {
            const response = await axios.post(`${API}/posts/delete`, { id: id });
            if (response.status === 200) {
                toggleModalclose();
                getListJobs()
                Alert.alert('Xóa thành công !')
            }
        } catch (error) {
            console.log('err', error);
        }
    }

    const renderItemJob = ({ item }) => {
        const formattedWageMin = item.wageMin.toLocaleString('vi-VN');
        const formattedWageMax = item.wageMax.toLocaleString('vi-VN');
        return (
            <TouchableOpacity style={{
                borderWidth: 0.5,
                borderColor: COLORS.grey,
                borderRadius: 20,
                marginBottom: 18,
                padding: 20,
            }}
                onPress={() => toggleModal(item)}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    {item.image.map((imageUrl, index) => {
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
                        <Text style={{ fontSize: 18, fontWeight: '400' }}>{item.title}</Text>
                        <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '400', color: COLORS.grey }}>{item.address}</Text>
                    </View>
                </View>
                <View style={{ height: 1, width: '99%', backgroundColor: COLORS.grey, opacity: 0.4, marginTop: 15, marginBottom: 8 }} />
                <View style={{ width: '100%', paddingStart: '22%' }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.grey, width: 200, marginBottom: 5 }}>{item.businessName}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}>{formattedWageMin}đ - {formattedWageMax}đ</Text>
                        {
                            item.payForm_id === '655de22b9a5b0ffa7ffd5132' ? (
                                <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}> /giờ</Text>
                            ) : item.payForm_id === '355de22b9a5b0ffa7ffd5132' ? (
                                <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}> /tháng</Text>
                            ) : null
                        }
                    </View>
                    <View style={{
                        width: 80,
                        height: 25,
                        borderWidth: 0.5,
                        borderColor: COLORS.grey,
                        borderRadius: 7,
                        padding: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {
                            item.workType_id === "653e66b38e88b23b41388e3c" ? (
                                <Text style={{ fontSize: 10 }} >Bán thời gian</Text>
                            ) : item.workType_id === "6558634415be344ac80a3b40" ? (
                                <Text style={{ fontSize: 10 }} >Toàn thời gian</Text>
                            ) : null
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                paddingTop: -10,
            }}>
            {loading ? (
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <>
                    <View style={{ paddingHorizontal: 20 }}>
                        <FlatListJobs />
                    </View>
                    <Modal onBackdropPress={toggleModalclose} isVisible={isModalVisible} style={{ justifyContent: 'flex-end', margin: 0 }}>
                        <View style={{
                            backgroundColor: '#FFFFFF',
                            shadowColor: '#333333',
                            shadowOffset: { width: -1, height: -3 },
                            shadowRadius: 2,
                            shadowOpacity: 0.4,
                            // elevation: 5,
                            paddingTop: 10,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}>
                            <View style={{
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    width: 40,
                                    height: 6,
                                    borderRadius: 4,
                                    backgroundColor: COLORS.grey,
                                    marginBottom: 10,
                                }} />
                            </View>
                        </View>
                        <View style={{
                            padding: 20,
                            backgroundColor: '#FFFFFF',
                            paddingTop: 20,
                            alignItems: 'center',
                        }}>
                            {/* <View style={{ borderColor: COLORS.blackOpacity, marginVertical: 10, width: "100%" }} /> */}
                            <View style={{ paddingVertical: 10, width: "100%" }}>
                                <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.grey }}>
                                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
                                        {selectedItem?.image.map((imageUrl, index) => {
                                            if (index === 0) {
                                                return (
                                                    <ImageBackground
                                                        key={index}
                                                        source={{ uri: imageUrl }}
                                                        style={{ width: 46, height: 46, marginBottom: 5 }}
                                                        imageStyle={{ borderRadius: 5 }} />
                                                );
                                            }
                                        })}
                                        {/* <Image source={{ uri: selectedItem?.image }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} /> */}
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600" }} numberOfLines={1}>
                                                {selectedItem?.title}
                                            </Text>
                                            <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 4 }} numberOfLines={1}>
                                                {selectedItem?.address}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ borderTopWidth: 1, borderColor: COLORS.grey }} />
                                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 12 }}>
                                        <View style={{ paddingStart: 60 }}>
                                            <Text numberOfLines={1} style={{ fontSize: 18, color: COLORS.black, fontWeight: "600" }}>
                                                {selectedItem?.businessName}
                                            </Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}>{selectedItem?.wageMin.toLocaleString('vi-VN')}đ - {selectedItem?.wageMax.toLocaleString('vi-VN')}đ</Text>
                                                {
                                                    selectedItem?.payForm_id === '655de22b9a5b0ffa7ffd5132' ? (
                                                        <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}> /giờ</Text>
                                                    ) : selectedItem?.payForm_id === '355de22b9a5b0ffa7ffd5132' ? (
                                                        <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}> /tháng</Text>
                                                    ) : null
                                                }
                                            </View>
                                            <View style={{
                                                width: 80,
                                                borderWidth: 0.5,
                                                borderColor: COLORS.grey,
                                                borderRadius: 7,
                                                padding: 5,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                {selectedItem?.workType_id._id == '653e66b38e88b23b41388e3c' ? (
                                                    <Text style={{ fontSize: 10 }}>Bán thời gian</Text>
                                                ) : (
                                                    <Text style={{ fontSize: 10 }}>Toàn thời gian</Text>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row', marginTop: 18,
                            }}>
                                <TouchableOpacity
                                    onPress={() => deletePost(selectedItem?._id)}
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
                                    <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: '600' }}>Xóa tin</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: COLORS.primary,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 64,
                                        position: 'relative',
                                        width: 160,
                                        paddingVertical: 15,
                                    }}
                                    onPress={() => console.log(selectedItem?._id)}>
                                    <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '600' }}>Sửa tin</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </>
            )}
        </SafeAreaView>
    );
};

export default TopTabScreenWaiting;