import React from 'react';
import "../styles/Errors.css"

const ErrorContainer = (props) => (
  <div className="error-container">
    <h3 className="error-container__title">
      Uh oh, it looks like you missed a thing or two!
    </h3>
    <ul className="error-container__errors-list">
      {props.children}
    </ul>
  </div>
);

export const ErrorMessage = (props) => {
  const errorMessage = props.error[1];
  return (
    <li className="error-container__error-message">
      {errorMessage}
    </li>
  )
};

export default ErrorContainer;