import React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

import { Home } from "../views";
import { styles } from "../styles/home/homeStyle";
import { DISCUSSION_HOT, DISCUSSION_NEW } from "../utils/constants";

const renderScene = ({ route }) => {
  switch (route.key) {
    case "new":
      return <Home order={DISCUSSION_NEW} />;
    case "hot":
      return <Home order={DISCUSSION_HOT} />;
    default:
      return <Home order={DISCUSSION_NEW} />;
  }
};

export default function TopNavigation() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "new", title: "New" },
    { key: "hot", title: "Hot" },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.white}
      style={styles.button}
    />
  );

  return (
    <TabView
      lazy
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
