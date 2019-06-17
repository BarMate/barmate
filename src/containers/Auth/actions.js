export function sendUserInfo(info) {
    return {
        type: 'SEND_USER_INFO',
        payload: info,
    }
}