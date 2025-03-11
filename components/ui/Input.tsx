import * as React from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
} from "react-native";

type input = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword: boolean;
};

export default function Input({
  placeholder,
  onChangeText,
  value,
  isPassword,
}: input) {
  return (
    <TextInput
      style={styles.input}
      secureTextEntry={isPassword}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: 368,
    height: 58,
    backgroundColor: "#fff",
    borderRadius: 8,
    outline: "none",
  },
});
