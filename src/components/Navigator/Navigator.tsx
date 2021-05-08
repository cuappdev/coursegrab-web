import React from 'react'

import './Navigator.css'
import firebase from "firebase/app"
import "firebase/auth"
import { hostUrl, firebaseConfig } from '../../utils/constants'
import { initializeSession } from '../../utils/requests';
import { User, SessionAuthorization } from '../../types'

firebase.initializeApp(firebaseConfig)
var provider = new firebase.auth.GoogleAuthProvider()

class Navigator extends React.Component {

  state = {
    isSignedIn: localStorage.getItem('user')
  }

  openSigninPopup = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async result => {
        var credential = result.credential as firebase.auth.OAuthCredential
        var token = credential.idToken as string
        var user = result.additionalUserInfo as firebase.auth.AdditionalUserInfo
        var profile = user.profile as Record<string, string>
        const session = await initializeSession(token, profile.given_name, profile.family_name) as SessionAuthorization
        const loggedInUser : User = {
          email: profile.email,
          name: profile.name,
          id: token,
          sessionAuthorization: session,
        }
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        this.setState({ isSignedIn: true })
      })
      .catch(error => {
        var errorCode = error.code
        var errorMessage = error.message
        var email = error.email
        var credential = error.credential
      })
  }

  signOut = () => {
    firebase.auth().signOut()
    localStorage.removeItem('user')
    this.setState({ isSignedIn: false })
  }

  render() {
    return (
      <div className="nav-view">
        <div className="container">
          <a className="nav-left" href="/">CourseGrab</a>
          <a className="nav-right" onClick={ () => this.state.isSignedIn ? this.signOut() : this.openSigninPopup() }> {this.state.isSignedIn ? "Sign Out" : "Sign In"}</a>
        </div>
      </div>
    )
  }
}

export default Navigator;
