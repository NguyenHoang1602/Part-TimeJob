/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Input,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../assets/const/colors';
import Button from '../components/Button';

const CVScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.header}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              marginLeft: 120,
              marginTop: 15,
            }}>
            Thông tin ứng tuyển
          </Text>
        </View>
        <View>
          <View
            style={{
              backgroundColor: '#D9D9D9',
              height: 60,
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, marginStart: 20}}>
              THÔNG TIN BẮT BUỘC
            </Text>
          </View>
          <View>
            <TextInput style={styles.textInput} placeholder="Họ tên" />
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={[styles.textInput, {width: 190}]}
                placeholder="Số điện thoại"
              />
              <TextInput
                style={[styles.textInput, {width: 122}]}
                placeholder="Năm sinh"
              />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Địa chỉ email"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Địa chỉ hiện tại"
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#D9D9D9',
            height: 60,
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text style={{fontSize: 16, marginStart: 20}}>THÔNG TIN BỔ SUNG</Text>
        </View>
        <View>
          <TextInput style={styles.textInput} placeholder="Ngành nghề làm việc mong muốn" />
          <TextInput style={styles.textInput} placeholder="Trình độ học vấn" />
          <TextInput
            style={styles.textInput}
            placeholder="Kinh nghiệm làm việc"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Hình thức trả lương"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Giới thiệu bản thân"
          />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingVertical: 40,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CVScreen')}
              style={{
                backgroundColor: COLORS.blue,
                padding: 5,
                width: '40%',
                height: 50,
                borderRadius: 30,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: COLORS.black,
                shadowOffset: {width: 10, height: 10},
                shadowOpacity: 1,
                shadowRadius: 3,
                marginLeft: 25,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: COLORS.white,
                }}>
                Huỷ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('CVScreen')}
              style={{
                backgroundColor: COLORS.blue,
                padding: 5,
                width: '40%',
                height: 50,
                borderRadius: 30,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: COLORS.black,
                shadowOffset: {width: 10, height: 10},
                shadowOpacity: 1,
                shadowRadius: 3,
                marginLeft: 30,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: COLORS.white,
                }}>
                Ứng tuyển
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CVScreen;

const styles = StyleSheet.create({
  button: {
    width: 380,
    height: 48,
    backgroundColor: '#357AF9',
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  header: {
    height: 60,
    backgroundColor: '#357AF9',
  },
  textInput: {
    height: 48,
    backgroundColor: 'white',
    borderRadius: 6,
    borderColor: '#7D7A7A',
    borderWidth: 1,
    marginTop: 20,
    marginLeft: 24,
    marginRight: 26,
  },
});
