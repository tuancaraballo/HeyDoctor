import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/reducers'

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);


const store = createStoreWithMiddleware(rootReducer); // pass the rootreducent inside

export default store;
