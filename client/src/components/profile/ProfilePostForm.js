import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { addProfilePost } from "../../actions/profileActions";

class ProfilePostForm extends Component {
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

    const { username } = this.props;

    const newPost = {
      post: this.state.post,
      name: user.name
    };

    this.props.addProfilePost(username, newPost);
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
          <div className="card-header bg-success text-white">
            Review this seller or Post a question...
          </div>

          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <textarea
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.post
                  })}
                  placeholder="Write a post to this users profile"
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

ProfilePostForm.propTypes = {
  addProfilePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProfilePost }
)(ProfilePostForm);
