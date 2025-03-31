import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import MapScreen from "../../components/MapScreen";
import { useLocation } from "../../utils/Location";
import { Coordinates } from "../../types/climappTypes";

const LocationScreen = () => {
  const { session } = useAuth();
  const { coordinates, locationDetails, locationErrorMsg, getLocation } =
    useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      await getLocation();
      setIsLoading(false);
    };

    fetchLocation();
  }, [getLocation]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!session) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Please log in to access your locations.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <Text>Welcome, {session.user.user_metadata.display_name}!</Text>
      <Text>Your current location:</Text>
      {locationErrorMsg ? (
        <Text style={{ color: "red" }}>{locationErrorMsg}</Text>
      ) : (
        <>
          <Text>City: {cityInfo?.city || "N/A"}</Text>
          <Text>Country: {cityInfo?.country || "N/A"}</Text>
          <Text>
            Coordinates: {coordinates?.latitude}, {coordinates?.longitude}
          </Text>
        </>
      )} */}
      <MapScreen
        coords={coordinates}
        onLocationChange={(newCoords: Coordinates) => {
          console.log("New Location:", newCoords);
        }}
      />
    </View>
  );
};

export default LocationScreen;
