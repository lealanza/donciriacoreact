import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/lib/persistStore';
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";

const reducers = combineReducers({
    user:userSlice,
    cart:cartSlice,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','cart'],
}
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck:false}),
})

export const persistor=persistStore(store);