import * as types from '../actions/actionTypes';

const initialState = {
    isUploading: false,
    success: false,
    errorMessage: '',
};

export default function upload(state = initialState, action) {
    switch (action.type) {
        case types.INITUPLOADING:
            return initialState;
        case types.CLEARUPLOADINGERROR:
            return Object.assign({}, state, {
                errorMessage: '',
            });
        case types.UPLOADPHOTO.REQUEST:
            console.log('********reducer-UPLOADPHOTO-request*********', action);
            return Object.assign({}, state, {
                isUploading: true,
                success: false,
                errorMessage: '',
            });
        case types.UPLOADPHOTO.SUCCESS:
            console.log('********reducer-UPLOADPHOTO-success*********', action.response);
            return Object.assign({}, state, {
                isUploading: false,
                success: true,
                errorMessage: '',
            });
        case types.UPLOADPHOTO.FAILURE:
            return Object.assign({}, state, {
                isUploading: false,
                success: false,
                errorMessage: action.err,
            });
        default:
            return state;
    }
}