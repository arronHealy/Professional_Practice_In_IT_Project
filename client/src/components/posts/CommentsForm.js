import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { addComment } from "../../actions/postActions";

class CommentsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    //console.log("submit");
    const { user } = this.props.auth;
    const { postId } = this.props;

    const newPost = {
      post: this.state.post,
      name: user.name
    };

    this.props.addComment(postId, newPost);
    this.setState({ post: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-success text-white">Add a comment</div>

          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <textarea
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.post
                  })}
                  placeholder="Comment on this post..."
                  name="post"
                  value={this.state.post}
                  onChange={this.onChange}
                />
                {errors.post && (
                  <div className="invalid-feedback">{errors.post}</div>
                )}
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentsForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentsForm);
