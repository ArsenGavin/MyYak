import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { OwlRegister } from "../src/components";
import store from "../src/store/store";

test("Register Component render", () => {
  const {getByTestId, findByText, toJSON} = render(<Provider store={store}><OwlRegister /></Provider>);

  const register = getByTestId("register-button");
  expect(register).toBeTruthy();

  expect(toJSON()).toMatchSnapshot();
});
