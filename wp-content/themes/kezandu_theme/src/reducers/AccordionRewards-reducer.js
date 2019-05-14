import {FETCH_REWARDS} from '../actions';

export default function (state = {name: "", items: []}, action) {
    switch (action.type) {
        case FETCH_REWARDS:
            return action.payload;
    }
    return state;
}