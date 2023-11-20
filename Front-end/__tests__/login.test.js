import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { OwlConnect } from "../src/components";
import store from "../src/store/store";

test("Login Component render", () => {
  const {getByTestId, toJSON} = render(<Provider store={store}><OwlConnect /></Provider>);

  const login = getByTestId("login-button");
  expect(login).toBeTruthy();

  expect(toJSON()).toMatchSnapshot();
});
