import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
// import cartReducer from "./cartReducer";
// import orderRedux from "./orderRedux";
// import chatReducer from "./chatReducer";
// import userReducer from "./userReducer";

export default configureStore({ reducer: { products: productReducer } });
