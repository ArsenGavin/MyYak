import {StyleSheet} from "react-native";

const welcomeBase = {fontSize: 24, fontWeight: "bold"};

export const styles = StyleSheet.create({
  wrapper: {flex: 1},
  scroll: {
    flex: 1,
    backgroundColor: "white",
  },
  topView: {flex: 1, alignItems: "center", marginTop: 20},
  welcome: {
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
  image: {
    width: 160,
    height: 180,
  },
  boxInput: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
    flexDirection: "column",
  },
  txtInput: {},
  buttonView: {
    flex: 1,
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
  forgotPwd: {
    color: "#D89962",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 15,
  },
  register: {
    color: "#D89962",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 5,
  },
  noAccountView: {
    marginTop: "auto",
    marginBottom: 20,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    fontSize: 15,
  },
  noAccountText: {
    color: "#B4B4B4",
    fontWeight: "bold",
    fontSize: 15,
  },
  buttonCARetour: {
    width: "80%",
    backgroundColor: "#f0f8ff00",
    color: "#D89962",
  },
  error: {
    fontSize: 12,
    color: "#ff0000",
  },
});
