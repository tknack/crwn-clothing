import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './App.css'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import Header from './components/header/header.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser} from './redux/user/user.selectors'

const App = ({ setCurrentUser, currentUser }) => {
  // setCurrentUser vient de mapDispatchToProps
  // const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // connexion
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // setCurrentUser(user)
      // createUserProfileDocument(userAuth)
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          // console.log(snapShot.data());
          setCurrentUser({ id: snapShot.id, ...snapShot.data() })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
    return () => {
      // déconnexion
      unsubscribeFromAuth()
    }
  }, [])

  // console.log(currentUser);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route
          exact
          path='/signin'
          render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)}
        />
      </Switch>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
