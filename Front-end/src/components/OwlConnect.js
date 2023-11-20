/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from "react";
import {
  ActivityIndicator,
  Keyboard,
  View,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import {Button, TextInput, Text} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {Formik} from "formik";

import {styles} from "../styles/home/owlConnectStyle";
import {loginValidation} from "../utils/validation";
import {loginUser} from "../store/userSlice/userThunk";

// Ici la screen height car le clavier modifie le comportement de flexbox et c'est moche
let ScreenHeight = Dimensions.get("window").height;

const theme = {
  colors: {
    text: "black",
    primary: "#184A9C",
    background: "#E3E3E3",
    placeholder: "#B4B4B4",
  },
  roundness: 10,
};

export default function OwlConnect() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const {error, loading, user, errorMessage} = useSelector(state => state.user);

  useEffect(() => {
    if (user) {
      navigation.navigate("Main");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {}, [error, errorMessage, loginError]);

  const goToRegister = () => navigation.navigate("Register");

  const showPassword = () => setIsVisible(!isVisible);

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scroll}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-between",
            height: ScreenHeight - StatusBar.currentHeight,
          }}>
          <View style={styles.topView}>
            <Image
              style={styles.image}
              source={require("../assets/iconMarker.png")}
            />
            <Text style={styles.welcome}>
              Bienvenue sur <Text style={styles.my}>My</Text>
              <Text style={styles.yak}>Yak</Text>
            </Text>
            <Text style={styles.discute}>Discute localement !</Text>
          </View>

          <Formik
            initialValues={{email: "", password: ""}}
            validationSchema={loginValidation}
            onSubmit={(values, actions) => {
              setLoginError(false);
              Keyboard.dismiss();
              actions.setSubmitting(true);
              dispatch(loginUser(values.email.toLowerCase(), values.password));
              if (!error && user) {
                actions.resetForm();
              }
              if (error) {
                setLoginError(true);
              }
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
              isValid,
              errors,
            }) => (
              <>
                <View style={styles.boxInput}>
                  <TextInput
                    style={styles.txtInput}
                    theme={theme}
                    mode="outlined"
                    label="Email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    keyboardType="email-address"
                  />

                  {errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                  <TextInput
                    theme={theme}
                    mode="outlined"
                    label="Password"
                    secureTextEntry={!isVisible}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    right={
                      <TextInput.Icon
                        color={"#184A9C"}
                        onPress={showPassword}
                        name={isVisible ? "eye-off" : "eye"}
                      />
                    }
                  />
                  {errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                </View>
                <View style={styles.buttonView}>
                  <Button
                    style={styles.buttonCA}
                    mode="contained"
                    onPress={handleSubmit}
                    uppercase={false}
                    testID="login-button"
                    // disabled={isSubmitting || !isValid || loading}
                  >
                    {loading ? (
                      <ActivityIndicator animating={true} color={"#184A9C"} />
                    ) : (
                      <Text style={{color: "white", fontWeight: "bold"}}>
                        Connexion
                      </Text>
                    )}
                  </Button>
                  {loginError && (
                    <Text style={styles.error}>
                      Email or password is incorrect
                    </Text>
                  )}
                  <TouchableOpacity>
                    <Text style={styles.forgotPwd}>Mot de passe oublié ?</Text>
                  </TouchableOpacity>
                  <View style={styles.noAccountView}>
                    <Text style={styles.noAccountText}>
                      Vous n'avez pas de compte ?
                    </Text>
                    <View style={{alignItems: "center"}}>
                      <TouchableOpacity onPress={goToRegister}>
                        <Text style={styles.register}>S'INSCRIRE !</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
}
