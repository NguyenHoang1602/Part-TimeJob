/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext, useEffect } from 'react';
import { FlatList, Image, TextInput, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Button, ImageBackground, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import { API } from '../../Sever/sever';

import Modal from "react-native-modal";
import UserContext from '../components/UserConText';

import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SavedJobsScreen = ({ navigation }) => {

  const { user } = useContext(UserContext);

  const [listSaveJobs, setListSaveJobs] = useState();

  const [selectedItem, setSelectedItem] = useState(null);
  const [password, setPassword] = useState('');
  const [search, setsearch] = useState('');
  const [isFocusedPass, setIsFocusedPass] = useState(false);

  const [isSave, setSave] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const toggleModal = (item) => {
    setModalVisible(!isModalVisible);
    setSelectedItem(item);
  };
  const toggleModalclose = (item) => {
    setModalVisible(!isModalVisible);
  };

  useFocusEffect(
    React.useCallback(() => {
      getListSave()
    }, [])
  );
  const fetchData = async () => {
    setRefreshing(true);
    setTimeout(() => {
      try {
        axios({
          url: `${API}/savePost/list`,
          method: "POST",
          data: {
            id: user._id,
          }
        }).then(async (response) => {
          if (response.status === 200) {
            const data = JSON.stringify(response.data)
            await AsyncStorage.setItem('listMySavePost', data);
            setListSaveJobs(response.data);
          }
        })
        setRefreshing(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setRefreshing(false);
      } finally {
        setRefreshing(false);
      }
      setRefreshing(false);
    }, 2000);
  };

  //List
  const getListSave = async () => {
    try {
      axios({
        url: `${API}/savePost/list`,
        method: "POST",
        data: {
          id: user._id,
        }
      }).then(async (response) => {
        if (response.status === 200) {
          setListSaveJobs(response.data);
        }
      })
    } catch (error) {
      console.log("err", error);
    }
  }
  const handlePost = async () => {
    console.log(selectedItem._id);
    // setLoading(true);
    // setTimeout(() => { 3000 });
    const result = await axios.post(`${API}/savePost/delete`, { id: selectedItem._id });
    if (result.status === 200) {
      // setLoading(false);
      toggleModalclose();
      fetchData();
      console.log("Thành công");
    }
  }
  const FlatListSaveJobs = () => {
    return (
      <FlatList
        data={listSaveJobs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItemJob}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <ImageBackground
              source={require('../assets/images/5928293_2953962.jpg')}
              style={{ width: "100%", height: 430 }}
            />
            <Text style={{ fontSize: 22, color: COLORS.black, fontWeight: '600' }}>Không tìm thấy</Text>
          </View>
        )}
      />
    );
  }

  const renderItemJob = ({ item }) => (

    <TouchableOpacity style={{ padding: 18 }}>
      <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
        <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
          {item?.post_id.image.map((imageUrl, index) => {
            if (index === 0) {
              return (
                <Image
                  key={index}
                  source={{ uri: imageUrl }}
                  style={{ width: 52, aspectRatio: 1, borderRadius: 5 }}
                />
              );
            }
          })}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600" }} numberOfLines={1}>
              {item.post_id.title}
            </Text>
            <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 4 }} numberOfLines={1}>
              {item.post_id.address}
            </Text>
          </View>
          <TouchableOpacity onPress={() => {
            toggleModal(item)
          }}>
            <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity }} />

        <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 12 }}>
          <View style={{ paddingStart: 60 }}>
            <Text style={{ fontSize: 18, color: COLORS.grey, fontWeight: "600" }} numberOfLines={1}>
              {item.post_id.businessName}
            </Text>
            <Text style={{ fontSize: 16, color: COLORS.primary, paddingVertical: 4 }} numberOfLines={1}>
              ${item.post_id.wageMin} - ${item.post_id.wageMax} /month
            </Text>
            <View style={{
              width: 60,
              borderWidth: 0.5,
              borderColor: COLORS.grey,
              borderRadius: 7,
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {
                item.post_id.workType_id._id == '653e66b38e88b23b41388e3c' ? (
                  <Text style={{ fontSize: 10 }} >Partime</Text>
                ) : (
                  <Text style={{ fontSize: 10 }} >Fulltime</Text>
                )
              }
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerA}>
          <View style={styles.headerLeft}>
            <ImageBackground
              source={require('../assets/images/SignIn/LogoSignInUp.png')}
              style={{ width: 26, height: 26 }}
              imageStyle={{ borderRadius: 46 }} />
            <View style={{ flexDirection: 'column', height: '100%', marginStart: 15 }}>
              <Text style={{ color: COLORS.black, fontSize: 24, fontWeight: '600' }} numberOfLines={1}>Save Jobs</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.headerRight}
            onPress={() => navigation.navigate('Notifications')}>
            <IconWithBadge iconName="bell" badgeText="2" />
          </TouchableOpacity>
        </View>
        {/* Search */}
        <View
          style={{
            flexDirection: 'row',
            borderColor: '#C6C6C6',
            borderRadius: 10,
            paddingHorizontal: 10,
            alignItems: 'center',
            backgroundColor: '#F5F5F5',
          }}>
          <Feather
            name="search"
            size={20}
            color="#C6C6C6"
            style={{ marginRight: 20 }} />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Tìm kiếm việc làm"
          />
          <TouchableOpacity
            style={{
              marginEnd: '2%',
            }}
            onPress={() => { }}>
            <FontAwesome6
              name="sliders"
              size={20}
              color={COLORS.blue}
              style={{
                opacity: 0.95,
              }} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={fetchData}
          colors={['#0000ff']} // Adjust the colors of the loading indicator
        />}
      >
        <FlatListSaveJobs />
      </ScrollView>
      <Modal onBackdropPress={toggleModalclose} isVisible={isModalVisible} style={{ justifyContent: 'flex-end', margin: 0 }}>
        <View style={{
          backgroundColor: '#FFFFFF',
          shadowColor: '#333333',
          shadowOffset: { width: -1, height: -3 },
          shadowRadius: 2,
          shadowOpacity: 0.4,
          // elevation: 5,
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
          <View style={{
            alignItems: 'center',
          }}>
            <View style={{
              width: 40,
              height: 6,
              borderRadius: 4,
              backgroundColor: COLORS.grey,
              marginBottom: 10,
            }} />
          </View>
        </View>
        <View style={{
          padding: 20,
          backgroundColor: '#FFFFFF',
          paddingTop: 20,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.black }}>Remove from Saved ?</Text>
          <View style={{ borderColor: COLORS.blackOpacity, marginVertical: 10, width: "100%" }} />
          <View style={{ paddingVertical: 18, width: "100%" }}>
            <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>
              <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
                {selectedItem?.post_id.image.map((imageUrl, index) => {
                  if (index === 0) {
                    return (
                      <Image
                        key={index}
                        source={{ uri: imageUrl }}
                        style={{ width: 52, aspectRatio: 1, borderRadius: 5 }}
                      />
                    );
                  }
                })}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600" }} numberOfLines={1}>
                    {selectedItem?.post_id.title}
                  </Text>
                  <Text style={{ fontSize: 16, color: COLORS.grey, paddingTop: 4 }} numberOfLines={1}>
                    {selectedItem?.post_id.address}
                  </Text>
                </View>
                <TouchableOpacity>
                  <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
              <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity }} />
              <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 12 }}>
                <View style={{ paddingStart: 60 }}>
                  <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "600" }} >
                    {selectedItem?.post_id.businessName}
                  </Text>
                  <Text style={{ fontSize: 16, color: COLORS.primary, paddingVertical: 4 }} >
                    ${selectedItem?.post_id.wageMin} - ${selectedItem?.post_id.wageMax} /moth
                  </Text>
                  <View style={{
                    width: 70,
                    borderWidth: 0.5,
                    borderColor: COLORS.grey,
                    borderRadius: 7,
                    padding: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {
                      selectedItem?.post_id.workType_id._id == '653e66b38e88b23b41388e3c' ? (
                        <Text style={{ fontSize: 10 }} >Partime</Text>
                      ) : (
                        <Text style={{ fontSize: 10 }} >Fulltime</Text>
                      )
                    }
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
          }}>
            <TouchableOpacity
              onPress={toggleModalclose}
              style={{
                backgroundColor: 'rgba(51, 123, 255, 0.20)',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 64,
                position: "relative",
                width: 160,
                paddingVertical: 15,
                marginEnd: 15,
              }}>
              <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: "600" }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePost}
              style={{
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 64,
                position: "relative",
                width: 160,
                paddingVertical: 15,
              }}>
              <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600" }}>Yes, Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: COLORS.blue,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,

  },
  headerA: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    width: '100%',
    height: 60,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: '1%',
    width: '68%',
  },
  headerRight: {
    width: 40,
    height: 40,
    borderWidth: 0.4,
    borderColor: COLORS.grey,
    borderRadius: 40,
    alignItems: 'center',
    marginRight: '1%',
    justifyContent: 'center',
    marginStart: '18%',
  },
  body: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },
  items: {
    marginTop: '3%',
  },
});

export default SavedJobsScreen;