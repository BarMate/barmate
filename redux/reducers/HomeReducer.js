/* 
    HomeReducer.js
    
    Reducer for Home Screen in MainTabNav
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

const initialState_home = {
    carouselData: [],
    selectedBarData: {},
    refreshing: false,
    loading: true,
}

export const homeReducer = (state = initialState_home, action) => {
    switch(action.type) {
        case 'SELECT_BAR':
            return {
                ...state,
                selectedBarData: action.payload,
            }
        case 'PUSH_LIST_DATA':
            return {
                ...state,
                carouselData: action.payload,
            }
        case 'UPDATE_LIST_DATA':
            return {
                ...state,
                carouselData: action.payload,
            }
        case 'ERASE_LIST_DATA':
            return {
                ...state,
                carouselData: []
            }
        case 'REFRESH_LIST':
            return {
                ...state,
                refreshing: action.payload,
            }
        case 'UPDATE_LOADING':
            return {
                ...state,
                loading: action.payload,
            }
        default:
            return state;
    }
}