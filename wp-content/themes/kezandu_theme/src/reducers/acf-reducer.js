import {FETCH_ACF} from '../actions';

export default function (state = {name: "", items: []}, action) {
    switch (action.type) {
        case FETCH_ACF:
            return action.payload;
    }
    return state;
}