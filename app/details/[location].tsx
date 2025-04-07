import {
  Text,
  View,
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Template from "../../components/Template";
import Hour from "../../components/Hour";
import Day from "../../components/Day";
import Card from "../../components/Card";
import CardMedium from "../../components/CardMedium";
import Spacer from "../../components/Spacer";
import Subtitle from "../../components/Subtitle";
import moment from "moment";
import { styles, pink, blue, lightblue } from "../../styles/styles";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { astronomyApi, weatherApi, marineApi } from "../../api/WeatherApi";
import { Title, Paragraph } from "../../components/Title";
import { weatherIcons } from "../../components/WeatherIcons";
import { useRouter } from "expo-router";
import clothing from "../../api/ClothingApi";
const Location = () => {
  const [data, setData] = useState<any>(null);
  const [adata, setAdata] = useState<any>(null);
  const [mdata, setMdata] = useState<any>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { location } = useLocalSearchParams<{ location: string }>();
  const router = useRouter();
  // Fetch data by Location
  useEffect(() => {
    weatherApi(location).then((w) => setData(w));
    astronomyApi(location).then((ast) => setAdata(ast));
    marineApi(location).then((ast) => setMdata(ast));
  }, [location]);

  // Pull to Refresh content
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    weatherApi(location).then((w) => setData(w));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Weather data
  if (!data) {
    return (
      <View style={{ flex: 1, padding: 30 }}>
        <ActivityIndicator color={blue} />
      </View>
    );
  }

  const locStr = `${data.location.name}, ${data.location.country}`;

  const id = data.current.is_day;
  const ico = weatherIcons.find((i) => {
    return i.code === data.current.condition.code;
  });
  const cl = clothing.find((i) => {
    return (
      Math.round(data.current.feelslike_c) <= i.temphigh &&
      Math.round(data.current.feelslike_c) >= i.templow
    );
  });
  return (
    <Template isDay={id}>
      <ScrollView
        stickyHeaderIndices={Platform.OS === "ios" ? [0] : []}
        style={styles.scrView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {Platform.OS === "ios" && (
          <TouchableOpacity onPress={() => router.back()}>
            <View style={styles.backWrapperr}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../../assets/arrow-white.png")}
              />
              <Text style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>
                Back
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.mainView}>
          <Title
            title={`${data.location.name}, ${data.location.country}`}
            isDay={id}
          />

          <View>
            <Text style={{ color: "#999999" }}>
              Last updated{" "}
              {moment(data.current.last_updated).format("ddd MMM M [at] h:mma")}
            </Text>
          </View>

          <Subtitle
            title={`Today's weather in ${data.location.name}`}
            isDay={id}
          />
          <View style={styles.cardBig}>
            <View style={styles.cardBigSection}>
              <Image
                style={styles.bigIcon}
                source={{
                  uri: data.current.is_day == 1 ? ico?.icon : ico?.iconn,
                }}
              />
              <View style={styles.cardSectionLeft}>
                <Text style={styles.cardSectionTitle}>
                  {Math.round(data.current.temp_c) + "\u00B0"}
                </Text>
              </View>
              <View style={styles.cardSectionRight}>
                <Text>
                  Real feel{" "}
                  <Text style={styles.bold}>
                    {Math.round(data.current.feelslike_c) + "\u00B0"}
                  </Text>
                </Text>
                <Text>
                  Wind Chill{" "}
                  <Text style={styles.bold}>
                    {Math.round(data.current.windchill_c) + "\u00B0"}
                  </Text>
                </Text>
                <Text style={styles.bold}>{data.current.condition.text}</Text>
              </View>
            </View>
            <View>
              <Text
                style={{ fontWeight: 400, textAlign: "center", fontSize: 16 }}
              >
                The temperature is currently{" "}
                <Text style={styles.boldBlue}>{cl?.title}</Text>
              </Text>
            </View>
          </View>
          <Subtitle title="Hourly Forecast" isDay={id} />
        </View>

        <ScrollView horizontal>
          <View style={styles.hourWrapper}>
            <Hour
              date="Now"
              onClick={() =>
                router.navigate({
                  pathname: `hour/${data.current.last_updated}`,
                  params: data.current,
                })
              }
              img={data.current.is_day == 1 ? ico?.icon : ico?.iconn}
              temp={data.current.temp_c}
              condition={data.current.condition.text}
              feel={data.current.feelslike_c}
            />
            {data.forecast.forecastday.map((item: any, i: number) =>
              item.hour.map((h: any, i: number) => {
                const icon = weatherIcons.find((i) => {
                  return i.code === h.condition.code;
                });
                const cd = moment(data.current.last_updated).format(
                  "YYYY-MM-DD HH:mm"
                );
                const wd = moment(h.time).format("YYYY-MM-DD HH:mm");

                if (wd > cd) {
                  return (
                    <Hour
                      key={i}
                      onClick={() =>
                        router.navigate({
                          pathname: `hour/${h.time}`,
                          params: h,
                        })
                      }
                      img={h.is_day == 1 ? icon?.icon : icon?.iconn}
                      date={moment(h.time).format("h A")}
                      temp={h.temp_c}
                      feel={h.feelslike_c}
                      condition={h.condition.text}
                    />
                  );
                }
              })
            )}
          </View>
        </ScrollView>
        <View style={styles.mainView}>
          <Subtitle title="Recommended Clothing for Now" isDay={id} />
          <View style={styles.cardBig}>
            <View style={styles.clothrec}>
              <View style={styles.clothsect}>
                <Image
                  style={styles.mediumIcon}
                  source={require("../../assets/tshirt.png")}
                />
                <Text style={styles.boldBlue}>Shirt</Text>
              </View>
              <Text>{cl?.shirt}</Text>
            </View>
            <View style={styles.clothrec}>
              <View style={styles.clothsect}>
                <Image
                  style={styles.mediumIcon}
                  source={require("../../assets/jeans.png")}
                />
                <Text style={styles.boldBlue}>Pants</Text>
              </View>
              <Text>{cl?.pants}</Text>
            </View>
            <View style={styles.clothrec}>
              <View style={styles.clothsect}>
                <Image
                  style={styles.mediumIcon}
                  source={require("../../assets/sneaker.png")}
                />
                <Text style={styles.boldBlue}>Shoes</Text>
              </View>
              <Text>{cl?.shoes}</Text>
            </View>
            <View style={styles.clothrec}>
              <View style={styles.clothsect}>
                <Image
                  style={styles.mediumIcon}
                  source={require("../../assets/varsity-jacket.png")}
                />
                <Text style={styles.boldBlue}>Overalls</Text>
              </View>
              <Text>{cl?.top}</Text>
            </View>
            <View style={styles.clothrec}>
              <View style={styles.clothsect}>
                <Image
                  style={styles.mediumIcon}
                  source={require("../../assets/winter-gloves.png")}
                />
                <Text style={styles.boldBlue}>Accesories</Text>
              </View>
              <Text>{cl?.acc}</Text>
            </View>
            <View style={styles.clothrec}>
              <View style={styles.clothsect}>
                <Image
                  style={styles.mediumIcon}
                  source={require("../../assets/weather/umbrella.png")}
                />
                <Text style={styles.boldBlue}>Umbrella</Text>
              </View>
              <Text>
                {data.current.daily_will_it_rain > 10
                  ? "You will need an umbrella"
                  : data.current.daily_will_it_rain < 10 &&
                      data.current.daily_will_it_rain > 2
                    ? "You may not need an umbrella"
                    : "You do not need an umbrella"}
              </Text>
            </View>
          </View>
          <Subtitle title="What's the next week looking like" isDay={id} />
          <View style={styles.dayWrapper}>
            {data.forecast.forecastday.map((item: any, i: number) => {
              const icon = weatherIcons.find((i) => {
                return i.code === item.day.condition.code;
              });

              return (
                <Day
                  key={i}
                  onClick={() =>
                    router.navigate({
                      pathname: `day/${item.date}`,
                      params: item.day,
                    })
                  }
                  img={icon?.icon}
                  min={item.day.mintemp_c}
                  max={item.day.maxtemp_c}
                  date={item.date}
                  isDay={id}
                  condition={item.day.condition.text}
                />
              );
            })}
          </View>
          {Platform.OS === "ios" && (
            <TouchableOpacity onPress={() => router.back()}>
              <View style={styles.backWrapperr}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require("../../assets/arrow-white.png")}
                />
                <Text style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>
                  Back
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.mainView}>
            <Title title={locStr} isDay={id} />

            <View>
              <Text style={{ color: "#999999" }}>
                Last updated{" "}
                {moment(data.current.last_updated).format(
                  "ddd MMM M [at] h:mma"
                )}
              </Text>
            </View>

            <Subtitle title={`Today's weather in ${locStr}`} isDay={id} />
            <View style={styles.cardBig}>
              <View style={styles.cardBigSection}>
                <Image
                  style={styles.bigIcon}
                  source={{
                    uri: data.current.is_day == 1 ? ico?.icon : ico?.iconn,
                  }}
                />
                <View style={styles.cardSectionLeft}>
                  <Text style={styles.cardSectionTitle}>
                    {Math.round(data.current.temp_c) + "\u00B0"}
                  </Text>
                </View>
                <View style={styles.cardSectionRight}>
                  <Text>
                    Real feel{" "}
                    <Text style={styles.bold}>
                      {Math.round(data.current.feelslike_c) + "\u00B0"}
                    </Text>
                  </Text>
                  <Text>
                    Wind Chill{" "}
                    <Text style={styles.bold}>
                      {Math.round(data.current.windchill_c) + "\u00B0"}
                    </Text>
                  </Text>
                  <Text style={styles.bold}>{data.current.condition.text}</Text>
                </View>
              </View>
              <View>
                <Text
                  style={{ fontWeight: 400, textAlign: "center", fontSize: 16 }}
                >
                  The temperature is currently{" "}
                  <Text style={styles.boldBlue}>{cl?.title}</Text>
                </Text>
              </View>
            </View>
            <Subtitle title="Hourly Forecast" isDay={id} />
          </View>
        </View>
        <ScrollView horizontal>
          <View style={styles.hourWrapper}>
            <Hour
              date="Now"
              onClick={() =>
                router.navigate({
                  pathname: `hour/${data.current.last_updated}`,
                  params: data.current,
                })
              }
              img={data.current.is_day == 1 ? ico?.icon : ico?.iconn}
              temp={data.current.temp_c}
              condition={data.current.condition.text}
              feel={data.current.feelslike_c}
            />
            {data.forecast.forecastday.map((item: any, i: number) =>
              item.hour.map((h: any, i: number) => {
                const icon = weatherIcons.find((i) => {
                  return i.code === h.condition.code;
                });
                const cd = moment(data.current.last_updated).format(
                  "YYYY-MM-DD HH:mm"
                );
                const wd = moment(h.time).format("YYYY-MM-DD HH:mm");

                if (wd > cd) {
                  return (
                    <Hour
                      key={i}
                      onClick={() =>
                        router.navigate({
                          pathname: `hour/${h.time}`,
                          params: h,
                        })
                      }
                      img={h.is_day == 1 ? icon?.icon : icon?.iconn}
                      date={moment(h.time).format("h A")}
                      temp={h.temp_c}
                      feel={h.feelslike_c}
                      condition={h.condition.text}
                    />
                  );
                }
              })
            )}
          </View>
        </ScrollView>
        <View style={styles.mainView}>
          <Subtitle title="Recommended Clothing for Now" isDay={id} />
          <View style={styles.cardBig}>
            <View style={styles.clothrec}>
              <View style={styles.clothsect}>
                <Image
                  style={styles.mediumIcon}
                  source={require("../../assets/tshirt.png")}
                />
                <Text style={styles.boldBlue}>Shirt</Text>
              </View>
              <Text>{cl?.shirt}</Text>
            </View>
            <View style={styles.clothrec}>
              <View style={styles.clothsect}>
                <Image
                  style={styles.mediumIcon}
                  source={require("../../assets/jeans.png")}
                />
                <Text style={styles.boldBlue}>Pants</Text>
              </View>
              <Text>{cl?.pants}</Text>
            </View>
            <View style={styles.clothrec}>
              <View style={styles.clothsect}>
                <Image
                  style={styles.mediumIcon}
                  source={require("../../assets/sneaker.png")}
                />
                <Text style={styles.boldBlue}>Shoes</Text>
              </View>
              <Text>{cl?.shoes}</Text>
            </View>
            <View style={styles.clothrec}>
              <View style={styles.clothsect}>
                <Image
                  style={styles.mediumIcon}
                  source={require("../../assets/varsity-jacket.png")}
                />
                <Text style={styles.boldBlue}>Overalls</Text>
              </View>
              <Text>{cl?.top}</Text>
            </View>
            <View style={styles.clothrec}>
              <View style={styles.clothsect}>
                <Image
                  style={styles.mediumIcon}
                  source={require("../../assets/winter-gloves.png")}
                />
                <Text style={styles.boldBlue}>Accesories</Text>
              </View>
              <Text>{cl?.acc}</Text>
            </View>
            <View style={styles.clothrec}>
              <View style={styles.clothsect}>
                <Image
                  style={styles.mediumIcon}
                  source={require("../../assets/weather/umbrella.png")}
                />
                <Text style={styles.boldBlue}>Umbrella</Text>
              </View>
              <Text>
                {data.current.daily_will_it_rain > 10
                  ? "You will need an umbrella"
                  : data.current.daily_will_it_rain < 10 &&
                      data.current.daily_will_it_rain > 2
                    ? "You may not need an umbrella"
                    : "You do not need an umbrella"}
              </Text>
            </View>
          </View>
          <Subtitle title="What's the next week looking like" isDay={id} />
          <View style={styles.dayWrapper}>
            {data.forecast.forecastday.map((item: any, i: number) => {
              const icon = weatherIcons.find((i) => {
                return i.code === item.day.condition.code;
              });

              return (
                <Day
                  key={i}
                  onClick={() =>
                    router.navigate({
                      pathname: `day/${item.date}`,
                      params: item.day,
                    })
                  }
                  img={icon?.icon}
                  min={item.day.mintemp_c}
                  max={item.day.maxtemp_c}
                  date={item.date}
                  isDay={id}
                  condition={item.day.condition.text}
                />
              );
            })}
          </View>
          <View style={styles.cardWrapper}>
            <Card
              title="Precipitation"
              img={require("../../assets/weather/umbrella.png")}
              val={data.current.precip_mm}
              isDay={data.current.is_day}
            />
            <Card
              title="Humidity"
              img={require("../../assets/weather/humidity.png")}
              val={data.current.humidity + "%"}
              isDay={data.current.is_day}
            />

            <Card
              title="UV Index"
              img={require("../../assets/ultraviolet.png")}
              val={data.current.uv}
              isDay={data.current.is_day}
            />
            <Card
              title="Heat Index"
              img={require("../../assets/weather/heat.png")}
              val={data.current.heatindex_c}
              isDay={data.current.is_day}
            />
            <Card
              title="Cloud Cover"
              img={require("../../assets/weather/cloudy.png")}
              val={data.current.cloud + "%"}
              isDay={data.current.is_day}
            />
            <Card
              title="Visibility"
              img={require("../../assets/visibility.png")}
              val={data.current.vis_km}
              isDay={data.current.is_day}
            />
            <Card
              title="Pressure"
              img={require("../../assets/weather/pressure.png")}
              val={data.current.pressure_mb}
              isDay={data.current.is_day}
            />
            <Card
              title="Wind Speed"
              img={require("../../assets/weather/windy.png")}
              val={data.current.wind_kph}
              isDay={data.current.is_day}
            />
          </View>
          <Subtitle title="Look to the Skies" isDay={id} />
          {adata && (
            <View style={styles.cardMedium}>
              <View>
                <Image
                  source={require("../../assets/weather/first-quarter.png")}
                  style={{ width: 90, height: 90 }}
                />
                <Text
                  style={{ fontSize: 18, fontWeight: 700, color: "#0000000" }}
                >
                  {adata.astronomy.astro.moon_phase}
                </Text>
              </View>
              <View style={styles.cardMediumSectionWrapper}>
                <View style={styles.cardMediumSection}>
                  <Image
                    source={require("../../assets/weather/sunrise.png")}
                    style={styles.smallIcon}
                  />
                  <Text>Sunrise - {adata.astronomy.astro.sunrise}</Text>
                </View>
                <View style={styles.cardMediumSection}>
                  <Image
                    source={require("../../assets/weather/sunset.png")}
                    style={styles.smallIcon}
                  />
                  <Text>Sunset - {adata.astronomy.astro.sunset}</Text>
                </View>
                <View style={styles.cardMediumSection}>
                  <Image
                    source={require("../../assets/weather/moonrise.png")}
                    style={styles.smallIcon}
                  />
                  <Text>Moonrise - {adata.astronomy.astro.moonrise}</Text>
                </View>
                <View style={styles.cardMediumSection}>
                  <Image
                    source={require("../../assets/weather/moonset.png")}
                    style={styles.smallIcon}
                  />
                  <Text>Moonset - {adata.astronomy.astro.moonset}</Text>
                </View>
              </View>
            </View>
          )}
          <Subtitle title="Sail the Seas" isDay={id} />
          <View style={styles.cardBig}>
            {mdata && mdata.error ? (
              <Text>No data found for this location</Text>
            ) : (
              mdata.forecast.forecastday[0].day.tides[0].tide.map(
                (t: any, i: number) => (
                  <View key={i} style={styles.marine}>
                    <Image
                      style={styles.mediumIcon}
                      source={
                        t.tide_type == "HIGH"
                          ? require("../../assets/weather/high-tide.png")
                          : require("../../assets/weather/low-tide.png")
                      }
                    />
                    <View>
                      <Text style={styles.boldBlue}>{t.tide_type} TIDE</Text>
                      <Text>Height of tide: {t.tide_height_mt} meters</Text>
                      <Text>
                        Time of tide: {moment(t.tide_time).format("h:mm A")}
                      </Text>
                    </View>
                  </View>
                )
              )
            )}
          </View>
          <Spacer />
        </View>
      </ScrollView>
    </Template>
  );
};

export default Location;
