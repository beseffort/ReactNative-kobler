import * as types from './actionTypes';

export function resetPasswordRequest(email) {
    return {
        type: types.RESETPASSWORD.REQUEST,
        email,
    }
}

export function resetPasswordSuccess(response) {
    return {
        type: types.RESETPASSWORD.SUCCESS,
        response,
    }
}

export function resetPasswordFailure(err) {
    return {
        type: types.RESETPASSWORD.FAILURE,
        err,
    }
}

export function initPasswordRequest() {
    return {
        type: types.INITPASSWORD,
    }
}