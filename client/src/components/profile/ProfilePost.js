import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../utilities/Spinner";
import { Link } from "react-router-dom";
import { getProfilePost } from "../../actions/profileActions";

import PostItem from "./PostItem";
import CommentsForm from "./CommentsForm";

class ProfilePost extends Component {
  componentDidMount() {
    const { profile } = this.props.profile;

    this.props.getProfilePost(profile._id, this.props.match.params.id);
  }

  render() {
    const { post, loading, profile } = this.props.profile;

    let content;

    if (post === null || loading || Object.keys(post).length === 0) {
      content = <Spinner />;
    } else {
      content = (
        <div>
          <PostItem profileId={profile._id} post={post} showActions={false} />
          <CommentsForm postId={post._id} />
          {/*<CommentsFeed postId={post._id} comments={post.comments} />
           */}
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/*}
            <Link
              to={"/profile/" + profile.username}
              className="btn btn-dark mb-3"
            >
              Back to Profile
            </Link>
    */}
            {content}
          </div>
        </div>
      </div>
    );
  }
}

ProfilePost.propTypes = {
  getProfilePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfilePost }
)(ProfilePost);
