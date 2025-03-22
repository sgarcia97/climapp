import { Text, View, Alert } from "react-native";
import Template from "../../components/Template";
import ClimButton from "../../components/ClimButton";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { signOut, isGuest } = useAuth();

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
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          {isGuest ? "You are browsing as a Guest." : "You are logged in."}
        </Text>

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
