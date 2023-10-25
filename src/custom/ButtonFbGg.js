import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ButtonFbGg = ({image}) => {
  return (
    <View>
      <TouchableOpacity style={styles.btnFb}>
        <Image source={image} style={styles.img } />
      </TouchableOpacity>
    </View>
  )
}

export default ButtonFbGg

const styles = StyleSheet.create({
  btnFb: {
    backgroundColor: 'white',
    height: 51,
    width: 80,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 0.2,
    borderStyle: 'solid',
    marginHorizontal: 10,
    marginVertical: 20,
  }
})