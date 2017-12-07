import React from 'react';
import { take, takeLatest, put, call, fork, select } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { getTotalSuccess, getTotalFailure } from '../actions/getTotalActions';

const fetchUrl = 'https://koble-staging.herokuapp.com/api/kobler/event/total/';

function getTotalAPI({ user_token, time }) {
    return new Promise((resolve, reject) => {
        fetch(fetchUrl + time, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + user_token
                }
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('saga-GETTOTAL-response: ', responseData);
                if (responseData.message) {
                    return reject({ status: responseData.message });
                }
                resolve(responseData);
            })
            .catch((error) => {
                reject({ status: 'Something went wrong!' });
            });
    });
}

function* watchGetTotalRequest(action) {
    //while (true) {
    const { user_token, time } = action; //yield take(types.GETTOTAL.REQUEST);

    try {
        const payload = {
            user_token,
            time,
        }
        const response = yield call(getTotalAPI, payload);
        yield put(getTotalSuccess(response));
        console.log('SAGA GET TOTAL SUCCESS:');
    } catch (err) {
        console.log('SAGA GET TOTAL ERROR: ', err);
        yield put(getTotalFailure(err.status));
    }
    //}
}

function* root() {
    yield takeLatest(types.GETTOTAL.REQUEST, watchGetTotalRequest);
}

export default root;