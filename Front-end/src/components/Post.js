import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

import { styles } from "../styles/home/homeStyle";
import { convertTime } from "../utils/timeUtil";
import { DISLIKE_DISCUSSION, LIKE_DISCUSSION } from "../utils/constants";
import { updateDiscussion } from "../store/discussionSlice/discussionThunk";
import { useDispatch, useSelector } from "react-redux";

export default function Post({ post }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [vote, setVote] = useState(post.ups.length);
  const [ups, setUps] = useState([]);
  const [downs, setDowns] = useState([]);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    setUps(post.ups && post.ups.length && post.ups.filter(up => up === user.id));
    setDowns(post.downs && post.downs.length && post.downs.filter(down => down === user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToDiscussion = () => {
    navigation.navigate("Discussion", { post });
  };

  const like = () => {
    if (ups.indexOf(user.id) > -1) {
      dispatch(updateDiscussion(post._id, post, DISLIKE_DISCUSSION, user.id));
      setVote(vote + 1);
    }
    if (downs.indexOf(user.id) === -1) {
      dispatch(updateDiscussion(post._id, post, LIKE_DISCUSSION, user.id));
      setVote(vote - 1);
    }
  };

  return (
    <View style={styles.postView}>
      <Text style={styles.pseudo}>{post.authorId.username}</Text>
      <TouchableOpacity onPress={goToDiscussion}>
        <Text style={styles.message}>{post.title}</Text>
      </TouchableOpacity>
      <View style={styles.bottom}>
        <View style={styles.bottom}>
          <Button style={styles.icon} color="grey" icon="arrow-down-bold" onPress={like} />
          <Text style={styles.time}>{vote}</Text>
          <Button style={styles.icon} color="grey" icon="arrow-up-bold" onPress={like} />
        </View>
        <View style={styles.bottom}>
          <Button style={styles.icon} color="#000" icon="message-outline" onPress={goToDiscussion} />
          <Text style={styles.time}>{post.messages.length && post.messages.length}</Text>
        </View>
        <View style={styles.bottom}>
          <Button style={styles.icon} color="#000" icon="progress-clock" />
          <Text style={styles.time}>{convertTime(post.createdAt)}</Text>
        </View>
      </View>
    </View>
  );
}
