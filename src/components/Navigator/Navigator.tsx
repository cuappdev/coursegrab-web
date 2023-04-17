import React from "react";

import "./Navigator.css";
// import firebase from "firebase/app"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/init";

import SearchView from "../Search/SearchView";

import { ReactComponent as CourseGrabLogo } from "../../Bell.svg";
import { initializeSession } from "../../utils/requests";
import { User, SessionAuthorization } from "../../types";

class Navigator extends React.Component {
  state = {
    isSignedIn: !!localStorage.getItem("user"),
  };

  openSigninPopup = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.idToken as string;
        const user = result.user;
        const displayName = (user.displayName || "").split(" ");
        let givenName, familyName;
        if (displayName.length > 1) {
          givenName = displayName[0];
          familyName = displayName[1];
        } else {
          givenName = displayName[0];
          familyName = "";
        }
        const session = (await initializeSession(
          token,
          givenName,
          familyName
        )) as SessionAuthorization;
        const loggedInUser: User = {
          email: user.email || "",
          name: user.displayName || "",
          id: token,
          sessionAuthorization: session,
        };
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("googleToken", token);
        this.setState({ isSignedIn: true });
        // refresh page so other components are updated
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  signOut = () => {
    auth.signOut();
    localStorage.removeItem("user");
    localStorage.removeItem("googleToken");
    this.setState({ isSignedIn: false });
    // refresh page so other components are updated
    window.location.reload();
  };

  render() {
    return (
      <div className="nav-view">
        <div className="container">
          <div className="nav-left">
            <CourseGrabLogo />
            <a className="coursegrab-text" href="/">
              CourseGrab
            </a>
            <SearchView />
          </div>
          <div className="nav-right">
            <button
              className="sign-in-out-button"
              onClick={() =>
                this.state.isSignedIn ? this.signOut() : this.openSigninPopup()
              }
            >
              {" "}
              {this.state.isSignedIn ? "Sign Out" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigator;
