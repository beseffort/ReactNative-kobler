import * as types from '../actions/actionTypes';

const initialState = {
    total: 0,
    isFetching: false,
    errorMessage: '',
};

export default function total(state = initialState, action) {
    switch (action.type) {
        case types.GETTOTAL.REQUEST:
            console.log('********reducer-GETTOTAL-request*********', action);
            return Object.assign({}, state, {
                isFetching: true,
                errorMessage: '',
            });
        case types.GETTOTAL.SUCCESS:
            console.log('********reducer-GETTOTAL-success*********', action.response);
            return Object.assign({}, state, {
                total: action.response.total,
                isFetching: false,
                errorMessage: '',
            });
        case types.GETTOTAL.FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.err,
            });
        default:
            return state;
    }
}