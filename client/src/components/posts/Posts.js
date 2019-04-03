import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../../utilities/Spinner";
import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;

    let content;

    if (posts === null || loading) {
      content = <Spinner />;
    } else {
      content = <PostFeed posts={posts} />;
    }
    return (
      <div className="posts">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
