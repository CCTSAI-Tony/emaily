// SurveyFormReview shows users their form inputs for review
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

//SurveyFormReview is a arrow func
//formValues from mapStateToProps
//submitSurvey from connect actions to pull the prop
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  //destructuring
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values }; //set a property call formValues to stand for redux-store form key's subprop
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
//use withRouter helper to let SurveyFormReview to know react router, so it can navigate other page in this react app
// withRouter will add history object to the props, use it to redirect once click submit
