import { FETCH_USER } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; //switch => true || false => true, false || false => false
    default:
      return state;
  }
}
//3 distinc values: object, false, null, return null by default don't show any state content instead of blank content
// "" || false => false
