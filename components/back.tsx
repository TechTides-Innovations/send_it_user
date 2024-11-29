import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { colors, textSize } from "../constants/constants.global";
import { useRouter } from "expo-router";
type BackProps = {
  title?: string;
  color?: string;
};
const Back = ({ title, color }: BackProps) => {
  const router = useRouter();
  return (
    <Pressable style={styles.container} onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={28} color={color ? color : "black"} />
      <Text
        className="font-pmedium"
        style={[textSize.xl, { color: color ? color : colors.black }]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
export default Back;
