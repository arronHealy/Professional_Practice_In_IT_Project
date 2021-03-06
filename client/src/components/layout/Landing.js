import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      
        <div className="landing">
    <div className="landing-inner text-dark">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="display-3 mb-4">Book-King
            </h1>
            <p className="lead"> Buy and Sell Books </p>
            <hr />
            <Link to="/register" className="btn btn-lg btn-success mr-2">Register</Link>
            <Link to="/login" className="btn btn-lg btn-light">Login</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
 



  
    )
  }
}
export default Landing;
