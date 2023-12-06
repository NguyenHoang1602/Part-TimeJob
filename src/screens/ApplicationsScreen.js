/* eslint-disable prettier/prettier */
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

const ApplicationsScreen = ({route ,navigation }) => {
    const { user } = useContext(UserContext);
    const data = [
        { id: '1', title: 'UI/UX Designer', bussiness_Name: 'Google LLC', address: 'Binh Tan, TP. HCM', wageMin: '10000', wageMax: '25000', workType: '1', status: '1', image: 'https://th.bing.com/th/id/OIP.S3ZsU5iH6e3Z2K7lXlES7AHaFj?w=230&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
        { id: '2', title: 'Software Engineer', bussiness_Name: 'Google LLC', address: 'Binh Tan, TP. HCM', wageMin: '10000', wageMax: '25000', workType: '2', status: '2', image: 'https://th.bing.com/th/id/OIP.YEEjAJNNzW_bB2imEBlRywHaD8?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
        { id: '3', title: 'Applications Developer', bussiness_Name: 'Google LLC', address: 'Binh Tan, TP. HCM', wageMin: '10000', wageMax: '25000', workType: '1', status: '3', image: 'https://th.bing.com/th/id/OIP.UEXTt6nVBMLf5I8rQh8U_wHaFj?w=208&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
        { id: '4', title: 'UI/UX Designer', bussiness_Name: 'Google LLC', address: 'Binh Tan, TP. HCM', wageMin: '10000', wageMax: '25000', workType: '2', status: '4', image: 'https://th.bing.com/th/id/OIP.eJPdCWFGsFPki_c_tK0xmQHaFX?w=253&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
        { id: '5', title: 'UI/UX Designer', bussiness_Name: 'Google LLC', address: 'Binh Tan, TP. HCM', wageMin: '10000', wageMax: '25000', workType: '1', status: '1', image: 'https://th.bing.com/th/id/OIP.09F15WCuEz8e1c1OwXN1GgHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
        { id: '6', title: 'UI/UX Designer', bussiness_Name: 'Google LLC', address: 'Binh Tan, TP. HCM', wageMin: '10000', wageMax: '25000', workType: '1', status: '4', image: 'https://th.bing.com/th/id/OIP.eJPdCWFGsFPki_c_tK0xmQHaFX?w=253&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
    ];
    const renderItemApplications = ({ item }) => (
        <TouchableOpacity style={styles.items}
        onPress={() => navigation.navigate('ApplicationsStage', {
            id : item.id,
            title: item.title,
            bussiness_Name: item.bussiness_Name,
            address: item.address,
            wageMin: item.wageMin,
            wageMax: item.wageMax,
            workType_ID: item.workType,
            status: item.status,
            image: item.image,

        })}>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                <ImageBackground
                    source={{ uri: item?.image }}
                    style={{ width: 52, height: 52, marginBottom: 5}}
                    imageStyle={{ borderRadius: 8 , borderWidth: 0.5, borderColor: COLORS.grey}}
                />
                <View style={{ flex: 1, marginLeft: '5%' }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color:'#212121' }}>{item.title}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#616161', marginTop: 5}}>{item.bussiness_Name}</Text>
                </View>
                <TouchableOpacity
                    style={{
                    }}>
                    <AntDesign name="right" size={21} color="#212121"/>
                </TouchableOpacity>
            </View>
            {
                item.status === '1' ? (
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
                        <Text style={{ fontSize: 9.5, color: '#246BFE'}} >Application Sent</Text>
                    </View>
                ) : item.status === '2' ? (
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
                ) : item.status === '3' ? (
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
                        <Text style={{ fontSize: 9.5, color: '#F75656'}} >Application Rejected</Text>
                    </View>
                ) : <View style={{
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
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItemApplications}
                    nestedScrollEnabled={true}
                    scrollEnabled={false}
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