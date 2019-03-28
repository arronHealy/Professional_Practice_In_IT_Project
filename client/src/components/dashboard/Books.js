import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteBook } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class Books extends Component {
  onDeleteClick(id) {
    this.props.deleteBook(id);
  }

  render() {
    const books = this.props.books.map(book => (
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
        <td>{book.price}</td>
        <td>{book.description}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, book._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Book List</h4>
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

Books.propTypes = {
  deleteBook: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBook }
)(Books);
