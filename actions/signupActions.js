import * as types from './actionTypes';

export function signupRequest(name, email, password, phone, zipcode, inviteCode, deviceToken) {
    return {
        type: types.SIGNUP.REQUEST,
        name,
        email,
        password,
        phone,
        zipcode,
        inviteCode,
        deviceToken,
    }
}

export function signupSuccess(response) {
    return {
        type: types.SIGNUP.SUCCESS,
        response,
    }
}

export function signupFailure(err) {
    return {
        type: types.SIGNUP.FAILURE,
        err,
    }
}