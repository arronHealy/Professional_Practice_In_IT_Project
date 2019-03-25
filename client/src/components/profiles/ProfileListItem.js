import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileListItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              src={
                isEmpty(profile.profileImage)
                  ? require("../../images/noProfilePic.jpg")
                  : profile.profileImage
              }
              alt=""
              className="rounded-circle"
              height="150"
              width="10"
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {isEmpty(profile.location) ? (
                "No Location info to Display"
              ) : (
                <span>{profile.location}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.bio) ? (
                "No Bio info to Display"
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <Link
              className="btn btn-success"
              to={"/profile/" + profile.username}
            >
              View Sellers Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ProfileListItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileListItem;
