import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import dayjs from "dayjs";
import QrCode from "react-qr-code";
// import { QrCode } from "@mui/icons-material";
interface IProps {
    title: string;
    date: string;
    price: number;
    image: string;
    id: string;
    qty: number;
    status: "wait" | "approve" | "reject"; // Define the enum-like type for status
}

const TransactionCard: React.FC<IProps> = ({
    id,
    title,
    date,
    price,
    qty,
    status,
    image,
}) => {
    const toRupiah = (price: number): string => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Define background color based on status
    const getStatusBgColor = (status: "wait" | "approve" | "reject") => {
        switch (status) {
            case "wait":
                return "#FFA500"; // Warning color
            case "approve":
                return "#4CAF50"; // Success color
            case "reject":
                return "#FF0000"; // Error color
            default:
                return "#FFFFFF"; // Default white color if status is unknown
        }
    };
    console.log(image);

    return (
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
                    src={image}
                    alt={title}
                    width="100px"
                    height="150px"
                    style={{ objectFit: "cover" }}
                />
                <Box>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: "#613D2B", fontWeight: "700" }}
                    >
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#613D2B" }}>
                        <b>{dayjs(date).format("dddd")}</b>,{" "}
                        {dayjs(date).format(" D MMMM YYYY")}
                    </Typography>
                    <Typography variant="body1">Price : {toRupiah(price)}</Typography>
                    <Typography variant="body1">Qty : {qty}</Typography>
                    <Typography variant="body1" fontWeight="bold">
                        Sub Total : {toRupiah(price * qty)}
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
                <Typography variant="h6" fontWeight="bold">
                    WaysBeans
                </Typography>
                <QrCode size={600} value={id} />
                <Typography
                    variant="body2"
                    sx={{
                        backgroundColor: getStatusBgColor(status),
                        padding: "4px 8px",
                        borderRadius: "4px",
                        color: "#FFFFFF", // Text color white for better readability
                    }}
                >
                    {status}
                </Typography>
            </Box>
        </Paper>
    );
};

export default TransactionCard;
