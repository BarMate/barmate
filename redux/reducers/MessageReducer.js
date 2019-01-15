const initialState_message = {
    id: 0,
    text: null,
    time: null,
    author: null,
}

const message = (state = initialState_message, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                id: action.id,
                text: action.text,
                time: action.time,
                author: action.author
            }
        default:
            return state
    }
}

export default message;