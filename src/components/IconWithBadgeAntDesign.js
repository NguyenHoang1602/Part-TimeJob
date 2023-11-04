/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Replace with your icon set
import { COLORS } from '../constants/theme';

const IconWithBadgeAntDesign = ({ iconName, badgeText, check }) => {

    return (
        <View>
               <AntDesign name={iconName} size={24} color= {COLORS.black}/>
            {badgeText && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 5,
                        width : 4,
                        height: 4,
                    }}
                >
                    <Text style={{ backgroundColor: 'red', color: 'white', borderRadius: 10, padding: 5 , fontSize: 1}}>{badgeText}</Text>
                </View>
            )}
        </View>
    );
};

export default IconWithBadgeAntDesign;