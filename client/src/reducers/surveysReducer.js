import { FETCH_SURVEYS } from "../actions/types";

export default function (state = [], action) {
  //react way that you can put defalt param before non-default param
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
