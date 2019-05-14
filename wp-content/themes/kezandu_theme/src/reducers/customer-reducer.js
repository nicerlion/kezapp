import { FETCH_LOGIN, FETCH_CUSTOMER_LOST_PASSWORD, FETCH_CUSTOMER, FETCH_CUSTOMER_REGISTER, FETCH_CUSTOMER_LOGOUT} from '../actions';

export default (state = [], action) => {

    switch (action.type) {
        case FETCH_LOGIN:
            return action.payload;
        case FETCH_CUSTOMER:
            return action.payload;
        case FETCH_CUSTOMER_REGISTER:
            return action.payload;
        case FETCH_CUSTOMER_LOGOUT:
            return action.payload;
    }
    return state;
}