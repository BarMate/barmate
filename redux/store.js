/* 
    redux/store.js

    Initialize redux store

    Author: Joseph Contumelio
    Copyright(C) 2018, Barmate l.l.c.
    All rights reserved
*/

import reducer from './reducersIndex';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {
    return createStore(reducer, composeWithDevTools());
}