/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import COLORS from '../assets/const/colors';
const InputMutiple = ({
    iconName,
    error,
    onFocus = () => {},
    ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={style.container}>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.grey,
          },
        ]}>
        <TextInput
          autoCorrect={false}
          multiline={true}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          style={{color: COLORS.darkBlue}}
          {...props}
        />
      </View>
      {error && (
        <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom : 13,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 130,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius : 6,
  },
});

export default InputMutiple;
