//Reducer describes how Actions transforms the state (modifies store based on Action we give)

import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';

export const initialState = {
    dishes : DISHES,
    comments : COMMENTS,
    promotions : PROMOTIONS,
    leaders : LEADERS

};

export const Reducer = (state = initialState, action) => {
    return state;
};