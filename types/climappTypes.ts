interface GeocodeResult {
  city?: string | null;
  country?: string | null;
  street?: string | null;
  region?: string | null;
  postalCode?: string | null;
  formattedAddress?: string | null;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationResult {
  coordinates: Coordinates | null;
  locationDetails: GeocodeResult | null;
  locationErrorMsg: string | null;
  getLocation: () => Promise<{
    coordinates: Coordinates | null;
    locationDetails: GeocodeResult | null;
  }>;
}

interface SavedLocation {
  id: string;
  geocode: GeocodeResult | null;
  coordinates: Coordinates | null;
}

interface TemplateProps {
  children: React.ReactNode;
  title?: string;
  vCentered?: boolean;
  topGuard?: boolean;
}

interface MapScreenProps {
  coords: Coordinates | null;
  onLocationChange?: (coords: Coordinates) => void;
}

interface PinListProps {
  pins: Coordinates[];
  goToPin: (pin: Coordinates) => void;
  handleRemovePin: (index: number) => void;
  pinTitles: string[];
}

export {
  GeocodeResult,
  Coordinates,
  LocationResult,
  TemplateProps,
  SavedLocation,
  MapScreenProps,
  PinListProps,
};
