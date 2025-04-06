import {
  Coordinates,
  GeocodeResult,
  SavedLocation,
  MapScreenProps,
} from "../types/climappTypes";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useLocation } from "../utils/Location";
import * as Location from "expo-location";
import { styles } from "../styles/styles";
import {
  saveLocationsToStorage,
  loadLocationsFromStorage,
  syncLocationsToSupabase,
} from "../api/LocationService";
import uuid from "react-native-uuid";
import { useAuth } from "../contexts/AuthContext";
import PinList from "./PinList";
import { useRouter } from "expo-router";

const PIN_LIMIT: number = 5;

const MapScreen = ({ coords, onLocationChange }: MapScreenProps) => {
  const [selectedCoordinates, setSelectedCoordinates] =
    useState<Coordinates | null>(coords);
  const [pins, setPins] = useState<Coordinates[]>([]);
  const [pinTitles, setPinTitles] = useState<string[]>([]);
  const mapRef = useRef<MapView>(null);
  const { session } = useAuth();
  const router = useRouter();

  const { coordinates, getLocation, locationDetails } = useLocation(
    coords ? coords : undefined
  );

  useEffect(() => {
    const loadSavedPins = async () => {
      const savedLocations = (await loadLocationsFromStorage()) || [];
      console.log("Loaded saved locations from AsyncStorage:", savedLocations);

      const savedPins: Coordinates[] = savedLocations
        .filter((loc) => loc.coordinates != null)
        .map((loc) => loc.coordinates as Coordinates);

      if (savedPins.length > 0) {
        setPins(savedPins);
      } else if (coordinates) {
        setPins([coordinates]);
      }
    };

    loadSavedPins();
  }, [coordinates]);

  useEffect(() => {
    if (coordinates) {
      setSelectedCoordinates(coordinates);
    }

    const fetchPinTitles = async () => {
      const newPinTitles: string[] = [];
      let newLocations: SavedLocation[] = [];

      const currentSavedLocations: SavedLocation[] =
        (await loadLocationsFromStorage()) || [];

      // my_location
      if (coordinates) {
        const currentLocation: SavedLocation = {
          id: "my_location",
          coordinates: coordinates,
          geocode: locationDetails || currentSavedLocations[0]?.geocode,
        };

        newLocations.push(currentLocation);
        newPinTitles.push(currentLocation.geocode?.city || "Your Location");
      }

      // other pins
      for (let i = 1; i < pins.length; i++) {
        const p = pins[i];

        const geocode = await Location.reverseGeocodeAsync({
          latitude: p.latitude,
          longitude: p.longitude,
        }).catch((error) => {
          console.error("Could not get location details failed", error);
          return [];
        });

        const title =
          geocode.length > 0 ? (geocode[0].city ?? "Unknown") : "Unknown";
        newPinTitles.push(title);

        const newCoords: Coordinates = {
          latitude: p.latitude,
          longitude: p.longitude,
        };

        const newGeocode: GeocodeResult = geocode[0]
          ? {
              city: geocode[0]?.city,
              country: geocode[0]?.country,
              street: geocode[0]?.street,
              region: geocode[0]?.region,
              postalCode: geocode[0]?.postalCode,
              formattedAddress: geocode[0]?.formattedAddress,
            }
          : {};

        newLocations.push({
          id: uuid.v4() as string,
          coordinates: newCoords,
          geocode: newGeocode,
        });
      }

      setPinTitles(newPinTitles);

      console.log(`Saving locations:`, newLocations);
      await saveLocationsToStorage(newLocations);
    };

    if (pins.length > 0) {
      fetchPinTitles();
    }
  }, [pins, coordinates, locationDetails]);

  const handleMapPress = (event: any) => {
    const newCoordinates = event.nativeEvent.coordinate;
    if (pins.length < PIN_LIMIT) {
      setPins((prevPins) => [...prevPins, newCoordinates]);
      if (onLocationChange) {
        onLocationChange(newCoordinates);
      }
    }
  };

  const handleRemovePin = (index: number) => {
    if (index > 0) {
      setPins(pins.filter((_, i) => i !== index));
      setPinTitles(pinTitles.filter((_, i) => i !== index));
    }
  };

  const handleSyncLocation = () => {
    if (session) {
      syncLocationsToSupabase(session.user.id);
    }
  };

  const goToPin = (coordinates: Coordinates) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const handleShowWeather = (index: number) => {
    const coord: Coordinates = pins[index];
    const detailParam = `${coord.latitude},${coord.longitude}`;
    router.push(`/details/${detailParam}`);
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: selectedCoordinates?.latitude || 37.78825,
          longitude: selectedCoordinates?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {pins[0] && (
          <Marker
            coordinate={pins[0]}
            title={locationDetails?.city || "Your Location"}
            pinColor="green"
          />
        )}

        {pins.slice(1).map((pin, index) => (
          <Marker
            key={index + 1}
            coordinate={pin}
            title={pinTitles[index + 1] || `Pin ${index + 2}`}
            onCalloutPress={() => handleRemovePin(index + 1)}
          />
        ))}
      </MapView>
      <PinList
        pins={pins}
        goToPin={goToPin}
        handleRemovePin={handleRemovePin}
        handleShowWeather={handleShowWeather}
        pinTitles={pinTitles}
      ></PinList>
      <TouchableOpacity style={styles.mapButton} onPress={handleSyncLocation}>
        <Text style={styles.mapButtonText}>Sync Locations</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;
