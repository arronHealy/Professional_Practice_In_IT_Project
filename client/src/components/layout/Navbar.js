import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";
import { clearCurrentProfile } from "../../actions/profileActions";
import { search } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const search = {
      text: this.state.search
    };

    // calling search action
    this.props.search(search);
    this.props.history.push("/search");
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const cart = this.props.cart;

    // links shown when logged in
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/cart">
            <div>
              <i className="fas fa-shopping-cart mr-2 h-25 w-25" />
              <span className="num-books bg-success ml-1">{cart.length}</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/All-books">
            Books
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a
            href="#0"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    // links shown when not logged in
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-warning mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Book-King
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Book Dealer Profiles
                </Link>
              </li>
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/posts">
                    Buyers Feed
                  </Link>
                </li>
              ) : null}
            </ul>

            {isAuthenticated ? authLinks : guestLinks}

            <form className="form-inline" onSubmit={this.onSubmit}>
              <input
                className="form-control mr-sm-2 ml-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="search"
                onChange={this.onChange}
              />
              <button className="btn btn-success my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

// prop types
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// mapped state to prop and set auth to prop
const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.profile.cart
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, search }
)(withRouter(Navbar));
