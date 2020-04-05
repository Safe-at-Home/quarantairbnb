import {
  successAction,
  createActionName,
  errorAction,
} from "../actions/helpers";
import * as at from "../actions/types";
import * as m from "../actions/modifiers";

const initialState = {
  token: "",
  role: undefined,
  username: undefined,
  authorized: false,
  wrongCredentials: false,
  errorRegistering: false,
  justRegistered: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case successAction(createActionName(at.USER, m.GET_ALL)):
      return {
        ...state,
        role: action.payload.role,
        username: action.payload.username,
        authorized: true,
      };
    case successAction(createActionName(at.USER, m.POST_LOGIN)):
      return {
        ...state,
        token: action.payload.access_token,
        wrongCredentials: false,
      };
    case errorAction(createActionName(at.USER, m.POST_LOGIN)):
      return { ...state, authorized: false, wrongCredentials: true };
    case successAction(createActionName(at.HOST, m.POST_REGISTER)):
    case successAction(createActionName(at.GUEST, m.POST_REGISTER)):
      return { ...state, errorRegistering: false, justRegistered: true };
    case errorAction(createActionName(at.HOST, m.POST_REGISTER)):
    case errorAction(createActionName(at.GUEST, m.POST_REGISTER)):
      return { ...state, errorRegistering: true, justRegistered: false };
    case "LOG_OUT":
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
