/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState, useContext } from 'react';
import COLORS from '../assets/const/colors';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconWithBadge from '../components/IconWithBadge';
import IconWithBadgeAntDesign from '../components/IconWithBadgeAntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import axios from 'axios';
import { API } from '../../Sever/sever';
import UserContext from '../components/UserConText';
import { useFocusEffect } from '@react-navigation/native';


const ApplicationsStageScreen = ({ route, navigation }) => {
  const datalist = {
    id: route.params?.id,
    title: route.params?.title,
    businessName: route.params?.businessName,
    address: route.params?.address,
    wageMin: route.params?.wageMin,
    wageMax: route.params?.wageMax,
    workType_id: route.params?.workType_id,
    status: route.params?.status,
    image: route.params?.image,
    bargain_Salary: route.params?.bargain_Salary,
    feedback: route.params?.feedback,
    cv_id: route.params?.cv_id,

  };
  const [data, setData] = useState(datalist);
  const { user } = useContext(UserContext);
  useFocusEffect(
    React.useCallback(() => {
      getCVApply();
    }, [])
  );
  const [CvApply, setCvApply] = useState([]);
  const handleAccept = async () => {
    const response = await axios.post(`${API}/apply/updateAccept`, { id: data.id });
    if (response.status === 200) {
      console.log('thanh cong');
      getCVApply();
      toggleModalclose();
    }

  }
  const getCVApply = async () => {
    axios({
      url: `${API}/apply//CvApplySender`,
      method: "POST",
      data: {
        id: user._id,
        cv_id: data.cv_id,
      },
    }).then(async (response) => {
      if (response.status === 200) {
        setCvApply(response.data);
      }
    });
  };
  const status = CvApply.map((item) => {
    return item.status;
  });
  console.log(data?.id);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalclose = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: 25 }}>
      {/* header */}
      <View style={{ flexDirection: 'row', marginTop: 20, paddingVertical: 5, alignItems: 'center', paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={26} color="#212121" />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: '600', color: '#212121', marginLeft: 15 }}>Application Stages</Text>
      </View>
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flex: 1, paddingTop: '15%' }}>
        <View style={{ padding: 20, width: '90%', borderWidth: 0.5, borderColor: COLORS.grey, borderRadius: 20, alignItems: 'center' }}>
          {data?.image.map((imageUrl, index) => {
            if (index === 0) {
              return (
                <ImageBackground
                  key={index}
                  source={{ uri: imageUrl }}
                  style={{ width: 90, height: 90, marginBottom: 15 }}
                  imageStyle={{ borderRadius: 10, borderWidth: 0.5, borderColor: COLORS.grey }}
                />
              );
            }
          })}
          <Text style={{ fontSize: 22, fontWeight: '600', color: '#212121', textAlign: 'center' }}>{data.title}</Text>
          <Text style={{ fontSize: 17, fontWeight: '500', color: '#246BFD', marginVertical: 5, textAlign: 'center' }}>{data.businessName}</Text>
          <View style={{ height: 1, width: '99%', backgroundColor: COLORS.grey, opacity: 0.4, marginTop: 15, marginBottom: 8 }} />
          <Text style={{ fontSize: 17, fontWeight: '500', color: '#959595', marginTop: 5, marginVertical: 5, textAlign: 'center' }}>{data.address}</Text>
          <Text style={{ fontSize: 17, fontWeight: '400', color: '#246BFD', marginTop: 5, marginVertical: 5, textAlign: 'center' }}>${data.wageMin} - ${data.wageMax} /month</Text>
          <View style={{
            width: 60,
            height: 25,
            borderWidth: 0.5,
            borderColor: COLORS.grey,
            borderRadius: 7,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
            {
              data?.workType === '653e66b38e88b23b41388e3c' ? (
                <Text style={{ fontSize: 10 }} >Parttime</Text>
              ) : (
                <Text style={{ fontSize: 10 }} >Fulltime</Text>
              )
            }
          </View>
        </View>
        <View style={{ height: 1, width: '90%', backgroundColor: COLORS.grey, opacity: 0.4, marginTop: '7%', marginBottom: '6%' }} />
        <Text style={{ fontSize: 17, fontWeight: '500', color: '#414141' }}>Trạng thái ứng tuyển</Text>
        {
          status == 0 ? (
            <View style={{ marginTop: '8%', width: '90%', height: 50, borderRadius: 10, backgroundColor: '#E7EFFF', alignItems: 'center', justifyContent: 'center', marginBottom: '20%' }}>
              <Text style={{ fontSize: 17, fontWeight: '500', color: '#246BFE' }}>Application Sent</Text>
            </View>
          ) : status == 1 ? (
            <View style={{ marginTop: '8%', width: '90%', height: 50, borderRadius: 10, backgroundColor: '#FFF4CD', alignItems: 'center', justifyContent: 'center', marginBottom: '20%' }}>
              <Text style={{ fontSize: 17, fontWeight: '500', color: '#FBCA17' }}>Application Pending</Text>
            </View>

          ) : status == 2 ? (
            <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ marginTop: '8%', width: '90%', height: 50, borderRadius: 10, backgroundColor: '#FDD9DA', alignItems: 'center', justifyContent: 'center', marginBottom: '5%' }}>
              <Text style={{ fontSize: 17, fontWeight: '500', color: '#F75656' }}>Application Rejected</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: '20%' }}>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>Lý do: </Text>
              <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.primary }}>{data.feedback}</Text>
            </View>
          </View>
          ) : status == 4 ? (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={{ marginTop: '8%', width: '90%', height: 50, borderRadius: 10, backgroundColor: '#FFDCC3', alignItems: 'center', justifyContent: 'center', marginBottom: '20%' }}>
                <Text style={{ fontSize: 17, fontWeight: '500', color: '#FF6B00' }}>Application Negotiation</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>Lương thương lượng: </Text>
                <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.primary }}>{data.bargain_Salary}</Text>
              </View>
            </View>
          ) : <View style={{ marginTop: '8%', width: '90%', height: 50, borderRadius: 10, backgroundColor: '#E7FEEE', alignItems: 'center', justifyContent: 'center', marginBottom: '20%' }}>
            <Text style={{ fontSize: 17, fontWeight: '500', color: '#08BE75' }}>Application Accept</Text>
          </View>

        }
      </View>
      <View style={{ width: '100%', height: 100, borderWidth: 0.3, borderColor: COLORS.grey, justifyContent: 'center', alignItems: 'center' }}>
        {
          status == 0 || status == 2 ? (
            <TouchableOpacity
              style={{
                width: '90%',
                height: 50,
                backgroundColor: '#3062C8',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
              }}>
              <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '500' }}>Waiting...</Text>
            </TouchableOpacity>

          ) : status == 1 ? (
            <TouchableOpacity
              style={{
                width: '90%',
                height: 50,
                backgroundColor: '#246BFD',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
              }}>
              <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '500' }}>Discover Another Job</Text>
            </TouchableOpacity>
          ) : status == 4 ? (
            <TouchableOpacity
              onPress={() => toggleModal()}
              style={{
                width: '90%',
                height: 50,
                backgroundColor: '#246BFD',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
              }}>
              <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '500' }}>Confirm</Text>
            </TouchableOpacity>
          ) : <TouchableOpacity
            style={{
              width: '90%',
              height: 50,
              backgroundColor: '#246BFD',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
            }}>
            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '500' }}>Send Message to Reviewer</Text>
          </TouchableOpacity>
        }
      </View>
      <Modal
        onBackdropPress={toggleModalclose}
        isVisible={isModalVisible}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
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
              <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: '600' }}>Thương lượng</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleAccept();
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
              <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '600' }}>Chấp nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ApplicationsStageScreen;