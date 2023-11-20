import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {OwlConnect, OwlRegister} from "../components";
import HomeTab from "./HomeTab";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Connect"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Connect" component={OwlConnect} />
      <Stack.Screen name="Register" component={OwlRegister} />
      <Stack.Screen
        name="Main"
        component={HomeTab}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
