import "materialize-css/dist/css/materialize.min.css"; // use npm import css file, not use relative path means in npm module
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers"; //import reducers 是指reducers 整個資料夾中的index.js, import name 可以自己變換

// Development only axios helpers!
import axios from "axios";
window.axios = axios; //put axios to window
//testing with console in react app to test the backend route to avoid cookie unable use issue

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
//{} initial states of this applications

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
//provider is a react component that know how to read changes from the redux store and inform it's children components that change
