import * as ActionTypes from './ActionTypes';

export const Dishes = (state= {
        isLoading: true, 
        errMess : null,
        dishes: []
    },action ) => {
    switch(action.type){
    case ActionTypes.ADD_DISHES:
        return{...state, isLoading:false , errMess:null , dishes: action.payload}; 
        //...state is sprint operator it is done so that the state is not mutated it
        // makes a copy and then modifies it and then return
        
    case ActionTypes.DISHES_LOADING:
        return{...state, isLoading:true , errMess:null , dishes: []};

    case ActionTypes.DISHES_FAILED:
        return{...state, isLoading:false , errMess:action.payload , dishes: []};

    
        default:
            return state;
    }
}