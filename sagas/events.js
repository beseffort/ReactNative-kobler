import React from 'react';
import { take, takeLatest, put, call, fork, select } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { getEventsSuccess, getEventsFailure } from '../actions/getEventsActions';
import { getEventsCountSuccess, getEventsCountFailure } from '../actions/getEventsCountActions';
import SERVER_URL from '../config';

const getEventsUrl = SERVER_URL + 'event/page';
const getEventsCountUrl = SERVER_URL + 'event/count';

function getEventsAPI({ limit, page, search, sortBy, sortOrder, user_token }) {
    return fetch(getEventsUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_token
            },
            body: JSON.stringify({
                limit: limit,
                page: page,
                search: search,
                sort: sortBy,
                sortOrder: sortOrder,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            //console.log('saga-EVENTS-response: ', responseData);
            if (responseData.message) {
                throw new Error(responseData.message);
            }
            return responseData;
        });
}

function getEventsCountAPI({ search, user_token }) {
    return fetch(getEventsCountUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_token
            },
            body: JSON.stringify({
                search: search,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log('saga-EVENTSCOUNT-response: ', responseData);
            if (responseData.message) {
                throw new Error(responseData.message);
            }
            return responseData;
        });
}

function* watchEventsRequest(action) {
    //while (true) {
    const { limit, page, search, sortBy, sortOrder, user_token } = action; //yield take(types.GETEVENTS.REQUEST);

    try {
        const payload = {
            limit,
            page,
            search,
            sortBy,
            sortOrder,
            user_token,
        }
        const response = yield call(getEventsAPI, payload);
        yield put(getEventsSuccess(response));
        console.log('SAGA EVENTS SUCCESS:');
    } catch (err) {
        console.log('SAGA EVENTS ERROR: ', err);
        var error_msg = err.message;
        if (err.message === 'Network request failed')
            error_msg = 'No Internet Connection';
        yield put(getEventsFailure(error_msg));
    }
    //}
}

function* watchEventsCountRequest(action) {
    //while (true) {
    const { search, user_token } = action; //yield take(types.GETEVENTSCOUNT.REQUEST);

    try {
        const payload = {
            search,
            user_token,
        }
        const response = yield call(getEventsCountAPI, payload);
        yield put(getEventsCountSuccess(response));
        console.log('SAGA EVENTSCOUNT SUCCESS:');
    } catch (err) {
        console.log('SAGA EVENTSCOUNT ERROR: ', err);
        var error_msg = err.message;
        if (err.message === 'Network request failed')
            error_msg = 'No Internet Connection';
        yield put(getEventsCountFailure(error_msg));
    }
    //}
}

function* root() {
    yield takeLatest(types.GETEVENTS.REQUEST, watchEventsRequest);
    yield takeLatest(types.GETEVENTSCOUNT.REQUEST, watchEventsCountRequest);
}

export default root;