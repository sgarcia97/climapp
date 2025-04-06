export const getProvinceFromCoords = async (
  latitude: number,
  longitude: number
): Promise<string | null> => {
  try {
    const API_KEY = "d1db4047d19c4ed59e29659864c5ce1c";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    const provinceCode = data?.results?.[0]?.components?.state_code;
    return provinceCode || null;
  } catch (error) {
    console.error("Failed to reverse geocode location:", error);
    return null;
  }
};