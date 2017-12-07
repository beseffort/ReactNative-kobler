import * as types from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    updateSuccess: false,
    errorMessage: '',
    profile: {},
};

export default function profile(state = initialState, action) {
    switch (action.type) {
        case types.UPDATEPROFILE.REQUEST:
            console.log('********reducer-UPDATEPROFILE-request*********', action);
            return Object.assign({}, state, {
                isFetching: true,
                updateSuccess: false,
                errorMessage: '',
            });
        case types.UPDATEPROFILE.SUCCESS:
            console.log('********reducer-UPDATEPROFILE-success*********', action.response);
            return Object.assign({}, state, {
                isFetching: false,
                updateSuccess: true,
                errorMessage: '',
            });
        case types.UPDATEPROFILE.FAILURE:
            console.log('********reducer-UPDATEPROFILE-failure*********', action.err);
            return Object.assign({}, state, {
                isFetching: false,
                updateSuccess: false,
                errorMessage: action.err,
            });

        case types.GETPROFILE.REQUEST:
            console.log('********reducer-GETPROFILE-request*********', action);
            return Object.assign({}, state, {
                isFetching: true,
                errorMessage: '',
            });
        case types.GETPROFILE.SUCCESS:
            console.log('********reducer-GETPROFILE-success*********', action.response);
            return Object.assign({}, state, {
                isFetching: false,
                profile: action.response,
                errorMessage: '',
            });
        case types.GETPROFILE.FAILURE:
            console.log('********reducer-GETPROFILE-failure*********', action.err);
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.err,
            });
        default:
            return state;
    }
}