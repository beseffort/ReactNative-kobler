import * as types from './actionTypes';

export function logoutRequest(user_token) {
    return {
        type: types.LOGOUT.REQUEST,
        user_token,
    }
}

export function logoutSuccess(response) {
    return {
        type: types.LOGOUT.SUCCESS,
        response,
    }
}

export function logoutFailure(err) {
    return {
        type: types.LOGIN.FAILURE,
        err,
    }
}