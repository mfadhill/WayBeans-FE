import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../lib/api";
import { toast } from "react-toastify";

interface Ilogin {
    email: string;
    password: string;
}

const waitForToastToClose = (duration: number) => { //untuk waktu loading
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export const loginAsync = createAsyncThunk<
    string,
    Ilogin,
    { rejectValue: string }
>("auth/login", async (props, { rejectWithValue }) => {
    try {
        console.log("props", props);
        const { data } = await API.post("/auth/login", props);
        toast.success("Login Success", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        await waitForToastToClose(1500);

        console.log("data", data.token);
        const token = data.token;
        localStorage.setItem("token", token);
        return token;
    } catch (error) {
        toast.error("Login failed, Please check your inputs and try again.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        return rejectWithValue("error");
    }
});

export const authCheckAsync = createAsyncThunk<
    IUser,
    void,
    { rejectValue: string }
>("auth/authcheck", async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get("/auth/check", {
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

export const logoutAsync = createAsyncThunk<
    void,
    void,
    { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
    try {
        return localStorage.removeItem("token");
    } catch (error) {
        return rejectWithValue("error");
    }
});
