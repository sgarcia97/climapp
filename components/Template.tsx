import { ScrollView, View, Text } from "react-native";
import styles from "../styles/styles";

type TemplateProps = {
  children: any;
  title?: string;
  vCentered?: boolean;
};
const Template = ({
  children,
  title = "",
  vCentered = false,
}: TemplateProps) => {
  return (
    <ScrollView
      style={styles.mainView}
      contentContainerStyle={vCentered ? styles.mainViewVCentered : undefined}
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {children}
    </ScrollView>
  );
};

export default Template;
