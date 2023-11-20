import React, {useEffect, useState} from "react";
import {
  ActivityIndicator,
  ScrollView,
  Keyboard,
  View,
  TouchableOpacity,
} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {Formik} from "formik";

import {registerValidation} from "../utils/validation";
import {registerUser} from "../store/userSlice/userThunk";
import {Error} from "../views";
import { styles, theme } from "../styles/home/owlCaStyle";

export default function OwlRegister() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirmation, setIsVisibleConfirmation] = useState(false);
  const {error, loading, user} = useSelector(state => state.user);

  useEffect(() => {
    if (user) {
      navigation.navigate("Main");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const goToLogin = () => navigation.navigate("Connect");

  const showPassword = () => setIsVisible(!isVisible);

  const showPasswordConfirmation = () =>
    setIsVisibleConfirmation(!isVisibleConfirmation);

  if (error) {
    return <Error />;
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scroll}>
        <View style={styles.vue}>
          <View style={styles.topView}>
            <Text style={styles.inscription}>
              Inscription sur <Text style={styles.my}>My</Text>
              <Text style={styles.yak}>Yak</Text>
            </Text>
            <Text style={styles.discute}>Rejoindre la communauté</Text>
          </View>

          {/* <View style={styles.containerFormCA}> */}
          <Formik
            initialValues={{
              email: "",
              username: "",
              telephone: "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={registerValidation}
            onSubmit={(values, actions) => {
              Keyboard.dismiss();
              actions.setSubmitting(true);
              dispatch(
                registerUser(
                  values.username.trim(),
                  values.email.toLowerCase(),
                  values.password,
                  values.telephone.trim()
                )
              );

              if (!error && user) {
                actions.resetForm();
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
                    theme={theme}
                    style={styles.txtInput}
                    mode="outlined"
                    label="Username"
                    placeholder="Username"
                    value={values.username}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                  />
                  {errors.username && (
                    <Text style={styles.error}>{errors.username}</Text>
                  )}
                  <TextInput
                    theme={theme}
                    style={styles.txtInput}
                    mode="outlined"
                    label="Telephone"
                    placeholder="Telephone"
                    value={values.telephone}
                    onChangeText={handleChange("telephone")}
                    onBlur={handleBlur("telephone")}
                    keyboardType="phone-pad"
                  />
                  {errors.telephone && (
                    <Text style={styles.error}>{errors.telephone}</Text>
                  )}
                  <TextInput
                    theme={theme}
                    style={styles.txtInput}
                    mode="outlined"
                    label="Email"
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    keyboardType="email-address"
                  />
                  {errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                  <TextInput
                    theme={theme}
                    style={styles.txtInput}
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
                  <TextInput
                    theme={theme}
                    placeholderTextColor="black"
                    style={styles.txtInput}
                    mode="outlined"
                    label="Confirm password"
                    secureTextEntry={!isVisibleConfirmation}
                    value={values.passwordConfirmation}
                    onChangeText={handleChange("passwordConfirmation")}
                    onBlur={handleBlur("passwordConfirmation")}
                    right={
                      <TextInput.Icon
                        color={"#184A9C"}
                        onPress={showPasswordConfirmation}
                        name={isVisibleConfirmation ? "eye-off" : "eye"}
                      />
                    }
                  />
                  {errors.passwordConfirmation && (
                    <Text style={styles.error}>
                      {errors.passwordConfirmation}
                    </Text>
                  )}
                </View>
                <View style={styles.buttonView}>
                  <Button
                    style={styles.buttonCA}
                    mode="contained"
                    onPress={handleSubmit}
                    uppercase={false}
                    testID="register-button">
                    {loading ? (
                      <ActivityIndicator animating={true} color={"#184A9C"} />
                    ) : (
                      <Text style={styles.registration}>
                        Inscription
                      </Text>
                    )}
                  </Button>

                  {/* <Button
                      style={styles.buttonCA}
                      mode="contained"
                      onPress={handleSubmit}
                      disabled={isSubmitting || !isValid || loading}
                      testID="register-button">
                      {loading ? (
                        <ActivityIndicator animating={true} color={"#184A9C"} />
                      ) : (
                        "Inscription"
                      )}
                    </Button> */}
                </View>
                <View style={styles.withAccountView}>
                  <Text style={styles.withAccountText}>
                    Vous avez déjà un compte ?
                  </Text>
                  <View style={styles.centre}>
                    <TouchableOpacity onPress={goToLogin}>
                      <Text style={styles.login}>SE CONNECTER !</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </Formik>
          {/* <Button
              style={styles.buttonCARetour}
              mode="contained"
              onPress={goToLogin}>
              Already registered?
            </Button> */}
          {/* </View> */}
        </View>
      </ScrollView>
    </View>
  );
}
