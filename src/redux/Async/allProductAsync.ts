import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib/api";


export const AllProductAsync = createAsyncThunk<
    IProduct[],
    void,
    { rejectValue: string }
>("product/", async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get("/product", {
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
