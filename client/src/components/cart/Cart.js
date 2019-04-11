import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
import PropTypes from "prop-types";

import { getCart ,removeFromCart} from "../../actions/profileActions";

class Cart extends Component {
    
    componentDidMount() {
        this.props.getCart();
      }

      removeFromCart(ids) {
        this.props.removeFromCart(ids.book._id);
      }
 
  render() {
 
    const cart=this.props.cart;
    let totalPrice =0;

    // loops through items and add up the price
    for(var i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price;
    }

    const books= cart.map(book => (
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
        <td>{book.genre}</td>
        <td>&euro;{ book.price}</td>
        <td>
        <button type="button" className="btn btn-success" onClick={this.removeFromCart.bind(this, {book})}>Remove Item</button>
        </td>
        </tr>
    ));

    return (
        <div className="col-md-12">
            <h1 className="display-4 text-center">Your Cart</h1>

            <div>
                <table className="table">
                <thead>
                    <tr>
                    <th>Book Image</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Price</th>
                    <th />
                    </tr>
                    {books}
                </thead>
                </table>

                <div className="row">
                    <div  className="col-6">
                    <h4> Total Price </h4>
                    </div>
                    <div  className="col-6">
                        <span>  {totalPrice} </span>
                    </div>
                </div>
            </div>
        </div>

        )
    }
    }

Cart.propTypes = {
    getCart: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = state => ({
    cart: state.profile.cart
});
  
export default connect(
    mapStateToProps,
     {  getCart,removeFromCart }
)(Cart);
