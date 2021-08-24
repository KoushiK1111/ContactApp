import { createStore, combineReducers, applyMiddleware } from 'redux';
import Reducer from './reducers/Reducer';
import Uid_Reducer from './reducers/Uid_Reducer';
import thunk from 'redux-thunk';


const RootReducer = combineReducers({ Reducer, uid: Uid_Reducer })

const store = createStore(RootReducer, applyMiddleware(thunk));

export default store;