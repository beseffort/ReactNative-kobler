import * as types from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    createSuccess: false,
    updateSuccess: false,
    resetSuccess: false,
    account: {},
    errorMessage: '',
};

export default function stripe(state = initialState, action) {
    switch (action.type) {
        case types.INITSTRIPE:
            console.log('********reducer-INITSTRIPE-request*********');
            return initialState;
        case types.RESETSTRIPE:
            console.log('********reducer-RESETSTRIPE-request*********');
            return Object.assign({}, state, {
                isFetching: false,
                createSuccess: false,
                updateSuccess: false,
                resetSuccess: true,
                account: {},
                errorMessage: '',
            });
        case types.CREATESTRIPE.REQUEST:
            console.log('********reducer-CREATESTRIPE-request*********', action);
            return Object.assign({}, state, {
                isFetching: true,
                createSuccess: false,
                errorMessage: '',
            });
        case types.CREATESTRIPE.SUCCESS:
            console.log('********reducer-CREATESTRIPE-success*********', action.response);
            return Object.assign({}, state, {
                isFetching: false,
                createSuccess: true,
                resetSuccess: false,
                account: action.response,
                errorMessage: '',
            });
        case types.CREATESTRIPE.FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                createSuccess: false,
                errorMessage: action.err,
            });

        case types.UPDATESTRIPE.REQUEST:
            console.log('********reducer-UPDATESTRIPE-request*********', action);
            return Object.assign({}, state, {
                isFetching: true,
                updateSuccess: false,
                errorMessage: '',
            });
        case types.UPDATESTRIPE.SUCCESS:
            console.log('********reducer-UPDATESTRIPE-success*********', action.response);
            return Object.assign({}, state, {
                isFetching: false,
                updateSuccess: true,
                resetSuccess: false,
                account: action.response,
                errorMessage: '',
            });
        case types.UPDATESTRIPE.FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                updateSuccess: false,
                errorMessage: action.err,
            });
        default:
            return state;
    }
}