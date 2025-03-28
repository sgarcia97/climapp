import * as Location from "expo-location";
import { useState, useCallback } from "react";
import {
  Coordinates,
  GeocodeResult,
  LocationResult,
} from "../types/climappTypes";

// hook
export const useLocation = (loc?: Coordinates): LocationResult => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(
    loc ?? null
  );
  const [cityInfo, setCityInfo] = useState<GeocodeResult | null>(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState<string | null>(null);

  const getLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationErrorMsg("Permission to access location was denied");
        return;
      }

      let coords: Coordinates;

      if (!loc) {
        const locationData = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        coords = {
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        };
      } else {
        coords = loc;
      }

      const geocode = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      const cityData: GeocodeResult =
        geocode.length > 0 ? geocode[0] : { city: null, country: null };

      setCoordinates(coords);
      setCityInfo(cityData);
      setLocationErrorMsg(null);
    } catch (error: any) {
      setLocationErrorMsg(`Error getting location: ${error.message}`);
    }
  }, []);

  return {
    coordinates,
    cityInfo,
    locationErrorMsg,
    getLocation,
  };
};
