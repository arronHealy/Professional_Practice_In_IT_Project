import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

import { deletePost } from "../../actions/postActions";

class PostItem extends Component {
  onDeleteClick(id) {
    //console.log(id);
    this.props.deletePost(id);
  }

  render() {
    const { post, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <img
              src={
                isEmpty(post.postImage)
                  ? require("../../images/noProfilePic.jpg")
                  : post.postImage
              }
              alt=""
              className="rounded-circle"
            />
            <br />
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.post}</p>
            <Link to={"/post/" + post._id} className="btn btn-success mr-1">
              Comments
            </Link>
            {post.user === auth.user.id ? (
              <button
                className="btn btn-danger mr-1"
                type="button"
                onClick={this.onDeleteClick.bind(this, post._id)}
              >
                Delete Post
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost }
)(PostItem);
