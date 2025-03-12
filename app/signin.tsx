import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native";
import ClimButton from "../components/ClimButton";
import Template from "../components/Template";
import styles from "../styles/styles";

const handleLogin = () => {};

const Login = () => {
  return (
    <Template title="Login" vCentered={true}>
      <TextInput
        placeholder="Email Address or Username"
        style={styles.defaultInput}
      ></TextInput>
      <TextInput
        placeholder="Password"
        style={styles.defaultInput}
        secureTextEntry
      ></TextInput>
      <ClimButton title="LOGIN" color="magenta" onClick={handleLogin} />
    </Template>
  );
};

export default Login;
