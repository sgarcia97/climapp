import { ScrollView, View, Text } from "react-native";
import styles from "../styles/styles";

type TemplateProps = {
  children: React.ReactNode;
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
      contentContainerStyle={[
        styles.templateContainer,
        vCentered && styles.mainViewVCentered,
      ]}
    >
      {title ? (
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : null}

      <View style={styles.childrenWrapper}>{children}</View>
    </ScrollView>
  );
};

export default Template;
