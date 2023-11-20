import * as React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { name as appName } from "./app.json";
import App from "./App";
import store from "./src/store/store";

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <App/>
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
