/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
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
    const [loading, setLoading] = useState(false);
    const getFirst = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const result = await axios.post(`${API}/cvs/first`, { id: user._id });
            if (result.status === 200) {
                setCv(result.data);
                setLoading(false);
            }
        } catch (error) {
            console.log("Err : ", error);
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            getFirst()
        }, [])
    );

    const renderCareers = ({ item }) => (
        <Pressable
            onPress={() => { navigation.navigate('DetailsCVScreen', { item }) }}
            style={{ flexDirection: 'row', backgroundColor: 'rgba(90, 123, 255, 0.10)', borderRadius: 10, alignItems: 'center', paddingHorizontal: 10, paddingVertical: 15, marginBottom: 10 }}>
            <ImageBackground
                source={require('../assets/images/docs.png')}
                style={{ width: 45, height: 45 }}
                imageStyle={{}} />
            <View style={{ marginLeft: 15, flex: 1 }}>
                <Text numberOfLines={1} style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium',  color: COLORS.black }}>{item.title}</Text>
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
                <Text style={{ fontSize: 21, fontFamily: 'BeVietnamPro-Medium' , color: COLORS.black, marginLeft: 20 }}>Quản lí CV</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', backgroundColor: '#EEEEEE', width: '100%', height: 140, borderRadius: 10, borderWidth: 1, borderColor: '#DDDDDD', marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Tạo CV cá nhân')}>
                    <AntDesign name="addfile" size={30} color={COLORS.blue} style={{ textAlign: 'center', marginTop: 40 }} />
                    <Text style={{ fontSize: 13, fontFamily: 'BeVietnamPro-Medium' , color: '#808080', textAlign: 'center', marginTop: 10 }}>Thêm mới CV</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20, gap: 14 }}>
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
                                <Text style={{ fontSize: 21, color: COLORS.black, fontFamily: 'BeVietnamPro-Medium'  }}>Không có CV</Text>
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