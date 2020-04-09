import React from 'react'
import PropTypes from 'prop-types'

import './custom-button.styles.scss'

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => {
  return (
    <button
      className={`custom-button ${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} `}
      {...otherProps}>
      {children}
    </button>
  )
}

CustomButton.propTypes = {}

export default CustomButton
