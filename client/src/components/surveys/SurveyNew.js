// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

//每個component tag 都可以當作一個model instance, 技巧: 利用func傳參來跨components改變 props 的變數
class SurveyNew extends Component {
  state = { showFormReview: false }; //react babel fashon to initiate a state,
  //if in plain javascript we need to use super(props)
  // like constructor(props){super(props); this.state = {new: true}};
  // onCancel={helper callback func}
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })} //this.setState: setter
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
//reduxForm default: if the form component isn't mounted on the window, form value will be deleted automately
//use this to unset surveyForm value once SurveyNew component is unmounted,
//overwrite the reduxForm setting. trick!! deal with destroyOnUnmount: false in surveyForm component

//SurvelNew component is directed rendered by react router, react router put a lot of props in it,
//so, it can still use features of react router, but SurveyForm and SurveyFormReview can't, therefore use withRouter
