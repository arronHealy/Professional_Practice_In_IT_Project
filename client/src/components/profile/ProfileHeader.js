import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-12">
          <div className="card card-body bg-success text-white mb-3">
            <div className="row">
              <div className="col-2 col-md-3 m-auto">
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
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              {isEmpty(profile.location) ? (
                "No Location listed"
              ) : (
                <p>Location: {profile.location}</p>
              )}

              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(
                  profile.socialLinks && profile.socialLinks.twitter
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(
                  profile.socialLinks && profile.socialLinks.facebook
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(
                  profile.socialLinks && profile.socialLinks.linkedin
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(
                  profile.socialLinks && profile.socialLinks.youtube
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
