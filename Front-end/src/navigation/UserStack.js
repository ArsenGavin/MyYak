import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../views/Profile";
import MyProfile from "../components/MyProfile";
import Moderation from "../components/Moderation";

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
      />
      <Stack.Screen
        name="Moderation"
        component={Moderation}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
