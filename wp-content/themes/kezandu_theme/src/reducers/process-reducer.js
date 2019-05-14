import { FETCH_LOST_PASSWORD, FETCH_CHANGE_PASSWORD, FETCH_MAIL_VERIFICATION } from '../actions';

export default (state = [], action) => {

    switch (action.type) {
        case FETCH_LOST_PASSWORD:
            return action.payload;
        case FETCH_CHANGE_PASSWORD:
            return action.payload;
        case FETCH_MAIL_VERIFICATION:
            return action.payload;
    }
    return state;
}