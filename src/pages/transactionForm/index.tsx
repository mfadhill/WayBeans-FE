import React, { useState } from "react";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    CircularProgress,
    IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { detailCart } from "../../redux/Async/detailCartAsync";
import { API } from "../../lib/api";
import dayjs from "dayjs";
import { AttachFileRounded } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import UseTransactionValidate from "../../lib/validation/UseTransactionValidation";
import UseTransactionForm from "./hooks/UseTransactionForm";
import { Controller } from "react-hook-form";

const toRupiah = (price: number): string => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(price);
};

const TransactionForm = () => {
    const { id } = useParams();
    const Cart = useAppSelector((state) => state.detailCart.cart);
    const dispatch = useAppDispatch();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);
    const { control, reset, handleSubmit } = UseTransactionValidate();
    const { loading, onErrorSubmit, onSubmit, uploadProgress, setLoading } =
        UseTransactionForm({ reset, imageFile, id });

    React.useEffect(() => {
        setLoading(true);
        dispatch(detailCart(id!))
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch, id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress variant="determinate" value={uploadProgress} />
                <Typography variant="caption" sx={{ mt: 2 }}>
                    {uploadProgress}%
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: "32px",
                justifyContent: "center",
                padding: "20px",
            }}
        >
            <Box sx={{ width: "480px" }}>
                <Typography
                    variant="h4"
                    fontWeight="700"
                    sx={{ color: "#613D2B", mb: 3 }}
                >
                    Shipping
                </Typography>
                <Box>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field, fieldState }) => (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="Name"
                                color="primary"
                                label="Name"
                                {...field}
                                helperText={fieldState.error?.message}
                                error={Boolean(fieldState.error)}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="Email"
                                label="Email"
                                color="primary"
                                {...field}
                                helperText={fieldState.error?.message}
                                error={Boolean(fieldState.error)}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field, fieldState }) => (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Phone"
                                type="number"
                                color="primary"
                                {...field}
                                helperText={fieldState.error?.message}
                                error={Boolean(fieldState.error)}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="possCode"
                        render={({ field, fieldState }) => (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="posscode"
                                label="Postal Code"
                                color="primary"
                                {...field}
                                helperText={fieldState.error?.message}
                                error={Boolean(fieldState.error)}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="address"
                        render={({ field, fieldState }) => (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="Address"
                                label="Address"
                                autoComplete="Address"
                                multiline
                                rows={4}
                                color="primary"
                                {...field}
                                helperText={fieldState.error?.message}
                                error={Boolean(fieldState.error)}
                            />
                        )}
                    />
                    {imageUrl === null ? (
                        <Box
                            sx={{
                                border: "1px solid #613D2B",
                                padding: "15px",
                                borderRadius: "5px",
                                width: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography color="#613D2B">Upload Image *</Typography>
                            <IconButton
                                component="label"
                                sx={{ color: "#613D2B", padding: "0" }}
                            >
                                <AttachFileRounded />
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </IconButton>
                        </Box>
                    ) : (
                        <Box sx={{ position: "relative", display: "inline-block" }}>
                            <img
                                src={imageUrl!}
                                width="200px"
                                height="300px"
                                alt="Product"
                                style={{ objectFit: "cover" }}
                            />
                            <IconButton
                                component="label"
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    backgroundColor: "white",
                                    borderRadius: "50%",
                                }}
                            >
                                <EditIcon />
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </IconButton>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box>
                <Paper
                    elevation={3}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "16px",
                        marginBottom: "16px",
                        bgcolor: "#F6E6DA",
                        width: "700px",
                    }}
                >
                    <Box
                        sx={{
                            padding: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            flexGrow: 1,
                        }}
                    >
                        <img
                            src={Cart.product.imageProduct}
                            alt="Product"
                            width="100px"
                            height="150px"
                            style={{ objectFit: "cover" }}
                        />
                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{ color: "#613D2B" }}
                            >
                                {Cart.product.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#613D2B" }}>
                                <b>{dayjs(Cart.product.createdAt).format("dddd")}</b>,{" "}
                                {dayjs(Cart.product.createdAt).format(" D MMMM YYYY")}
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#613D2B" }}>
                                Price: {toRupiah(Cart.totalPrice)}
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#613D2B" }}>
                                Qty: {Cart.total}
                            </Typography>
                            <Typography
                                variant="body1"
                                fontWeight="bold"
                                sx={{ color: "#613D2B" }}
                            >
                                Sub Total: {toRupiah(Cart.totalPrice * Cart.total)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "8px",
                            gap: "8px",
                        }}
                    >
                        <img
                            src="/image.png"
                            alt="Payment Method"
                            width="100px"
                            height="40px"
                        />
                    </Box>
                </Paper>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ bgcolor: "#613D2B", color: "#fff" }}
                    onClick={handleSubmit(onSubmit, onErrorSubmit)}
                >
                    Pay
                </Button>
            </Box>
        </Box>
    );
};

export default TransactionForm;
