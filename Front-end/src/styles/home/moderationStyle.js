import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "relative",
    color: "#D89962",
  },
  error: {
    fontSize: 12,
    color: "#ff0000",
  },
  noModeration: {
    marginTop: "20%",
  },
  moderationTextMsg: {
    fontSize: 18,
    color: "white",
    backgroundColor: "#184A9C",
    textAlign: "center",
    paddingVertical: "8%",
    marginHorizontal: "2%",
    borderColor: "white",
    borderWidth: 2,
    borderStyle: "solid",
  },
  moderationBoxText:{
    paddingVertical: "4%",
    marginHorizontal: "2%",
    marginVertical: "2%",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "white",
  },
  moderationText: {
    fontSize: 15,
    color: "#000000",
    textAlign: "center",
  },
  moderationBtn: {
    width: "94%",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    marginHorizontal: "3%",
    marginVertical: "2%",
    fontSize: 12,
  },
  moderationBoxBtn: {
    // flexDirection: "row",
    justifyContent: "center",
  },
});
