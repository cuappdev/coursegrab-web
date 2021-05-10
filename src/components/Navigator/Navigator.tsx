import React from 'react'

import './Navigator.css'
import firebase from "firebase/app"
import "firebase/auth"

import SearchView from '../Search/SearchView'

import { ReactComponent as CourseGrabLogo } from '../../Bell.svg';
import { hostUrl, firebaseConfig } from '../../utils/constants'
import { initializeSession, setAuthHeader } from '../../utils/requests';
import { User, SessionAuthorization } from '../../types'

firebase.initializeApp(firebaseConfig)
var provider = new firebase.auth.GoogleAuthProvider()

class Navigator extends React.Component {

  state = {
    isSignedIn: !!localStorage.getItem('user')
  }

  openSigninPopup = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async result => {
        const credential = result.credential as firebase.auth.OAuthCredential
        const token = credential.idToken as string
        const user = result.additionalUserInfo as firebase.auth.AdditionalUserInfo
        const profile = user.profile as Record<string, string>
        const session = await initializeSession(token, profile.given_name, profile.family_name) as SessionAuthorization
        const loggedInUser : User = {
          email: profile.email,
          name: profile.name,
          id: token,
          sessionAuthorization: session,
        }
        setAuthHeader(session.sessionToken)
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
          <div className="nav-left" >
            <CourseGrabLogo />
            <a className="coursegrab-text" href="/">CourseGrab</a>
            <SearchView />
          </div>
          <div className="nav-right">
            <a onClick={() => this.state.isSignedIn ? this.signOut() : this.openSigninPopup()}> {this.state.isSignedIn ? "Sign Out" : "Sign In"}</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Navigator;
