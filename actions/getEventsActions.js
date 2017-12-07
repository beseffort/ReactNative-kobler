import * as types from './actionTypes';

export function getEventsRequest(limit, page, search, sortBy, sortOrder, user_token) {
    return {
        type: types.GETEVENTS.REQUEST,
        limit,
        page,
        search,
        sortBy,
        sortOrder,
        user_token,
    }
}

export function getEventsSuccess(response) {
    return {
        type: types.GETEVENTS.SUCCESS,
        response,
    }
}

export function getEventsFailure(err) {
    return {
        type: types.GETEVENTS.FAILURE,
        err,
    }
}
