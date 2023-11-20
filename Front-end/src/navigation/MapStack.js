import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Map } from "../views";

const Stack = createStackNavigator();

const MapStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MapStack;
