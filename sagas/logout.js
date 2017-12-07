import React from 'react';
import { take, takeLatest, put, call, fork, select } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { logoutSuccess, logoutFailure } from '../actions/logoutActions';
import SERVER_URL from '../config';

const fetchUrl = SERVER_URL + 'logout';

function logoutAPI({ user_token }) {
    return fetch(fetchUrl, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + user_token
            }
        })
        .then((response) => {
            if (response.status === 200) {
                // Handle success
                return 'OK';
            } else {
                return response.json().then(function(responseData) {
                    //console.log('saga-LOGOUT-response: ', responseData);
                    if (responseData.message) {
                        throw new Error(responseData.message);
                    }
                    throw new Error('Unknown Error');
                });
            }
        });
}

function* watchLogoutRequest(action) {
    //while (true) {
    const { user_token } = action; //yield take(types.LOGOUT.REQUEST);

    try {
        const payload = {
            user_token
        }
        const response = yield call(logoutAPI, payload);
        yield put(logoutSuccess(response));
        console.log('SAGA LOGOUT SUCCESS:');
    } catch (err) {
        console.log('SAGA LOGOUT ERROR: ', err.message);
        yield put(logoutFailure(err.message));
    }
    //}
}

function* root() {
    yield takeLatest(types.LOGOUT.REQUEST, watchLogoutRequest);
}

export default root;