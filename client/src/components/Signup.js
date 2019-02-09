import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import ErrorContainer, { ErrorMessage } from "./ErrorAlert";

class Signup extends Component {
  state = {
    user: {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null
    },
    errorBin: {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null
    },
    successfulSubmission: null,
    viewportIsWide: null,
  }

  componentDidMount() {
    this.setViewportStatus();
  }

  componentDidUpdate() {
    window.addEventListener('resize', this.setViewportStatus);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setViewportStatus);
  }

  setViewportStatus = () => {
    window.innerWidth < 950
    ? this.setState({ viewportIsWide: false })
    : this.setState({ viewportIsWide: true });
  }

  clearErrorBin = (errorBin) => {
    const fieldsToReset = Object.entries(errorBin)
      .map((errorArray) => {
        const [ key, errorMsg ] = errorArray;
        return errorMsg ? key : null;
      })
      .filter(key => key);

    if(fieldsToReset.length) {
      fieldsToReset.forEach(key => errorBin[key] = null);
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('/sign-up', this.state.user);
    let errorBin = { ...this.state.errorBin };
    console.log(res);

    if(res.data.errors) {
      // clear previous errors, if there were any
      this.clearErrorBin(errorBin);
      // then repopulate new ones
      res.data.errors.forEach(error => {
        errorBin[error.param] = error.msg;
      });
      this.setState({ errorBin });
      this.setState({ successfulSubmission: false });
    } else {
      // clear previous errors, if there were any
      this.clearErrorBin(errorBin);
      this.setState({ errorBin });
      // display success message to user
      console.log(res.data);
      this.setState({ successfulSubmission: true });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const user = { ...this.state.user };
    user[name] = value;
    this.setState({ user });
  }

  render() {
    const { errorBin, successfulSubmission, viewportIsWide, user } = this.state;

    const errorMessages = Object.entries(errorBin)
      .filter(error => error[1])
      .map((error, i) => <ErrorMessage key={i} error={error}/>);

    const alertWithErrors = successfulSubmission === false
      ? <ErrorContainer>
          {errorMessages}
        </ErrorContainer>
      : null

    const formatName = (name) => {
      return name[0].toUpperCase() + name.substring(1).toLowerCase();
    }

    return (
      <div className="sign-up">
        <div className="sign-up__outline">
          <header className="sign-up__header">
            <h1 className="sign-up__h1">
              {successfulSubmission
                ? `Welcome, ${formatName(user.firstName)}!`
                : "Chatterbox"
              }
            </h1>
            <h2 className="sign-up__h2">
              {successfulSubmission
                ? "🎉 You're an official Chatterboxer! 🎉"
                : "Welcome to your new social life"
              }
            </h2>
          </header>
          {!viewportIsWide ? alertWithErrors : null}
          {successfulSubmission
          ? <Link
            className="success-message__login-link"
            style={{
              textDecoration: "none",
              color: "cadetblue",
              borderBottom: "1px dashed green"
            }}
            to="/"
            >
              You can continue to login here
            </Link>
          : <SignUpForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            />
          }
        </div>
        {viewportIsWide ? alertWithErrors : null}
      </div>
    )
  }
}

export default Signup;
