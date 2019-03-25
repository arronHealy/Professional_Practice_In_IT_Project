import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../../utilities/Spinner";

import { getProfiles } from "../../actions/profileActions";

import ProfileListItem from "./ProfileListItem";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;

    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileListItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found!</h4>;
      }
    }

    return (
      <div className="col-md-12">
        <h1 className="display-4 text-center">Registered Sellers Profiles</h1>
        <p className="lead text-center">
          Browse and Connect with Sellers to find your favorite Books.
        </p>
        {profileItems}
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
