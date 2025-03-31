import * as Location from "expo-location";
import { useState, useCallback, useEffect } from "react";
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
  const [locationDetails, setLocationDetails] = useState<GeocodeResult | null>(
    null
  );
  const [locationErrorMsg, setLocationErrorMsg] = useState<string | null>(null);

  // request permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  // callback
  const getLocation = useCallback(async (): Promise<{
    coordinates: Coordinates | null;
    locationDetails: GeocodeResult | null;
  }> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationErrorMsg("Permission to access location was denied");
        return { coordinates: null, locationDetails: null };
      }

      let coords: Coordinates = loc || (await getCurrentLocation());

      const geocode = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      const locData: GeocodeResult =
        geocode.length > 0
          ? {
              city: geocode[0].city || null,
              region: geocode[0].region || null,
              country: geocode[0].country || null,
              street: geocode[0].street || null,
              postalCode: geocode[0].postalCode || null,
              formattedAddress: geocode[0].formattedAddress || null,
            }
          : {
              city: null,
              region: null,
              country: null,
              street: null,
              postalCode: null,
              formattedAddress: null,
            };

      setCoordinates((prev) =>
        JSON.stringify(prev) === JSON.stringify(coords) ? prev : coords
      );
      setLocationDetails((prev) =>
        JSON.stringify(prev) === JSON.stringify(locData) ? prev : locData
      );
      setLocationErrorMsg(null);
      return { coordinates: coords, locationDetails: locData };
    } catch (error: any) {
      setLocationErrorMsg(`Error getting location: ${error.message}`);
      return { coordinates: null, locationDetails: null };
    }
  }, [loc]);

  // current
  const getCurrentLocation = async (): Promise<Coordinates> => {
    const locationData = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    return {
      latitude: locationData.coords.latitude,
      longitude: locationData.coords.longitude,
    };
  };

  return {
    coordinates,
    locationDetails,
    locationErrorMsg,
    getLocation,
  };
};
