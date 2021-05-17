import { SIGN_IN } from "../actions/auth"

const initState = {
    token: null,
    userId: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case SIGN_IN:
            console.log('in auth reducer')
            return{
                token: action.token,
                userId: action.userId
            }
        default:
            return state
    }
}