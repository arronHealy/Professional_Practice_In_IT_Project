import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    const firstName = profile.user.name.trim().split(" ")[0];

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-success">{firstName}'s Details</h3>

            <div className="lead">
              {isEmpty(profile.location) ? (
                "No Location listed"
              ) : (
                <div>
                  <h3 className="text-success">Location: </h3>
                  <span>{profile.location}</span>
                </div>
              )}
            </div>

            <br />

            <h3 className="text-success">Social Links:</h3>
            <div className="mt-2">
              {isEmpty(profile.website) ? null : (
                <a
                  className="text-dark p-2"
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
                  className="text-dark p-2"
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
                  className="text-dark p-2"
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
                  className="text-dark p-2"
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
                  className="text-dark p-2"
                  href={profile.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube fa-2x" />
                </a>
              )}
            </div>

            <br />

            <div className="lead">
              {isEmpty(profile.bio) ? (
                <span>{firstName} does not have a Bio</span>
              ) : (
                <div>
                  <h3 className="text-success">Bio:</h3>
                  <span>{profile.bio}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
