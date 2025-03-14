import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
// import cartReducer from "./cartReducer";
// import orderRedux from "./orderRedux";
// import chatReducer from "./chatReducer";
// import userReducer from "./userReducer";

const store = configureStore({ reducer: { products: productReducer } });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
