import {
  Coordinates,
  GeocodeResult,
  SavedLocation,
} from "../types/climappTypes";
import { MapScreenProps } from "../types/climappTypes";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useLocation } from "../utils/Location";
import * as Location from "expo-location";
import styles from "../styles/styles";
import {
  saveLocationsToStorage,
  loadLocationsFromStorage,
} from "../api/LocationService";
import uuid from "react-native-uuid";

const PIN_LIMIT: number = 5;

const MapScreen = ({ coords, onLocationChange }: MapScreenProps) => {
  const [selectedCoordinates, setSelectedCoordinates] =
    useState<Coordinates | null>(coords);
  const [pins, setPins] = useState<Coordinates[]>([]);
  const [pinTitles, setPinTitles] = useState<string[]>([]);

  const { coordinates, getLocation, cityInfo } = useLocation(
    coords ? coords : undefined
  );

  useEffect(() => {
    if (coordinates) {
      setSelectedCoordinates(coordinates);
      // my location
      if (pins.length === 0) {
        setPins([coordinates]);
      }
    }
  }, [coordinates]);

  useEffect(() => {
    const fetchPinTitles = async () => {
      const newPinTitles: string[] = [];

      let newLocations: SavedLocation[] = [];

      const currentSavedLocations: SavedLocation[] =
        (await loadLocationsFromStorage()) || [];
      // save first slot (if changed)
      if (
        currentSavedLocations[0].coordinates?.latitude !=
          coordinates?.latitude &&
        currentSavedLocations[0].coordinates?.longitude !=
          coordinates?.longitude
      ) {
        // create new saved location object from current location
        const currentLocation: SavedLocation = {
          id: uuid.v4(),
          coordinates: coordinates,
          cityInfo: cityInfo,
          locationErrorMsg: null,
        };
        newLocations.push(currentLocation);
      }

      for (let p of pins) {
        if (p === pins[0] && cityInfo?.city) {
          newPinTitles.push(cityInfo.city);
        } else {
          const geocode = await Location.reverseGeocodeAsync({
            latitude: p.latitude,
            longitude: p.longitude,
          });
          newPinTitles.push(
            geocode.length > 0 ? (geocode[0].city ?? "Unknown") : "Unknown"
          );
          // start create a new SavedLocation
          const newCoords: Coordinates = {
            latitude: p.latitude,
            longitude: p.longitude,
          };

          const newCityInfo: GeocodeResult = {
            city: geocode[0].city,
            country: geocode[0].country,
            street: geocode[0].street,
            region: geocode[0].region,
          };

          const currentLocation: SavedLocation = {
            id: uuid.v4(),
            coordinates: newCoords,
            cityInfo: newCityInfo,
            locationErrorMsg: null,
          };
          // store pins for saving
          newLocations.push(currentLocation);
        }
      }
      setPinTitles(newPinTitles);
      // save to local
      console.log(
        `# of new locations = ${newLocations.length} pins = ${pins.length}`
      );
      for (let s of newLocations) {
        console.log(
          `saving ${s.coordinates?.latitude},${s.coordinates?.longitude}`
        );
      }
      await saveLocationsToStorage(newLocations);
    };

    if (pins.length > 0) {
      fetchPinTitles();
    }
  }, [pins]);

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
    }
  };

  const handleSyncLocation = () => {
    getLocation();
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
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
            title={cityInfo?.city || "Your Location"}
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

      <TouchableOpacity style={styles.mapButton} onPress={handleSyncLocation}>
        <Text style={styles.mapButtonText}>Sync Location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;
