import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

//直接繼承Component的 constructor
//row 22, return [] => array of elements => use in Payments => cause in the render() it will be contained within <ul >
//set keys for elements, can use random number cause the array doesn't will change over time
//this.props.auth => represemts user model information
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="3" style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
//link tag: navigate to different route rendered by react router vs a tag: navigate to completely different html document
//to={this.props.auth ? "/surveys" : "/"} => true to "/surveys", false to "/" ex: 0?5:100 => 100 javascript syntax
//inject javascript inside jsx need {} wrapper
//origin
// function mapStateToProps(state) {
//   // import store state
//   return { auth: state.auth }; key and value is the same
// }

function mapStateToProps({ auth }) {
  //destructuring: same name => {auth: auth} => {auth}
  // import store state
  return { auth };
}

export default connect(mapStateToProps)(Header);
