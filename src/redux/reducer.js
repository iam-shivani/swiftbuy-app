import {ADD_TO_CART} from './constants';

const initialState = [];
export const reduder = (state=initialState,action) => {
    switch(action.type)
    {
        case ADD_TO_CART:
            return [
                ...state,
                action.data
            ]

        default:
            return state
    }
}