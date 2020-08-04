import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";
//StripeCheckout is a third party component
class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        token={(token) => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
// connect(null, actions)(Payments); => no mapStateToProps, second argument is action_creators
//  <button className="btn">Add Credits</button> custom button => origin just <StripeCheckout/>
//amount={500} means 500 cents
//token={(token) => (token)=> means call back func once we receive a token(charge) from stripe, it will call the {token} func
//token return authorize object, it contains charge id, then we use this id to tell stripe to charge this person
//crdit card number: 4242 4242 4242 4242, 10/20, 123
