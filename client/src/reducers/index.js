import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form"; //es2015, { reducer as reduxForm }
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

// these keys is state object mainted by redux
export default combineReducers({
  //store state key
  auth: authReducer, //auth piece of state is produced by authReducer
  form: reduxForm, //reduxForm help to build it's redux route by its own like: action creators and reducers and connect to component props
  surveys: surveysReducer,
});
//build index.js here is to allow us to export reducers directly, so import reducers package will link to this file
