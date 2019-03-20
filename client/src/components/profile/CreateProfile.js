import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      profileImage: "../../images/noProfilePic.jpg",
      website: "",
      location: "",
      bio: "",
      socialDisplay: false,
      facebook: "",
      twitter: "",
      youtube: "",
      linkedin: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    console.log("submit");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="col-md-8 m-auto">
        <h1 className="display-4 text-center">Create your Profile</h1>
        <p className="lead text-center">
          Let's get some info to build your profile
        </p>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.username
              })}
              placeholder="Enter your Username"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.website
              })}
              placeholder="Enter your Website"
              name="website"
              value={this.state.website}
              onChange={this.onChange}
            />
            {errors.website && (
              <div className="invalid-feedback">{errors.website}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your Location"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your Bio"
              name="bio"
              value={this.state.bio}
              onChange={this.onChange}
            />
            <small className="d-block pb-3">
              Fill in your Bio to tell your customers about yourself and your
              products
            </small>
          </div>
          <input type="submit" className="btn btn-success btn-block mt-4" />
        </form>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
