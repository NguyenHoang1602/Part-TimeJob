/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator, Pressable, ImageBackground } from 'react-native'
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

const CVResume = ({ navigation }) => {
    // useEffect(() => {
    //     getCV();
    // }, []);
    const { user } = useContext(UserContext);
    const [cv, setCv] = useState([]);
    const [listCareers, setListCareers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [isSelectCareers, setIsSelectCareers] = React.useState({
        userId: user._id,
        career_id: '6554b9b322054e51b8327165',
    });
    const getFirst = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        try {
            const result = await axios.post(`${API}/cvs/first`, { id : user._id});
            if (result.status === 200) {
                setCv(result.data);
                setLoading(false);
            }
        } catch (error) {
            console.log("Err : ", error);
        }
    };
    const getCV = async (item) => {
        const data = {
            userId: user._id,
            career_id: item._id,
        };
        console.log(data);
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        try {
            console.log("Ra : ", data);
            const result = await axios.post(`${API}/cvs/myCVsByCareer`, { data });
            if (result.status === 200) {
                setCv(result.data);
                setLoading(false);
            }
        } catch (error) {
            console.log("Err : ", error);
        }
    };
    const getListCareers = async () => {
        const data = await AsyncStorage.getItem('listCareers')
        setListCareers(JSON.parse(data));
    }

    useFocusEffect(
        React.useCallback(() => {
            getListCareers();
            getFirst()
        }, [])
    );

    const renderCareers = ({ item }) => (
        <Pressable
            onPress={() => { navigation.navigate('DetailsCVScreen', { item }) }}
            style={{ flexDirection: 'row', backgroundColor: 'rgba(51, 123, 255, 0.20)', height: 60, borderRadius: 10, alignItems: 'center', padding: 15, marginBottom: 10 }}>
            <AntDesign name="filetext1" size={26} color={COLORS.primary} />
            <View style={{ marginLeft: 15, flex: 1 }}>
                <Text numberOfLines={1} style={{ fontSize: 16, color: COLORS.black }}>{item.title}</Text>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
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
            </View>

            <View style={{ marginTop: 20, gap: 14 }}>

                <FlatList
                    data={listCareers}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 10,
                    }}
                    renderItem={({ item, index }) => {
                        const isSelected = categoryIndex === index;
                        return (
                            <TouchableOpacity
                                onPress={async () => {
                                    setCategoryIndex(index);
                                    await getCV(item);
                                }}
                                style={{
                                    backgroundColor: isSelected ? COLORS.primary : COLORS.card,
                                    borderWidth: 1,
                                    borderColor: COLORS.grey,
                                    borderRadius: 100,
                                    paddingHorizontal: 24,
                                    paddingVertical: 14,
                                }}>
                                <Text
                                    style={{
                                        color: isSelected ? COLORS.white : COLORS.text,
                                        fontSize: 14,
                                        fontWeight: "600",
                                        opacity: isSelected ? 1 : 0.5,
                                    }}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                />

                {loading ? (
                    <View style={{ justifyContent: 'center', marginTop: 200 }}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>
                ) : (
                    <><FlatList
                        data={cv}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderCareers}
                        ListEmptyComponent={() => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                                <ImageBackground
                                    source={require('../assets/images/5928293_2953962.jpg')}
                                    style={{ width: 100, height: 100, }}
                                />
                                <Text style={{ fontSize: 22, color: COLORS.black, fontWeight: '700' }}>Không có CV</Text>
                            </View>
                        )}
                    />
                    </>
                )}
            </View>

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