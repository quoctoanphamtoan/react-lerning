import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import TodoListReducer from "./reducer/TodoListReducer";

//midelware saga
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import loadingReducer from './reducer/loadingReducer';
const middleWareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
    TodoListReducer,
    loadingReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk,middleWareSaga)));
middleWareSaga.run(rootSaga);
export default store;