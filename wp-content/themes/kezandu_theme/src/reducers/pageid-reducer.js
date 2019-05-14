import { EXP_PAGE_ID } from '../actions';

export default (state = null, action) => {
    switch (action.type) {
        case EXP_PAGE_ID:
            return {...state, entry: action.payload}
        default:
            return state;
    }
}
