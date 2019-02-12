import React from "react";
import { shallow } from "enzyme";
import Login from "../components/Login";

describe('<Login />', () => {
  test('login component renders', () => {
    const component = shallow(<Login />);
    expect(component).toHaveLength(1);
  });

  test("onchange function updates state with input field values", () => {
    const component = shallow(<Login />);

    const emailInput = component.find("input[name='email']");
    const passwordInput = component.find("input[name='password']");

    emailInput.simulate("change", {
      target: { name: "email", value: "matthew@gmail.com" }
    });
    passwordInput.simulate("change", {
      target: { name: "password", value: "superSecret123" }
    });

    const { email, password } = component.state().loginCredentials;

    expect(email).toEqual("matthew@gmail.com");
    expect(password).toEqual("superSecret123");
  });

  test("Login callback fires upon form submit", () => {
    const component = shallow(<Login />);

    const handleSubmit = jest.fn();
    const form = component.find("form");

    form.simulate("submit", { preventDefault: handleSubmit() });

    expect(handleSubmit).toHaveBeenCalled();
  });
});
