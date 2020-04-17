import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './App.css'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import Header from './components/header/header.component'

// pour ajouter une collection JSON, issue d'un fichier externe, dans firebase - à ne lancer qu'une fois
// import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'

// pour ajouter une collection JSON, issue d'un fichier externe, dans firebase - à ne lancer qu'une fois
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors'

// pour ajouter une collection JSON, issue d'un fichier externe, dans firebase - à ne lancer qu'une fois
// const App = ({ setCurrentUser, currentUser, collectionArray }) => {
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
      // pour ajouter une collection JSON, issue d'un fichier externe, dans firebase - à ne lancer qu'une fois
      // addCollectionAndDocuments(
        // 'collections',
        // collectionArray.map(({ title, items }) => ({ title, items }))
      // )
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
        <Route exact path='/signin' render={() => (currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />)} />
      </Switch>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // pour ajouter une collection JSON, issue d'un fichier externe, dans firebase - à ne lancer qu'une fois
  // collectionArray: selectCollectionsForPreview,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
