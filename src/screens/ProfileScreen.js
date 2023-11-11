/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.body}>
      <View style={styles.viewApp}>
        <Image
          style={styles.logo}
          source={require('../assets/icon/logo.png')}
        />
        <Text style={styles.title}>Applications</Text>
        <Image
          style={styles.setting}
          source={require('../assets/icon/setting.png')}
        />
      </View>
      <View style={styles.viewApp}>
        <Image style={styles.avatar} source={require('../assets/icon/avatar.png')}/>
        <Text style={styles.nameAvatar}>Hồng Nhân {'\n'}Good morning 👋</Text>
        <Image style={styles.edit} source={require('../assets/icon/edit.png')}/>
      </View>
      <View style={styles.viewApp}>
        <Image style={styles.logo} source={require('../assets/icon/user.png')}/>
        <Text style={styles.nameContact}>Contact Information</Text>
        <Image style={[styles.edit, {marginLeft: 60, marginTop: 58}]} source={require('../assets/icon/edit.png')}/>
      </View>
      <View style={styles.viewApp}>
        <Image style={styles.map} source={require('../assets/icon/map.png')}/>
        <Text style={styles.address}>HCM, Quan 12</Text>
      </View>
      <View style={styles.viewApp}>
        <Image style={[styles.map, {marginTop: 15}]} source={require('../assets/icon/call.png')}/>
        <Text style={[styles.address, {marginTop: 15}]}>+0379354352</Text>
      </View>
      <View style={styles.viewApp}>
        <Image style={[styles.map, {marginTop: 18}]} source={require('../assets/icon/mail.png')}/>
        <Text style={[styles.address, {marginTop: 12}]}>trongnhan174@gmail.com</Text>
      </View>
      <View style={styles.viewApp}>
        <Image style={styles.logo} source={require('../assets/icon/text.png')}/>
        <Image style={[styles.edit, {marginLeft: 272, marginTop: 60}]} source={require('../assets/icon/edit.png')}/>
      </View>
      <Text style={styles.text}>Hello, I’m Pinkaan. I am a designer with more 
than 5 years experience. My main fields are UI/UX Design. Illustrantion and Graphic Design. You can check the portfolio on my profile.</Text>
    </View>
    
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  text: {
    padding: 22,
  },
  address: {
    fontSize: 18,
    marginLeft: 30,
    marginTop: 35,
    color: 'black'
  },
  map: {
    marginLeft: 20,
    marginTop: 35
  },
  nameContact: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 57,
    marginLeft: 30
  },
  edit: {
    marginLeft: 52,
    marginTop: 55
  },
  nameAvatar: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: 20
  },
  avatar: {
    marginTop: 30
  },
  setting: {
    marginLeft: 100,
    marginTop: 60,
  },
  logo: {
    marginLeft: 20,
    marginTop: 60,
  },
  viewApp: {
    flexDirection: 'row'
  },
  title: {
    marginLeft: 35,
    marginTop: 56,
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
  },
  body: {
    padding: 24,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
});
