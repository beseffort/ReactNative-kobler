import React from 'react';
import { take, takeLatest, put, call, fork, select } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createStripeSuccess, createStripeFailure } from '../actions/stripeAccountActions';
import { updateStripeSuccess, updateStripeFailure } from '../actions/updateStripeActions';
import SERVER_URL from '../config';

const fetchUrl = SERVER_URL + 'user/account';

function createStripeAccountAPI({ accountNumber, routingNumber, ssn, user_token }) {
    return new Promise((resolve, reject) => {
        fetch(fetchUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user_token
                },
                body: JSON.stringify({
                    accountNumber: accountNumber,
                    routingNumber: routingNumber,
                    ssn: ssn
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                //console.log('saga-CREATESTRIPE-response: ', responseData);
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

function updateStripeAccountAPI({ accountNumber, routingNumber, ssn, user_token }) {
    return new Promise((resolve, reject) => {
        fetch(fetchUrl, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user_token
                },
                body: JSON.stringify({
                    accountNumber: accountNumber,
                    routingNumber: routingNumber,
                    ssn: ssn
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                //console.log('saga-CREATESTRIPE-response: ', responseData);
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

function* watchCreateStripeAccountRequest(action) {
    //while (true) {
    const { accountNumber, routingNumber, ssn, user_token } = action; //yield take(types.CREATESTRIPE.REQUEST);

    try {
        const payload = {
            accountNumber,
            routingNumber,
            ssn,
            user_token,
        }
        const response = yield call(createStripeAccountAPI, payload);
        yield put(createStripeSuccess(response));
        console.log('SAGA CREATE STRIPE SUCCESS:');
    } catch (err) {
        console.log('SAGA CREATE STRIPE ERROR: ', err);
        yield put(createStripeFailure(err.status));
    }
    //}
}

function* watchUpdateStripeAccountRequest(action) {
    //while (true) {
    const { accountNumber, routingNumber, ssn, user_token } = action; //yield take(types.UPDATESTRIPE.REQUEST);

    try {
        const payload = {
            accountNumber,
            routingNumber,
            ssn,
            user_token,
        }
        const response = yield call(updateStripeAccountAPI, payload);
        yield put(updateStripeSuccess(response));
        console.log('SAGA UPDATE STRIPE SUCCESS:');
    } catch (err) {
        console.log('SAGA UPDATE STRIPE ERROR: ', err);
        yield put(updateStripeFailure(err.status));
    }
    //}
}

function* root() {
    yield takeLatest(types.CREATESTRIPE.REQUEST, watchCreateStripeAccountRequest);
    yield takeLatest(types.UPDATESTRIPE.REQUEST, watchUpdateStripeAccountRequest);
}

export default root;