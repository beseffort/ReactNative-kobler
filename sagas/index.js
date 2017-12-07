import { fork } from 'redux-saga/effects'
import signup from './signup';
import login from './login';
import logout from './logout';
import getTotal from './total';
import getEvents from './events';
import resetPassword from './password';
import stripe from './stripe';
import updateProfile from './profile';
import uploadPhoto from './uploadPhoto';

function* root() {
    yield fork(signup);
    yield fork(login);
    yield fork(logout);
    yield fork(resetPassword);
    yield fork(getTotal);
    yield fork(getEvents);
    yield fork(stripe);
    yield fork(updateProfile);
    yield fork(uploadPhoto);
};

export default root;