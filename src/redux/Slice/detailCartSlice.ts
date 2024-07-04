import { createSlice } from "@reduxjs/toolkit";
import { detailCart } from "../Async/detailCartAsync";

const initialState: { cart: ICart } = {
    cart: {} as ICart,
};

export const detailCartSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(detailCart.pending, (_, action) => {
            console.log("pending", action);
        });
        builder.addCase(detailCart.fulfilled, (state, action) => {
            state.cart = action.payload
        })
        builder.addCase(detailCart.rejected, (_, action) => {
            console.log("rejected", action);

        })
    },
});

export default detailCartSlice.reducer
