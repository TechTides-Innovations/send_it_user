import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { colors } from "../../constants/constants.global";

const Maps = () => {
  const [myLocation, setMyLocation] = useState({
    latitude: 5.664882,
    longitude: -0.197895,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setMyLocation({
      ...myLocation,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  useEffect(() => {
    handleUserLocation();
  }, []);

  return (
    <MapView
      followsUserLocation
      provider={PROVIDER_GOOGLE}
      initialRegion={myLocation}
      googleRenderer="LATEST"
      showsMyLocationButton
      showsUserLocation
      showsCompass
      style={{ flex: 1 }}
    >
      <Marker coordinate={myLocation} focusable pinColor={colors.primary} />
    </MapView>
  );
};

export default Maps;
