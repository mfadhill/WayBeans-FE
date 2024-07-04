import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { allCartByUser } from "../../../redux/Async/cartAsync";
import CartItem from "./CartItem";

const index = () => {
    const cart = useAppSelector((state) => state.allCart.cart);
    const dispatch = useAppDispatch();
    const [isLoading, setIsloading] = React.useState(true);

    React.useEffect(() => {
        dispatch(allCartByUser())
            .then(() => setIsloading(false))
            .catch(() => setIsloading(false));
    }, [dispatch]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Box sx={{ padding: "32px" }}>
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: "#613D2B" }}
            >
                My Cart
            </Typography>

            <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ marginBottom: "16px", color: "#613D2B" }}
            >
                Review Your Order
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {cart.map((item, index) => (
                    <CartItem cart={item} key={index} />
                ))}
            </Box>
        </Box>
    );
};

export default index;
