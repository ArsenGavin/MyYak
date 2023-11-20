import { Dimensions, StatusBar, StyleSheet } from "react-native";

const welcomeBase = {fontSize: 24, fontWeight: "bold"};

export const ScreenHeight = Dimensions.get("window").height;

export const theme = {
  colors: {
    text: "black",
    primary: "#184A9C",
    background: "#E3E3E3",
    placeholder: "#B4B4B4",
  },
  roundness: 10,
};

export const styles = StyleSheet.create({
  wrapper: {flex: 1},
  scroll: {
    flex: 1,
    backgroundColor: "white",
  },
  inscription: {
    ...welcomeBase,
    color: "black",
  },
  my: {
    ...welcomeBase,
    color: "#D89962",
  },
  yak: {
    ...welcomeBase,
    color: "#184A9C",
  },
  discute: {
    color: "#B4B4B4",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 15,
  },
  topView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  containerFormCA: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  layout: {
    justifyContent: "center",
    alignItems: "center",
  },
  boxInput: {
    flex: 3,
    width: "80%",
    justifyContent: "center",
    flexDirection: "column",
  },
  txtInput: {},
  buttonView: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonCA: {
    width: "60%",
    backgroundColor: "#184A9C",
    textTransform: "uppercase",
    borderRadius: 5,
  },
  withAccountView: {
    marginTop: "auto",
    marginBottom: 20,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    fontSize: 15,
  },
  withAccountText: {
    color: "#B4B4B4",
    fontWeight: "bold",
    fontSize: 15,
  },
  login: {
    color: "#D89962",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 5,
  },
  error: {
    fontSize: 12,
    color: "#ff0000",
  },
  vue: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    height: ScreenHeight - StatusBar.currentHeight,
  },
  registration: {
    color: "white",
    fontWeight: "bold",
  },
  centre: {
    alignItems: "center",
  },
});
