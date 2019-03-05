import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';

// registration construcor
class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser);
        //console.log(newUser);
    }

  render() {
    return (
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Register</h1>
                <p className="lead text-center">Create your Book-King account</p>
                <form onSubmit={ this.onSubmit }>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Name" name="name" value = { this.state.name } onChange = { this.onChange } />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value = { this.state.email } onChange = { this.onChange } />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value = { this.state.password } onChange = { this.onChange } />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2" value = { this.state.password2 } onChange = { this.onChange } />
                  </div>
                  <input type="submit" className="btn btn-success btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default connect(null, { registerUser })(Register);
