import * as types from './actionTypes';

export function updateProfileRequest(name, email, phone, address, birthDate, user_token) {
    return {
        type: types.UPDATEPROFILE.REQUEST,
        name,
        email,
        phone,
        address,
        birthDate,
        user_token,
    }
}

export function updateProfileSuccess(response) {
    return {
        type: types.UPDATEPROFILE.SUCCESS,
        response,
    }
}

export function updateProfileFailure(err) {
    return {
        type: types.UPDATEPROFILE.FAILURE,
        err,
    }
}