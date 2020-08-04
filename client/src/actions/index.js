import axios from "axios"; //use this to make a ajax request
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token); //return updated user model

  dispatch({ type: FETCH_USER, payload: res.data });
};
//use post cause we send information to backend api

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/surveys", values);

  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

// communicate with it's own backend service, also in external domain though in the same server, use ajax
// Axios is a library that helps us make http requests to external resources
// What is difference between Axios and Fetch?
// Fetch's body = Axios' data
// Fetch's body has to be stringified, Axios' data contains the object
// Fetch has no url in request object, Axios has url in request object
// Fetch request function includes the url as parameter, Axios request function does not include the url as parameter.
// Fetch request is ok when response object contains the ok property, Axios request is ok when status is 200 and statusText is 'OK'
// To get the json object response: in fetch call the json() function on the response object, in Axios get data property of the response object.
