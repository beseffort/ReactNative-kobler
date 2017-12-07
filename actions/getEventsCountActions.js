import * as types from './actionTypes';

export function getEventsCountRequest(search, user_token) {
    return {
        type: types.GETEVENTSCOUNT.REQUEST,
        search,
        user_token,
    }
}

export function getEventsCountSuccess(response) {
    return {
        type: types.GETEVENTSCOUNT.SUCCESS,
        response,
    }
}

export function getEventsCountFailure(err) {
    return {
        type: types.GETEVENTSCOUNT.FAILURE,
        err,
    }
}
