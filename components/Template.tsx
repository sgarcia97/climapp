import { ScrollView, View, Text, SafeAreaView } from "react-native";
import { styles } from "../styles/styles";
import { TemplateProps } from "../types/climappTypes";

const Template = ({
  children,
  title = "",
  isDay,
  vCentered = false,
  topGuard = false,
}: TemplateProps) => {
  let backStyle = null
  
    if(isDay == 0){
        backStyle = styles.backDark
    }
  return (
    <SafeAreaView style={backStyle}>
   
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
