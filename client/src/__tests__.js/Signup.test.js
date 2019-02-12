import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import Signup from "../components/Signup";

describe("<Signup />", () => {
  test('Signup should render', () => {
    shallow(<Signup/>);
  });

  test('should update state via onchange function', () => {
    const component = mount(<Signup />);
    const form = component.find("SignUpForm");

    const usernameInput = form.find("input[name='username']");
    const firstNameInput = form.find("input[name='firstName']");
    const lastNameInput = form.find("input[name='lastName']");
    const emailInput = form.find("input[name='email']");
    const passwordInput = form.find("input[name='password']");
    const confirmPasswordInput = form.find("input[name='confirmPassword']");

    usernameInput.simulate("change", { target: { name: "username", value: "cheeew", } });
    firstNameInput.simulate("change", { target: { name: "firstName", value: "Matthew", } });
    lastNameInput.simulate("change", { target: { name: "lastName", value: "Martinez", } });
    emailInput.simulate("change", { target: { name: "email", value: "hellomatthew@gmail.com", } });
    passwordInput.simulate("change", { target: { name: "password", value: "topsecret123", } });
    confirmPasswordInput.simulate("change", { target: { name: "confirmPassword", value: "topsecret123", } });

    const {username, firstName, lastName, email, password, confirmPassword} = component.state().user;

    expect(username).toEqual("cheeew");
    expect(firstName).toEqual("Matthew");
    expect(lastName).toEqual("Martinez");
    expect(email).toEqual("hellomatthew@gmail.com");
    expect(password).toEqual("topsecret123");
    expect(confirmPassword).toEqual("topsecret123");
  });

  test("should submit form", () => {
    const handleSubmit = jest.fn();
    const component = mount(<Signup handleSubmit={handleSubmit} />);

    component.simulate("submit", handleSubmit());
    expect(handleSubmit).toHaveBeenCalled();
  });
});