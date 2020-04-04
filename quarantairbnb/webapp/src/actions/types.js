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