import * as types from './actionTypes';

export function getProfileRequest(user_token) {
    return {
        type: types.GETPROFILE.REQUEST,
        user_token,
    }
}

export function getProfileSuccess(response) {
    return {
        type: types.GETPROFILE.SUCCESS,
        response,
    }
}

export function getProfileFailure(err) {
    return {
        type: types.GETPROFILE.FAILURE,
        err,
    }
}