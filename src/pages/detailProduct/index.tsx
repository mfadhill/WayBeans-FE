import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { detailProductAsync } from "../../redux/Async/detailProductAsync";
import { API } from "../../lib/api";
import { allCartByUser } from "../../redux/Async/cartAsync";
import { authCheckAsync } from "../../redux/Async/authAsync";

const DetailProduct = () => {
    const { id } = useParams();
    const { isLogin } = useAppSelector((state) => state.auth)
    const detailProduct = useAppSelector((state) => state.detailProduct.product)
    const dispatch = useAppDispatch()

    const data = ""
    React.useEffect(() => {
        dispatch(detailProductAsync(id!))
    }, [])
    const navigate = useNavigate()
    const handleAddTocart = async () => {
        try {
            const add = await API.post(`cart/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                onUploadProgress: (progressEvent) => {
                    console.log(progressEvent);

                }
            })
            dispatch(authCheckAsync())
            dispatch(allCartByUser())
            navigate('/cart')
            return add
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                gap: "24px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "24px",
                    width: "1000px",
                    p: 5,
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Bayangan
                }}
            >
                <Box width={"2000px"}>
                    <img
                        src={detailProduct.imageProduct}
                        height="400px"
                        width="100%"
                        alt="Product Image"
                        style={{ objectFit: "cover" }} // Objek fit cover untuk gambar
                    />
                </Box>
                <Box
                    sx={{
                        marginLeft: "50px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{ fontWeight: "700", color: "#613D2B" }}
                        >
                            {detailProduct.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ mb: 2, color: "#613D2B", fontWeight: "700" }}
                        >
                            Stock : {detailProduct.stock}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            {detailProduct.description}
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            variant="text"
                            fullWidth
                            sx={{ bgcolor: "#613D2B", color: "#ffffff", alignItems: "center" }}
                            onClick={isLogin ? (e) => handleAddTocart() : (e) => navigate(`/auth/register`)}
                        >
                            Add To Cart
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DetailProduct;
