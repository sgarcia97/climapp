import { ScrollView, View, Text } from "react-native";
import styles from "../styles/styles";
import { TemplateProps } from "../types/climappTypes";

const Template = ({
  children,
  title = "",
  vCentered = false,
  topGuard = false,
}: TemplateProps) => {
  return (
    <ScrollView
      style={styles.mainView}
      //contentContainerStyle={[
        //styles.templateContainer,
       // vCentered && styles.mainViewVCentered,
     // ]}
    >
      {title ? (
        <View style={[styles.titleWrapper, topGuard && styles.titleTopGuard]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : null}

      <View style={styles.childrenWrapper}>{children}</View>
    </ScrollView>
  );
};

export default Template;
