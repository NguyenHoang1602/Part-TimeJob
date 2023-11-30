/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator, Pressable, Alert } from 'react-native'
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
            getCV();
        }, [])
    );

    const handleDelete = async () => {
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

    const deleteCv = (item) => {
        setSender(item._id);
        Alert.alert('Xóa CV', 'Bạn muốn xóa CV này ?', [
            { text: 'Không' },
            { text: 'Có', onPress: () => handleDelete() },
        ],
            { cancelable: false });
    };

    const renderCV = ({ item }) => (
        <Pressable style={{ flexDirection: 'row', backgroundColor: '#EEE0E5', height: 80, borderRadius: 10, alignItems: 'center', padding: 15, marginBottom: 10 }}>
            <AntDesign name="filetext1" size={26} color={COLORS.red} />
            <View style={{ marginLeft: 15, flex: 1 }}>
                <Text numberOfLines={1} style={{ fontSize: 16, color: COLORS.black }}>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={() => {
                deleteCv(item);
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
        </SafeAreaView>
    );
};

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