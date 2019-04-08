import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfilePostItem from "./ProfilePostItem";

class ProfilePostFeed extends Component {
  render() {
    const { posts, profileId } = this.props;

    return posts.map(post => (
      <ProfilePostItem key={post._id} post={post} profileId={profileId} />
    ));
  }
}

ProfilePostFeed.propTypes = {
  //profile: PropTypes.object.isRequired
  posts: PropTypes.array.isRequired
};

export default ProfilePostFeed;
