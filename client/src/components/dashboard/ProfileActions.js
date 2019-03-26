import React from 'react'
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
            <Link to="/edit-profile" className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
            <Link to="/list-book" className="btn btn-light">
              <i className="fa fa-book text-info mr-1"></i> List Book</Link>
          </div>
  )
}

export default ProfileActions;
