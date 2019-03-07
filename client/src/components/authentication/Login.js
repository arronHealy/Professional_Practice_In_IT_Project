import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';
import classnames from 'classnames';


// login constructor
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // redirects user to dashboard if logged in and trying to access login or resister pages
    componentDidMount() {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
      }
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
      }

      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        //console.log(user);

        // calling login action
        this.props.loginUser(userData);
    }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={ this.onSubmit }>
                <div className="form-group">
                  <input type="email" className={ classnames("form-control form-control-lg", { "is-invalid": errors.email }) } placeholder="Email Address" name="email" value = { this.state.email } onChange = {this.onChange } />
                  { errors.email && (<div className="invalid-feedback">{ errors.email }</div>)}
                </div>
                <div className="form-group">
                  <input type="password" className={ classnames("form-control form-control-lg", { "is-invalid": errors.password }) } placeholder="Password" name="password" value = { this.state.password } onChange = {this.onChange } />
                  { errors.password && (<div className="invalid-feedback">{ errors.password }</div>)}
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

// prop types
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// mapped state to prop and set auth to prop
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
