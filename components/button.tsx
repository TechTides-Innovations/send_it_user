import {
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { colors, textSize } from "../constants/constants.global";

type ButtonProps = {
  bgColor: string;
  textColor: string;
  onPress?: () => void;
  text: string;
  loading?: boolean;
  disabled?: boolean;
};

const Button = ({
  bgColor,
  textColor,
  onPress,
  text,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={disabled === false ? onPress : () => null}
      style={{
        backgroundColor: disabled ? colors.gray : bgColor,
        paddingVertical: 12,
        borderRadius: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 0.84,
          },
          android: {
            elevation: 5,
          },
        }),
      }}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text
          className="font-pbold"
          style={[textSize.lg, { color: textColor, textAlign: "center" }]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
