import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import posts from './posts-reducer';
import menu from './menu-reducer';
import tags from './tag-reducer';
import cat from './cat-reducer';
import comments from './comments-reducer';
import acf from './acf-reducer';
import entryBox from './entryBox-reducer';
import faq from './AccordionFaq-reducer';
import rewards from './AccordionRewards-reducer';
import customer from './customer-reducer';
import process from './process-reducer';
import routerMatch from './routerMatch-reducer';
import selectedEntry from './entry-reducer';
import selectedpageid from './pageid-reducer';

export default combineReducers({
    posts,
    menu,
    tags,
    cat,
    comments,
    acf,
    customer,
    process,
    entryBox,
    faq,
    rewards,
    routerMatch,
    selectedEntry,
    selectedpageid,
    form: formReducer
});