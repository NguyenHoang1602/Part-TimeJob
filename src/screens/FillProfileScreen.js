/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ImageBackground, Keyboard, ScrollView} from 'react-native'
import React, { useState, useContext } from 'react'
import COLORS from '../assets/const/colors';
import axios from 'axios';
import { API } from '../../Sever/sever';
import UserContext from '../components/UserConText';
import { useFocusEffect } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';

//
import DateTimePicker from '@react-native-community/datetimepicker';

//
import Input from '../components/InputProfile';
import InputMutiple from '../components/InputMutiple';
import { Dropdown } from 'react-native-element-dropdown';
import Loader from '../components/Loader';
import Button from '../custom/Button';


const data = [
    { label: 'Nam', value: '1' },
    { label: 'Nữ', value: '2' },
    { label: 'Khác', value: '3' },
];
const FillProfileScreen = ({ navigation }) => {

    const { setUser } = useContext(UserContext);
    const [values, setValues] = useState();
    const [valuedate, setValuedate] = useState(null);
    const [errgender, setErrGender] = useState(true);
    const [isFocus, setIsFocus] = useState(false);
    const [validateSex, setValidateSex] = useState('');
    const [inputs, setInputs] = React.useState({
        FullName: '',
        Birthday: '',
        Phone: '',
        Address: '',
    });

    const [checkedUser, setCheckeduser] = useState(false);
    const [checkedEmployer, setCheckedEmployer] = useState(false);
    const handleCheckUser = () => {
        setCheckeduser(!checkedUser);
        setCheckedEmployer(false);
    };
    const handleCheckEmployer = () => {
        setCheckedEmployer(!checkedEmployer);
        setCheckeduser(false);
    };

    const validateAll = () => {
        validate();
        VLDSex();
    }
    const VLDSex = (value) => {
        if (!value) {
            setValidateSex('Vui lòng chọn giới tính');
            setErrGender(!errgender);
        } else {
            setErrGender(false);
        }
    };
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const validate = () => {
        Keyboard.dismiss();
        inputs.Birthday = valuedate;
        let isValid = true;

        if (!inputs.FullName) {
            handleError('Vui lòng nhập tên', 'FullName');
            isValid = false;
        }
        if (!inputs.Birthday) {
            handleError('Vui lòng nhập tên', 'Birthday');
            isValid = false;
        }
        if (!inputs.Phone) {
            handleError('Vui lòng nhập số điện thoại', 'Phone');
            isValid = false;
        } else if (inputs.Phone.length > 10 || inputs.Phone.length < 10 ){
            handleError('Số điện thoại gồm 10 số', 'Phone');
            isValid = false;
        }
        if (!inputs.Address) {
            handleError('Vui lòng nhập địa chỉ', 'Address');
            isValid = false;
        }
        if (isValid) {
            register();
        }
    };

    const register = async () => {

        const datauser = {
            displayName: inputs.FullName,
            birthDay: inputs.Birthday,
            gender: inputs.Gender,
            phone: inputs.Phone,
            address: inputs.Address,
        };
        console.log(datauser);
        // setLoading(true);
        // setTimeout(() => { 3000 });
        // const result = await axios.post(`${API}/users/PhoneNumberSignIn`, { data: datauser });
        // if (result.status === 200) {
        //     setLoading(false);
        //     setUser(result.data);
        //     console.log('Thành công');
        //     navigation.navigate('TabNavigator');
        // }
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        setValuedate(formattedDate);
        // You can do something with the selected date here
    };


    const showDatepicker = () => {
        setShowDatePicker(true);
    };
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
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
                onPress={() => navigation.navigate('SelectRole')}>
                <AntDesign name="arrowleft" size={26} color={COLORS.black} />
                <Text style={{ fontSize: 22, fontWeight: '600', color: COLORS.black, marginLeft: 20 }}>Fill Your Profile</Text>
            </TouchableOpacity>
            <ScrollView>
            <View style={styles.body}>
                <ImageBackground
                    source={require('../assets/images/SignIn/LogoSignInUp.png')}
                    style={{ width: 140, height: 133, marginBottom: 10 }}
                />
                <View style={{ width: '100%' }}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'FullName')}
                        onFocus={() => handleError(null, 'Fullname')}
                        placeholder="Họ và tên"
                        error={errors.FullName}
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: COLORS.darkBlue }, !errgender && { borderColor: 'red' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Giới tính' : '...'}
                        value={inputs.Gender}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setIsFocus(false);
                            VLDSex(item.value);
                            handleOnchange(item.value, 'Gender');
                        }}

                    />
                    {!errgender ? <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>{validateSex}</Text> : null}
                    <Input
                        value={valuedate}
                        onFocus={() => handleError(null, 'Birthday')}
                        placeholder="Ngày sinh"
                        iconName={'calendar-month-outline'}
                        onpress={showDatepicker}
                        error={errors.Birthday}
                    />
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                    <Input
                        onChangeText={text => handleOnchange(text, 'Phone')}
                        onFocus={() => handleError(null, 'Phone')}
                        keyboardType="numeric"
                        placeholder="Số điện thoại"
                        error={errors.Phone}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'Address')}
                        onFocus={() => handleError(null, 'Address')}
                        placeholder="Địa chỉ"
                        error={errors.Address}
                    />
                </View>
            </View>
            </ScrollView>
            <View style={{ width: '100%', height: 100, borderWidth: 1, borderColor: '#EFEFEF', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={validateAll}
                    style={{
                        width: '90%',
                        height: 50,
                        backgroundColor: '#246BFD',
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 10,
                    }}>
                    <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '500' }}>Continue</Text>
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
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 40,
        paddingBottom: 50,
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
    dropdown: {
        height: 50,
        borderColor: COLORS.grey,
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 18,
        marginTop: 30,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        marginVertical: 5,
        fontSize: 14,
        color: COLORS.grey1,
    },
    selectedTextStyle: {
        fontSize: 14,
        color: COLORS.darkBlue,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 50,
        fontSize: 14,
        borderRadius: 6,
    },
});

export default FillProfileScreen;