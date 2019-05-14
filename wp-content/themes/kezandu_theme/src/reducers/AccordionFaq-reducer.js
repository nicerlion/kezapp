import {FETCH_FAQ} from '../actions';

export default function (state = {name: "", items: []}, action) {
    switch (action.type) {
        case FETCH_FAQ:
            return action.payload;
    }
    return state;
}