import React, {useEffect} from "react";
import {ImageBackground, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-native-paper";

import {styles} from "../styles/home/owlProfilStyle";
import {logoutUser} from "../store/userSlice/userThunk";

export default function Profile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);

  useEffect(() => {
    if (!user) {
      navigation.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const logOut = () => {
    dispatch(logoutUser());
    navigation.navigate("Connect");
  };

  const goToProfile = () => {
    navigation.navigate("MyProfile");
  };

  const goToModeration = () => {
    navigation.navigate("Moderation");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/fondProfilGris2.jpg")}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.containerFormCA}>
        <Button
          style={styles.buttonProfile}
          labelStyle={styles.outColor}
          mode="contained"
          onPress={goToProfile}>
          Profile
        </Button>
        <Button
          style={styles.buttonCA}
          mode="contained"
          onPress={goToModeration}>
          Moderation
        </Button>
        <Button
          style={styles.buttonOut}
          labelStyle={styles.outColor}
          mode="contained"
          onPress={logOut}>
          Logout
        </Button>
      </View>
    </View>
  );
}
