import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    // links shown when logged in
    const authLinks = (
      <ul className="navbar-nav ml-auto">
       <li className="nav-item">
          <a href='#' onClick={this.onLogoutClick.bind(this)} className="nav-link">{' '} Logout</a>
        </li>
      </ul>
    );

    // links shown when not logged in
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-warning mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Book-King</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Books
                </Link>
              </li>
            </ul>
            { isAuthenticated ? authLinks : guestLinks }
            <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

  
    )
  }
}

// prop types
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// mapped state to prop and set auth to prop
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
