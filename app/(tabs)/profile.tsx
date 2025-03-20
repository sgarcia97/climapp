import { Text, View, Alert } from "react-native";
import Template from "../../components/Template";
import ClimButton from "../../components/ClimButton"; // Import button component
import { useAuth } from "../../contexts/AuthContext"; // Import Auth Context
import { useRouter } from "expo-router"; // Import router for navigation

const Profile = () => {
  const { signOut, isGuest } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      Alert.alert("Logged Out", "You have been logged out.");
      router.replace("/signin"); // Redirect to login screen
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
