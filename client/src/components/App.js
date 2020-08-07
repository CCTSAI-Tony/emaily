import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux"; // used for connecting app component with redux store, so it can call actions creator via redux
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

//change App to class based component so it can handle life circle methods
class App extends Component {
  componentDidMount() {
    //only want to implent it at the beginning once
    this.props.fetchUser(); //fetchUser => action creator => thanks to reduxThunk to use async way
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          {/* BrowserRouter only accepts one child component one div block */}
          <div>
            <Header />
            {/* use exact path not path, use path will overlap components appear on the screen */}
            {/* exact equals exact = {true} jsx syntax */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
// BrowserRouter => react router configuration => deal with  http request via react.app router => not refresh the page just navigate pages inside
//import actions means assign actions as props in app component
