/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../assets/const/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import axios from 'axios';
import { API } from '../../Sever/sever';
import UserContext from '../components/UserConText';
import { useFocusEffect } from '@react-navigation/native';
import Modal from "react-native-modal";

const CVResume = ({ navigation }) => {
    // useEffect(() => {
    //     getCV();
    // }, []);
    const { user } = useContext(UserContext);
    const [cv, setCv] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [sender, setSender] = useState(null);
    const getCV = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        axios({
            url: `${API}/cvs/myCVs`,
            method: "POST",
            data: {
                id: user._id,
            }
        }).then(async (response) => {
            if (response.status === 200) {
                setCv(response.data);
                setLoading(false);
            }
        });
    };
    useFocusEffect(
        React.useCallback(() => {
            getCV()
        }, [])
    );

    const handleDelete = async () => {
        toggleModalclose();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        axios({
            url: `${API}/cvs/delete`,
            method: "POST",
            data: {
                id: sender,
            }
        }).then(async (response) => {
            if (response.status === 200) {
                setCv(response.data);
                setLoading(false);
                getCV();
            }
        });
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModalclose = () => {
        setModalVisible(!isModalVisible);
    };

    const renderCV = ({ item }) => (
        <Pressable style={{ flexDirection: 'row', backgroundColor: '#EEE0E5', height: 80, borderRadius: 10, alignItems: 'center', padding: 15, marginBottom: 10 }}>
            <AntDesign name="filetext1" size={26} color={COLORS.red} />
            <View style={{ marginLeft: 15, flex: 1 }}>
                <Text numberOfLines={1} style={{ fontSize: 16, color: COLORS.black }}>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={() => {
                toggleModal()
                setSender(item._id);
                }}>
                <Ionicons name="close-outline" size={26} color={COLORS.red} />
            </TouchableOpacity>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <><TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                        alignItems: 'center'
                    }}
                    onPress={() => navigation.navigate('ProfileScreen')}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.black} />
                    <Text style={{ fontSize: 22, fontWeight: '400', color: COLORS.black, marginLeft: 20 }}>Quản lí CV</Text>
                </TouchableOpacity>
                    <View style={{ flexDirection: 'column', backgroundColor: '#EEEEEE', width: '100%', height: 140, borderRadius: 10, borderWidth: 1, borderColor: '#DDDDDD', marginTop: 20 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Tạo CV cá nhân')}>
                            <AntDesign name="addfile" size={30} color={COLORS.blue} style={{ textAlign: 'center', marginTop: 40 }} />
                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#808080', textAlign: 'center', marginTop: 10 }}>Thêm mới CV</Text>
                        </TouchableOpacity>
                    </View><View style={{ marginTop: 20 }}>
                        <FlatList
                            data={cv}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderCV} />
                    </View></>
            )}
            {/* <TouchableOpacity>
                {peoples.map(eachPeople => <CVitem people={eachPeople} />)}
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={{}}
              style={{
                backgroundColor: COLORS.blue,
                padding: 5,
                width: '100%',
                height: 50,
                borderRadius: 30,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: COLORS.black,
                shadowOffset: {width: 10, height: 10},
                shadowOpacity: 1,
                shadowRadius: 3,
                marginTop: 500
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: COLORS.white,
                }}>
                Lưu
              </Text>
        </TouchableOpacity> */}
            <Modal
                onBackdropPress={toggleModalclose}
                isVisible={isModalVisible}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}>
                <View style={styles.headerModal}>
                    <View style={{
                        alignItems: 'center',
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.black }}>Xóa Cv này ?</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#FFFFFF' }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginVertical: 20,
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
                            <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: '600' }}>Hủy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                handleDelete()
                            }}
                            style={{
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 64,
                                position: 'relative',
                                width: 160,
                                paddingVertical: 15,
                            }}>
                            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '600' }}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default CVResume;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 18,
        backgroundColor: COLORS.white,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 45,
    },
    item: {
        backgroundColor: 'pink',
        fontSize: 16,
        width: '100%',
        height: 80,
    }
})