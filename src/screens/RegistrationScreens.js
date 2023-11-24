/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Keyboard,
    ScrollView,
    Alert,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

//
import Input from '../components/InputProfile';
import InputMutiple from '../components/InputMutiple';
import COLORS from '../assets/const/colors';
import { Dropdown } from 'react-native-element-dropdown';
import Loader from '../components/Loader';
import Button from '../custom/Button';
import { useFocusEffect } from '@react-navigation/native';


const data = [
    { label: 'Nam', value: '1' },
    { label: 'Nữ', value: '2' },
    { label: 'Khác', value: '3' },
];
const RegistrationScreen = ({ route,navigation }) => {
    const [values, setValues] = useState();
    const [valuedate, setValuedate] = useState("");

    const [isFocus, setIsFocus] = useState(false);
    const [validateSex, setValidateSex] = useState('');
    const [inputs, setInputs] = React.useState({
        FirtName: '',
        Name: '',
        Birthday: '',
        PhoneNumber: '',
        Address: '',
    });
    const validateAll = () => {
        validate();
        VLDSex();
    }
    const VLDSex = (value) => {
        if (!value) {
            setValidateSex('Vui lòng chọn giới tính');
        } else {
            setValidateSex('');
        }
    };
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const validate = () => {
        Keyboard.dismiss();
        inputs.Birthday = valuedate;
        let isValid = true;

        if (!inputs.FirtName) {
            handleError('Vui lòng nhập họ', 'FirtName');
            isValid = false;
        }
        if (!inputs.Name) {
            handleError('Vui lòng nhập tên', 'Name');
            isValid = false;
        }
        if (!inputs.Birthday) {
            handleError('Vui lòng nhập tên', 'Birthday');
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

    const register = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                let datatest = {
                    FirtName: inputs.FirtName,
                    Name: inputs.Name,
                    Birthday: inputs.Birthday,
                    Gender: values,
                    PhoneNumber: inputs.PhoneNumber,
                    Address: inputs.Address,
                };
                console.log('data: ', datatest);
            } catch (error) {
                Alert.alert('Error', 'Something went wrong');
            }
        }, 3000);
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
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <Loader visible={loading} /> 
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 30 }}>
                <View style={{ marginVertical: 20 }}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'FirtName')}
                        onFocus={() => handleError(null, 'FirtName')}
                        placeholder="Họ"
                        error={errors.FirtName}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'Name')}
                        onFocus={() => handleError(null, 'Name')}
                        placeholder="Tên"
                        error={errors.Name}
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: COLORS.darkBlue }, validateSex && { borderColor: 'red' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Giới tính' : '...'}
                        value={inputs.sex}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setIsFocus(false);
                            VLDSex(item.value)
                            handleOnchange(item.label, 'sex')
                        }}

                    />
                    {validateSex ? <Text style={{marginTop: 7,color: COLORS.red, fontSize: 12 }}>{validateSex}</Text> : null}
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
                        keyboardType="numeric"
                        placeholder={route.params?.number}
                        error={errors.PhoneNumber}
                        value ={route.params?.PhoneNumber}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'Address')}
                        onFocus={() => handleError(null, 'Address')}
                        placeholder="Địa chỉ"
                        error={errors.Address}
                    />
                    <View style={{ width: '100%', alignItems: 'center', marginVertical: 45}}>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: COLORS.primary,
                                borderRadius: 8,

                            }}
                            onPress={validateAll}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: COLORS.white }}>Hoàn tất</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Text
                        onPress={() => navigation.navigate('LoginScreen')}
                        style={{
                            color: COLORS.black,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 16,
                        }}>
                        Already have account ?Login
                    </Text> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.grey,
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: COLORS.darkBlue,
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: COLORS.blue,
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
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

export default RegistrationScreen;