import React from "react";
import { Link } from "react-router-dom";
import ErrorContainer, { ErrorMessage } from "./ErrorAlert";
import axios from "axios";
import "../styles/Login.css";

class Login extends React.Component {
  state = {
    loginCredentials: {
      email: null,
      password: null
    },
    errorBin: {
      email: null,
      password: null
    },
    failedLogin: false
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const loginCredentials = { ...this.state.loginCredentials };
    loginCredentials[name] = value;
    this.setState({ loginCredentials });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state.loginCredentials;
    const res = await axios.post("/api/login", { email, password });
    let errorBin = {...this.state.errorBin};

    console.log(res);
    if(res.data.errors) {
      errorBin.email = null;
      errorBin.password = null;
      res.data.errors.forEach(error => {
        errorBin[error.param] = error.msg;
      });
      this.setState({ failedLogin: true });
      this.setState({ errorBin });
      // reset password input & password state
      this.form.password.value = null;
      this.setState({ loginCredentials: { email, password: null } });
    } else {
      // redirect to user's chatterbox
      this.props.history.push(res.data.redirectUrl);
    }
  }

  render() {
    const { errorBin, failedLogin } = this.state;
    const errorMessages = Object.entries(errorBin)
      .filter(error => error[1])
      .map((error, i) => <ErrorMessage key={i} error={error}/>);
    const alertWithErrors = failedLogin
      ? <ErrorContainer>
          {errorMessages}
        </ErrorContainer>
      : null

  return (
    <div className="login">
        <div className="login__outline">
          <header className="login__header">
            <h1 className="login__h1">Chatterbox</h1>
            <h2 className="login__h3">A place for chatting</h2>
          </header>
          {failedLogin
          ? alertWithErrors
          : null
          }
          <form
          action="/login"
          method="POST"
          className="login__form"
          onSubmit={this.handleSubmit}
          ref={form => this.form = form}
          >
            <fieldset>
              <label htmlFor="email">
                Email
              </label>
              <input
              type="text"
              name="email"
              placeholder="matthew@chatterbox.com"
              onChange={this.handleChange}
              />
              <label htmlFor="password">
                Password
              </label>
              <input
              type="password"
              name="password"
              placeholder="iCh@tt3rb0x!"
              onChange={this.handleChange}
              />
              <input
              type="submit"
              className="login__btn"
              value="Log In"
              />
            </fieldset>
          </form>
          <Link
          to="/sign-up"
          className="login__register-link"
          >
            Sign up for an account
          </Link>
        </div>
      </div>
    )
  }
}

export default Login;