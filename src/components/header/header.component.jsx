import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import './header.styles.scss'

const Header = props => {
  return (
    <div className='header'>
      <Link className='logo-container' to="/">
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/shop'>
          CONTACT
        </Link>
      </div>
    </div>
  )
}

Header.propTypes = {

}

export default Header
