import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    gap: 10,
  },
  titleWrapper: {
    paddingBlock: 20,
  },
  titleTopGuard: {
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  mainView: {
    paddingInline: 20,
    flex: 1,
  },
  mainViewVCentered: {
    flex: 1,
    justifyContent: "center",
  },
  defaultTitle: {
    fontSize: 25,
    fontWeight: 800,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#000",
    paddingInline: 20,
    paddingBlock: 20,
    borderRadius: 10,
  },
  buttonTitle: {
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 5,
    textAlign: "center",
  },
  cardWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    paddingBlock: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "47%",
    boxShadow: "0 2 15 0 rgba(50,50,50,0.1)",
  },
  cardImage: {
    width: 15,
    height: 15,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 5,
    alignItems: "center",
  },
  cardContent: {
    paddingInline: 15,
    paddingBlock: 7,
  },
  metric: {
    fontSize: 35,
    fontWeight: 800,
    color: "#000",
  },
  defaultInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  templateContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  childrenWrapper: {
    gap: 10,
    flexDirection: "column",
  },
  errorText: {
    color: "red",
  },
  emailResendMessage: {
    fontSize: 18,
    marginBottom: 20,
  },
  emailResendSpam: { marginBottom: 20 },
  mapContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#6200ee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
  },
  mapButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
