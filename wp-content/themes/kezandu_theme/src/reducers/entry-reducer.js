import { SELECTED_ENTRY } from '../actions';

export default (state = null, action) => {
    switch (action.type) {
        case SELECTED_ENTRY:
            return {...state, entry: action.payload}
        default:
            return state;
    }
}
