interface GeocodeResult {
  city: string | null;
  country: string | null;
  street?: string | null;
  region?: string | null;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationResult {
  coordinates: Coordinates | null;
  cityInfo: GeocodeResult | null;
  locationErrorMsg: string | null;
  getLocation: () => Promise<void>;
}

interface TemplateProps {
  children: React.ReactNode;
  title?: string;
  vCentered?: boolean;
  topGuard?: boolean;
}

export { GeocodeResult, Coordinates, LocationResult, TemplateProps };
