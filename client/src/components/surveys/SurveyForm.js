// SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form"; //use reduxForm to communicate with redux store, just like { connect } from "react-redux"
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";
// Field is a react component: render traditional html form elements in react platform
// Field name is to tell redux this is a form call {name} that contins some imformation, and redux will store this under a key call {name}
// Field type just say what type of input is
// Field component just to tell Field what kind of html form elements to render, can pass in react component
// <Field> custom props can pass in to component: SurveyField
class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      //lodash has a lot of helper func, one of these is map
      // _.map(iter, callback func)
      //iterate through different fields to use Field
      // in react, if we see a list of same items(components), we need to put key property for them to let react to recognize
      return (
        <Field
          key={name} //{} 是因為javascript syntax 在jsx 要{}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}
// this.props.onSurveySubmit => a callback func reference
//<form onSubmit = {}> is a location to put func that deal with submit
//once click, form will pass in output value to handleSubmit
//this.props.handleSubmit is a prop provided by reduxForm, which provided some props to this component just like connect
//handleSubmit(arrow func) deal with onSubmit will call arrow func once user click the submit, and the func's input van be form imput data
//form output value will be a key:value pair, key: name, value: form imput data
function validate(values) {
  //values => a object records all the values we put in the form
  //if errors props match one name field in SurveyForm, it will pass error.props down to specific SurveyField component vis Field tag
  const errors = {};

  errors.recipients = validateEmails(values.recipients || ""); //避免.split(undefined)報錯, 如果undefined return ""

  _.each(formFields, ({ name }) => {
    //using _.each not _.map cause we don't want to return an array
    //values[name] vs values.name => values[name] name 可以是string, values.name => name 不能直接是string, 這邊name 比較像變數名稱
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors; //if return erros object is empty, reduxform will see this form as valid
}

//wired up to redux store, reduxForm only has single argument
//reduxForm default: if the form component isn't mounted on the window, form value will be deleted automately
export default reduxForm({
  validate, //will automately ran anytime user attempt to submit the form, es6 validate : validate => validate
  form: "surveyForm", //tell reduxForm that the form key in store has a prop called surveyForm
  destroyOnUnmount: false, // set to false => once surveyForm isn't mounted, the value of surveyForm will not be deleted
})(SurveyForm);
//but when react get reload/redirect, the form value will unset automately
