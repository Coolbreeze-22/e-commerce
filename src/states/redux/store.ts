import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import countdownReducer from "./countdownReducer";
// import chatReducer from "./chatReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  productReducer,
  cartReducer,
  orderReducer,
  userReducer,
  countdownReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer", "cartReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
