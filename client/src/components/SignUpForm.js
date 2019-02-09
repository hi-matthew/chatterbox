import React from "react";
import "../styles/Signup.css";

const SignUpForm = (props) => (
  <form
  action="/sign-up"
  method="POST"
  className="sign-up__form"
  onSubmit={props.handleSubmit}
  >
    <label htmlFor="username">
      Username
    </label>
    <input
    type="text"
    id="username"
    name="username"
    onChange={props.handleChange}
    />
    <label htmlFor="first-name">
      First name
    </label>
    <input
    type="text"
    id="first-name"
    name="firstName"
    onChange={props.handleChange}
    />
    <label htmlFor="last-name">
      Last name
    </label>
    <input
    type="text"
    id="last-name"
    name="lastName"
    onChange={props.handleChange}
    />
    <label htmlFor="email">
      Email
    </label>
    <input
    type="text"
    id="email"
    name="email"
    onChange={props.handleChange}
    />
    <label htmlFor="password">
      Password
    </label>
    <input
    type="password"
    id="password"
    name="password"
    onChange={props.handleChange}
    />
    <label htmlFor="confirm-password">
      Confirm password
    </label>
    <input
    type="password"
    id="confirm-password"
    name="confirmPassword"
    onChange={props.handleChange}
    />
    <input
    type="submit"
    value="Sign up"
    />
  </form>
);

export default SignUpForm;
