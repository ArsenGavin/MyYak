import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "relative",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  containerFormCA: {
    position: "absolute",
    bottom: "5%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  boxInput: {
    width: "80%",
  },
  txtInput: {
    marginTop: "3%",
    marginBottom: "3%",
    height: 50,
    opacity: 0.88,
  },
  buttonProfile: {
    width: "80%",
    backgroundColor: "#184A9C",
    opacity: 0.9,
    borderRadius: 50,
    marginTop: "5%",
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonCA: {
    width: "80%",
    backgroundColor: "#D89962",
    opacity: 0.9,
    borderRadius: 50,
    marginTop: "5%",
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonOut: {
    width: "80%",
    backgroundColor: "#ff0000",
    opacity: 0.9,
    borderRadius: 50,
    marginTop: "5%",
    paddingTop: 5,
    paddingBottom: 5,
  },
  outColor: {
    color: "#fff",
  },
  buttonCARetour: {
    width: "80%",
    marginTop: "8%",
    backgroundColor: "#f0f8ff00",
    color: "#D89962",
  },
  error: {
    fontSize: 12,
    color: "#ff0000",
  },
  noModeration: {
    marginTop: "20%",
  },
  moderationText: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
  },
  moderationBtn: {
    width: "50%",
  },
  moderationBoxBtn: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
