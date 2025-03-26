import { Text, View, Alert, TextInput } from "react-native";
import Template from "../../components/Template";
import ClimButton from "../../components/ClimButton";
import styles from "../../styles/styles";
import { useAuth } from "../../contexts/AuthContext";
import { updateAuthUser } from "../../api/UserService";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";

const Profile = () => {
  const { session, signOut, isGuest } = useAuth();
  const [userName, setUserName] = useState(
    session?.user.user_metadata.display_name || ""
  );
  const [greetingName, setGreetingName] = useState(userName);

  const handleSave = async () => {
    try {
      await updateAuthUser(userName);
      setGreetingName(userName);
      Alert.alert("Update Success", "Profile was updated.");
    } catch (error: any) {
      Alert.alert("Update Failed.", "Profile was not updated.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      Alert.alert(
        isGuest ? "Guest Mode Exited" : "Logged Out",
        isGuest
          ? "You are no longer in guest mode."
          : "You have been logged out."
      );
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to log out.");
    }
  };

  return (
    <Template title="Profile">
      <View
        style={{ padding: 5, flex: 1, flexDirection: "column", rowGap: 10 }}
      >
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          {isGuest ? "You are browsing as a Guest." : `Hello, ${greetingName}`}
        </Text>
        {session ? (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome name="user" style={{ marginRight: 10 }} size={20} />
              <TextInput
                style={[styles.defaultInput, { flex: 1 }]}
                value={userName}
                onChangeText={setUserName}
                autoCapitalize="none"
              />
            </View>
            <ClimButton title="Save" color="black" onClick={handleSave} />
          </>
        ) : (
          <View></View>
        )}
        <ClimButton
          title={isGuest ? "Exit Guest Mode" : "Log Out"}
          color="red"
          onClick={handleLogout}
        />
      </View>
    </Template>
  );
};

export default Profile;
