/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { COLORS } from "../constants/theme";

const CheckBox = ({options = [], onchange, multiple}) => {
    const [selected, setSelected] = useState([]);
    function toggle(_id){
        let index = selected.findIndex((i) => i === _id);
        let arrSelecteds = [...selected];
        if (index !== -1) {
            arrSelecteds = arrSelecteds.filter((i) => i !== _id);
        } else {
            multiple ? arrSelecteds.push(_id) : (arrSelecteds = [_id]);
        }
        setSelected(arrSelecteds);
    }

    useEffect(() => onchange(selected), [selected]);
    return (
        <View>
            {options.map((op, index) => (
                <View key={index} style={style.optionContainer}>
                    <TouchableOpacity style={[style.touchble,{
                        backgroundColor: selected.findIndex(i => i === op._id ) !== -1 ? COLORS.primary : COLORS.white,
                    }]} onPress={() => toggle(op?._id)}>
                        {
                            selected.findIndex(i => i === op._id ) !== -1 ? (
                                <Icon name='check-bold' color={COLORS.white} size={16}/>
                            ) : null
                        }
                    </TouchableOpacity>
                    <Text style={style.optext}>{op?.title}</Text>
                </View>
            ))}
        </View>
    );
};
const style = StyleSheet.create({
    optionContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    touchble:{
        width: 26,
        height: 26,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.primary,
        borderWidth: 2,
    },
    optext:{
        marginLeft: 15,
        color: COLORS.black,
        fontSize: 16,
        marginTop: -4,
        fontFamily: 'BeVietnamPro-Medium',
    },
});
export default CheckBox;