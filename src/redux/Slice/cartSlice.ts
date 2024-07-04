import { createSlice } from "@reduxjs/toolkit";
import { allCartByUser } from "../Async/cartAsync";

const initialState: { cart: ICart[] } = {
    cart: [],
};

export const allCartSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(allCartByUser.pending, (_, action) => {
            console.log("pending", action);
        });
        builder.addCase(allCartByUser.fulfilled, (state, action) => {
            state.cart = action.payload
        })
        builder.addCase(allCartByUser.rejected, (_, action) => {
            console.log("rejected", action);

        })
    },
});

export default allCartSlice.reducer
