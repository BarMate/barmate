import { combineReducers } from 'redux';

const initialState = {
    counter: 0,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_NUMBER':
            return {
                ...state,
                counter: state.counter + 1,
            }
        default:
            return state;
    }
}

const combinedReducers = combineReducers({
    reducer
})

export default reducer
