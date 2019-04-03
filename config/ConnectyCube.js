import { ConnectyCube } from 'connectycube-reactnative'

let CREDENTIALS = {
    appID: 492,
    authKey: '4rQO5qxRBDCCggC',
    authSecret: 'Mqt5SB43HfEs7Ds',
}

let CONFIG = {
    debug: { mode: 1 }
}

ConnectyCube.init(CREDENTIALS, CONFIG);