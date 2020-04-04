import * as m from "../actions/modifiers";
import * as h from "../actions/helpers";
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
  const wrapApiCall = createApiCallWrapper(dispatch, successType, errorType);
  // just a stupid example, doesnt work obviously
  if (h.isModifiedBy(m.GET_ALL, actionType)) {
      return wrapApiCall(() => service.getWhatever())
  }
};

export default (cfg) => (store) => (dispatch) => (action) => {
  const apiCall = apiActions[action.type];
  if (apiCall === undefined) {
    return dispatch(action);
  }
  if (!service) {
    service = new ApiService(cfg);
  }

  const [requestType, successType, errorType] = apiCall;
  dispatch({
    type: requestType,
  });

  return performApiCall(dispatch, service, action.type, successType, errorType);
};
