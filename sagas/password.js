import React from 'react';
import { take, takeLatest, put, call, fork, select } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { resetPasswordSuccess, resetPasswordFailure } from '../actions/resetPasswordActions';
import SERVER_URL from '../config';

const fetchUrl = SERVER_URL + 'user/password/reset';

function resetPasswordAPI({ email }) {
    return new Promise((resolve, reject) => {
        fetch(fetchUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                //console.log('saga-RESETPASSWORD-response: ', responseData);
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

function* watchResetPasswordRequest(action) {
    //while (true) {
    const { email } = action; //yield take(types.RESETPASSWORD.REQUEST);

    try {
        const payload = {
            email,
        }
        const response = yield call(resetPasswordAPI, payload);
        yield put(resetPasswordSuccess(response));
        console.log('SAGA RESET PASSWORD SUCCESS:');
    } catch (err) {
        console.log('SAGA RESET PASSWORD ERROR: ', err);
        yield put(resetPasswordFailure(err.status));
    }
    //}
}

function* root() {
    yield takeLatest(types.RESETPASSWORD.REQUEST, watchResetPasswordRequest);
}

export default root;