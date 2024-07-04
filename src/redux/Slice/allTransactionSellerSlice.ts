import { createSlice } from "@reduxjs/toolkit";
import { alltransactionSeller } from "../Async/allTransactionSeller";

const initialState: { Transaction: ITransaction[] } = {
    Transaction: [],
};

export const transactionSellerSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(alltransactionSeller.pending, (_, action) => {
            console.log("pending", action);
        });
        builder.addCase(alltransactionSeller.fulfilled, (state, action) => {
            state.Transaction = action.payload
        })
        builder.addCase(alltransactionSeller.rejected, (_, action) => {
            console.log("rejected", action);

        })
    },
});

export default transactionSellerSlice.reducer
