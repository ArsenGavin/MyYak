import React from "react";
import { Keyboard, View } from "react-native";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextInput } from "react-native-paper";

import { styles } from "../styles/home/homeStyle";
import { createDiscussion } from "../store/discussionSlice/discussionThunk";



export default function AddPost({ zone }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  if (!zone || !user) {return;}

  return (
    <Formik
      initialValues={{ title: "" }}
      onSubmit={(values, actions) => {
        Keyboard.dismiss();
        actions.setSubmitting(true);
        dispatch(createDiscussion({
          title: values.title,
          authorId: user.id,
          zoneId: zone._id,
        }));
        actions.setSubmitting(false);
      }}
    >
      {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
      }) => (
        <View style={styles.container}>
          <TextInput
            label="Title"
            placeholder="Title"
            value={values.title}
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            style={styles.title}
          />
          <Button
            mode="outlined"
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={styles.button}
            color="#fff"
          >
            Create discussion
          </Button>
        </View>
      )}
    </Formik>
  );
}
