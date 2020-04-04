import React from 'react'
import PropTypes from 'prop-types'

import SignIn from '../../components/sign-in/sign-in.component'
import './sign-in-and-sign-up.styles.scss'

const SignInAndSignUpPage = props => {
  return (
    <div className='sign-in-and-sign-up'>
      <SignIn />
    </div>
  )
}

SignInAndSignUpPage.propTypes = {

}

export default SignInAndSignUpPage
