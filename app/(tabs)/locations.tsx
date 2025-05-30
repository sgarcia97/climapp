import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import MapScreen from "../../components/MapScreen";
import { useLocation } from "../../utils/Location";
import { Coordinates } from "../../types/climappTypes";
import { blue } from "../../styles/styles";

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
        <ActivityIndicator color={blue} />
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
