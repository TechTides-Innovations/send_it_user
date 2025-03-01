import { View, Pressable, Text, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  LatLng,
} from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors, textSize } from "../../constants/constants.global";
import polyline from "@mapbox/polyline";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { Back, Button } from "../../components";
import { StatusBar } from "expo-status-bar";
import { savedPlaces } from "../../data/data.global";
import { router } from "expo-router";

const GOOGLE_MAPS_API_KEY = "AIzaSyCk0dBFW1BjUtK3Dold2tHvWQzwWxJVadw";

type LocationType = {
  latitude: number;
  longitude: number;
  address?: string;
};

const Maps = () => {
  const mapRef = useRef<MapView>(null);
  const [myLocation, setMyLocation] = useState({
    latitude: 5.664882,
    longitude: -0.197895,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [pickupLocation, setPickupLocation] = useState<LocationType | null>(
    null
  );
  const [deliveryLocation, setDeliveryLocation] = useState<LocationType | null>(
    null
  );
  const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const BOTTOM_VIEW_HEIGHT = 360;

  const handleUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    let location = await Location.getCurrentPositionAsync({});
    setMyLocation((prev) => ({
      ...prev,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }));
  };

  const fetchDirections = async (
    startLoc: LocationType,
    endLoc: LocationType
  ) => {
    try {
      setLoadingRoute(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${endLoc.latitude},${endLoc.longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );

      const json = await response.json();
      if (json.routes.length) {
        const points = polyline.decode(json.routes[0].overview_polyline.points);
        const coords = points.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));
        setRouteCoordinates(coords);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingRoute(false);
    }
  };
  const mapStyle = [
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ];

  useEffect(() => {
    const points: LatLng[] = [];
    if (pickupLocation) points.push(pickupLocation);
    if (deliveryLocation) points.push(deliveryLocation);

    if (points.length > 0 && mapRef.current) {
      mapRef.current.fitToCoordinates(points, {
        edgePadding: {
          top: 150,
          right: 50,
          bottom: 150,
          left: 50,
        },
        animated: true,
      });
    }
  }, [pickupLocation, deliveryLocation]);

  useEffect(() => {
    handleUserLocation();
  }, []);

  useEffect(() => {
    if (pickupLocation && deliveryLocation) {
      fetchDirections(pickupLocation, deliveryLocation);
    }
  }, [pickupLocation, deliveryLocation]);

  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <Pressable className="absolute  top-20 left-5 right-5 z-10  bg-white shadow-sm rounded-lg">
        <GooglePlacesAutocomplete
          placeholder="Pickup Location"
          fetchDetails={true}
          onPress={(data, details) => {
            if (details?.geometry?.location) {
              setPickupLocation({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                address: data.description,
              });
            }
          }}
          query={{ key: GOOGLE_MAPS_API_KEY, language: "en" }}
          styles={{
            textInput: {
              fontFamily: "poppins-regular",
              fontSize: 14,
            },
            listView: {
              backgroundColor: "white",
              borderRadius: 16,
              marginTop: 8,
            },
            textInputContainer: {
              paddingRight: 5,
            },
          }}
          renderLeftButton={() => (
            <EvilIcons
              name="location"
              size={24}
              color="red"
              style={{ marginLeft: 12, alignSelf: "center" }}
            />
          )}
        />

        {pickupLocation && (
          <GooglePlacesAutocomplete
            placeholder="Delivery Location"
            fetchDetails={true}
            onPress={(data, details) => {
              if (details?.geometry?.location) {
                setDeliveryLocation({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  address: data.description,
                });
              }
            }}
            query={{ key: GOOGLE_MAPS_API_KEY, language: "en" }}
            styles={{
              textInput: {
                fontFamily: "poppins-regular",
                fontSize: 14,
              },

              listView: {
                backgroundColor: "white",
                borderRadius: 16,
                marginTop: 8,
              },
              textInputContainer: {
                borderTopWidth: 1,
                paddingRight: 5,
              },
            }}
            renderLeftButton={() => (
              <EvilIcons
                name="location"
                size={24}
                color="green"
                style={{ marginLeft: 12, alignSelf: "center" }}
              />
            )}
          />
        )}
      </Pressable>

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={myLocation}
        customMapStyle={mapStyle}
        style={{ flex: 1, marginBottom: BOTTOM_VIEW_HEIGHT }}
      >
        {!pickupLocation && !deliveryLocation && (
          <Marker coordinate={myLocation} pinColor={colors.primary} />
        )}

        {pickupLocation && (
          <Marker
            coordinate={pickupLocation}
            title="Pickup Location"
            description={pickupLocation.address}
          >
            <Feather name="package" size={24} color="red" />
          </Marker>
        )}

        {deliveryLocation && (
          <Marker
            coordinate={deliveryLocation}
            pinColor="green"
            title="Delivery Location"
            description={deliveryLocation.address}
          >
            <Feather name="package" size={24} color="green" />
          </Marker>
        )}

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor={colors.primary}
            strokeWidth={4}
          />
        )}
      </MapView>

      <View
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl"
        style={{ height: BOTTOM_VIEW_HEIGHT }}
      >
        <View className="mb-10 mx-6 mt-5">
          <View className="flex-row justify-center items-center mb-4">
            <View className="w-12 h-1 bg-gray rounded-md"></View>
          </View>

          <View className="my-5 gap-8">
            {savedPlaces.map((item) => (
              <Pressable
                className="w-full flex-row gap-4 items-center"
                key={item.id}
              >
                <View className="w-fit bg-gray/20 p-3 rounded-full">
                  <Image
                    source={item.icon}
                    resizeMode="cover"
                    className="w-8 h-8"
                  />
                </View>
                <View>
                  <Text style={[textSize.xl]} className="font-pmedium">
                    {item.name}
                  </Text>
                  <Text className="font-pregular text-gray">
                    {item.location}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          {loadingRoute ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <Button
              bgColor={colors.primary}
              text="Continue"
              disabled={pickupLocation && deliveryLocation ? false : true}
              textColor={colors.main}
              onPress={() => {
                router.push("/itemdetails");
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Maps;
