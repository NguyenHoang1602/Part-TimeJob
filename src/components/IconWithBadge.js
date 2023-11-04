/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Replace with your icon set
import { COLORS } from '../constants/theme';

const IconWithBadge = ({ iconName, badgeText, check }) => {

    return (
        <View>
               <Feather name={iconName} size={24} color= {COLORS.black}/>
            {badgeText && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 7,
                        width : 4,
                        height: 4,
                    }}
                >
                    <Text style={{ backgroundColor: 'red', color: 'white', borderRadius: 10, padding: 4 , fontSize: 1}}>{badgeText}</Text>
                </View>
            )}
        </View>
    );
};

export default IconWithBadge;