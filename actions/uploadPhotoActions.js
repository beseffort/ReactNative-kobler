import * as types from './actionTypes';

export function uploadPhotoRequest(user_token, fileURL) {
    return {
        type: types.UPLOADPHOTO.REQUEST,
        user_token,
        fileURL,
    }
}

export function uploadPhotoSuccess(response) {
    return {
        type: types.UPLOADPHOTO.SUCCESS,
        response,
    }
}

export function uploadPhotoFailure(err) {
    return {
        type: types.UPLOADPHOTO.FAILURE,
        err,
    }
}

export function initUploadingRequest() {
    return {
        type: types.INITUPLOADING,
    }
}

export function clearUploadingErrorRequest() {
    return {
        type: types.CLEARUPLOADINGERROR,
    }
}