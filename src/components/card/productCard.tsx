import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

interface IProps {
    id: string;
    image: string;
    price: number;
    stock: number;
    title: string;
}

const formatCurrency = (price: number): string => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(price);
};

const ProductCart: React.FC<IProps> = ({
    id,
    image,
    price,
    stock,
    title,
}: IProps) => {
    const { isLogin } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                width: "200px",
                height: "380px",
                backgroundColor: "#F6E6DA",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            className="product-container"
        >
            <Box
                className="product-image"
                sx={{ width: "100%", height: "280px" }}
                onClick={
                    isLogin
                        ? (e) => navigate(`/detailProduct/${id}`)
                        : (e) => navigate(`/home/detailProduct/${id}`)
                }
            >
                <img
                    src={image}
                    alt={title}
                    width={"100%"}
                    height={"100%"}
                    style={{
                        objectFit: "cover",
                    }}
                />
            </Box>
            <Box
                sx={{
                    padding: "20px 10px",
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={"700"}
                    sx={{ color: "#613D2B", textAlign: "start" }}
                    onClick={
                        isLogin
                            ? (e) => navigate(`/detailProduct/${id}`)
                            : (e) => navigate(`/home/detailProduct/${id}`)
                    }
                >
                    {title}
                </Typography>
                <Typography sx={{ color: "#974A4A" }}>
                    {formatCurrency(price)}
                </Typography>
                <Typography sx={{ color: "#974A4A" }}>Stock: {stock}</Typography>
            </Box>
        </Box>
    );
};
export default ProductCart;
