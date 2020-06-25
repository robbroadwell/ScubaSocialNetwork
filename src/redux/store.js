import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import jwt_decode from 'jwt-decode'
import { SET_USER, setUser } from "../redux/actions";

const persistConfig = {
  key: 'root',
  storage,
}

const checkTokenExpiration = store => next => action => {
  console.log(action);
  if (action.type !== SET_USER && store.getState().user && store.getState().user.token && jwt_decode(store.getState().user.token).exp < Date.now() / 1000) {
    store.dispatch(setUser([]))
  }
  next(action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(thunk, checkTokenExpiration));
  let persistor = persistStore(store)
  return { store, persistor }
}
