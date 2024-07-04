import { createSlice } from "@reduxjs/toolkit";
import { AllProductAsync } from "../Async/allProductAsync";

const initialState: { product: IProduct[] } = {
    product: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(AllProductAsync.pending, (_, action) => {
            console.log("pending", action);
        });
        builder.addCase(AllProductAsync.fulfilled, (state, action) => {
            state.product = action.payload
        })
        builder.addCase(AllProductAsync.rejected, (_, action) => {
            console.log("rejected", action);

        })
    },
});

export default productSlice.reducer
