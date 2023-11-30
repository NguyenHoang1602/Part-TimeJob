/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, Text, ImageBackground, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import UserContext from '../components/UserConText';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MessageScreen = ({ navigation }) => {
    useEffect(() => {
        getUsers();
    }, []);

    const [users, setUsers] = useState([]);
    const { user } = useContext(UserContext);

    const getUsers = async () => {
        let tempData = [];
        firestore()
            .collection('users')
            .where('_id', '!=', user.googleId)
            .get()
            .then(res => {
                if (res.docs.length != 0) {
                    res.docs.map(item => {
                        tempData.push(item.data());
                    });
                }
                setUsers(tempData);
            });
    };

    const FlatListb = () => {
        return (
            <FlatList
                data={users}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItemJob}
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 180 }}>
                        <ImageBackground
                            source={require('../assets/images/5928293_2953962.jpg')}
                            style={{ width: "100%", height: 300 }}
                        />
                        <Text style={{ fontSize: 22, color: COLORS.black, fontWeight: '600' }}>Không có tin nhắn</Text>
                    </View>
                )}
            />
        );
    }

    const renderItemJob = ({ item }) => (
        <View style={{ padding: 18, }}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('ChatScreen', { item })
            }}>
                <View style={{ flexDirection: 'row', gap: 18 }}>
                    <Image source={{ uri: item.photo }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600", }} numberOfLines={1}>
                            {item.displayName}
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
                                color: COLORS.white,
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
            </TouchableOpacity>
        </View>
    );

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{ paddingHorizontal: 18, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name='arrow-back' size={26} />
                </TouchableOpacity>
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

            <FlatListb />



        </SafeAreaView>

    )
}

export default MessageScreen;