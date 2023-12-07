/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, TextInput, Pressable, FlatList, Image, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react'
import COLORS from '../assets/const/colors';
import UserContext from '../components/UserConText';

import Input from '../components/Input';
import Button from '../components/Button';
//icon
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { Layout } from 'react-native-reanimated';
import { API } from '../../Sever/sever';

const ApplicationsScreen = ({ route, navigation }) => {
    const { user } = useContext(UserContext);
    const [listApplied, setListApplied] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            getAllApplied()
        }, [])
    );
    const getAllApplied = async () => {
        try {
            const response = await axios.post(`${API}/apply/listMyApplied`, {
                id: user._id
            });
            setListApplied(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const renderItemApplications = ({ item }) => (
        <TouchableOpacity style={styles.items}
            onPress={() => navigation.navigate('ApplicationsStage', {
                id: item._id,
                title: item?.post_id?.title,
                businessName: item?.post_id?.businessName,
                address: item?.post_id?.address,
                wageMin: item?.post_id?.wageMin,
                wageMax: item?.post_id?.wageMax,
                workType_id: item?.post_id?.workType_id,
                cv_id: item?.cv_id._id,
                status: item?.status,
                image: item?.post_id?.image,
                bargain_Salary : item?.bargain_salary,
                feedback: item?.feedback,
            })}>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>

                {item?.post_id?.image.map((imageUrl, index) => {
                    if (index === 0) {
                        return (
                            <ImageBackground
                                key={index}
                                source={{ uri: imageUrl }}
                                style={{ width: 54, height: 54, marginBottom: 5 }}
                                imageStyle={{ borderRadius: 5 }}
                            />
                        );
                    }
                })}
                <View style={{ flex: 1, marginLeft: '5%' }}>
                    <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: '600', color: '#212121', width: '99%' }}>{item?.post_id?.title}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#616161', marginTop: 5 }} numberOfLines={1}>{item?.post_id?.businessName}</Text>
                </View>
                <TouchableOpacity
                    style={{
                    }}>
                    <AntDesign name="right" size={21} color="#212121" />
                </TouchableOpacity>
            </View>
            {
                item?.status === 0 ? (
                    <View style={{
                        width: 90,
                        backgroundColor: '#E7EFFF',
                        borderRadius: 6,
                        padding: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginStart: '20%',
                        marginTop: '2%',
                    }}>
                        <Text style={{ fontSize: 9.5, color: '#246BFE' }} >Application Sent</Text>
                    </View>
                ) : item.status === 1 ? (
                    <View style={{
                        width: 110,
                        backgroundColor: '#FFF4CD',
                        borderRadius: 6,
                        padding: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginStart: '20%',
                        marginTop: '3%',
                    }}>
                        <Text style={{ fontSize: 9.5, color: '#FBCA17' }} >Application Pending</Text>
                    </View>
                ) : item.status === 2 ? (
                    <View style={{
                        width: 105,
                        backgroundColor: '#FDD9DA',
                        borderRadius: 6,
                        padding: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginStart: '20%',
                        marginTop: '2%',
                    }}>
                        <Text style={{ fontSize: 9.5, color: '#F75656' }} >Application Rejected</Text>
                    </View>
                ) : item.status === 4 ? (
                    <View style={{
                        width: 120,
                        backgroundColor: '#FFCAA3',
                        borderRadius: 6,
                        padding: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginStart: '20%',
                        marginTop: '2%',
                    }}>
                        <Text style={{ fontSize: 9.5, color: '#FF6B00' }} >Application Negotiation</Text>
                    </View>
                ) :
                    <View style={{
                        width: 110,
                        backgroundColor: '#E7FEEE',
                        borderRadius: 6,
                        padding: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginStart: '20%',
                        marginTop: '2%',
                    }}>
                        <Text style={{ fontSize: 9.5, color: '#08BE75' }} >Application Accepted</Text>
                    </View>
            }
            <View style={{ height: 1, width: '99%', backgroundColor: COLORS.grey, opacity: 0.4, marginTop: 15, marginBottom: 8 }} />


        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headera}>
                    <View style={styles.headeraLeft}>
                        <ImageBackground
                            source={require('../assets/images/SignIn/LogoSignInUp.png')}
                            style={{ width: 26, height: 26 }}
                            imageStyle={{ borderRadius: 46 }} />
                        <View style={{ flexDirection: 'column', height: '100%', marginStart: 15 }}>
                            <Text style={{ color: COLORS.black, fontSize: 24, fontWeight: '600' }} numberOfLines={1}>Applications</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.headerRight}
                        onPress={() => navigation.navigate('Notifications')}>
                        <IconWithBadge iconName="bell" badgeText="2" />
                    </TouchableOpacity>
                </View>
                <Pressable
                    style={{
                        flexDirection: 'row',
                        borderColor: '#C6C6C6',
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5',
                    }}>
                    <Feather
                        name="search"
                        size={20}
                        color="#C6C6C6"
                        style={{ marginRight: 20 }} />
                    <TextInput
                        style={{ flex: 1 }}
                        placeholder="Tìm kiếm việc làm"
                    />
                    <TouchableOpacity
                        style={{
                            marginEnd: '2%',
                        }}
                        onPress={() => { }}>
                        <FontAwesome6
                            name="sliders"
                            size={20}
                            color={COLORS.blue}
                            style={{
                                opacity: 0.95,
                            }} />
                    </TouchableOpacity>
                </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
                <FlatList
                    data={listApplied}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItemApplications}
                    nestedScrollEnabled={true}
                    scrollEnabled={false}
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
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: COLORS.blue,
        backgroundColor: COLORS.white,
    },
    header: {
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
    },
    headera: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
        marginTop: '10%',
        width: '100%',
        height: 60,
    },
    headeraLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: '1%',
        width: '68%',
    },
    headerRight: {
        width: 40,
        height: 40,
        borderWidth: 0.4,
        borderColor: COLORS.grey,
        borderRadius: 40,
        alignItems: 'center',
        marginRight: '1%',
        justifyContent: 'center',
        marginStart: '18%',
    },
    body: {
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
    },
    items: {
        marginTop: '3%',
    },
});

export default ApplicationsScreen;