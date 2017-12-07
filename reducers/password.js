import * as types from '../actions/actionTypes';

const initialState = {
    emailSent: false,
    isFetching: false,
    errorMessage: '',
};

export default function password(state = initialState, action) {
    switch (action.type) {
        case types.INITPASSWORD:
            return initialState;
        case types.RESETPASSWORD.REQUEST:
            console.log('********reducer-RESETPASSWORD-request*********', action);
            return Object.assign({}, state, {
                isFetching: true,
                errorMessage: '',
            });
        case types.RESETPASSWORD.SUCCESS:
            console.log('********reducer-RESETPASSWORD-success*********', action.response);
            return Object.assign({}, state, {
                isFetching: false,
                emailSent: true,
                errorMessage: '',
            });
        case types.RESETPASSWORD.FAILURE:
            return Object.assign({}, state, {
                emailSent: false,
                isFetching: false,
                errorMessage: action.err,
            });
        default:
            return state;
    }
}