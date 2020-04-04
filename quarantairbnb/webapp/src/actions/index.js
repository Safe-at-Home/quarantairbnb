import * as at from "./types";
import * as m from "./modifiers";
import { createActionName, apiActionCreator } from "./helpers";

export const login = (email, password) => async (dispatch) => {
  await dispatch(
    apiActionCreator(createActionName(at.USER, m.POST_LOGIN), {
      email,
      password,
    })
  );
};

export const getCurrentUser = () => async (dispatch) => {
  await dispatch(apiActionCreator(createActionName(at.USER, m.GET_ALL)));
};

export const registerUser = (username, password, email, host = false) => async (
  dispatch
) => {
  await dispatch(
    apiActionCreator(
      createActionName(host ? at.HOST : at.GUEST, m.POST_REGISTER),
      { username, password, email }
    )
  );
};
