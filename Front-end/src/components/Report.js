import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, RadioButton } from "react-native-paper";

import { styles } from "../styles/home/reportStyle";
import { useDispatch } from "react-redux";
import { reportMessage } from "../store/messageSlice/messageThunk";

export default function Report({ message }) {
  const [issue, setIssue] = useState("");
  const dispatch = useDispatch();

  const alertMessage = () => {
    dispatch(reportMessage(message));
  };

  return (
    <>
      <View>
        <View>
          <Text>
            Merci de prendre soin de vous et des autres utilisateurs{"\n"}
            en signalant les infractions au règlement et à la loi
          </Text>
        </View>
        <View>
          <RadioButton.Group onValueChange={value => setIssue(value)} value={issue}>
            <RadioButton.Item
              uncheckedColor="black"
              labelStyle={styles.text}
              label="Contenu commercial ou indésirable"
              value="Spam"
            />
            <RadioButton.Item
              uncheckedColor="black"
              labelStyle={styles.text}
              label="Harcèlement ou intimidation"
              value="Harcèlement"
            />
            <RadioButton.Item
              uncheckedColor="black"
              labelStyle={styles.text}
              label="Incitation au terrorisme"
              value="Terrorisme"
            />
            <RadioButton.Item
              uncheckedColor="black"
              labelStyle={styles.text}
              label="Suicide ou automutilation"
              value="Suicide"
            />
          </RadioButton.Group>
        </View>
        <View>
          <Button
            mode="contained"
            onPress={alertMessage}
          >
            Signaler
          </Button>
        </View>
      </View>
    </>
  );
}
