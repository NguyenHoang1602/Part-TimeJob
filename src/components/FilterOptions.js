import React, { useState } from 'react';
import { FlatList, Image, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// DropDown
import { Dropdown } from 'react-native-element-dropdown';

import Modal from "react-native-modal";

import SalaryRangeSelector from '../components/SalaryRangeSelector';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const FilterOptions = () => {

    const MAX_PRICE = 500;

    const [startPrice, setStartPrice] = useState(50);
    const [endPrice, setEndPrice] = useState(250);

    const [isModalVisibleSave, setModalVisibleSave] = useState(false);
    const [isModalVisibleFilter, setModalVisibleFiler] = useState(false);

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <Modal isVisible={isModalVisibleFilter} style={{ margin: 0 }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: 'white', padding: 18 }}>
                    {/* Tilter */}

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <TouchableOpacity onPress={toggleModalclose}>
                            <AntDesign name='close' size={24} color={COLORS.black} />
                        </TouchableOpacity>
                        <Text style={{ paddingStart: 10, fontSize: 18, fontWeight: '700', color: COLORS.black }}>Filter Options</Text>
                    </View>

                    {/* Filter Options */}
                    <View style={{ alignItems: 'center', height: '100%', }}>
                        {/* Location & Salary */}
                        <View style={{ paddingVertical: 18, width: "100%" }}>
                            <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>

                                <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", }} numberOfLines={1}>
                                            Location & Salary
                                        </Text>
                                    </View>
                                    <TouchableOpacity>
                                        <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, }} />

                                <View style={{ gap: 8, paddingVertical: 12 }}>
                                    <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: COLORS.darkBlue }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={data}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? 'Vị trí' : '...'}
                                        searchPlaceholder="Search..."
                                        value={value}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setValue(item.value);
                                            setIsFocus(false);
                                        }}
                                    />

                                    {/* Range Salary */}
                                    <SalaryRangeSelector
                                        minPrice={0}
                                        maxPrice={MAX_PRICE}
                                        startPrice={startPrice}
                                        endPrice={endPrice}
                                        onStartPriceChange={setStartPrice}
                                        onEndPriceChange={setEndPrice}
                                    />
                                </View>
                            </View>
                        </View>
                        {/* Work Type */}
                        <View style={{ paddingVertical: 18, width: "100%" }}>
                            <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>

                                <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", }} numberOfLines={1}>
                                            Work Type
                                        </Text>
                                    </View>
                                    <TouchableOpacity>
                                        <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, }} />

                                <View style={{ gap: 8, paddingVertical: 12 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                        <TouchableOpacity style={styles.radio} onPress={{}} />
                                        <Text style={styles.textWorkType}>
                                            Onsite (Work at Office)
                                        </Text>
                                    </View>

                                    <View style={{}}>
                                        <Text style={styles.textWorkType}>
                                            Remote (Work at Home)
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* Sex Type */}
                        <View style={{ paddingVertical: 18, width: "100%" }}>
                            <View style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 18, borderColor: COLORS.blackOpacity }}>

                                <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 18 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: "700", }} numberOfLines={1}>
                                            Sex Type
                                        </Text>
                                    </View>
                                    <TouchableOpacity>
                                        <MaterialCommunityIcons name={!isSave ? 'bookmark-minus' : 'bookmark-minus-outline'} size={26} color={COLORS.primary} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ borderTopWidth: 1, borderColor: COLORS.blackOpacity, }} />

                                <View style={{ gap: 8, paddingVertical: 12 }}>
                                    <View style={{}}>
                                        <Text style={styles.textWorkType}>
                                            Male
                                        </Text>
                                    </View>

                                    <View style={{}}>
                                        <Text style={styles.textWorkType}>
                                            Female
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* Button */}
                        <View style={{
                            flexDirection: 'row',
                            bottom: 40,
                            position: 'absolute',
                            shadowColor: 'red'
                        }}>
                            <TouchableOpacity
                                onPress={toggleModalFilter}
                                style={{
                                    backgroundColor: COLORS.blue,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 64,
                                    position: "relative",
                                    width: 160,
                                    paddingVertical: 15,
                                    marginEnd: 15
                                }}>
                                <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: "600", }}>Reset</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLORS.primary,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 64,
                                    position: "relative",
                                    width: 160,
                                    paddingVertical: 15
                                }}>
                                <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600", }}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </GestureHandlerRootView>
        </Modal>
    )
}

export default FilterOptions

const styles = StyleSheet.create({
    foundNav: {
        flexDirection: 'row',
        paddingHorizontal: 20,

    },
    textFound: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.black,
    },
    titleNoFound: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.black,
    },
    show: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
    },
    imgNoFound: {
        height: 300,
        width: '100%',
    },
    textNoFound: {
        fontSize: 18,
        color: COLORS.black,
        textAlign: 'center'
    },
    dropdown: {
        height: 50,
        backgroundColor: COLORS.lightGrey,
        borderRadius: 10,
        paddingHorizontal: 18,
        marginVertical: 13,
    },
    placeholderStyle: {
        marginVertical: 5,
        fontSize: 14,
        color: COLORS.grey,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: '500'
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
    textWorkType: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: '500',
    },
    radio: {
        width: 24,
        height: 24,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
        padding: 5
    },
})