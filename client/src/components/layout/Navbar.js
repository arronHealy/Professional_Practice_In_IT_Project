import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
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

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>

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

export default Navbar;
