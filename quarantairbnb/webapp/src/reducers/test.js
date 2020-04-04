const reducer = (state = {}, action) => {
    switch (action.type) {
        case "NONEXISTENT_ACTIONS":
            return state
        default:
            return state
    }
}

export default reducer