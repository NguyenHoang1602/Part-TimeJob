/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { FlatList, Image, TextInput, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Modal from "react-native-modal";

const URL_IMG = "https://manofmany.com/wp-content/uploads/2021/05/Best-Short-Hairstyles-for-Men.jpg";



const Jobdata = [
    { id: '1', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
    { id: '2', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
    { id: '3', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
    { id: '4', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
    { id: '5', title: 'Freelancer', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
]

const MessageScreen = () => {

    const [password, setPassword] = useState('');
    const [isFocusedPass, setIsFocusedPass] = useState(false);

    const [isSave, setSave] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const FlatListb = () => {
        return (
            <FlatList
                data={Jobdata}
                keyExtractor={(item) => item.id}
                renderItem={renderItemJob}
                nestedScrollEnabled={true}
                scrollEnabled={false}
            />
        );

    }

    const renderItemJob = ({ item }) => (

        <View style={{ padding: 18, }}>
            <View style={{}}>
                <View style={{ flexDirection: 'row', gap: 18 }}>
                    <Image source={{ uri: URL_IMG }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} numberOfLines={1}>
                            UI/UX Designer
                        </Text>
                        <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 6 }} numberOfLines={1}>
                            Have a good day!  Have a good day!v
                        </Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                        <View
                            style={{
                                backgroundColor: COLORS.primary,
                                borderRadius: 50,
                                padding: 5,
                                aspectRatio: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: COLORS.white 
                            }}>
                            <Text style={{
                                color: COLORS.white,
                                fontSize: 12,
                            }}>
                            3
                            </Text>
                        </View>
                        <Text style={{ fontSize: 16, color: COLORS.grey }}>
                            16/09/2023
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );

    return (

        <SafeAreaView style={{ paddingVertical: 18, gap: 16, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{ paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center',justifyContent: 'center', gap: 8 }}>
                <Ionicons name="arrow-back" size={26} />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} numberOfLines={1}>
                        Message
                    </Text>
                </View>
                <TouchableOpacity>
                    <Feather name='search' size={26} color={COLORS.black} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialCommunityIcons name='dots-horizontal-circle-outline' size={26} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <ScrollView>

                <FlatListb />

            </ScrollView>

            <Modal isVisible={isModalVisible} style={{ justifyContent: 'flex-end', margin: 0 }}>
                <View style={{ backgroundColor: 'white', padding: 18, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 25, borderTopLeftRadius: 25 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.black }}>Remove from Saved ?</Text>

                    <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, marginVertical: 10, width: "100%" }} />

                    <View style={{ paddingVertical: 18, width: "100%" }}>
                        <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
                            <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
                                <Image source={{ uri: URL_IMG }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} numberOfLines={1}>
                                        UI/UX Designer
                                    </Text>
                                    <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 4 }} numberOfLines={1}>
                                        John Sena
                                    </Text>
                                </View>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, }} />

                            <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 12 }}>
                                <View style={{ paddingStart: 60 }}>
                                    <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} >
                                        UI/UX Designer
                                    </Text>
                                    <Text style={{ fontSize: 16, color: COLORS.primary, paddingVertical: 4 }} >
                                        $1000 - 2000/month
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
                                        <Text style={{ fontSize: 10 }}>Partime</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity
                            onPress={toggleModal}
                            style={{
                                backgroundColor: COLORS.blue,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 64,
                                position: "relative",
                                width: 160,
                                paddingVertical: 15,
                                marginEnd: 15
                            }}>
                            <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: "600", }}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 64,
                                position: "relative",
                                width: 160,
                                paddingVertical: 15
                            }}>
                            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600", }}>Yes, Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>

    )
}

export default MessageScreen;