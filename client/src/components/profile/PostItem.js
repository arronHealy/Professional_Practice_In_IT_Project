import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import isEmpty from "../../validation/is-empty";

class PostItem extends Component {
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
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PostItem);
