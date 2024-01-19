/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ToastAndroid, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useContext, useEffect } from 'react'
import COLORS from '../assets/const/colors';
import UserContext from '../components/UserConText';
import { API } from '../../Sever/sever';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBoxHasBorder from '../components/CheckBoxHasBorder';

const FavoriteCareersScreen = ({ navigation, route }) => {

    useEffect(() => {
        getAllData();
    }, []);

    const { user } = useContext(UserContext);
    const { setUser } = useContext(UserContext);
    const [listCareers, setListCareers] = useState([]);
    const [data, setData] = React.useState({
        messagingToken: route?.params?.item?.messagingToken,
        googleId: user?.googleId,
        facebookId: user?.facebookId,
        displayName: user?.displayName,
        email: user?.email,
        photo: user?.photo,
        birthDay: user?.birthDay,
        address: user?.address,
        phone: user?.phone,
        gender: user?.gender,
        role: 0,
        favoriteCareers: [],
        status: false,
    });
    const getAllData = async () => {
        try {
            //All Post allow
            axios({
                url: `${API}/posts/list`,
                method: "GET",
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data)
                    await AsyncStorage.setItem('listPosts', data);
                }
            })
            //All Career
            axios({
                url: `${API}/careers/listCareersForApp`,
                method: "GET",
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data)
                    await AsyncStorage.setItem('listCareers', data);
                    setListCareers(response.data);
                }
            })
            //All WorkType
            axios({
                url: `${API}/workTypes/list`,
                method: "GET",
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data)
                    await AsyncStorage.setItem('listWorkTypes', data);
                }
            })
            //All PayForm
            axios({
                url: `${API}/payforms/list`,
                method: "GET",
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data)
                    await AsyncStorage.setItem('listPayForms', data);
                }
            })
            //All Academic
            axios({
                url: `${API}/acedemics/list`,
                method: "GET"
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data)
                    await AsyncStorage.setItem('listAcademics', data);
                }
            })
            //All Gender
            axios({
                url: `${API}/gender/list`,
                method: "GET"
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data)
                    await AsyncStorage.setItem('listGenders', data);
                }
            })
            //All Experience
            axios({
                url: `${API}/experiences/list`,
                method: "GET"
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = JSON.stringify(response.data)
                    await AsyncStorage.setItem('listExperiences', data);
                }
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    //console.log(data);
    const register = async() => {
        if (data.googleId) {
            const result = await axios.post(`${API}/users/GoogleSignIn`, { data });
            if (result.status === 200) {
                loginUser(result.data);
                setUser(result.data);
                const data = JSON.stringify(result.data);
                await AsyncStorage.setItem('user', data);
                if (result.data.status) {
                    setUser(result.data);
                    if (result.data.role === 0) {
                        navigation.navigate('TabNavigatorUser');
                    } else {
                        navigation.navigate('TabNavigator');
                    }
                }
                //console.log("ok");
                // setLoading(true);
                // await new Promise(resolve => setTimeout(resolve, 2000));
            }
        } else if (data?.facebookId) {
            const result = await axios.post(`${API}/users/FacebookSignIn`, { inputs });
            if (result.status === 200) {
                loginUser(result.data);
                setUser(result.data);
                const data = JSON.stringify(result.data);
                await AsyncStorage.setItem('user', data);
                await AsyncStorage.setItem('isFirstAccess', "0");
                if (result.data.status) {
                    setUser(result.data);
                    if (result.data.role === 0) {
                        navigation.navigate('TabNavigatorUser');
                    } else {
                        navigation.navigate('TabNavigator');
                    }
                }
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        } else {
            const result = await axios.post(`${API}/users/PhoneNumberSignIn`, { inputs });
            if (result.status === 200) {
                loginUser(result.data);
                setUser(result.data);
                if (result.data.status) {
                    setUser(result.data);
                    if (result.data.role === 0) {
                        navigation.navigate('TabNavigatorUser');
                    } else {
                        navigation.navigate('TabNavigator');
                    }
                }
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    }

    const loginUser = (item) => {
        firestore()
            .collection('users')
            .where('_id', '==', item._id)
            .get()
            .then(res => {
                if (res.docs.length !== 0) {

                } else {
                    firestore()
                        .collection('users')
                        .doc(item._id)
                        .set({
                            displayName: item?.displayName,
                            email: item?.email,
                            phone: item?.phone,
                            _id: item?._id,
                            photo: item?.photo
                        })
                        .then(res => {

                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* header */}
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    alignItems: 'center',
                    marginLeft: 20,
                }}
                onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color={COLORS.black} />
                <Text style={{ fontSize: 22, fontWeight: '400', color: COLORS.black, marginLeft: 20 }} />
            </TouchableOpacity>
            <View style={styles.body}>
                <Text style={{ fontSize: 30, fontFamily: 'BeVietnamPro-Medium', marginTop: 15, color: '#212121', textAlign: 'center' }}>Ngành nghề yêu thích của bạn là gì ?</Text>
                <Text style={{ textAlign: 'center', fontSize: 14, paddingVertical: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>Vui lòng ít nhất 1 ngành nghề yêu thích của bạn.</Text>
                <View style={{ height: 0.5, width: '100%', borderWidth: 0.5, borderColor: '#EFEFEF', opacity: 0.9, marginTop: 15, }} />
                <ScrollView
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                >
                    <CheckBoxHasBorder options={listCareers} multiple={true} onchange={op => setData({ ...data, favoriteCareers: op })} />
                </ScrollView>
            </View>
            <View style={{ width: '100%', height: 100, borderWidth: 1, borderColor: '#EFEFEF', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        if (data.favoriteCareers && data.favoriteCareers.length > 0) {
                            register();
                        } else {
                            ToastAndroid.show('Hãy chọn ít nhất 1 ngành nghề', ToastAndroid.SHORT);
                        }
                    }}
                    style={{
                        width: '90%',
                        height: 60,
                        backgroundColor: '#246BFD',
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 10,
                        shadowColor: '#246BFD',
                        shadowOpacity: 0.3,
                        elevation: 10,
                    }}>
                    <Text style={{ color: COLORS.white, fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, }}>Tiếp theo</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 16,
    },
    header: {
        flexDirection: 'row',
    },
    body: {
        width: '100%',
        alignItems: 'center',
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    checkUser: {
        width: '45%',
        borderWidth: 2,
        height: 250,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkEmployer: {
        width: '45%',
        borderWidth: 2,
        height: 250,
        borderRadius: 30,
        marginLeft: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default FavoriteCareersScreen;