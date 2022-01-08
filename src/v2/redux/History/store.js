import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { default as usersReducerV2 } from '@/v2/redux/users/reducer';
import { default as userSessionReducerV2 } from '@/v2/redux/user_session/reducer';

const rootReducer = combineReducers({
  usersStore: usersReducerV2,
  userSession: userSessionReducerV2,
});

export default () => createStore(rootReducer, undefined, applyMiddleware(thunk));
