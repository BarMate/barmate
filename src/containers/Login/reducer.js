const initStateLogin = {
    test: 0,
}

const LoginReducer = (state = initStateLogin, action) => {
    switch(action.type) {
        case 'TEST':
            return {
                ...state,
                test: test++,
            }
        default:
            return state;
    }
}

export default LoginReducer;