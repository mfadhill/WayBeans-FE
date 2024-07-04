import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib/api";


export const allTransactionByUser = createAsyncThunk<
    ITransaction[],
    void,
    { rejectValue: string }
>("product/", async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get("/transaction/user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(data);
        return data;
    } catch (error) {
        return rejectWithValue("error");
    }
});

export const alltransaction = createAsyncThunk<
    ITransaction[],
    void,
    { rejectValue: string }
>("product/", async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get("/transaction", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(data);
        return data;
    } catch (error) {
        return rejectWithValue("error");
    }
});

