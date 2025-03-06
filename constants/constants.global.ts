import { StyleSheet } from "react-native";

const textSize = StyleSheet.create({
  xs: {
    fontSize: 10,
  },
  sm: {
    fontSize: 12,
  },
  base: {
    fontSize: 14,
  },
  lg: {
    fontSize: 16,
  },
  xl: {
    fontSize: 18,
  },
  twoXl: {
    fontSize: 22,
  },
  threeXl: {
    fontSize: 25,
  },
  fourXl: {
    fontSize: 30,
  },
  fiveXl: {
    fontSize: 34,
  },
});

const colors = {
  main: "#fff",
  primary: "#17A448",
  gray: "#9E9E9E",
  black: "#000",
  dark: "#231F20",
  smoke: "#f5f5f5",
  green: "#8BD901",
  orange: "#ECA61B",
  yellow: "#FACC15",
};

const BASE_URL = "https://api.hhtschool.com:9000/api";

export { textSize, colors, BASE_URL };
