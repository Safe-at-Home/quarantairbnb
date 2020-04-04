import _ from "lodash";
import * as at from "../actions/types"

export const successAction = (name) => `${name}_SUCCESS`;
export const errorAction = (name) => `${name}_ERROR`;
export const requestAction = (name) => `${name}_REQUEST`;

export const createActionName = (action, modifier) => {
  const root = action.root;
  if (!root) {
    throw "No action given";
  }
  if (!_.includes(action.modifiers, modifier)) {
    throw `Modifier ${modifier.prefix} cannot be used with action ${root}`;
  }
  let stringBuilder = [];
  if (modifier.prefix) {
    stringBuilder.push(modifier.prefix);
    stringBuilder.push("_");
  }
  stringBuilder.push(root);
  if (modifier.suffix) {
    stringBuilder.push("_");
    stringBuilder.push(modifier.suffix);
  }
  return stringBuilder.join("");
};

export const apiActionCreator = (type, data) => {
  let action = { type }
  if (data) {
    action = {...action, payload: {...data}}
  }
  return action;
}

export const isModifiedBy = (modifier, name) => {
  return (
    name.indexOf(modifier.prefix) !== -1 && name.indexOf(modifier.suffix) !== -1
  );
};

export const generateActionsRequiringMiddleware = () => {
  let generatedActions = [];
  Object.values(at).forEach((type) => {
    type.modifiers.forEach((mod) => {
      if (mod.middleware) {
        generatedActions = [...generatedActions, createActionName(type, mod)];
      }
    });
  });
  return generatedActions;
};
