import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authAction";

import PrivateRoute from "./utilities/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile/CreateProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";

import "./App.css";
import { clearCurrentProfile } from "./actions/profileActions";
import EditProfile from "./components/edit-profile/EditProfile";
import ListBook from "./components/list-book/ListBook";

import Posts from "./components/posts/Posts";

import Post from "./components/posts/Post";

// check for token
if (localStorage.jwtToken) {
  // set auth token header off
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearCurrentProfile());
    // re-direct to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:username" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/list-book" component={ListBook} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/posts" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
