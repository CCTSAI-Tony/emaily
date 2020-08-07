import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    //once the component is mounted, it call fetchSurveys action
    this.props.fetchSurveys();
  }
  //materalizecss card component
  //list of items => put key
  //new Date(survey.dateSent).toLocaleDateString() retrurn nice looking format, cause mongodb survey.dateSent is a pure string
  //.reverse() order => newer > older
  renderSurveys() {
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys }; //from redux store
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
