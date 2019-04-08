import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfilePosts } from "../../actions/profileActions";
import ProfilePostForm from "./ProfilePostForm";
import ProfilePostFeed from "./ProfilePostFeed";

class ProfilePosts extends Component {
  componentDidMount() {
    //const { username } = this.props;
    //this.props.getProfilePosts(username);
  }

  render() {
    const { profile } = this.props.profile;

    const { username } = this.props;

    const firstName = profile.user.name.trim().split(" ")[0];

    let reviews;

    if (profile.reviews.length > 0) {
      reviews = <ProfilePostFeed posts={profile.reviews} />;
    } else {
      reviews = <h4>{firstName} has no Reviews yet</h4>;
    }

    return (
      <div className="card card-body bg-light mb-3">
        <h3 className="text-center text-success">{firstName}'s Reviews</h3>
        <ProfilePostForm username={username} />
        {reviews}
      </div>
    );
  }
}

ProfilePosts.propTypes = {
  //getProfilePosts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {}
)(ProfilePosts);
