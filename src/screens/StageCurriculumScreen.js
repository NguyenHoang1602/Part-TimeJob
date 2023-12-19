/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, Alert, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../assets/const/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { API } from '../../Sever/sever';
import UserContext from '../components/UserConText';
import { useFocusEffect } from '@react-navigation/native';
import Modal from "react-native-modal";

const StageCurriculumScreen = ({ route, navigation }) => {
    const { user } = useContext(UserContext);
    useFocusEffect(
        React.useCallback(() => {
            getCVApply();
            setErrors('')
        }, [])
    );
    // useEffect(() => {
    //     getCVApply();
    // },[]);

    const datalist = {
        _id: route.params?.item._id,
        user_id: route.params?.item?.user_id,
        cv_id: route.params?.item.cv_id,
        title: route.params?.item.cv_id?.title,
        name: route.params?.item.cv_id?.name,
        phone: route.params?.item.cv_id?.phone,
        year: route.params?.item.cv_id?.year,
        gender_id: route.params?.item.cv_id?.gender_id,
        salary: route.params?.item.salary,
        email: route.params?.item.cv_id?.email,
        address: route.params?.item.cv_id?.address,
        introduce: route.params?.item.cv_id?.introduce,
        post_id: route.params?.item.post_id,
        experience: route.params?.item.cv_id?.experience_id,
    };
    const [data, setData] = useState(datalist);
    const [CvApply, setCvApply] = useState([]);
    const [bargainSalary, setBargainSalary] = useState('');
    const [feedbacks, setFeedBack] = useState('');
    const handleOnChangeSalary = (value) => {
        let formattedValue = value.replace(/\D/g, '');
        formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        setBargainSalary(formattedValue);
    }
    const handleOnChangeFeedback = (value) => {
        setFeedBack(value);
    }
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModalclose = () => {
        setModalVisible(!isModalVisible);
    };
    const [isModalVisible1, setModalVisible1] = useState(false);
    const toggleModal1 = () => {
        setModalVisible1(!isModalVisible1);
    };
    const toggleModalclose1 = () => {
        setModalVisible1(!isModalVisible1);
    };
    const status = CvApply.map((item) => {
        return item.status;
    });
    const getCVApply = async () => {
        axios({
            url: `${API}/apply//CvApply`,
            method: "POST",
            data: {
                id: data._id,
                cv_id: data.cv_id._id,
            },
        }).then(async (response) => {
            if (response.status === 200) {
                setCvApply(response.data);
            }
        });
    };
    const handleAccept = async () => {
        const AcceptData = {
            id: data._id,
            bargain_salary: "",
            receiver_id: data.user_id,
            sender_id: user._id,
            post_id: data.post_id,
        };
        const response = await axios.post(`${API}/apply/updateAccept`, AcceptData);
        if (response.status === 200) {
            getCVApply();
        }
    }
    const handleReject = async () => {
        Alert.alert('Từ chối CV', 'Bạn có muốn thương lượng với người ứng tuyển ?', [
            { text: 'Không', onPress: () => toggleModal1() },
            { text: 'Có', onPress: () => toggleModal() },
        ]);
    };
    const [errors, setErrors] = useState('');

    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        const bargain_Salary = Number(bargainSalary.replace(/\./g, ''));
        console.log(bargain_Salary);
        if (!bargain_Salary) {
            setErrors('Vui lòng nhập lương thương lượng')
            isValid = false;
        } else if (bargain_Salary < data?.post_id?.wageMin) {
            setErrors('Lương thương lượng phải lớn hơn hoặc bằng lương tối thiểu')
            isValid = false;
        }
        if (isValid) {
            bargain()
        }
    };
    const bargain = async () => {
        const bargainData = {
            id: data._id,
            bargain_salary: bargainSalary,
            receiver_id: data.user_id,
            sender_id: user._id,
            post_id: data.post_id,
        };
        const response = await axios.post(`${API}/apply/updateBargain`, bargainData);
        if (response.status === 200) {
            getCVApply();
            toggleModalclose();
        }
    }

    const Reject = async () => {
        const Feedback = {
            id: data._id,
            bargain_salary: "",
            receiver_id: data.user_id,
            sender_id: user._id,
            post_id: data.post_id,
            feedback: feedbacks,
        };
        const response = await axios.post(`${API}/apply/updateReject`, Feedback);
        if (response.status === 200) {
            getCVApply();
            toggleModalclose1();
        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingBottom: 20,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: 18,
                    paddingBottom: 15,
                    alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color={COLORS.black} />
                </TouchableOpacity>
                <View style={{ marginLeft: 20, alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, color: COLORS.black }}>Thông tin CV</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ margin: 10, paddingVertical: 22, paddingHorizontal: 24, flex: 1, backgroundColor: COLORS.white }}>
                    <View style={{ width: '115%', height: 70, backgroundColor: '#FF5D01', opacity: 0.7, position: 'absolute' }} />
                    <View style={{ width: '100%', alignItems: 'center', marginBottom: 30, flex: 1 }}>
                        <Text style={{ fontSize: 20, fontFamily: 'BeVietnamPro-Medium', marginTop: -4, color: "white" }}>{data?.title}</Text>
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text1}>Tên: </Text>
                        <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -2 }}>{data?.name}</Text>
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Số ĐT: </Text>
                        <Text style={{ fontSize: 15, flex: 1, fontFamily: 'BeVietnamPro-Medium', marginTop: -3 }}>{data?.phone}</Text>
                        <Text style={styles.text2}>Năm sinh: </Text>
                        <Text style={{ fontSize: 15, marginEnd: 25, fontFamily: 'BeVietnamPro-Medium', marginTop: -3 }}>{data?.year}</Text>
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Giới tính: </Text>
                        {
                            data?.gender_id === '655f260103fd0dec424b970d' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Nam</Text>
                            ) : data?.gender_id === '655f261603fd0dec424b970e' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Nữ</Text>
                            ) : <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Khác</Text>
                        }
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Email: </Text>
                        <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -2 }}>{data?.email}</Text>
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Địa chỉ: </Text>
                        <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -2 }}>{data?.address}</Text>
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Lương mong muốn: </Text>
                        <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>{data?.salary?.toLocaleString('vi-VN')}đ</Text>
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Trình dộ học vấn: </Text>
                        {
                            data?.cv_id.academic_id == '653e661f8e88b23b41388e3b' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Trung cấp - Nghề</Text>
                            ) : data?.cv_id.academic_id == '655de6059a5b0ffa7ffd5134' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Cấp 3</Text>
                            ) : data?.cv_id.academic_id == '655de6289a5b0ffa7ffd5135' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Không yêu cầu</Text>
                            ) : data?.cv_id.academic_id == '655de6fc9a5b0ffa7ffd5136' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Đại học</Text>
                            ) : data?.cv_id.academic_id == '655de7129a5b0ffa7ffd5137' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Cao đẳng</Text>
                            ) : null
                        }
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Ngành nghề: </Text>
                        {
                            data?.cv_id.career_id == '6554b9b322054e51b8327165' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Tạp vụ</Text>
                            ) : data?.cv_id.career_id == '6554b9ce22054e51b8327168' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}> Nhân viên kho vận</Text>
                            ) : data?.cv_id.career_id == '6554b9de22054e51b832716b' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}> Công nhân may</Text>
                            ) : data?.cv_id.career_id == '6554b9f522054e51b832716e' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}> Bảo vệ</Text>
                            ) : data?.cv_id.career_id == '6554ba1922054e51b8327171' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}> Pha chế</Text>
                            ) : data?.cv_id.career_id == '6558505e70f5b03183a9c903' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}> Bán hàng</Text>
                            ) : data?.cv_id.career_id == '6558620586d0490539c8353c' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}> Nhân viên phục vụ</Text>
                            ) : data?.cv_id.career_id == '65586aa480b16af7fdeef6f3' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}> Nhân viên</Text>
                            ) : null
                        }
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text2}>Kinh nghiệm: </Text>
                        {
                            data?.cv_id.experience_id == '653e64098e88b23b41388e37' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Không có</Text>
                            ) : data?.cv_id.experience_id == '653e64198e88b23b41388e38' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}> dưới 1 năm</Text>
                            ) : data?.cv_id.experience_id == '655dea819a5b0ffa7ffd513c' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}> Từ 1 - 2 năm</Text>
                            ) : data?.cv_id.experience_id == '655deab09a5b0ffa7ffd513e' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}> Từ 3 - 4 năm</Text>
                            ) : data?.cv_id.experience_id == '655deac79a5b0ffa7ffd513f' ? (
                                <Text style={{ fontSize: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}> Trên 4 năm</Text>
                            ) : null
                        }
                    </View>
                    <Text style={styles.text1}>Giới thiệu bản thân: </Text>
                    <Text style={{ fontSize: 15, marginTop: 5, marginBottom: 20, fontFamily: 'BeVietnamPro-Medium', }}>- {data?.introduce}</Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#FF5D01', opacity: 0.7, position: 'relative' }} />
                </View>
                <View style={{
                    paddingHorizontal: 18,
                }}>
                    <Text style={{ fontSize: 15, marginBottom: 15, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>
                        Bài đăng đã được ứng tuyển :
                    </Text>

                    <TouchableOpacity style={{
                        borderWidth: 0.5,
                        borderColor: COLORS.grey,
                        borderRadius: 8,
                        marginBottom: 18,
                        padding: 15,
                    }}>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            {data?.post_id?.image.map((imageUrl, index) => {
                                if (index === 0) {
                                    return (
                                        <ImageBackground
                                            key={index}
                                            source={{ uri: imageUrl }}
                                            style={{ width: 46, height: 46, marginBottom: 5 }}
                                            imageStyle={{ borderRadius: 5 }}
                                        />
                                    );
                                }
                            })}
                            <View style={{ width: '50%', height: '100%', marginStart: 20, flex: 1 }}>
                                <Text numberOfLines={2} style={{ fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>{data?.post_id.title}</Text>
                                <Text numberOfLines={1} style={{ fontSize: 15, color: COLORS.grey, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>{data?.post_id?.address}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
                    <View style={{ alignItems: 'center', marginVertical: 30 }}>
                        <TextInput
                            keyboardType='numeric'
                            style={{ backgroundColor: "#F5F5F5", width: '80%', paddingHorizontal: 13, paddingVertical: 11, borderRadius: 5, fontFamily: 'BeVietnamPro-Medium', }}
                            placeholder="Nhập lương sẽ trả"
                            value={bargainSalary}
                            onChangeText={handleOnChangeSalary}
                        />
                        {
                            errors != '' && (
                                <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12, marginRight: '36%', fontFamily: 'BeVietnamPro-Medium', }}>
                                    {errors}
                                </Text>
                            )
                        }
                    </View>
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
                            <Text style={{ color: COLORS.primary, fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Hủy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                validate()
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
                            <Text style={{ color: COLORS.white, fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Thương lượng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                onBackdropPress={toggleModalclose1}
                isVisible={isModalVisible1}
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
                    <View style={{ alignItems: 'center', marginVertical: 30 }}>
                        <TextInput
                            style={{ backgroundColor: "#F5F5F5", width: '80%', paddingHorizontal: 13, paddingVertical: 11, borderRadius: 5, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}
                            placeholder="Nhập lí do từ chối"
                            onChangeText={handleOnChangeFeedback}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginVertical: 20,
                    }}>
                        <TouchableOpacity
                            onPress={toggleModalclose1}
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
                            <Text style={{ color: COLORS.primary, fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Hủy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                Reject();
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
                            <Text style={{ color: COLORS.white, fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {
                status == 1 ? (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                handleReject();
                            }}
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
                            <Text style={{ color: COLORS.primary, fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Từ chối</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                handleAccept()
                            }}
                            style={{
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 64,
                                position: "relative",
                                width: 160,
                                paddingVertical: 15,
                            }}>
                            <Text style={{ color: COLORS.white, fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Chấp nhận</Text>
                        </TouchableOpacity>
                    </View>
                ) : status == 2 ? (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity
                            // onPress={() => {
                            //     handleAccept()
                            // }}
                            style={{
                                backgroundColor: '#FDD9DA',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 64,
                                position: "relative",
                                width: '90%',
                                paddingVertical: 15,
                            }}>
                            <Text style={{ color: '#F75656', fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Bạn đã từ chối CV</Text>
                        </TouchableOpacity>
                    </View>
                ) : status == 3 ? (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity
                            // onPress={() => {
                            //     handleAccept()
                            // }}
                            style={{
                                backgroundColor: '#E7FEEE',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 64,
                                position: "relative",
                                width: '90%',
                                paddingVertical: 15,
                            }}>
                            <Text style={{ color: '#08BE75', fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>CV đã được chấp nhận</Text>
                        </TouchableOpacity>
                    </View>
                ) : status == 4 ? (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity
                            // onPress={() => {
                            //     handleAccept()
                            // }}
                            style={{
                                backgroundColor: '#FFAB6E',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 64,
                                position: "relative",
                                width: '90%',
                                paddingVertical: 15,
                            }}>
                            <Text style={{ color: COLORS.white, fontSize: 18, fontFamily: 'BeVietnamPro-Medium', marginTop: -4 }}>Đang thương lượng</Text>
                        </TouchableOpacity>
                    </View>
                ) : null
            }
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    view1: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 15,
    },
    text1: {
        fontSize: 15,
        fontFamily: 'BeVietnamPro-Medium',
        marginTop: -2,
        marginRight: 20,
    },
    text2: {
        fontSize: 15,
        fontFamily: 'BeVietnamPro-Medium',
        marginTop: -4,
        marginRight: 5,
    },
});
export default StageCurriculumScreen