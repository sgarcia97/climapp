import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import Template from "../../components/Template";

const API_KEY = "9f52c523e2f147f397e131820252003"; // Your WeatherAPI key
const CITY = "Calgary"; // You can modify this or fetch dynamically

const NewsFeed = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=3&alerts=yes`
      );
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      setWeather(data);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to fetch weather data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(); // Fetch data when the page loads
  }, []);

  return (
    <Template title="Weather Newsfeed">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : weather ? (
          <>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              {weather.location.name}, {weather.location.country}
            </Text>
            <Text>🌡 Temperature: {weather.current.temp_c}°C</Text>
            <Text>☁ Condition: {weather.current.condition.text}</Text>
            <Text>💨 Wind Speed: {weather.current.wind_kph} km/h</Text>

            {/* Show Alerts if Available */}
            {weather.alerts && weather.alerts.alert.length > 0 ? (
              <View
                style={{
                  marginTop: 15,
                  padding: 10,
                  backgroundColor: "#ffcccb",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>⚠ Weather Alerts:</Text>
                {weather.alerts.alert.map((alert: any, index: number) => (
                  <Text key={index} style={{ color: "red" }}>
                    - {alert.headline}
                  </Text>
                ))}
              </View>
            ) : (
              <Text>No weather alerts at the moment.</Text>
            )}

            <Button title="Refresh" onPress={fetchWeather} disabled={loading} />
          </>
        ) : (
          <Text>No weather data available.</Text>
        )}
      </ScrollView>
    </Template>
  );
};

export default NewsFeed;
