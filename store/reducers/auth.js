import { SET_ID, SIGN_IN } from "../actions/auth"

const initState = {
    userId: null
}

export default (state = initState, action) => {
    console.log('auth state',state);
    switch (action.type) {
        case SET_ID:
            return {
                userId: action.userId,
            }
        default:
            return state
    }
}