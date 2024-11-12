import {
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { textSize } from "../constants/constants.global";

type ButtonProps = {
  bgColor: string;
  textColor: string;
  onPress?: () => void;
  text: string;
  loading?: boolean;
};

const Button = ({
  bgColor,
  textColor,
  onPress,
  text,
  loading = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bgColor,
        paddingVertical: 14,
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
