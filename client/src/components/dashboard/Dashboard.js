import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../../utilities/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Books from "./Books";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let content;

    if (profile === null || loading) {
      content = <Spinner />;
    } else {
      //check if logged in user has profile

      //check profile has data
      if (Object.keys(profile).length > 0) {
        content = (
          <div>
            <p className="lead text-muted">
              Welcome{" "}
              <Link to={`/profile/${profile.username}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Books books={profile.books} />
            <div style={{ marginBottom: "70px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        //user is logged in but no profile
        content = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info!</p>
            <Link className="btn btn-lg btn-success" to="/create-profile">
              Create your Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="col-md-12">
        <h1 className="display-4">Dashboard</h1>
        {content}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
