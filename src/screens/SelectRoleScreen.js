/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useContext } from 'react'
import COLORS from '../assets/const/colors';
import UserContext from '../components/UserConText';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';

const SelectRoleScreen = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [data, setData] = React.useState({
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
    const [checkedUser, setCheckedUser] = useState(true);
    const [checkedEmployer, setCheckedEmployer] = useState(false);
    const handleCheckUser = () => {
        setCheckedUser(true);
        setCheckedEmployer(false);
        setData({ ...data, role: 0 });
    };
    const handleCheckEmployer = () => {
        setCheckedEmployer(true);
        setCheckedUser(false);
        setData({ ...data, role: 1 });
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
                <ImageBackground
                    source={require('../assets/images/SignIn/LogoSignInUp.png')}
                    style={{ width: 140, height: 133, marginBottom: 15 }}
                />
                <Text style={{ fontSize: 30, fontWeight: '500', marginTop: 15, color: '#212121' }}>Chọn vai trò của bạn</Text>
                <Text style={{ textAlign: 'center', fontSize: 16, marginVertical: 15 }}>Chọn xem bạn đang tìm việc làm hay bạn có thể là một tổ chức hoặc công ty đang cần tuyển nhân viên.</Text>
                <View style={{ height: 1, width: '100%', backgroundColor: '#EFEFEF', opacity: 0.9, marginTop: '7%', marginBottom: '6%' }} />
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    {/* user role */}
                    <TouchableOpacity onPress={handleCheckUser} style={[styles.checkUser, { borderColor: checkedUser ? '#2B70FE' : '#EFEFEF' }]}>
                        <View style={{ width: 75, height: 75, borderRadius: 50, backgroundColor: '#EFF4FF', alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialCommunityIcons name="briefcase-variant" size={35} color="#2B70FE" />
                        </View>
                        <Text style={{ textAlign: 'center', width: '80%', fontSize: 18, fontWeight: '700', marginTop: 15, color: '#212121' }}>Tìm công việc</Text>
                        <Text style={{ width: '80%', fontSize: 16, fontWeight: '400', marginTop: 15, color: COLORS.grey1, textAlign: 'center' }}>Tôi muốn tìm một công việc.</Text>
                    </TouchableOpacity>
                    {/* employee role */}
                    <TouchableOpacity onPress={handleCheckEmployer} style={[styles.checkEmployer, { borderColor: checkedEmployer ? '#2B70FE' : '#EFEFEF' }]}>
                        <View style={{ width: 75, height: 75, borderRadius: 50, backgroundColor: '#FFF7EB', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesome5 name="user" size={35} color="#FEA01D" />
                        </View>
                        <Text style={{ textAlign: 'center', width: '80%', fontSize: 18, fontWeight: '700', marginTop: 15, color: '#212121' }}>Tìm nhân viên</Text>
                        <Text style={{ width: '80%', fontSize: 16, fontWeight: '400', marginTop: 15, color: COLORS.grey1, textAlign: 'center' }}>Tôi muốn tìm nhân viên.</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: '100%', height: 100, borderWidth: 1, borderColor: '#EFEFEF', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        if (data.role === 0) {
                            navigation.navigate('FavoriteCareersScreen', { item: data })
                        } else {
                            navigation.navigate('FillProfile', { item: data })
                        }
                    }}
                    style={{
                        width: '90%',
                        height: 50,
                        backgroundColor: '#246BFD',
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 10,
                        shadowColor: COLORS.primary,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}>
                    <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '500' }}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 45,
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

export default SelectRoleScreen;