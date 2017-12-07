import React from 'react';
import { take, takeLatest, put, call, fork, select } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { loginSuccess, loginFailure } from '../actions/loginActions';
import SERVER_URL from '../config';

const fetchUrl = SERVER_URL + 'login';

function loginAPI({ email, password, deviceToken }) {
    return new Promise((resolve, reject) => {
        fetch(fetchUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    deviceToken: deviceToken,
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                //console.log('saga-LOGIN-response: ', responseData);
                if (responseData.message) {
                    return reject({ status: responseData.message });
                }
                resolve(responseData);
            })
            .catch((error) => {
                reject({ status: 'No Internet Connection!' });
            });
    });
}

function* watchLoginRequest(action) {
    //while (true) {
    const { email, password, deviceToken } = action; //yield take(types.LOGIN.REQUEST);

    try {
        const payload = {
            email,
            password,
            deviceToken,
        }
        const response = yield call(loginAPI, payload);
        yield put(loginSuccess(response));
        console.log('SAGA LOGIN SUCCESS:');
    } catch (err) {
        console.log('SAGA LOGIN ERROR: ', err);
        yield put(loginFailure(err.status));
    }
    //}
}

function* root() {
    yield takeLatest(types.LOGIN.REQUEST, watchLoginRequest);
}

export default root;