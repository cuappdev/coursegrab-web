import React from 'react'

import './Navigator.css'
// import firebase from "firebase/app"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase/init';

import SearchView from '../Search/SearchView'

import { ReactComponent as CourseGrabLogo } from '../../Bell.svg';
import { initializeSession } from '../../utils/requests';
import { User, SessionAuthorization } from '../../types'

// const googleAuth = async () => {

//   await signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {
//     const credential = GoogleAuthProvider.credentialFromResult(res);
//     const token = credential?.idToken;
//     // const accessToken = credential?.accessToken;
//     const user = res.user;
//     const displayName = (user.displayName || '').split(' ');
//     let givenName, familyName;
//     if (displayName.length > 1) {
//       givenName = displayName[0];
//       familyName = displayName[1];
//     } else {
//       givenName = displayName[0];
//       familyName = '';
//     }
//     // const profile = user.profile as Record<string, string>
//     const session = await initializeSession(token!, givenName, familyName) as SessionAuthorization
//     const loggedInUser: User = {
//       email: user.email || '',
//       name: user.displayName || '',
//       id: token || '',
//       sessionAuthorization: session,
//     }
//     localStorage.setItem('user', JSON.stringify(loggedInUser));
//     localStorage.setItem('googleToken', token);
//     console.log(token);
//     this.setState({ isSignedIn: true });

//     window.location.reload();
//   }).catch(error => {
//     console.log(error);
//   })

// }

// var provider = new firebase.auth.GoogleAuthProvider()

class Navigator extends React.Component {

  state = {
    isSignedIn: !!localStorage.getItem('user')
  }

  openSigninPopup = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.idToken as string;
        // const user = result.additionalUserInfo as firebase.auth.AdditionalUserInfo
        const user = result.user;
        const displayName = (user.displayName || '').split(' ');
        let givenName, familyName;
        if (displayName.length > 1) {
          givenName = displayName[0];
          familyName = displayName[1];
        } else {
          givenName = displayName[0];
          familyName = '';
        }
        console.log("1: got token");
        const session = await initializeSession(token, givenName, familyName) as SessionAuthorization
        const loggedInUser: User = {
          email: user.email || '',
          name: user.displayName || '',
          id: token,
          sessionAuthorization: session,
        }
        console.log("2: got user");
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        localStorage.setItem('googleToken', token);
        this.setState({ isSignedIn: true })
        // refresh page so other components are updated
        console.log("3: about to reload ");
        window.location.reload()
      })
      .catch(error => {
        console.log(error);
      })
  }

  signOut = () => {
    auth.signOut()
    localStorage.removeItem('user')
    localStorage.removeItem('googleToken')
    this.setState({ isSignedIn: false })
    // refresh page so other components are updated
    window.location.reload()
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
            <a href="#" onClick={() => this.state.isSignedIn ? this.signOut() : this.openSigninPopup()}> {this.state.isSignedIn ? "Sign Out" : "Sign In"}</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Navigator;
