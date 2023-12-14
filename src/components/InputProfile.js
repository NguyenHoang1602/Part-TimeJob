/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../assets/const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({
  iconName,
  error,
  onPress,
  onFocus = () => { },
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
            alignItems: 'center',
          },
        ]}>
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          style={{ color: COLORS.darkBlue, flex: 1, marginLeft: 10 }}
          {...props}
        />
        <TouchableOpacity onPress={onPress}>
          <Icon
            name={iconName}
            style={{ color: COLORS.darkBlue, fontSize: 22, marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
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
    marginTop: 30,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 6,
  },
});

export default Input;
