/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../assets/const/colors';



const CVResume = ({navigation}) => {
    const cv = [
        { id: '1', name: 'Hồng Nhân', value: '825 Kb', url: 'https://play.google.com/store/apps/details?id=com.rizwan.simplepdfreader2018&hl=vi' },
        { id: '2', name: 'Hoàng Nguyên', value: '630 Kb', url: 'https://play.google.com/store/apps/details?id=com.rizwan.simplepdfreader2018&hl=vi' },
        { id: '3', name: 'Văn Chức', value: '748 Kb', url: 'https://play.google.com/store/apps/details?id=com.rizwan.simplepdfreader2018&hl=vi' },
    ];

    const renderCV = (item) => (
        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#EEE0E5', height: 80, borderRadius: 10, alignItems: 'center', padding: 15, marginBottom:10 }}>
            <AntDesign name="pdffile1" size={26} color={COLORS.red} />
            <View style={{ marginLeft: 15, flex: 1 }}>
                <Text style={{ fontSize: 18, color: COLORS.black }}>{item.name}</Text>
                <Text>{item.value}</Text>
            </View>
            <Ionicons name="close-outline" size={26} color={COLORS.red} />
        </TouchableOpacity>
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
                <AntDesign name="addfile" size={30} color={COLORS.blue} style={{ textAlign: 'center', marginTop: 40 }} />
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#808080', textAlign: 'center', marginTop: 10 }}>Thêm mới CV</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <FlatList
                    data={cv}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderCV}
                />
            </View>
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