import { createSlice } from "@reduxjs/toolkit";
import { detailProductAsync } from "../Async/detailProductAsync";

const initialState: { product: IProduct } = {
    product: {} as IProduct,
};

export const detailProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(detailProductAsync.pending, (_, action) => {
            console.log("pending", action);
        });
        builder.addCase(detailProductAsync.fulfilled, (state, action) => {
            state.product = action.payload
        })
        builder.addCase(detailProductAsync.rejected, (_, action) => {
            console.log("rejected", action);

        })
    },
});

export default detailProductSlice.reducer
