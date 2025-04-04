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
import { styles } from "../../styles/styles"

const API_KEY = "4Vq7ZdRNJ5XJQnSrOTZoHP58tG48XJmrkwV1H9N0";
const COUNTRY = "ca";
const MAX_PAGES = 3;
const ARTICLES_PER_PAGE = 12;

const NewsFeed = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchNews = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.thenewsapi.com/v1/news/top?api_token=${API_KEY}&locale=${COUNTRY}&limit=${ARTICLES_PER_PAGE}&page=${pageNumber}`
      );
      const data = await response.json();

      console.log(`Fetched page ${pageNumber}, articles: ${data.data.length}`);

      if (!data.data) {
        throw new Error("No news data found");
      }

      // Append new articles
      setArticles((prev) => [...prev, ...data.data]);
      setPage(pageNumber);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to fetch news");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(1); // Initial fetch
  }, []);

  return (
    <Template title="Top News">
   <ScrollView style={styles.scrView}>
    <View style={styles.mainView}>
    <View style={[styles.titleWrapper]}><Text style={styles.title}>News</Text></View>
        {loading && page === 1 ? (
          <ActivityIndicator size="large" color="blue" />
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

            {/* Show More button */}
            {page < MAX_PAGES && !loading && (
              <TouchableOpacity onPress={() => fetchNews(page + 1)} style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={{ fontSize: 14, color: "black", textDecorationLine: "underline" }}>
                Show More
              </Text>
            </TouchableOpacity>
            )}

            {loading && page > 1 && (
              <ActivityIndicator size="small" color="blue" style={{ marginTop: 10 }} />
            )}
          </>
        ) : (
          <Text>No news articles available.</Text>
        )}
        <Spacer/>
        </View>
 </ScrollView>
    </Template>
  );
};

export default NewsFeed;
