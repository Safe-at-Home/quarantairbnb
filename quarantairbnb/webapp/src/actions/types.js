// just examples for now

import * as m from "./modifiers"

export const HOSTING_REQUEST = {
  root: "HOSTING_REQUEST",
  modifiers: [m.GET_BY_ID, m.DELETE_BY_ID, m.PATCH_BY_ID]
}

export const GUEST = {
  root: "GUEST",
  modifiers: [m.POST_REGISTER]
}

export const HOST = {
  root: "HOST",
  modifiers: [m.POST_REGISTER]
}

export const USER = {
  root: "USER",
  modifiers: [m.GET_ALL, m.POST_LOGIN]
}

export const REQUESTS = {
  root: "REQUESTS",
  modifiers: [m.GET_ALL, m.POST_FROM_BODY, m.POST_OPERATION_BY_ID]
}

export const OFFERS = {
  root: "OFFERS",
  modifiers: [m.GET_ALL, m.POST_FROM_BODY, m.POST_OPERATION_BY_ID]
}

export const MOD_REQUESTS = {
  root: "MOD_REQUESTS",
  modifiers: [m.GET_ALL, m.POST_OPERATION_BY_ID]
}

export const MOD_OFFERS = {
  root: "MOD_OFFERS",
  modifiers: [m.GET_ALL]
}
