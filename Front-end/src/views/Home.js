import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FAB, Button } from "react-native-paper";

import { AddPost, Post } from "../components";
import { getAllDiscussions } from "../store/discussionSlice/discussionThunk";
import { styles } from "../styles/home/discussionStyle";

export default function Home({ order }) {
// export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { all, error, loading, errorMessage } = useSelector(state => state.discussion);
  const { myZone } = useSelector(state => state.zone);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (myZone && myZone._id) {
      dispatch(getAllDiscussions(myZone._id, order));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!myZone || !myZone._id) {
      navigation.navigate("Map");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myZone]);

  const switchVisibility = () => setIsVisible(!isVisible);

  if (loading || error) {
    return (
      <View>
        <Text>
          {loading ? "Loading..." : errorMessage}
        </Text>
      </View>
    );
  }

  return (
    <>
      {all.length > 0 && !isVisible ?
        <>
          <FlatList
            data={all}
            renderItem={({ item }) => {
              return <Post post={item} />;
            }}
            keyExtractor={(item) => item._id}
          />
          <View style={styles.container}>
            <FAB
              icon="message-text"
              onPress={switchVisibility}
              style={styles.fabColor}
            />
          </View>
        </>
        :
        isVisible ?
          <>
            <AddPost zone={myZone} />
            <Button onPress={switchVisibility} color="#184A9C">Cancel</Button>
          </> :
          <View style={styles.container}>
            <FAB
              icon="message-text"
              onPress={switchVisibility}
              style={styles.fabColor}
            />
          </View>
      }
    </>
  );
}
