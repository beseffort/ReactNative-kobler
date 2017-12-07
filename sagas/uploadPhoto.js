import React from 'react';
import { take, takeLatest, put, call, fork, select } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { uploadPhotoSuccess, uploadPhotoFailure } from '../actions/uploadPhotoActions';
import SERVER_URL from '../config';

const fetchUrl = SERVER_URL + 'file';

function uploadPhotoAPI({ user_token, fileURL }) {
    let data = new FormData()
    if (fileURL) {
        data.append('identity_document', { uri: fileURL, name: 'image.jpg', type: 'image/jpg' });
    }
    return new Promise((resolve, reject) => {
        fetch(fetchUrl, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + user_token,
                    'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
                },
                body: data
            })
            .then((response) => response.json())
            .then((responseData) => {
                //console.log('saga-UPLOADPHOTO-response: ', responseData);
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

function* watchUploadPhotoRequest(action) {
    //while (true) {
    const { user_token, fileURL } = action; //yield take(types.GETTOTAL.REQUEST);

    try {
        const payload = {
            user_token,
            fileURL
        }
        const response = yield call(uploadPhotoAPI, payload);
        yield put(uploadPhotoSuccess(response));
        console.log('SAGA UPLOAD PHOTO SUCCESS:');
    } catch (err) {
        console.log('SAGA UPLOAD PHOTO ERROR: ', err);
        yield put(uploadPhotoFailure(err.status));
    }
    //}
}

function* root() {
    yield takeLatest(types.UPLOADPHOTO.REQUEST, watchUploadPhotoRequest);
}

export default root;