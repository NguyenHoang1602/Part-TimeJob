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
    image: route.params?.image,
    bargain_Salary: route.params?.bargain_Salary,
    feedback: route.params?.feedback,
    cv_id: route.params?.cv_id,
    post_id: route.params?.post_id,
    receiver_id: route.params?.receiver_id,
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
    console.log(data.id);
    const AcceptData = {
      id: data.id,
      bargain_salary: data.bargain_Salary,
      receiver_id: data.receiver_id,
      sender_id: user._id,
      post_id: data.post_id,
    };
    const response = await axios.post(`${API}/apply/updateAcceptForUser`, AcceptData);
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
        cv_id: data.id,
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
        <Text style={{ fontSize: 21,  fontFamily: 'BeVietnamPro-Medium', color: '#212121', marginLeft: 15 }}>Trạng thái ứng tuyển</Text>
      </View>
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
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
          <Text numberOfLines={2} style={{ fontSize: 21, fontFamily: 'BeVietnamPro-Medium', color: '#212121', textAlign: 'center' }}>{data.title}</Text>
          <Text numberOfLines={2} style={{ fontSize: 16,  fontFamily: 'BeVietnamPro-Medium', color: '#246BFD', marginVertical: 5, textAlign: 'center' }}>{data.businessName}</Text>
          <View style={{ height: 1, width: '99%', backgroundColor: COLORS.grey, opacity: 0.4, marginTop: 15, marginBottom: 8 }} />
          <Text numberOfLines={2} style={{ fontSize: 16,  fontFamily: 'BeVietnamPro-Medium', color: '#959595', marginTop: 5, marginVertical: 5, textAlign: 'center' }}>{data.address}</Text>
          <View style={{ flexDirection: 'row', marginTop: 5, marginVertical: 5 }}>
            <Text style={{ fontSize: 16,  fontFamily: 'BeVietnamPro-Medium', color: 'red', textAlign: 'center' }}>{data.wageMin}đ - {data.wageMax}đ</Text>
            {
              data?.payForm_id?._id === '655de22b9a5b0ffa7ffd5132' ? (
                <Text style={{ fontSize: 17,  fontFamily: 'BeVietnamPro-Medium',color: 'red' }}> /giờ</Text>
              ) : (
                <Text style={{ fontSize: 17,  fontFamily: 'BeVietnamPro-Medium', color: 'red' }}> /tháng</Text>
              )
            }
          </View>
          <View style={{
            width: 90,
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
                <Text style={{ fontSize: 10, fontFamily: 'BeVietnamPro-Medium'}} >Bán thời gian</Text>
              ) : (
                <Text style={{ fontSize: 10 ,fontFamily: 'BeVietnamPro-Medium' }} >Toàn thời gian</Text>
              )
            }
          </View>
        </View>
        <View style={{ height: 1, width: '90%', backgroundColor: COLORS.grey, opacity: 0.4, marginTop: '7%', marginBottom: '6%' }} />
        <Text style={{ fontSize: 16,  fontFamily: 'BeVietnamPro-Medium', color: '#414141' }}>Trạng thái ứng tuyển</Text>
        {
          status == 0 ? (
            <View style={{ marginTop: '8%', width: '90%', height: 50, borderRadius: 10, backgroundColor: '#E7EFFF', alignItems: 'center', justifyContent: 'center', marginBottom: '20%' }}>
              <Text style={{ fontSize: 16,  fontFamily: 'BeVietnamPro-Medium', color: '#246BFE' }}>Hồ sơ đã được gửi</Text>
            </View>
          ) : status == 1 ? (
            <View style={{ marginTop: '8%', width: '90%', height: 50, borderRadius: 10, backgroundColor: '#FFF4CD', alignItems: 'center', justifyContent: 'center', marginBottom: '20%' }}>
              <Text style={{ fontSize: 16,  fontFamily: 'BeVietnamPro-Medium', color: '#FBCA17' }}>Hồ sơ đang xử lí</Text>
            </View>

          ) : status == 2 ? (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={{ marginTop: '8%', width: '90%', height: 50, borderRadius: 10, backgroundColor: '#FDD9DA', alignItems: 'center', justifyContent: 'center', marginBottom: '5%' }}>
                <Text style={{ fontSize: 16,  fontFamily: 'BeVietnamPro-Medium', color: '#F75656' }}>Hồ sơ bị từ chối</Text>
              </View>
              <Text style={{ fontSize: 18, fontFamily: 'BeVietnamPro-Medium',marginTop:-2, textAlign: 'left' }}>Lý do: </Text>
              <Text style={{ fontSize: 16, fontFamily: 'BeVietnamPro-Medium',marginTop:-2, marginHorizontal: 20, marginTop: 5}}>{data.feedback}</Text>
            </View>
          ) : status == 4 ? (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={{ marginTop: '8%', width: '90%', height: 50, borderRadius: 10, backgroundColor: '#FFDCC3', alignItems: 'center', justifyContent: 'center', marginBottom: '20%' }}>
                <Text style={{ fontSize: 16,  fontFamily: 'BeVietnamPro-Medium', color: '#FF6B00' }}>Đang thương lượng</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: '-15%' }}>
                <Text style={{ fontSize: 17, fontFamily: 'BeVietnamPro-Medium' }}>Lương thương lượng: </Text>
                <Text style={{ fontSize: 18, fontWeight: '500', color: COLORS.primary }}>{data.bargain_Salary}đ</Text>
              </View>
            </View>
          ) : <View style={{ marginTop: '8%', width: '90%', height: 50, borderRadius: 10, backgroundColor: '#E7FEEE', alignItems: 'center', justifyContent: 'center', marginBottom: '20%' }}>
            <Text style={{ fontSize: 16,  fontFamily: 'BeVietnamPro-Medium', color: '#08BE75' }}>Ứng tuyển thành công</Text>
          </View>

        }
      </View>
      <View style={{ width: '100%', height: 100, borderWidth: 0.3, borderColor: COLORS.grey, justifyContent: 'center', alignItems: 'center' }}>
        {
          status == 0 || status == 1 ? (
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
              <Text style={{ color: COLORS.white, fontSize: 17, fontFamily: 'BeVietnamPro-Medium' }}>Đang chờ...</Text>
            </TouchableOpacity>

          ) : status == 2 ? (
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
              <Text style={{ color: COLORS.white, fontSize: 17, fontFamily: 'BeVietnamPro-Medium' }}>Tìm công việc khác</Text>
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
              <Text style={{ color: COLORS.white, fontSize: 17, fontFamily: 'BeVietnamPro-Medium' }}>Xác nhận</Text>
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
            <Text style={{ color: COLORS.white, fontSize: 17, fontFamily: 'BeVietnamPro-Medium' }}>Đã hoàn thành</Text>
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
            gap: 10
          }}>
            <TouchableOpacity
              onPress={toggleModalclose}
              style={{
                backgroundColor: 'rgba(51, 123, 255, 0.20)',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 64,
                position: 'relative',
                width: 140,
                paddingVertical: 15,
              }}>
              <Text style={{ color: COLORS.primary, fontSize: 18, fontFamily: 'BeVietnamPro-Medium',marginTop:-2 }}>Thương lượng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleModalclose}
              style={{
                backgroundColor: 'rgba(51, 123, 255, 0.20)',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 64,
                position: 'relative',
                width: 100,
                paddingVertical: 15,
              }}>
              <Text style={{ color: COLORS.primary, fontSize: 17, fontFamily: 'BeVietnamPro-Medium'  }}>Thương lượng</Text>
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
                width: 120,
                paddingVertical: 15,
              }}>
              <Text style={{ color: COLORS.white, fontSize: 17, fontFamily: 'BeVietnamPro-Medium'  }}>Chấp nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ApplicationsStageScreen;