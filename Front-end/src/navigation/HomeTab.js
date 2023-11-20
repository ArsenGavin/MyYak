import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import UserStack from "./UserStack";
import ChatStack from "./ChatStack";
import MapStack from "./MapStack";

export default function HomeTab() {
  const Tab = createBottomTabNavigator();

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Map") {
              iconName = "map";
              size = focused ? 24 : 18;
              color = focused ? "#D89962" : "#fff";
            } else if (route.name === "Chat") {
              iconName = "message-text";
              size = focused ? 24 : 18;
              color = focused ? "#D89962" : "#fff";
            } else if (route.name === "Profile") {
              iconName = "account-circle";
              size = focused ? 24 : 18;
              color = focused ? "#D89962" : "#fff";
            }
            return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#D89962",
          inactiveTintColor: "#fff",
          tabStyle: { backgroundColor: "#184A9C" },
          scrollEnabled: true,
          showIcon: true,
        }}
      >
        <Tab.Screen name="Map" component={MapStack} />
        <Tab.Screen name="Chat" component={ChatStack} />
        <Tab.Screen name="Profile" component={UserStack} />
      </Tab.Navigator>
  );
}
