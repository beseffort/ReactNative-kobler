import React from 'react';
import { take, takeLatest, put, call, fork, select } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { updateProfileSuccess, updateProfileFailure } from '../actions/updateProfileActions';
import { getProfileSuccess, getProfileFailure } from '../actions/getProfileActions';
import SERVER_URL from '../config';

const fetchUrl = SERVER_URL + 'user';

function updateProfileAPI({ name, email, phone, address, birthDate, user_token }) {
    return fetch(fetchUrl, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_token
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                address: address,
                birthDate: birthDate
            })
        })
        .then((response) => {
            if (response.status === 200) {
                // Handle success
                return 'OK';
            } else {
                return response.json().then(function(responseData) {
                    //console.log('saga-UPDATEPROFILE-response: ', responseData);
                    if (responseData.message) {
                        throw new Error(responseData.message);
                    }
                    throw new Error('Unknown Error');
                });
            }
        });
}

function getProfileAPI({ user_token }) {
    return fetch(fetchUrl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_token
            }
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log('saga-EVENTS-response: ', responseData);
            if (responseData.message) {
                throw new Error(responseData.message);
            }
            return responseData;
        });
}

function* watchUpdateProfileRequest(action) {
    //while (true) {
    const { name, email, phone, address, birthDate, user_token } = action; //yield take(types.UPDATEPROFILE.REQUEST);

    try {
        const payload = {
            name,
            email,
            phone,
            address,
            birthDate,
            user_token
        }
        const response = yield call(updateProfileAPI, payload);
        yield put(updateProfileSuccess(response));
        console.log('SAGA UPDATE PROFILE SUCCESS:');
    } catch (err) {
        console.log('SAGA UPDATE PROFILE ERROR: ', err);
        var error_msg = err.message;
        if (err.message === 'Network request failed')
            error_msg = 'No Internet Connection';
        yield put(updateProfileFailure(error_msg));
    }
    //}
}

function* watchGetProfileRequest(action) {
    const { user_token } = action; //yield take(types.GETPROFILE.REQUEST);

    try {
        const payload = {
            user_token
        }
        const response = yield call(getProfileAPI, payload);
        yield put(getProfileSuccess(response));
        console.log('SAGA GET PROFILE SUCCESS:');
    } catch (err) {
        console.log('SAGA GET PROFILE ERROR: ', err, err.message);
        var error_msg = err.message;
        if (err.message === 'Network request failed')
            error_msg = 'No Internet Connection';
        yield put(getProfileFailure(error_msg));
    }
}

function* root() {
    yield takeLatest(types.UPDATEPROFILE.REQUEST, watchUpdateProfileRequest);
    yield takeLatest(types.GETPROFILE.REQUEST, watchGetProfileRequest);
}

export default root;