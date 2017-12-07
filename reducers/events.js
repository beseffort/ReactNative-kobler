import * as types from '../actions/actionTypes';

const initialState = {
    count: 0,
    isFetching: false,
    events: [],
    errorMessage: '',
};

export default function events(state = initialState, action) {
    switch (action.type) {
        case types.GETEVENTS.REQUEST:
            console.log('********reducer-GETEVENTS-request*********', action);
            return Object.assign({}, state, {
                isFetching: true,
                errorMessage: '',
            });
        case types.GETEVENTS.SUCCESS:
            console.log('********reducer-GETEVENTS-success*********', action.response);
            return Object.assign({}, state, {
                isFetching: false,
                events: action.response,
                errorMessage: '',
            });
        case types.GETEVENTS.FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.err,
            });

        case types.GETEVENTSCOUNT.REQUEST:
            console.log('********reducer-GETEVENTSCOUNT-request*********', action);
            return Object.assign({}, state, {
                errorMessage: '',
            });
        case types.GETEVENTSCOUNT.SUCCESS:
            console.log('********reducer-GETEVENTSCOUNT-success*********', action.response);
            return Object.assign({}, state, {
                count: action.response.count,
                errorMessage: '',
            });
        case types.GETEVENTSCOUNT.FAILURE:
            return Object.assign({}, state, {
                errorMessage: action.err,
            });
        default:
            return state;
    }
}