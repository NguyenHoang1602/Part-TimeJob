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

const ChatScreen = () => {

    const [password, setPassword] = useState('');
    const [isFocusedPass, setIsFocusedPass] = useState(false);

    const [isSave, setSave] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);



    return (

        <SafeAreaView style={{ paddingVertical: 18, gap: 16, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{ paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Ionicons name="arrow-back" size={26} />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, color: COLORS.black, fontWeight: "600", }} numberOfLines={1}>
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

                <View style={{ padding: 18, }}>
                    <View style={{ borderRadius: 10, paddingHorizontal: 18, backgroundColor: COLORS.blackOpacity, }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, }} >
                            UI/UX Designer
                            UI/UX Designer
                            UI/UX Designer
                            UI/UX Designer
                            UI/UX Designer
                        </Text>
                    </View>
                </View>

            </ScrollView>



        </SafeAreaView>

    )
}

export default ChatScreen;