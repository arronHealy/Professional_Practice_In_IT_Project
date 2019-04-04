import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";
import isEmpty from "../../validation/is-empty";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    //pull comment, postid and auth state from passed in props
    const { comment, postId, auth } = this.props;

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
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
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
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
