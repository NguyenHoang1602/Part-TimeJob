import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Button = ({ onPress, text, image }) => {
    return (
        <View>
            <Pressable onPress={onPress} style={styles.btnLogin}>
                <Text style={styles.txtLogin}>{text}</Text>
            </Pressable>

            <Pressable onPress={onPress} style={styles.btnFb}>
                <Image source={image} style={styles.img } />
            </Pressable>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    btnLogin: {
        top: 210,
        backgroundColor: "#337BFF",
        width: 341,
        height: 55,
        borderRadius: 40,
        padding: 15,
        alignItems: 'center',
        marginVertical: 5,

    },
    txtLogin: {
        fontWeight: 'bold',
        color: 'white',
    },
    img: {
        top: 0,
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginHorizontal: 10,
        position: 'absolute',
    },
})