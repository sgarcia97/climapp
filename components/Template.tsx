import { ScrollView, View, Text, SafeAreaView } from "react-native";
import { styles } from "../styles/styles";
import { TemplateProps } from "../types/climappTypes";

const Template = ({
  children,
  title = "",
  vCentered = false,
  topGuard = false,
}: TemplateProps) => {
  return (
    <SafeAreaView>
    {/*<ScrollView
      style={styles.mainView}}
      //contentContainerStyle={[
        //styles.templateContainer,
       // vCentered && styles.mainViewVCentered,
     // ]}
    >*/}
     

      <View style={styles.childrenWrapper}>{children}</View>
    {/*</ScrollView>*/}
    </SafeAreaView>
  );
};

export default Template;
