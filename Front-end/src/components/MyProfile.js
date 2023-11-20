import React, { useEffect, useState } from "react";
import { ImageBackground, Keyboard, View } from "react-native";
import { Button, Text, TextInput, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

import { styles } from "../styles/home/owlProfilStyle";
import { userUpdateValidation } from "../utils/validation";
import { updateUser } from "../store/userSlice/userThunk";

export default function MyProfile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState(false);
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isOldVisible, setIsOldVisible] = useState(false);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!user) {
      navigation.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const showPassword = () => setIsVisible(!isVisible);
  const showOldPassword = () => setIsOldVisible(!isOldVisible);
  const showNewPassword = () => setIsNewVisible(!isNewVisible);

  const show = () => setVisible(!visible);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/fondProfilGris2.jpg")}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.containerFormCA}>
        <Formik
          initialValues={{
            email: user && user.email ? user.email : "",
            username: user && user.username ? user.username : "",
            telephone: user && user.telephone ? user.telephone : "",
            password: "",
            newPassword: "",
            confirmNewPassword: "",
            updatePassword: false,
          }}
          enableReinitialize={true}
          validationSchema={userUpdateValidation}
          onSubmit={(values, actions) => {
            Keyboard.dismiss();
            actions.setSubmitting(true);
            dispatch(updateUser(
              user.id,
              values.username ? values.username.trim() : undefined,
              values.email ? values.email.trim().toLowerCase() : undefined,
              values.password && values.newPassword ? values.newPassword : undefined,
              values.telephone ? values.telephone.trim() : undefined,
            ));

            if (!error && user) {
              actions.resetForm();
              actions.setValues({
                email: user.email ? user.email : "",
                username: user.username ? user.username : "",
                telephone: user.telephone ? user.telephone : "",
              });
              // navigation.navigate("Chat");
            }
            if (error) {
              actions.setSubmitting(false);
            }
          }}
        >
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
                  label="Username"
                  placeholder="Username"
                  value={values.username}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  theme={{ colors: { primary: "#184A9C" } }}
                />
                {errors.username && <Text style={styles.error}>{errors.username}</Text>}
                <TextInput
                  style={styles.txtInput}
                  label="Telephone"
                  placeholder="Telephone"
                  value={values.telephone}
                  onChangeText={handleChange("telephone")}
                  onBlur={handleBlur("telephone")}
                  keyboardType="number-pad"
                  theme={{ colors: { primary: "#184A9C" } }}
                />
                {errors.telephone && <Text style={styles.error}>{errors.telephone}</Text>}
                <TextInput
                  style={styles.txtInput}
                  label="Email"
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  keyboardType="email-address"
                  theme={{ colors: { primary: "#184A9C" } }}
                />
                {errors.email && <Text style={styles.error}>{errors.email}</Text>}
                {/*{!values.updatePassword ?*/}
                  <Button
                    style={styles.txtInput}
                    // onPress={() => handleChange('updatePassword', !values.updatePassword)}
                    onPress={show}
                  >
                    {visible ? "Keep password" : "Change password"}
                  </Button>
                {/*{values.updatePassword ?*/}
                {visible ?
                  <>
                    <TextInput
                      style={styles.txtInput}
                      label="New Password"
                      secureTextEntry={!isVisible}
                      value={values.newPassword}
                      onChangeText={handleChange("newPassword")}
                      onBlur={handleBlur("newPassword")}
                      right={<TextInput.Icon onPress={showPassword} name={isVisible ? "eye-off" : "eye"}/>}
                      theme={{ colors: { primary: "#184A9C" } }}
                    />
                    {errors.newPassword && <Text style={styles.error}>{errors.newPassword}</Text>}
                    <TextInput
                      style={styles.txtInput}
                      label="Confirm Password"
                      secureTextEntry={!isNewVisible}
                      value={values.confirmNewPassword}
                      onChangeText={handleChange("confirmNewPassword")}
                      onBlur={handleBlur("confirmNewPassword")}
                      right={<TextInput.Icon onPress={showNewPassword} name={isNewVisible ? "eye-off" : "eye"}/>}
                      theme={{ colors: { primary: "#184A9C" } }}
                    />
                    {errors.confirmNewPassword && <Text style={styles.error}>{errors.confirmNewPassword}</Text>}
                    <TextInput
                      style={styles.txtInput}
                      label="Old Password"
                      secureTextEntry={!isOldVisible}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      right={<TextInput.Icon onPress={showOldPassword} name={isOldVisible ? "eye-off" : "eye"}/>}
                      theme={{ colors: { primary: "#184A9C" } }}
                    />
                    {errors.password && <Text style={styles.error}>{errors.password}</Text>}
                  </> : null}
              </View>
              <Button
                style={styles.buttonCA}
                mode="contained"
                onPress={handleSubmit}
                disabled={isSubmitting || !isValid || loading}
              >
                {loading || isSubmitting ? <ActivityIndicator animating={true} color={"#184A9C"}/> : "Confirm"}
              </Button>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}
