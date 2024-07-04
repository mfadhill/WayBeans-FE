import { createSlice } from "@reduxjs/toolkit";
import { allTransactionByUser } from "../Async/allTransactionByUser";

const initialState: { Transaction: ITransaction[] } = {
    Transaction: [],
};

export const TransactionUserSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(allTransactionByUser.pending, (_, action) => {
            console.log("pending", action);
        });
        builder.addCase(allTransactionByUser.fulfilled, (state, action) => {
            state.Transaction = action.payload
        })
        builder.addCase(allTransactionByUser.rejected, (_, action) => {
            console.log("rejected", action);

        })
    },
});

export default TransactionUserSlice.reducer
