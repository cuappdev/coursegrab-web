import React from 'react'

import './Navigator.css'
import firebase from "firebase/app"
import "firebase/auth"

import SearchView from '../Search/SearchView'

import { ReactComponent as CourseGrabLogo } from '../../Bell.svg';
import { hostUrl, firebaseConfig } from '../../utils/constants'
import { initializeSession } from '../../utils/requests';
import { User } from '../../types'

firebase.initializeApp(firebaseConfig)
var provider = new firebase.auth.GoogleAuthProvider()

class Navigator extends React.Component {

  state = {
    isSignedIn: false
  }

  openSigninPopup = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async result => {
        var credential = result.credential as firebase.auth.OAuthCredential
        var token = credential.accessToken
        var user = result.user
        // TODO: Initialize user session
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
