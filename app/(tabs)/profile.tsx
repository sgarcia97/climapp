import {
  Text,
  View,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Template from "../../components/Template";
import ClimButton from "../../components/ClimButton";
import { styles, blue, pink } from "../../styles/styles";
import { useAuth } from "../../contexts/AuthContext";
import { updateAuthUser } from "../../api/UserService";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { isComplexPassword } from "../../utils/signupHelpers";

const Profile = () => {
  const { session, signOut, isGuest, setIsUpdatingProfile } = useAuth();
  const [userName, setUserName] = useState(
    session?.user.user_metadata.display_name || ""
  );
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [includePasswordChange, setIncludePasswordChange] =
    useState<boolean>(false);
  const [greetingName, setGreetingName] = useState(userName);

  const handleSave = async () => {
    if (!session?.user.email) {
      Alert.alert("No session", "Cannot update without user session.");
      return;
    }

    if (!current) {
      Alert.alert(
        "Missing Password",
        "Please enter current password to change profile details."
      );
      return;
    }

    if (includePasswordChange) {
      if (!password2 || !password) {
        Alert.alert("Missing Input", "Please enter both password fields.");
        return;
      }

      if (password2 !== password) {
        Alert.alert("Password Mismatch", "Passwords do not match.");
        return;
      }

      const complexity = isComplexPassword(password);
      if (!complexity.valid) {
        Alert.alert(
          "Weak Password",
          "Your password must meet the following requirements:\n\n• " +
            complexity.errors.join("\n• ")
        );
        return;
      }
    }

    setIsUpdatingProfile(true);

    try {
      await updateAuthUser(
        session.user.email,
        current,
        userName,
        includePasswordChange ? password : undefined
      );

      setGreetingName(userName);
      setCurrent("");
      setPassword("");
      setPassword2("");
      setIncludePasswordChange(false);

      Alert.alert("Update Success", "Profile was updated.");
    } catch (error: any) {
      Alert.alert("Update Failed", error.message || "Profile was not updated.");
    } finally {
      setIsUpdatingProfile(false);
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

  const handlePasswordToggle = () => {
    setIncludePasswordChange((prev) => !prev);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <Template>
        <ScrollView style={styles.scrView}>
          <View style={styles.mainView}>
            <View style={[styles.titleWrapper]}>
              <Text style={styles.title}>Profile</Text>
            </View>
            <View
              style={{
                padding: 5,
                flex: 1,
                flexDirection: "column",
                rowGap: 10,
              }}
            >
              <Text style={{ fontSize: 16, marginBottom: 20 }}>
                {isGuest
                  ? "You are browsing as a Guest."
                  : `Hello, ${greetingName}`}
              </Text>
              {session ? (
                <>
                  {/* display name section */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome
                      name="user"
                      style={{ marginRight: 10, width: 20 }}
                      size={20}
                    />
                    <TextInput
                      style={[styles.defaultInput, { flex: 1 }]}
                      value={userName}
                      onChangeText={setUserName}
                      autoCapitalize="none"
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome
                      name="key"
                      style={{ marginRight: 10, width: 20 }}
                      size={20}
                    />
                    <TextInput
                      style={[styles.defaultInput, { flex: 1 }]}
                      value={current}
                      onChangeText={setCurrent}
                      autoCapitalize="none"
                      placeholder="current password"
                      secureTextEntry
                    />
                  </View>
                  {/* change password section */}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: 5,
                    }}
                  >
                    <Text style={{ marginLeft: 10 }}>Change Password ?</Text>
                    <Text style={{ paddingLeft: 20 }}>
                      {includePasswordChange ? "Yes" : "No"}
                    </Text>
                    <TouchableOpacity
                      style={{
                        marginLeft: "auto",
                        marginRight: 10,
                        padding: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#ddd",
                      }}
                      onPress={handlePasswordToggle}
                    >
                      <FontAwesome
                        name={includePasswordChange ? "check" : "remove"}
                        color={includePasswordChange ? "green" : "red"}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* show/unshow password input */}
                  {includePasswordChange ? (
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome
                          name="key"
                          style={{ marginRight: 10, width: 20 }}
                          size={20}
                        />
                        <TextInput
                          style={[styles.defaultInput, { flex: 1 }]}
                          value={password}
                          onChangeText={setPassword}
                          autoCapitalize="none"
                          placeholder="new password"
                          secureTextEntry
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome
                          name="key"
                          style={{ marginRight: 10, width: 20 }}
                          size={20}
                        />
                        <TextInput
                          style={[styles.defaultInput, { flex: 1 }]}
                          value={password2}
                          onChangeText={setPassword2}
                          autoCapitalize="none"
                          placeholder="repeat new password"
                          secureTextEntry
                        />
                      </View>
                    </>
                  ) : (
                    <></>
                  )}
                  <ClimButton title="Save" color={blue} onClick={handleSave} />
                </>
              ) : (
                <View></View>
              )}
              <ClimButton
                title={isGuest ? "Exit Guest Mode" : "Log Out"}
                color={pink}
                onClick={handleLogout}
              />
            </View>
          </View>
        </ScrollView>
      </Template>
    </KeyboardAvoidingView>
  );
};

export default Profile;
