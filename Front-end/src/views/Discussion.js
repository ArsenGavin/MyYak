import React, { useEffect, useState } from "react";
import { FlatList, Keyboard, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, FAB, Modal, Portal, Text, TextInput } from "react-native-paper";
import { Formik } from "formik";

import { Message, Post } from "../components";
import { styles } from "../styles/home/discussionStyle";
import { createMessage, getAllMessages } from "../store/messageSlice/messageThunk";

export default function Discussion(props) {
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const { all, loading } = useSelector(state => state.message);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    setPost(props.route.params.post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (post) {
      dispatch(getAllMessages(post._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  useEffect(() => {
  }, [all]);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  if (!post) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Post post={post}/>
      {all.length > 0 ?
        <FlatList
          data={all}
          renderItem={({ item }) => { return <Message message={item}/>;}}
          keyExtractor={(item) => item._id}
        /> : null
      }
      {!isModalVisible ? <View style={styles.container}>
        <FAB
          icon="plus"
          onPress={showModal}
          style={styles.fabColor}
          color="#fff"
        />
      </View> : null}
      <Portal>
        <Modal visible={isModalVisible} onDismiss={hideModal}>
          <Formik
            initialValues={{
              content: "",
            }}
            onSubmit={(values, actions) => {
              Keyboard.dismiss();
              actions.setSubmitting(true);
              dispatch(createMessage({
                authorId: user.id,
                content: values.content,
                parentMessageId: null,
                ups: [user.id],
                discussionId: post._id,
              }));
              actions.setSubmitting(false);
              hideModal();
            }}
          >
            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
              <View style={styles.modal}>
                <TextInput
                  style={styles.modelText}
                  placeholder="Message"
                  values={values.content}
                  onChangeText={handleChange("content")}
                  onBlur={handleBlur("content")}
                  multiline
                  numberOfLines={10}
                />
                <Button
                  mode="outlined"
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  style={styles.modalButton}
                  color="#fff"
                >
                  {loading ? "Loading..." : "Send"}
                </Button>
              </View>
            )}
          </Formik>
        </Modal>
      </Portal>
    </View>
  );
}
