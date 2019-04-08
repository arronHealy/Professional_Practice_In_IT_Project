import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = profile => {
  //const { profile } = this.props;

  return (
    <div className="btn-group mb-4" role="group">
      <Link to={`/profile/${profile.username}`} className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> My Profile
      </Link>
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/list-book" className="btn btn-light">
        <i className="fa fa-book text-info mr-1" /> List Book
      </Link>
    </div>
  );
};

export default ProfileActions;
