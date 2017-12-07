import * as types from './actionTypes';

export function getTotalRequest(user_token, time) {
    return {
        type: types.GETTOTAL.REQUEST,
        user_token,
        time,
    }
}

export function getTotalSuccess(response) {
    return {
        type: types.GETTOTAL.SUCCESS,
        response,
    }
}

export function getTotalFailure(err) {
    return {
        type: types.GETTOTAL.FAILURE,
        err,
    }
}