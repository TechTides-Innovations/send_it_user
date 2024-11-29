import { View, Text } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const Maps = () => {
  return <MapView provider={PROVIDER_GOOGLE} style={{ flex: 1 }} />;
};

export default Maps;
