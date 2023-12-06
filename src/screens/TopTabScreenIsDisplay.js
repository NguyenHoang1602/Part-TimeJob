/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useContext } from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ImageBackground, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import COLORS from '../assets/const/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import UserContext from '../components/UserConText';

import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../Sever/sever';

const TopTabScreenIsDisplay = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [list, setList] = useState([]);
    const [isForm, setForm] = useState(false);
    const [loading, setLoading] = React.useState(false);

    const [selectedItem, setSelectedItem] = useState(null);

    const [isModalVisible, setModalVisible] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            getListJobs();
        }, [])
    );

    async function getListJobs() {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
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
                        <Text style={{ fontSize: 22, color: COLORS.black, fontWeight: '700' }}>Empty</Text>
                        <Text style={{ fontSize: 16, marginTop: 7, textAlign: 'center' }}>Sorry, the keyword you entered cannot be found, please check again or search with another keyword.</Text>
                    </View>
                )}
            />
        );

    };

    const renderItemJob = ({ item }) => (
        <TouchableOpacity style={{
            width: 340,
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
                <Text style={{ color: COLORS.blue, fontSize: 16, marginVertical: 9 }}>${item.wageMin} - ${item.wageMax} /month</Text>
                <View style={{
                    width: 60,
                    height: 25,
                    borderWidth: 0.5,
                    borderColor: COLORS.grey,
                    borderRadius: 7,
                    padding: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {
                        item.workType_id._id == '653e66b38e88b23b41388e3c' ? (
                            <Text style={{ fontSize: 10 }} >Fulltime</Text>
                        ) : (
                            <Text style={{ fontSize: 10 }} >Parttime</Text>
                        )
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
    const toggleModal = (item) => {
        setModalVisible(!isModalVisible);
        setSelectedItem(item);
    };
    const toggleModalclose = () => {
        setModalVisible(!isModalVisible);
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
                <><View style={{ width: '100%', alignItems: 'center' }}>
                    <FlatListJobs />
                </View><Modal onBackdropPress={toggleModalclose} isVisible={isModalVisible} style={{ justifyContent: 'flex-end', margin: 0 }}>
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
                                                {selectedItem?.describe}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ borderTopWidth: 1, borderColor: COLORS.grey }} />
                                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 12 }}>
                                        <View style={{ paddingStart: 60 }}>
                                            <Text numberOfLines={1} style={{ fontSize: 18, color: COLORS.black, fontWeight: "600" }}>
                                                {selectedItem?.address}
                                            </Text>
                                            <Text style={{ fontSize: 16, color: COLORS.primary, paddingVertical: 4 }}>
                                                ${selectedItem?.wageMin} - ${selectedItem?.wageMax} /moth
                                            </Text>
                                            <View style={{
                                                width: 70,
                                                borderWidth: 0.5,
                                                borderColor: COLORS.grey,
                                                borderRadius: 7,
                                                padding: 5,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                {selectedItem?.workType_id._id == '653e66b38e88b23b41388e3c' ? (
                                                    <Text style={{ fontSize: 10 }}>Parttime</Text>
                                                ) : (
                                                    <Text style={{ fontSize: 10 }}>Fulltime</Text>
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
                                    onPress={toggleModalclose}
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
                                    onPress={() => navigation.navigate('Chỉnh sửa bài đăng', {
                                        title: selectedItem?.title,
                                        id: selectedItem?.id,
                                        uri: selectedItem?.uri,
                                        address: selectedItem?.Address,
                                        wagemax: selectedItem?.wagemax,
                                        wagemin: selectedItem?.wagemin,
                                        worktype: selectedItem?.worktype,
                                        Details: selectedItem?.Details,
                                    })}>
                                    <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '600' }}>Sửa tin</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal></>
            )}
        </SafeAreaView>
    );
};

export default TopTabScreenIsDisplay;