import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { createProfile } from "../../actions/profileActions";

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
            <h1 className="display-4 text-center">Create your Profile</h1>
            <p className="lead text-center">
              Let's get some info to build your profile
            </p>
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
                <label forhtml="exampleFormControlFile2">Upload your avatar</label>
                <input type="file" className="form-control-file" id="exampleFormControlFile2" name="profileImage" onChange= {this.onChangeFile} />
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
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
