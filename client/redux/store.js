import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  useReducer  from './user/UserSlice.js'
import { persistStore } from 'redux-persist'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'



const rootReducer = combineReducers({
  user : useReducer
})

const persisiConfig = {
  key: 'root',
  storage,
  version :1,
}

const persistreducer =persistReducer(persisiConfig, rootReducer)


export const store = configureStore({
  reducer: persistreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);