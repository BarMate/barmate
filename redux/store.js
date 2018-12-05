import reducer from './reducers';
import { createStore } from 'redux';

export default function configureStore() {
    return createStore(reducer);
}