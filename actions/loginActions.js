import * as types from './actionTypes';

export function loginRequest(email, password, deviceToken) {
    return {
        type: types.LOGIN.REQUEST,
        email,
        password,
        deviceToken,
    }
}

export function loginSuccess(response) {
    return {
        type: types.LOGIN.SUCCESS,
        response,
    }
}

export function loginFailure(err) {
    return {
        type: types.LOGIN.FAILURE,
        err,
    }
}
