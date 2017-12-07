import * as types from '../actions/actionTypes';

const initialState = {
    isRegistered: false,
    isAuthenticated: false,
    isFetching: false,
    token: '',
    user: '',
    errorMessage: '',
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case types.RESETUSER:
            console.log('********reducer-RESETUSER-request*********');
            return initialState;
        case types.LOGIN.REQUEST:
            console.log('********reducer-LOGIN-request*********', action);
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                errorMessage: '',
            });
        case types.LOGIN.SUCCESS:
            console.log('********reducer-LOGIN-success*********', action.response);
            var validated = false;
            if (action.response.user.status == 'active')
                validated = true;
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: validated,
                isRegistered: true,
                token: action.response.token,
                user: action.response.user,
                errorMessage: '',
            });
        case types.LOGIN.FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.err,
            });

        case types.LOGOUT.REQUEST:
            console.log('************reducer-LOGOUT-request************', action);
            return Object.assign({}, state, {
                isFetching: true,
                errorMessage: '',
            });
        case types.LOGOUT.SUCCESS:
            console.log('*************reducer-LOGOUT-success***********', action.response);
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                isRegistered: false,
                errorMessage: '',
            });
        case types.LOGOUT.FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.err,
            });

        case types.SIGNUP.REQUEST:
            console.log('************reducer-SIGNUP-request************', action);
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                errorMessage: '',
            });
        case types.SIGNUP.SUCCESS:
            console.log('*************reducer-SIGNUP-success***********', action.response);
            return Object.assign({}, state, {
                isFetching: false,
                isRegistered: true,
                isAuthenticated: false,
                token: action.response.token,
                user: action.response.user,
                errorMessage: '',
            });
        case types.SIGNUP.FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isRegistered: false,
                isAuthenticated: false,
                errorMessage: action.err,
            });

        case types.UPDATEPROFILE.SUCCESS:
            console.log('user reducer: update_profile_success!');
        default:
            return state;
    }
}