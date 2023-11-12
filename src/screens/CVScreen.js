import {StyleSheet, Text, View, Input, StatusBar} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const CVScreen = () => {
  React.useEffect(() => {
    StatusBar.setBackgroundColor('#357AF9');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content', true);
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
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
        <TextInput style={styles.textInput} placeholder="Họ tên" />
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={[styles.textInput, {width: 190}]}
            placeholder="Số điện thoại"
          />
          <TextInput
            style={[styles.textInput, {width: 160}]}
            placeholder="Năm sinh"
          />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Ngành nghề làm việc mong muốn"
        />
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
      <TextInput style={styles.textInput} placeholder="Địa chỉ hiện tại" />
      <TextInput style={styles.textInput} placeholder="Trình độ học vấn" />
      <TextInput style={styles.textInput} placeholder="Kinh nghiệm làm việc" />
      <TextInput style={styles.textInput} placeholder="Hình thức trả lương" />
      <TextInput style={styles.textInput} placeholder="Giới thiệu bản thân" />
    </SafeAreaView>
  );
};

export default CVScreen;

const styles = StyleSheet.create({
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
    marginLeft: 15,
    marginRight: 15,
  },
});
