import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./Slice/authSlice";
import allProductReducer from "../redux/Slice/allProductSlice";
import detailProductReducer from "../redux/Slice/detailProduct";
import detailCartReducer from "../redux/Slice/detailCartSlice";
import alltransactionUserReducer from "./Slice/allTransactionUserSlice";
import transactionSellerReducer from "./Slice/allTransactionSellerSlice";
import allCartReducer from "./Slice/cartSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        allProduct: allProductReducer,
        detailProduct: detailProductReducer,
        detailCart: detailCartReducer,
        allTransactionUser: alltransactionUserReducer,
        allTransactionSeller: transactionSellerReducer,
        allCart: allCartReducer
    },
});

// static type untuk selector dan dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks yang sudah diberi static type
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
