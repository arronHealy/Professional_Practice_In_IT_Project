import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classnames from "classnames";
import { sellBook } from "../../actions/profileActions";

class SellBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookImage: "../../images/book.jpg",
            title: '',
            author: '',
            genre: '',
            condition: '',
            price: '',
            description: '',
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
    
    const book = {
        title: this.state.title,
        author: this.state.author,
        genre: this.state.genre,
        condition: this.state.condition,
        price: this.state.price,
        description: this.state.description
      };
  
      this.props.sellBook(book, this.props.details);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { errors } = this.state;
    return (
        <div className="sell-book">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Back
              </Link>
              <h1 className="display-4 text-center">Add Book</h1>
              <small className="d-block pb-3">* required fields</small>
              <form noValidate onSubmit={this.onSubmit}>

              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {"is-invalid": errors.Title})}
                  placeholder="* Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                />
                {errors.title && (<div className="invalid-feedback">{errors.title}</div>)}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {"is-invalid": errors.Author})}
                  placeholder="* Author"
                  name="author"
                  value={this.state.author}
                  onChange={this.onChange}
                />
                {errors.title && (<div className="invalid-feedback">{errors.author}</div>)}
              </div>

              <div className="form-group">
                <input
                   type="text"
                   className="form-control form-control-lg"
                   placeholder="Genre"
                   name="genre"
                   value={this.state.genre}
                   onChange={this.onChange}
                /></div>

              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {"is-invalid": errors.Condition})}
                  placeholder="* Condition"
                  name="condition"
                  value={this.state.condition}
                  onChange={this.onChange}
                />
                {errors.title && (<div className="invalid-feedback">{errors.condition}</div>)}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {"is-invalid": errors.Price})}
                  placeholder="* Price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                />
                {errors.title && (<div className="invalid-feedback">{errors.price}</div>)}
              </div>

              <div className="form-group">
                <textarea
                   type="text"
                   className="form-control form-control-lg"
                   placeholder="About the Book"
                   name="description"
                   value={this.state.description}
                   onChange={this.onChange}
                /></div>

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SellBook.propTypes ={
    sellBook: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { sellBook })(withRouter(SellBook));
