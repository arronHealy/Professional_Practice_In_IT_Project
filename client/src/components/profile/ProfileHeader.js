import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-success text-white m-3">
            <div className="row">
              <div className="col-2 text-center">
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

                <p className="mt-2">
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

              <div className="col-lg-6 col-md-4 col-8">
                <br />
                <br />
                <h5 className="display-4">{profile.user.name}</h5>
                {isEmpty(profile.location) ? (
                  "No Location listed"
                ) : (
                  <h3>Location: {profile.location}</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
