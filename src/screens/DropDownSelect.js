/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { COLORS } from '../constants/theme';

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

const DropdownSelect = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
      return (
        <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: COLORS.primary }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        </SafeAreaView>
      );
    };
    const styles = StyleSheet.create({
        container: {
          backgroundColor: 'white',
          padding: 16,
          width: '100%',
          height: '100%',
          justifyContent: 'center'
        },
        dropdown: {
          height: 50,
          borderColor: 'gray',
          borderWidth: 0.5,
          borderRadius: 8,
          paddingHorizontal: 8,
        },
        icon: {
          marginRight: 5,
        },
        label: {
          position: 'absolute',
          backgroundColor: 'white',
          left: 22,
          top: 8,
          zIndex: 999,
          paddingHorizontal: 8,
          fontSize: 14,
        },
        placeholderStyle: {
          fontSize: 16,
        },
        selectedTextStyle: {
          fontSize: 16,
        },
        iconStyle: {
          width: 20,
          height: 20,
        },
        inputSearchStyle: {
          height: 40,
          fontSize: 16,
        },
      });

export default DropdownSelect;
