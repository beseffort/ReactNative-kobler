import * as types from './actionTypes';

export function updateStripeRequest(accountNumber, routingNumber, ssn, user_token) {
    return {
        type: types.UPDATESTRIPE.REQUEST,
        accountNumber,
        routingNumber,
        ssn,
        user_token,
    }
}

export function updateStripeSuccess(response) {
    return {
        type: types.UPDATESTRIPE.SUCCESS,
        response,
    }
}

export function updateStripeFailure(err) {
    return {
        type: types.UPDATESTRIPE.FAILURE,
        err,
    }
}