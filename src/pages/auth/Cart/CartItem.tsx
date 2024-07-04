import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    IconButton,
    Divider,
    Paper,
    TextField,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { detailProductAsync } from "../../../redux/Async/detailProductAsync";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../../lib/api";
import { authCheckAsync } from "../../../redux/Async/authAsync";
import { allCartByUser } from "../../../redux/Async/cartAsync";
import { toast } from "react-toastify";

const CartItem: React.FC<{
    totalOrder: number;
    product: IProduct;
    onAdd: () => void;
    onRemove: () => void;
    onDelete: () => void;
}> = ({ product, onAdd, onRemove, onDelete, totalOrder }) => (
    <Box
        sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 0",
        }}
    >
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
                src={product.imageProduct}
                alt={product.name}
                width="100px"
                height="100px"
                style={{ objectFit: "cover", marginRight: "16px" }}
            />
            <Box>
                <Typography fontWeight="bold" sx={{ color: "#613D2B" }}>
                    {product.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                    <IconButton onClick={onRemove} sx={{ color: "#613D2B" }}>
                        <Remove />
                    </IconButton>
                    <Typography sx={{ color: "#613D2B" }}>{totalOrder}</Typography>
                    {/* <TextField value={totalOrder}/> */}
                    <IconButton onClick={onAdd} sx={{ color: "#613D2B" }}>
                        <Add />
                    </IconButton>
                    {/* <IconButton onClick={onDelete} sx={{ color: "#613D2B" }}>
            <Delete />
          </IconButton> */}
                </Box>
            </Box>
        </Box>
        <Box
            sx={{
                alignItems: "end",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box>
                <Typography sx={{ color: "#613D2B" }}>
                    Rp. {product.price ? product.price.toLocaleString() : ""}
                </Typography>
            </Box>
            <IconButton sx={{ color: "#613D2B", padding: "10px 0" }} onClick={onDelete}>
                <Delete />
            </IconButton>
        </Box>
    </Box>
);

const CartSummary: React.FC<{
    product: IProduct;
    totalOrder: number;
    handleSubmit: () => void;
}> = ({ product, totalOrder, handleSubmit }) => {
    const subtotal = product.price * totalOrder;

    return (
        <Paper>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid #613D2B",
                    marginBottom: "15px",
                }}
            >
                <Typography sx={{ color: "#613D2B", marginTop: "10px" }}>
                    Subtotal
                </Typography>
                <Typography sx={{ color: "#613D2B", marginTop: "10px" }}>
                    Rp. {subtotal}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                }}
            >
                <Typography sx={{ color: "#613D2B" }}>Qty</Typography>
                <Typography sx={{ color: "#613D2B" }}>{totalOrder}</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                    borderTop: "1px solid #613D2B",
                }}
            >
                <Typography
                    fontWeight="bold"
                    sx={{ color: "#613D2B", marginTop: "15px" }}
                >
                    Total
                </Typography>
                <Typography
                    fontWeight="bold"
                    sx={{ color: "#613D2B", marginTop: "15px" }}
                >
                    Rp. {subtotal}
                </Typography>
            </Box>
            <Button
                sx={{ backgroundColor: "#613D2B", color: "#ffffff" }}
                fullWidth
                onClick={(e) => handleSubmit()}
            >
                Proceed To Checkout
            </Button>
        </Paper>
    );
};

interface IProps {
    cart: ICart;
}

const MainCart: React.FC<IProps> = ({ cart }: IProps) => {
    const product = cart.product;
    const [totalOrder, setTotalOrder] = useState<number>(0);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const editCart = async () => {
        const data = {
            totalOrder,
        };
        if (data.totalOrder === 0) {
            toast.error("you cant buy 0 beans", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => navigate("/cart")
            })
        }
        try {
            const addcart = await API.patch(`cart/${cart.id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(addcart);
            navigate(`/transaction/${cart.id}`);
            return addcart;
        } catch (error) {
            console.log(error);
        }
    };
    const handleAdd = () => {
        if (product && totalOrder < product.stock) {
            setTotalOrder((prevTotalOrder) => prevTotalOrder + 1);
        }
    };

    const handleRemove = () => {
        if (totalOrder > 0) {
            setTotalOrder((prevTotalOrder) => prevTotalOrder - 1);
        }
    };

    const handleDelete = async () => {
        try {
            const removeCart = await API.delete(`cart/${cart.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch(authCheckAsync())
            dispatch(allCartByUser())
            return removeCart
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                }}
            >
                <Box sx={{ width: "60%" }}>
                    <Divider sx={{ borderColor: "#613D2B" }} />
                    {product && (
                        <React.Fragment>
                            <CartItem
                                totalOrder={totalOrder}
                                product={product}
                                onAdd={handleAdd}
                                onRemove={handleRemove}
                                onDelete={handleDelete}
                            />
                            <Divider sx={{ borderColor: "#613D2B" }} />
                        </React.Fragment>
                    )}
                </Box>
                <Box sx={{ width: "35%" }}>
                    {product && (
                        <CartSummary
                            totalOrder={totalOrder}
                            product={product}
                            handleSubmit={editCart}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default MainCart;
