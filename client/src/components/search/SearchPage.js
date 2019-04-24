import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../../utilities/Spinner";
import Searchedbooks from "./searchedBooks";

class searchPage extends Component {
  componentDidMount() {}

  render() {
    const { loading, books } = this.props.profile;
    let bookItems;

    if (books === null || loading) {
      return <Spinner />;
    } else {
      if (books.length > 0) {
        bookItems = books.map(books =>
          books.map(book => <Searchedbooks key={book._id} book={book} />)
        );
      } else {
        return (
          <div className="col-md-12">
            <h1 className="display-4 text-center">Your search</h1>
            <p className="lead text-center">
              Browse and Connect with Sellers to find your Favorite Book
            </p>
            <h4 className="my-4 ">No Books found!</h4>
          </div>
        );
      }
    }

    return (
      <div className="col-md-12">
        <h1 className="display-4 text-center">Your search</h1>
        <p className="lead text-center">
          Browse and Connect with Sellers to find your Favorite Book
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Book Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Condition</th>
              <th>Price</th>
              <th />
            </tr>
            {bookItems}
          </thead>
        </table>
      </div>
    );
  }
}

searchPage.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  null
)(searchPage);
