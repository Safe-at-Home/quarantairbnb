import {
    successAction,
    createActionName,
    errorAction,
  } from "../actions/helpers";
  import * as at from "../actions/types";
  import * as m from "../actions/modifiers";
  
  const initialState = [];
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case successAction(createActionName(at.OFFERS, m.GET_ALL)):
      case successAction(createActionName(at.MOD_OFFERS, m.GET_ALL)):
        return [...action.payload];
      default:
        return state;
    }
  };
  
  export default reducer;
  