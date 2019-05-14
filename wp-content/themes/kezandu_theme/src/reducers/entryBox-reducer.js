import {FETCH_ENTRY_BOX} from '../actions';

export default function (state = { name: "", items: [], length: false}, action) {
    switch (action.type) {
        case FETCH_ENTRY_BOX:
            return action.payload;
    }
    return state;
}