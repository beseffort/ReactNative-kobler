const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
    const res = {};
    [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`);
    return res;
}

// Login events
export const LOGIN = createRequestTypes('LOGIN');
export const LOGOUT = createRequestTypes('LOGOUT');

// Signup events
export const SIGNUP = createRequestTypes('SIGNUP');

// Reset User state event
export const RESETUSER = "RESETUSER";

// Reset Password events
export const RESETPASSWORD = createRequestTypes('RESETPASSWORD');

// Init Password events
export const INITPASSWORD = "INITPASSWORD";

// Get Total events
export const GETTOTAL = createRequestTypes('GETTOTAL');

// Get Events
export const GETEVENTS = createRequestTypes('GETEVENTS');

// Get Events Count
export const GETEVENTSCOUNT = createRequestTypes('GETEVENTSCOUNT');

// Create Stripe Account
export const CREATESTRIPE = createRequestTypes('CREATESTRIPE');

// Update Stripe Account
export const UPDATESTRIPE = createRequestTypes('UPDATESTRIPE');

// Reset Stripe state event
export const RESETSTRIPE = "RESETSTRIPE";

// Init Stripe state event
export const INITSTRIPE = "INITSTRIPE";

// Update User Profile
export const UPDATEPROFILE = createRequestTypes('UPDATEPROFILE');

// Get User Profile
export const GETPROFILE = createRequestTypes('GETPROFILE');

// Upload photo
export const UPLOADPHOTO = createRequestTypes('UPLOADPHOTO');

// Init Uploading
export const INITUPLOADING = "INITUPLOADING";

// Clear Uploading Error
export const CLEARUPLOADINGERROR = "CLEARUPLOADINGERROR";