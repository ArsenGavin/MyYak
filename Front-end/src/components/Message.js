import React, { useEffect, useState } from "react";
import { Animated, Keyboard, Modal, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Swipeable } from "react-native-gesture-handler";
import { Button, Colors, IconButton, Portal, TextInput } from "react-native-paper";
import { Formik } from "formik";
import ReactNativeModal from "react-native-modal";

import { styles } from "../styles/home/homeStyle";
import { updateMessage, deleteMessage, createMessage } from "../store/messageSlice/messageThunk";
import Report from "./Report";

export default function Message({ message }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [responses, setResponses] = useState([]);
  const { isDeleted, updatedMessage, loading, children } = useSelector(state => state.message);
  const { user } = useSelector(state => state.user);

  useEffect(() => {}, [isDeleted, updatedMessage, isUpdate]);

  useEffect(() => {
    if (!user) {
      navigation.navigate("Connect");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (children && children.length) {
      setResponses(children.filter((msg) => msg.parentMessageId === message._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const updateCurrentMessage = () => {
    setIsUpdate(true);
    showModal();
  };

  const deleteCurrentMessage = () => {
    dispatch(deleteMessage(message));
  };

  const replyMessage = () => {
    setIsReply(true);
    showModal();
  };

  const reportMessage = () => {
    setIsReport(!isReport);
  };

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
    });
    return (
      <>
        {!message.parentMessageId && <View style={styles.reply}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Animated.View style={{
            paddingHorizontal: 10, transform: [{ scale }],
          }}>
            <IconButton
              icon="reply"
              size={20}
              color={Colors.white}
              onPress={replyMessage}
            />
          </Animated.View>
        </View>}
        {message.authorId._id === user.id && <View style={styles.trash}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Animated.View style={{
            paddingHorizontal: 10, transform: [{ scale }],
          }}>
            <IconButton
              icon="trash-can"
              size={20}
              color={Colors.white}
              onPress={deleteCurrentMessage}
            />
          </Animated.View>
        </View>}
        {message.authorId._id === user.id && <View style={styles.pencil}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Animated.View style={{
            paddingHorizontal: 10, transform: [{ scale }],
          }}>
            <IconButton
              icon="pencil"
              size={20}
              color={Colors.white}
              onPress={updateCurrentMessage}
            />
          </Animated.View>
        </View>}
        {message.authorId._id !== user.id &&  <View style={styles.report}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Animated.View style={{
            paddingHorizontal: 10, transform: [{ scale }],
          }}>
            <IconButton
              icon="alert"
              size={20}
              color={Colors.white}
              onPress={reportMessage}
            />
          </Animated.View>
        </View>}
      </>
    );
  };

  return (
    <>
    <Swipeable renderRightActions={leftSwipe}>
      <View style={styles.messageContainer}>
        <Text style={styles.messageName}>{message.authorId.username}</Text>
        <Text style={styles.message}>{message.content}</Text>
      </View>
    </Swipeable>
      {responses && responses.length > 0 && responses.map((response, i) => (
        // <Swipeable key={i} renderRightActions={leftSwipe}>
          <View key={i} style={styles.messageAnswer}>
            <Text style={styles.messageName}>{response.authorId.username}</Text>
            <Text style={styles.message}>{response.content}</Text>
          </View>
        // </Swipeable>
      ))}
      <>
        <ReactNativeModal
          isVisible={isReport}
          onDismiss={reportMessage}
          animationIn="slideInUp"
          onBackdropPress={reportMessage}
        >
          <View style={styles.modalReport}>
            <Report message={message} />
          </View>
        </ReactNativeModal>
      </>
      <View style={styles.modal}>
      <Portal>
        <Modal visible={isModalVisible} onDismiss={hideModal}>
          <Formik
            initialValues={{
              content: "",
              contentUpdate: message.content,
            }}
            onSubmit={(values, actions) => {
              Keyboard.dismiss();
              actions.setSubmitting(true);
              if (isUpdate) {
                dispatch(updateMessage({
                  _id: message._id,
                  authorId: message.authorId,
                  content: values.contentUpdate,
                  parentMessageId: null,
                  ups: message.ups,
                  discussionId: message.discussionId,
                }));
              }
              if (isReply) {
                dispatch(createMessage({
                  authorId: user.id,
                  content: values.content,
                  parentMessageId: message._id,
                  ups: [user.id],
                  discussionId: message.discussionId,
                }));
              }
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
                <View style={styles.pop}>
                  <Button
                    mode="outlined"
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    style={styles.modalButton}
                  >
                    {loading ? "Loading..." : "Send"}
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={hideModal}
                    style={styles.modalButton}
                  >
                    Cancel
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </Modal>
      </Portal>
      </View>
    </>
  );
}
