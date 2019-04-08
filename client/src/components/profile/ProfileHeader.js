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
              </div>

              <div className="col-lg-6 col-md-4 col-8">
                <br />
                <br />
                <h5 className="display-4">{profile.user.name}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
