import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

export default combineReducers({
  //store state key
  auth: authReducer, //auth piece of state is produced by authReducer
  form: reduxForm,
  surveys: surveysReducer,
});
//build index.js here is to allow us to export reducers directly, so import reducers package will link to this file
