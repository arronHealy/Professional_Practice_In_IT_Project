import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { addToCart } from "../../actions/profileActions";

import isEmpty from "../../validation/is-empty";

class ProfileBookItem extends Component {
  addToCart(id) {
    this.props.addToCart(id);
  }

  render() {
    const { book } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              src={
                isEmpty(book.bookImage)
                  ? require("../../images/noBookImage.jpg")
                  : book.bookImage
              }
              alt=""
              height="150"
              width="200"
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <p className="lead">Title: {book.title}</p>
            <p className="lead">Author: {book.author}</p>
            <p className="lead">Genre: {book.genre}</p>
            <p className="lead">Condition: {book.condition}</p>
            <p className="lead">Description: {book.description}</p>
            <p className="lead">Price: &euro;{book.price}</p>
            <button
              type="button"
              className="btn btn-success"
              onClick={this.addToCart.bind(this, book._id)}
            >
              Add Book To Your Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ProfileBookItem.propTypes = {
  addToCart: PropTypes.func.isRequired
};

export default connect(
  null,
  { addToCart }
)(ProfileBookItem);
