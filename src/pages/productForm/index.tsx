import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    CircularProgress,
} from "@mui/material";
import { AttachFileRounded } from "@mui/icons-material";
import { API } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { AllProductAsync } from "../../redux/Async/allProductAsync";
import UseProductValidate from "../../lib/validation/useProductVadation";
import UseAddProduct from "./hooks/UseAddProduct";
import { Controller } from "react-hook-form";

const ProductForm = () => {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { control, reset, handleSubmit } = UseProductValidate();
    const { loading, onErrorSubmit, onSubmit, uploadProgress } = UseAddProduct({
        reset,
        imageFile,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
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
                    sx={{ color: "#613D2B", textAlign: "left" }}
                >
                    Add Product
                </Typography>
                <Box sx={{ textAlign: "left" }}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field, fieldState }) => (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="Name"
                                label="Name"
                                color="primary"
                                sx={{ width: "100%", margin: "8px auto" }}
                                {...field}
                                helperText={fieldState.error?.message}
                                error={Boolean(fieldState.error)}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="stock"
                        render={({ field, fieldState }) => (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="stock"
                                type="number"
                                label="Stock"
                                autoComplete="stock"
                                color="primary"
                                sx={{ width: "100%", margin: "8px auto" }}
                                {...field}
                                helperText={fieldState.error?.message}
                                error={Boolean(fieldState.error)}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="price"
                        render={({ field, fieldState }) => (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="price"
                                label="Price"
                                color="primary"
                                type="number"
                                autoComplete="price"
                                sx={{ width: "100%", margin: "8px auto" }}
                                {...field}
                                helperText={fieldState.error?.message}
                                error={Boolean(fieldState.error)}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="descriptionsProduct"
                        render={({ field, fieldState }) => (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="Description Product"
                                label="Description Product"
                                autoComplete="Description Product"
                                multiline
                                rows={4}
                                color="primary"
                                sx={{ width: "100%", margin: "8px auto" }}
                                {...field}
                                helperText={fieldState.error?.message}
                                error={Boolean(fieldState.error)}
                            />
                        )}
                    />
                    {image ? (
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
                            <Typography color="#613D2B">Change Image *</Typography>
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
                        <Box
                            sx={{
                                border: "1px solid #613D2B",
                                padding: "15px",
                                borderRadius: "5px",
                                width: "40%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography color="#613D2B">Photo Product*</Typography>
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
                    )}
                    <Box
                        sx={{
                            width: "100%",
                            marginTop: "10px",
                            display: "flex",
                            alignItems: "end",
                            justifyContent: "end",
                        }}
                    >
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ bgcolor: "#613D2B", color: "#fff", width: "50%" }}
                            onClick={handleSubmit(onSubmit, onErrorSubmit)}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Submit"}
                        </Button>
                    </Box>
                </Box>
            </Box>
            {image ? (
                <Box>
                    <Box
                        sx={{
                            width: "450px",
                            height: "530px",
                            padding: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            flexGrow: 1,
                        }}
                    >
                        <img
                            src={image as string}
                            alt="Product"
                            width="100%"
                            height="100%"
                            style={{ objectFit: "cover" }}
                        />
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Box
                        sx={{
                            width: "450px",
                            height: "530px",
                            padding: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "16px",
                            flexGrow: 1,
                            border: "2px grey dashed",
                        }}
                    >
                        <Typography textAlign={"center"} sx={{ color: "grey" }}>
                            Add Your Product Image *
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ProductForm;
