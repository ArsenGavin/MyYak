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
  button: {
    width: "80%",
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#D89962",
    opacity: 0.9,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 10,
    paddingRight: 10,
  },
  containerBtnCaC: {
    position: "absolute",
    bottom: "20%",
    left: 0,
    width: "100%",
  },
});
