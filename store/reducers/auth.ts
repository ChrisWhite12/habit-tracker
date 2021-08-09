import { SET_ID, SIGN_IN } from "../actions/auth"
import { DispatchType } from "../actions/types"
import {AuthItem} from './types'

const initState: AuthItem = {
    userId: null
}

export default (state: AuthItem = initState, action: DispatchType) => {
    // console.log('auth state',state);
    switch (action.type) {
        case SET_ID:
            return {
                userId: action.userId,
            }
        default:
            return state
    }
}