import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentsFeed extends Component {
  render() {
    const { comments, postId, profileId } = this.props;

    return comments.map(comment => (
      <CommentItem
        key={comment._id}
        comment={comment}
        postId={postId}
        profileId={profileId}
      />
    ));
  }
}

CommentsFeed.propTypes = {
  profileId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired
};

export default CommentsFeed;
