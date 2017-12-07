import * as types from './actionTypes';

export function createStripeRequest(accountNumber, routingNumber, ssn, user_token) {
    return {
        type: types.CREATESTRIPE.REQUEST,
        accountNumber,
        routingNumber,
        ssn,
        user_token,
    }
}

export function createStripeSuccess(response) {
    return {
        type: types.CREATESTRIPE.SUCCESS,
        response,
    }
}

export function createStripeFailure(err) {
    return {
        type: types.CREATESTRIPE.FAILURE,
        err,
    }
}