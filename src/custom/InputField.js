import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const InputField = ({value, setValue, placeHolder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
          <TextInput
              value={value}
              onChangeText={setValue}
              placeholder={placeHolder}
              style={styles.inputEmail}
              secureTextEntry={secureTextEntry} />
      </View>
      
  )
}

export default InputField

const styles = StyleSheet.create({
    inputEmail: {
        top: 160,
        backgroundColor: 'white',
        width: 382,
        borderColor: '#EDECEC',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        borderStyle: 'solid',
        position: 'relative',
    },
})