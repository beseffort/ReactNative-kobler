import React from 'react';
import { take, takeLatest, put, call, fork, select } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { signupSuccess, signupFailure } from '../actions/signupActions';
import SERVER_URL from '../config';

const fetchUrl = SERVER_URL + 'user';

function signupAPI({ name, email, password, phone, zipcode, inviteCode, deviceToken }) {
    return new Promise((resolve, reject) => {
        fetch(fetchUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                    zipcode: zipcode,
                    inviteCode: inviteCode,
                    deviceToken: deviceToken,
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                //console.log('saga-SIGNUP-response: ', responseData);
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

function* watchSignupRequest(action) {
    //while (true) {
    const { name, email, password, phone, zipcode, inviteCode, deviceToken } = action; //yield take(types.SIGNUP.REQUEST);

    try {
        const payload = {
            name,
            email,
            password,
            phone,
            zipcode,
            inviteCode,
            deviceToken,
        }
        const response = yield call(signupAPI, payload);
        yield put(signupSuccess(response));
        console.log('SAGA SIGNUP SUCCESS:');
    } catch (err) {
        console.log('SAGA SIGNUP ERROR: ', err);
        yield put(signupFailure(err.status));
    }
    //}
}

function* root() {
    yield takeLatest(types.SIGNUP.REQUEST, watchSignupRequest);
}

export default root;