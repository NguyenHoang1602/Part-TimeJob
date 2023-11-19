/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ImageBackground, FlatList, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';


const Jobdata = [
    { id: '1', title: 'Freelancer 1', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
    { id: '2', title: 'Freelancer 2', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
    { id: '3', title: 'Freelancer 3', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
    { id: '4', title: 'Freelancer 4', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
    { id: '5', title: 'Freelancer 5', Details: 'Dribble Inc.', Address: 'Quan 1, TP. HCM', wagemax: '150000', wagemin: '50000', worktype: 'Partime', uri: 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/b/7/6/b766c952bf9c722c30447824d8fc06a48f008e31.png' },
];
const TopTabScreen3 = ({ navigation }) => {

    const [selectedItem, setSelectedItem] = useState(null);
    const [password, setPassword] = useState('');
    const [search, setsearch] = useState('');
    const [isFocusedPass, setIsFocusedPass] = useState(false);

    const [isSave, setSave] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = (item) => {
        setModalVisible(!isModalVisible);
        setSelectedItem(item);
    };
    const toggleModalclose = (item) => {
        setModalVisible(!isModalVisible);
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
            onPress={() => {
                toggleModal(item);
            }}
        >
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <ImageBackground
                    source={{ uri: item.uri }}
                    style={{ width: 46, height: 46, marginBottom: 5 }}
                    imageStyle={{ borderRadius: 5 }}
                />
                <View style={{ width: '50%', height: '100%', marginStart: 20, flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.grey }}>{item.Details}</Text>
                </View>
            </View>
            <View style={{ height: 1, width: '99%', backgroundColor: COLORS.grey, opacity: 0.4, marginTop: 15, marginBottom: 8 }} />
            <View style={{ width: '100%', paddingStart: '22%' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.grey }}>{item.Address}</Text>
                <Text style={{ color: COLORS.primary, fontSize: 16, marginVertical: 9 }}>${item.wagemin} - ${item.wagemax} /month</Text>
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
                    <Text style={{ fontSize: 10 }}>{item.worktype}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                paddingTop: -10,
            }}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}
                style={{
                    backgroundColor: COLORS.white,
                }}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <FlatList
                        data={Jobdata}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItemJob}
                        nestedScrollEnabled={true}
                        scrollEnabled={false}
                    />
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
                        <View style={{ borderColor: COLORS.blackOpacity, marginVertical: 10, width: "100%" }} />
                        <View style={{ paddingVertical: 10, width: "100%" }}>
                            <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
                                <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
                                    <Image source={{ uri: selectedItem?.uri }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600" }} numberOfLines={1}>
                                            {selectedItem?.title}
                                        </Text>
                                        <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 4 }} numberOfLines={1}>
                                            {selectedItem?.Details}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity }} />
                                <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 12 }}>
                                    <View style={{ paddingStart: 60 }}>
                                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600" }} >
                                            {selectedItem?.Address}
                                        </Text>
                                        <Text style={{ fontSize: 16, color: COLORS.primary, paddingVertical: 4 }} >
                                            ${selectedItem?.wagemin} - ${selectedItem?.wagemax} /moth
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
                                            <Text style={{ fontSize: 10 }}>{selectedItem?.worktype}</Text>
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
                                    backgroundColor: COLORS.blue,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 64,
                                    position: 'relative',
                                    width: 160,
                                    paddingVertical: 15,
                                    marginEnd: 15,
                                }}>
                                <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: '600' }}>Hủy</Text>
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
                                onPress={() => {}}>
                                <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '600' }}>Xóa tin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TopTabScreen3;