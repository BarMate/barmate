const initStateYourBars = {
    test: 0,
    searchModalVisible: false,
}

const YourBarsReducer = (state = initStateYourBars, action) => {
    switch(action.type) {
        case 'TOGGLE_SEARCH_MODAL':
            console.log('toggledmodal: ' + action.payload)
            return {
                ...state,
                searchModalVisible: action.payload,
            }
        default:
            return state;
    }
}

export default YourBarsReducer;