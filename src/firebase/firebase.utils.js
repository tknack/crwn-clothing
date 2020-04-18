import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { useReducer } from 'react'

const config = {
  apiKey: 'AIzaSyD3tx6uDxMYfBRzzinKiPXNeMBaNvRXA5I',
  authDomain: 'crwn-db-e8efc.firebaseapp.com',
  databaseURL: 'https://crwn-db-e8efc.firebaseio.com',
  projectId: 'crwn-db-e8efc',
  storageBucket: 'crwn-db-e8efc.appspot.com',
  messagingSenderId: '706733915564',
  appId: '1:706733915564:web:d42b368d6b601195878e09',
  measurementId: 'G-MPJJV8XBC0',
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return
  // à partir de l'utilisateur qui s'authentifie ...
  // dans firebase
  // on récupère le document de référence (user), seul moyen de savoir si le document existe ou pas dans la collection user
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  // const collectionRef = firestore.collection('users')

  // ... et sur ce document, on peut faire un get(), stocké dans un snapShot pour en tester l'existance
  const snapShot = await userRef.get()
  // const collectionSnapshot = await collectionRef.get()
  // console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) })

  // console.log(snapShot)

  // et donc, si le snapshot du document n'existes pas on extrait les propriétés du document pour le créer dans 'users' !
  // on evite, ici, de créer l'utilisateur plusieur fois !
  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    // et ensuite on ajoute cet utilisateur dans la collection 'users' de firebase
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)

  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}

export const convertCollectionSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    }
  })

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
