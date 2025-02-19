import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
type productType = {
    uid?: string;
    name: string;
    brand: string;
    category: string;
    subCategory: string;
    price: string;
    discountedPrice?: string;
    rating?: string;
    reviews?: string;
    quantity?: string;
    newArrival?: boolean;
    flashSales?: boolean;
    bestSellingProducts?: boolean;
    createdAt?: any;
    updatedAt?: any;
}

const initialState: productType = {
    uid: "",
    name: "",
    brand: "",
    category: "",
    subCategory: "",
    price: "",
    discountedPrice: "",
    rating: "",
    reviews: "",
    quantity: "",
    newArrival: false,
    flashSales: false,
    bestSellingProducts: false,
    createdAt: "",
    updatedAt: ""
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProducts(state, action: PayloadAction<any>) {
            
        },
        addProduct(state, action: PayloadAction<any>) {
            
        },
        deleteProduct(state, action: PayloadAction<any>) {
            
        },
        updateProduct(state, action: PayloadAction<any>) {
            
        },
    }
})

export const { getProducts, addProduct, deleteProduct, updateProduct } = productSlice.actions
export default productSlice.reducer;