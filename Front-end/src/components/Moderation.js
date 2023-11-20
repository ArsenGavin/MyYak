import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { getModerationMessages, updateMessageVote } from "../store/messageSlice/messageThunk";
import { styles } from "../styles/home/moderationStyle";
import { VOTE_KO, VOTE_OK } from "../utils/constants";

export default function Moderation() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { moderation } = useSelector((state) => state.message);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user) {
      navigation.navigate("Connect");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setMessages(moderation.votes && moderation.votes.yes
      ? moderation.votes.yes.filter(m => m !== user.id)
      : moderation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
  }, [moderation]);

  useEffect(() => {
    dispatch(getModerationMessages(user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {messages && !messages.length && (
        <View style={styles.noModeration}>
          <Text style={styles.moderationText}>
            Il n'y a pas de message à modérer
          </Text>
        </View>
      )}
      {moderation && moderation.length > 0 && (
      <View>
        {messages && messages.length > 0 && <Text>Merci de déterminer si les messages sont déplacés.</Text>}
        {messages && messages.length > 0 && messages.map((message, i) => (
          <ModerateMessage message={message} user={user.id} key={i}/>
        ))}
      </View>
      )}
    </View>
  );
}

function ModerateMessage({ message, user }) {
  const dispatch = useDispatch();

  const voted = (voteYesOrNo) => {
    dispatch(updateMessageVote(message._id, voteYesOrNo, user));
  };

  return (
  <View style={styles.moderationBoxText}>
    <Text style={styles.moderationText}>{message.content}</Text>
    <View style={styles.moderationBoxBtn}>
      {message.votes && message.votes.yes.indexOf(user.id) === -1 ? <><Button style={styles.moderationBtn} color="green" mode="Outlined button" onPress={() => voted(VOTE_KO)}>
        ✔ Message normal
      </Button>
      <Button style={styles.moderationBtn} mode="Contained" color="red" onPress={() => voted(VOTE_OK)}>
        ✘ Message déplacé
      </Button></> : null}
    </View>
  </View>
  );
}
