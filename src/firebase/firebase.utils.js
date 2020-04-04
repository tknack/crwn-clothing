import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyD3tx6uDxMYfBRzzinKiPXNeMBaNvRXA5I",
  authDomain: "crwn-db-e8efc.firebaseapp.com",
  databaseURL: "https://crwn-db-e8efc.firebaseio.com",
  projectId: "crwn-db-e8efc",
  storageBucket: "crwn-db-e8efc.appspot.com",
  messagingSenderId: "706733915564",
  appId: "1:706733915564:web:d42b368d6b601195878e09",
  measurementId: "G-MPJJV8XBC0"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

