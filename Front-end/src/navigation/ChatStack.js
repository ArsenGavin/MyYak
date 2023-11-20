import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Discussion } from "../views";
import TopNavigation from "./TopNavigation";

const Stack = createStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={TopNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Discussion"
        component={Discussion}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
