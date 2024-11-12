import { View, Text, TextInput, StyleSheet } from "react-native";
import { textSize, colors } from "../constants/constants.global";
import React from "react";

type InputFieldProps = {
  label?: string;
  placeHolder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: any;
  multiline?: boolean;
  lines?: number;
  position?: any;
  icon?: React.ReactNode;
  item?: React.ReactNode;
  secureText?: boolean;
  className?: string;
};

const InputField = ({
  label,
  placeHolder,
  onChangeText,
  value,
  keyboardType,
  multiline,
  lines,
  position,
  icon,
  item,
  secureText,
  className,
}: InputFieldProps) => {
  return (
    <View style={styles.textContainer}>
      <Text
        className="font-pmedium"
        style={[textSize.base, { marginBottom: 6 }]}
      >
        {label}
      </Text>
      <View
        style={[
          styles.inputWrapper,
          {
            justifyContent: icon || item ? "space-between" : "flex-start",
            borderWidth: icon || item ? 1.5 : 0,
            borderColor: colors.black,
          },
        ]}
        className={className}
      >
        <View style={{ paddingLeft: item ? 10 : 0 }}>{item && item}</View>
        <TextInput
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={secureText}
          style={[
            styles.textInput,
            {
              textAlignVertical: position ? position : "center",
              flex: 1,
              borderWidth: item || icon ? 0 : 1.5,
              borderColor: colors.gray,
            },
          ]}
          value={value}
          placeholder={placeHolder}
          multiline={multiline}
          numberOfLines={multiline ? (lines ? lines : 4) : 1}
        />
        <View style={{ paddingHorizontal: icon ? 10 : 0 }}>{icon && icon}</View>
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  textInput: {
    padding: 14,
    borderRadius: 14,
    fontFamily: "poppins-medium",
  },
  textContainer: {
    marginVertical: 2,
    width: "100%",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
  },
});
