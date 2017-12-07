import { combineReducers } from 'redux';
import user from './user';
import password from './password';
import total from './total';
import events from './events';
import stripe from './stripe';
import profile from './profile';
import upload from './upload';

const reducer = combineReducers({
    user,
    password,
    total,
    events,
    stripe,
    profile,
    upload,
});

export default reducer;