import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      website: "",
      location: "",
      bio: "",
      facebook: "",
      twitter: "",
      youtube: "",
      linkedin: "",
      errors: {},
      profileImage: null
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";

      profile.socialLinks = !isEmpty(profile.socialLinks)
        ? profile.socialLinks
        : {};

      profile.twitter = !isEmpty(profile.socialLinks.twitter)
        ? profile.socialLinks.twitter
        : "";

      profile.facebook = !isEmpty(profile.socialLinks.facebook)
        ? profile.socialLinks.facebook
        : "";

      profile.youtube = !isEmpty(profile.socialLinks.youtube)
        ? profile.socialLinks.youtube
        : "";

      profile.linkedin = !isEmpty(profile.socialLinks.linkedin)
        ? profile.socialLinks.linkedin
        : "";

      // set component field state
      this.setState({
        username: profile.username,
        profileImage: profile.profileImage,
        website: profile.website,
        location: profile.location,
        bio: profile.bio,
        facebook: profile.facebook,
        twitter: profile.twitter,
        youtube: profile.youtube,
        linkedin: profile.linkedin
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    //console.log("submit");
    const profileData = {
      username: this.state.username,
      profileImage: this.state.profileImage,
      website: this.state.website,
      location: this.state.location,
      bio: this.state.bio,
      facebook: this.state.facebook,
      twitter: this.state.twitter,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeFile(e) {
    this.setState({profileImage:e.target.files[0]})
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Profile</h1>
            <form noValidate onSubmit={this.onSubmit}>
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
                  Fill in your Bio to tell your customers about yourself and
                  your products
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Upload your Avatar</label>
                <input type="file"   className="form-control-file" id="exampleFormControlFile1" name="profileImage" onChange= {this.onChangeFile} />
              </div>

              <div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fab fa-facebook" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.facebook
                    })}
                    placeholder="Enter Facebook URL"
                    name="facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                  />
                  {errors.facebook && (
                    <div className="invalid-feedback">{errors.facebook}</div>
                  )}
                </div>
              </div>

              <div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fab fa-twitter" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.twitter
                    })}
                    placeholder="Enter Twitter URL"
                    name="twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                  />
                  {errors.twitter && (
                    <div className="invalid-feedback">{errors.twitter}</div>
                  )}
                </div>
              </div>

              <div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fab fa-linkedin" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.linkedin
                    })}
                    placeholder="Enter LinkedIn URL"
                    name="linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                  />
                  {errors.linkedin && (
                    <div className="invalid-feedback">{errors.linkedin}</div>
                  )}
                </div>
              </div>

              <div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fab fa-youtube" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.youtube
                    })}
                    placeholder="Enter Youtube URL"
                    name="youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                  />
                  {errors.youtube && (
                    <div className="invalid-feedback">{errors.youtube}</div>
                  )}
                </div>
              </div>

              <input
                type="submit"
                value="Submit"
                className="btn btn-success btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
