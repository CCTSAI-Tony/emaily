// SurveyField contains logic to render a single
// label and text input
import React from "react";

//rendered by the field tag, reduxform has a ability to add on a whole big dump of props
//touched property in meta means uf user click in and click out the field, yes => true, no => false
//whan you first rendered the Surveyform it will also aotomately run valid func and pass error
//we just want to show error only after user touched the field => touched property == true
//once submit, all fields touched will became true
export default ({ input, label, meta: { error, touched } }) => {
  //meta: { error, touched } es6 nested destructuring
  //{touched && error} javascript syntax
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
// <input {...input} > == <input onBlur = input.onBlur, onChange = input.onChange.....>
//{...input} means all the keys and values in input object
//wiring up all the different event handlers for watch changes to this input
//這裡input 包含各種event listner, 可以攔截紀錄各種input data
// true && "ok" => "ok"
// false && "ok" => false
