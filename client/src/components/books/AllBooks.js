import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../../utilities/Spinner";
import BookItem from "./BookItem";

import { getProfiles } from "../../actions/profileActions";

class AllBooks extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;

    let bookItems;

    if (profiles === null || loading) {
      bookItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        bookItems = profiles.map(profile => (
          <BookItem key={profile._id} profile={profile} />
        ));
      } else {
        bookItems = <h4>No Books found!</h4>;
      }
    }

    return (
      <div className="col-md-12">
        <h1 className="display-4 text-center">All Books for Sale</h1>
        <p className="lead text-center">
          Browse and Connect with Sellers to find your Favorite Book
        </p>
        {bookItems}
      </div>
    );
  }
}

AllBooks.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(AllBooks);
