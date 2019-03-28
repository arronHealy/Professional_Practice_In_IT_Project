import React, { Component } from "react";

import isEmpty from "../../validation/is-empty";

class ProfileBookItem extends Component {
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
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Condition: {book.condition}</p>
            <p>Description: {book.description}</p>
            <p>Price: &euro;{book.price}</p>
            <button type="button" className="btn btn-success">
              Add Book To Your Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileBookItem;
