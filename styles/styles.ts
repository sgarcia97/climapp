import { StyleSheet } from "react-native";
export const blue = "#0023C4"
export const pink = "#FF5CF3"
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    gap: 10,
  },
  titleWrapper: {
    paddingBlock: 10,
  },
  titleTopGuard: {
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mainView: {
    display:"flex",
    paddingInline:15,
    paddingTop:10,
    gap:15
  },
  scrView:{
    
  },
  staticView:{
    display:"flex",
    flexDirection:"column",
    gap:10,
    paddingInline:15,
    justifyContent:"center",
    paddingTop:60
    
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
  center:{
    textAlign:"center"
  },
  cardWrapper: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    flexWrap:"wrap",
    gap:10,
    paddingBlock: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    minWidth:"48%",
    boxShadow: "0 2 15 0 rgba(50,50,50,0.1)",
  },
  cardBig:{
    boxShadow: "0 2 15 0 rgba(50,50,50,0.1)",
    backgroundColor:"#ffffff",
    borderRadius:10,
    padding:20,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    gap:15
  },
  cardMedium:{
    boxShadow: "0 2 15 0 rgba(50,50,50,0.1)",
    backgroundColor:"#ffffff",
    borderRadius:10,
    padding:20,
    display:"flex",
    flexDirection:"row",

    gap:15
  },
  cardSectionLeft:{
    
  },
  cardSectionRight:{
    
  },
  cardMediumSectionWrapper:{
    display:"flex",
    flexDirection:"column",
    gap:10
  },
  cardMediumSection:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    gap:15
  },
  smallIcon:{
    width:20,
    height:20
  },
  mediumIcon:{
    width:35,
    height:35,
  },
  bigIcon:{
    width:50,
    height:50,
  },
  subtitle:{
    fontWeight:700
  },
  hourWrapper:{
    display:"flex",
    marginBlock:15,
    flexDirection:"row",
    gap:10,
    paddingLeft:15
  },
  hour:{
    boxShadow: "0 2 15 0 rgba(50,50,50,0.1)",
    padding:10,
    display:"flex",
    flexDirection:"column",
    gap:15,
    alignItems:"center",
    backgroundColor:"#fff",
    borderRadius:5,
    width:80
  },
  hourTemp:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    flexWrap:"nowrap",
    width:"100%",
    textAlign:"center",
    color:"#dddddd"
  },
  dayWrapper:{
    flex:1,
    gap:5
  },
  day:{
    boxShadow: "0 2 15 0 rgba(50,50,50,0.1)",
    padding:10,
    borderRadius:5,
    backgroundColor:"#fff",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    gap:10
  },
  dayTitleWrapper:{
    display:"flex",
    flexDirection:"row",
    gap:5
  },
  dayTitle:{
    fontWeight:600,
    fontSize:16,
    width:45
  },
  searchWrapper:{
    position:"relative"
  },
  searchResultsWrapper:{
    position:"absolute",
    width:"100%",
    top:"105%",
    backgroundColor:"#fff",
    zIndex:2,
    borderRadius:5,
    boxShadow:"0 1 10 0 rgba(50,50,50,0.1)"
  },
  searchResult:{
    padding:15
  },
  bold:{
    fontWeight:600
  },
  cardSectionTitle:{
    fontSize:60,
    fontWeight:600
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
    borderColor: "#ddd",
  },
  searchInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
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
    flexShrink: 1,
    fontWeight: "bold",
  },
  mapScrollView: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    maxHeight: 200,
    zIndex: 1,
  },
  pinDefault: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pinGreen: {
    backgroundColor: "#4CAF50",
  },
  pinRed: {
    backgroundColor: "#2196F3",
  },
  mapButtonDefault: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "auto",
    minWidth: 180,
    maxWidth: "100%",
  },
  mapButtonGreen: {
    backgroundColor: "#4CAF50",
  },
  mapButtonRed: {
    backgroundColor: "#2196F3",
  },
  mapButtonMR: {
    marginRight: 10,
  },
});


