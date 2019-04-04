import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../utilities/Spinner";
import { getPost } from "../../actions/postActions";
import PostItem from "./PostItem";
import CommentsForm from "./CommentsForm";
import CommentsFeed from "./CommentsFeed";
import { Link } from "react-router-dom";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;

    let content;

    if (post === null || loading || Object.keys(post).length === 0) {
      content = <Spinner />;
    } else {
      content = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentsForm postId={post._id} />
          <CommentsFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/posts" className="btn btn-dark mb-3">
              Back to Buyers Feed
            </Link>
            {content}
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
