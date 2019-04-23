import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import { addToCart } from "../../actions/profileActions";
import { connect } from "react-redux";

class BookItem extends Component {
  addToCart(ids) {
    this.props.addToCart(ids.book._id,ids.profile._id);
  }
  render() {
    const { profile } = this.props;

    const books = profile.books.map(book => (
      <tr key={book._id}>
        <td>
          <img
            src={
              isEmpty(book.bookImage)
                ? require("../../images/noBookImage.jpg")
                : book.bookImage
            }
            alt=""
            height="100"
            width="5"
          />
        </td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.genre}</td>
        <td>{book.condition}</td>
        <td>&euro;{book.price}</td>
        <td>{book.description}</td>
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
    ));
    return (
      <div>
        <h4 className="mb-4"> {profile.username} Books </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Book Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Condition</th>
              <th>Price</th>
              <th>Description</th>
              <th />
            </tr>
            {books}
          </thead>
        </table>
      </div>
    );
  }
}

BookItem.propTypes = {
  addToCart: PropTypes.func.isRequired
};

export default connect(
  null,  { addToCart }
)(BookItem);



  