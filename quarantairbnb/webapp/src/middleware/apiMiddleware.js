import * as m from "../actions/modifiers";
import * as h from "../actions/helpers";
import * as at from "../actions/types"
import ApiService from "../services/ApiService";

let service;

const generateApiActions = (rootRequest) => {
  const generated = {};
  rootRequest.forEach((element) => {
    generated[element] = [
      h.requestAction(element),
      h.successAction(element),
      h.errorAction(element),
    ];
  });
  return generated;
};

export const apiActions = generateApiActions(
  h.generateActionsRequiringMiddleware()
);

const createResponse = (type, payload, params = null) => ({
    payload, type, params
})

const createApiCallWrapper = (dispatch, successType, errorType) => async (
  wrapped,
  params = null,
  loadJson = true
) => {
  let response = wrapped();
  if (loadJson) {
    response = response.then((payload) => payload.json());
  }
  try {
    const data = await response;
    await dispatch(createResponse(successType, data, params));
    return data;
  } catch (err) {
    dispatch(createResponse(errorType, { err }, params));
  }
};

const performApiCall = (
  dispatch,
  service,
  params,
  actionType,
  successType,
  errorType
) => {
  console.log("Action type: ", actionType)
  const wrapApiCall = createApiCallWrapper(dispatch, successType, errorType);
  // just a stupid example, doesnt work obviously
  if (actionType === h.createActionName(at.USER, m.GET_ALL)) {
    return wrapApiCall(() => service.getCurrentUser())
  }
  else if (actionType === h.createActionName(at.USER, m.POST_LOGIN)) {
    console.log("posting logging...", params)
    return wrapApiCall(() => service.login(params))
  }
  else if (actionType === h.createActionName(at.HOST, m.POST_REGISTER)) {
    return wrapApiCall(() => service.registerHost(params))
  }
  else if (actionType === h.createActionName(at.GUEST, m.POST_REGISTER)) {
    return wrapApiCall(() => service.registerGuest(params))
  }
  else {
    console.log("Unknown action type:", actionType)
  }
};

export default (cfg) => (store) => (dispatch) => (action) => {
  const apiCall = apiActions[action.type];
  if (apiCall === undefined) {
    return dispatch(action);
  }

  const { auth } = store.getState();
  if (!service) {
    console.log("middleware", auth, cfg)
    service = new ApiService(auth, cfg);
  } else {
    service.auth = auth;
  }

  const [requestType, successType, errorType] = apiCall;
  dispatch({
    type: requestType,
  });

  return performApiCall(dispatch, service, action.payload, action.type, successType, errorType);
};
