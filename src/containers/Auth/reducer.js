const initStateAuth = {
    userInfo: {},
}

const AuthReducer = (state = initStateAuth, action) => {
    switch(action.type) {
        case 'SEND_USER_INFO':
            return {
                ...state,
                userInfo: action.payload,
            }
        default:
            return state;
    }
}

export default AuthReducer;