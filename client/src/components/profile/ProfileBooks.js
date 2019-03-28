import React, { Component } from "react";

import ProfileBookItem from "./ProfileBookItem";

class ProfileBooks extends Component {
  render() {
    const { profile } = this.props;

    const firstName = profile.user.name.trim().split(" ")[0];

    let books;

    if (profile.books.length > 0) {
      books = profile.books.map((book, index) => (
        <ProfileBookItem key={index} book={book} />
      ));
    } else {
      books = <h4>{firstName} has no Books listed for sale</h4>;
    }

    return (
      <div className="card card-body bg-light mb-3">
        <h3 className="text-center text-success">{firstName}'s Book's</h3>
        {books}
      </div>
    );
  }
}

export default ProfileBooks;
