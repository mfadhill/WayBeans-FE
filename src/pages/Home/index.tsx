import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCart from "../../components/card/productCard";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { AllProductAsync } from "../../redux/Async/allProductAsync";
import { toast } from "react-toastify";

const Home = () => {
    const product = useAppSelector((state) => state.allProduct.product);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(AllProductAsync())
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
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
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                padding: "0 16px",
                marginTop: "70px",
            }}
        >
            <Box>
                <img
                    src="/image.png"
                    width={"1080px"}
                    height={"480px"}
                    alt="Jumbotron Image"
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    minHeight: "100vh",
                    marginTop: "40px",
                    width: "1080px",
                    flexWrap: "wrap",
                    gap: "20px 60px", // Jarak antar produk
                }}
            >
                {product.map((product) => (
                    <ProductCart
                        key={product.id}
                        id={product.id}
                        image={product.imageProduct}
                        price={product.price}
                        stock={product.stock}
                        title={product.name}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Home;
