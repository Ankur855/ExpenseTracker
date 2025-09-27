import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import todoReducer from '../Redux/Slices/AddTaskSlice';
// create persistance to store after app is killed
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['Todo'], // reducers you want to persist
};

const rootReducer = combineReducers({
  Todo: todoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const store = configureStore({reducer: persistedReducer});
export const persistor = persistStore(store);
