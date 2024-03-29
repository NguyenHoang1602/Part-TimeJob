/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable quotes */
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');

export const COLORS = {
    primary: '#4587FF',
    title: '#072F4A',
    white: '#FFFFFF',
    lightGrey: '#F5F5F5',
    grey: '#AAAAAA',
    grey1: 'rgba(125, 122, 122, 0.7)',
    darkBlue: '#7D7A7A',
    yellow: '#F4D03F',
    black: '#000000',
    blackOpacity: '#D9D9D9',
    blue: '#E9F0FF'
};

export const SIZES = {
    h0: 32,
    h1: 22,
    h2: 20,
    h3: 18,
    h4: 16,
    h5: 14,
    h6: 12,

    width,
    height,
}