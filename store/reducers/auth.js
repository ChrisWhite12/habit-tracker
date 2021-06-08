import { SET_ID, SIGN_IN } from "../actions/auth"

const initState = {
    token: null,
    userId: null
}

export default (state = initState, action) => {
    switch (action.type) {

        case SET_ID:
            return {
                userId: action.userId,
                token: action.token
            }
        default:
            return state
    }
}