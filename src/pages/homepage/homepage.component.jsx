import React from 'react' 
import PropTypes from 'prop-types'

import Directory from '../../components/directory/directory.component'

// import './homepage.styles.scss'

import { HomePageContainer } from './homepage.styles'

const HomePage = props => {
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  )
}

// HomePage.propTypes = {

// }

export default HomePage
