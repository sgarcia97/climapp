export default function generateWeatherDisplayName(): string {
  const weatherTerms = [
    "Sunny",
    "Rainy",
    "Cloudy",
    "Stormy",
    "Breezy",
    "Snowy",
    "Foggy",
    "Chilly",
  ];
  const elements = [
    "Sky",
    "Wind",
    "Cloud",
    "Rain",
    "Sun",
    "Mist",
    "Frost",
    "Thunder",
  ];
  const randomNum = Math.floor(Math.random() * 1000);

  const randomWeather =
    weatherTerms[Math.floor(Math.random() * weatherTerms.length)];
  const randomElement = elements[Math.floor(Math.random() * elements.length)];

  return `${randomWeather}${randomElement}${randomNum}`;
}
