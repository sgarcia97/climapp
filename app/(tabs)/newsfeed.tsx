import { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Linking,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Template from "../../components/Template";
import Spacer from "../../components/Spacer";
import { styles, blue } from "../../styles/styles"; // ✅ Keep blue
import { loadLocationsFromStorage } from "../../api/LocationService";
import { getProvinceFromCoords } from "../../utils/getProvinceFromCoords";
import { XMLParser } from "fast-xml-parser"; // ✅ Keep parser

const API_KEY = "4Vq7ZdRNJ5XJQnSrOTZoHP58tG48XJmrkwV1H9N0";
const COUNTRY = "ca";
const MAX_PAGES = 10;
const ARTICLES_PER_PAGE = 12;

const NewsFeed = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [weatherAlerts, setWeatherAlerts] = useState<string[]>([]);
  const [alertLoading, setAlertLoading] = useState(true);

  const fetchNews = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.thenewsapi.com/v1/news/top?api_token=${API_KEY}&locale=${COUNTRY}&limit=${ARTICLES_PER_PAGE}&page=${pageNumber}`
      );
      const data = await response.json();

      if (!data || !Array.isArray(data.data)) {
        console.error("Unexpected API response:", data);
        throw new Error("Unexpected response format from news API");
      }

      setArticles((prev) => [...prev, ...data.data]);
      setPage(pageNumber);
    } catch (error: any) {
      console.error("Fetch error:", error);
      Alert.alert("Error", error.message || "Failed to fetch news");
    }
    setLoading(false);
  };

  const fetchWeatherAlerts = async () => {
    setAlertLoading(true);
    try {
      const locations = await loadLocationsFromStorage();
      const myLocation = locations.find(loc => loc.id === "my_location");

      let provinceCode = "AB";
      if (myLocation?.coordinates) {
        const resolved = await getProvinceFromCoords(
          myLocation.coordinates.latitude,
          myLocation.coordinates.longitude
        );
        if (resolved) provinceCode = resolved;
      }

      const response = await fetch(`https://dd.weather.gc.ca/alerts/cap/${provinceCode}.xml`);
      const xmlText = await response.text();

      const parser = new XMLParser();
      const parsed = parser.parse(xmlText);

      const entries = parsed.feed?.entry || [];
      const titles = Array.isArray(entries)
        ? entries.map((entry: any) => entry.title).filter(Boolean)
        : [];

      setWeatherAlerts(titles);
    } catch (error) {
      console.error("Error fetching weather alerts:", error);
      setWeatherAlerts([]);
    }
    setAlertLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      await fetchWeatherAlerts();
      await fetchNews(1);
    };

    init();
  }, []);

  return (
    <Template title="">
      <ScrollView style={styles.scrView}>
        <View style={styles.mainView}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Weather Alerts</Text>
          </View>

          {alertLoading ? (
            <ActivityIndicator size="small" color="orange" />
          ) : weatherAlerts.length > 0 ? (
            weatherAlerts.map((alert, index) => (
              <View key={index} style={{ marginBottom: 5 }}>
                <Text style={{ color: "red", fontWeight: "600" }}>{alert}</Text>
              </View>
            ))
          ) : (
            <Text style={{ color: "gray", fontSize: 15, marginBottom: 10 }}>
              No weather alerts at this time.
            </Text>
          )}

          <Spacer />

          <View style={styles.titleWrapper}>
            <Text style={styles.subtitle}>Local News</Text>
          </View>

          {loading && page === 1 ? (
            <ActivityIndicator size="large" color={blue} />
          ) : articles.length > 0 ? (
            <>
              {articles.map((article, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => Linking.openURL(article.url)}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    overflow: "hidden",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    marginBottom: 10,
                  }}
                >
                  {article.image_url ? (
                    <Image
                      source={{ uri: article.image_url }}
                      style={{
                        width: 100,
                        height: 100,
                        resizeMode: "cover",
                        alignSelf: "center",
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 100,
                        height: 100,
                        backgroundColor: "#ccc",
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Text style={{ color: "#666", fontSize: 12 }}>No Image</Text>
                    </View>
                  )}
                  <View
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                      paddingRight: 10,
                      paddingLeft: 12,
                      justifyContent: "center",
                    }}
                  >
                    <Text numberOfLines={2} style={{ fontWeight: "bold", fontSize: 16 }}>
                      {article.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              {page < MAX_PAGES && !loading && (
                <TouchableOpacity onPress={() => fetchNews(page + 1)} style={{ alignItems: "center", marginTop: 10 }}>
                  <Text style={{ fontSize: 14, color: "black", textDecorationLine: "underline" }}>
                    Show More
                  </Text>
                </TouchableOpacity>
              )}

              {loading && page > 1 && (
                <ActivityIndicator size="small" color={blue} style={{ marginTop: 10 }} />
              )}
            </>
          ) : (
            <Text>No news articles available.</Text>
          )}

          <Spacer />
        </View>
      </ScrollView>
    </Template>
  );
};

export default NewsFeed;
