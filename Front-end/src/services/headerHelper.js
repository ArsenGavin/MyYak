import AsyncStorage from "@react-native-async-storage/async-storage";

const authHeader = async () => {
  const token = await AsyncStorage.getItem("token");
  return { authorization: token };
};

export default authHeader;
