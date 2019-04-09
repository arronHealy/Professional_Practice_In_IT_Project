import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProfileComment } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CommentItem extends Component {
  onDeleteClick(profileId, postId, commentId) {
    this.props.deleteProfileComment(profileId, postId, commentId);
  }

  render() {
    //pull comment, postid and auth state from passed in props
    const { comment, postId, auth, profileId } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            {/*check if post has an image*/}
            <img
              src={
                isEmpty(comment.postImage)
                  ? require("../../images/noProfilePic.jpg")
                  : comment.postImage
              }
              alt=""
              className="rounded-circle"
            />
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.post}</p>
            {comment.user === auth.user.id ? (
              <button
                className="btn btn-danger mr-1"
                type="button"
                onClick={this.onDeleteClick.bind(
                  this,
                  profileId,
                  postId,
                  comment._id
                )}
              >
                Delete Comment
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteProfileComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteProfileComment }
)(CommentItem);
