import { View, Text } from "react-native";
import { styles } from "../styles/styles";

type SubtitleType = {
  title: string;
  isDay: number;
};
export const Title = ({ title, isDay }: SubtitleType) => {
  let backStyle = null;
  let textStyle = null;
  if (isDay == 0) {
    backStyle = styles.backBlue;
    textStyle = styles.textDark;
  }
  return (
    <View style={[styles.titleWrapper]}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </View>
  );
};

export const Paragraph = ({ title, isDay }: SubtitleType) => {
  let backStyle = null;
  let textStyle = null;
  if (isDay == 0) {
    backStyle = styles.backBlue;
    textStyle = styles.textDark;
  }
  return <Text style={[styles.paragraph, textStyle]}>{title}</Text>;
};
