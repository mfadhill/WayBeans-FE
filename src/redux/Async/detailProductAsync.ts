import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib/api";


export const detailProductAsync = createAsyncThunk<
    IProduct,
    string,
    { rejectValue: string }
>("product/", async (id: string, { rejectWithValue }) => {
    try {
        const { data } = await API.get("/product/" + id, {
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
