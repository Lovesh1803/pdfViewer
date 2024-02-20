import {applyMiddleware, compose, createStore} from 'redux';
import AppReducers from '../reducers';
import thunk from 'redux-thunk';

/**
 * @author Lovesh Singh
 * @since 20-02-2024
 * @description app redux store
 */
const store = createStore(
  AppReducers,
  {},
  compose(applyMiddleware(thunk)), // for development only
);

export default store;
