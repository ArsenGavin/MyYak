import React from "react";
import { DevSettings, ImageBackground, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../styles/error/errorStyle";

export default function Error () {
  const handleGoBack = () => {
    DevSettings.reload();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/backgroundError.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
      <Text style={styles.text}>Oops, an error has occurred !</Text>
      <Button
        mode="contained"
        onPress={handleGoBack}
        style={styles.button}
      >
        Go back
      </Button>
      </ImageBackground>
    </View>
  );
}
