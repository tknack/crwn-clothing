import React from "react";
import PropTypes from "prop-types";

import './custom-button.styles.scss'

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => {
  return (
    <button
      className={`custom-button ${isGoogleSignIn ? 'google-sign-in' : ''} `}
      {...otherProps}
    >
      {children}
    </button>
  );
};

CustomButton.propTypes = {};

export default CustomButton;
