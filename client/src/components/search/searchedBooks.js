import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import { connect } from "react-redux";
import { addToCart } from "../../actions/profileActions";

class Searchedbooks extends Component {
  addToCart(ids) {
    this.props.addToCart(ids.book._id);
  }
  render() {
    const { book } = this.props;

    return (
      <tr>
        <td>
          <div className="w-50 h-50">
            <img
              src={
                isEmpty(book.bookImage)
                  ? require("../../images/noBookImage.jpg")
                  : book.bookImage
              }
              alt=""
            />
          </div>
        </td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.genre}</td>
        <td>{book.condition}</td>
        <td>&euro;{book.price}</td>
        <td>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.addToCart.bind(this, { book })}
          >
            Add Book To Your Cart
          </button>
        </td>
      </tr>
    );
  }
}

Searchedbooks.propTypes = {
  addToCart: PropTypes.func.isRequired
};

export default connect(
  null,
  { addToCart }
)(Searchedbooks);
