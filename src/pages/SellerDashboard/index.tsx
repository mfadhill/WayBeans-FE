import React from "react";
import {
    Box,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { alltransactionSeller } from "../../redux/Async/allTransactionSeller";
import { API } from "../../lib/api";
import { Update } from "@mui/icons-material";


enum Status {
    APPROVE = "approve",
    REJECT = "reject",
    WAIT = "wait",
}

const SellerDashboard = () => {
    const transactions = useAppSelector(
        (state) => state.allTransactionSeller.Transaction
    );
    const dispatch = useAppDispatch();
    const [isloading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        dispatch(alltransactionSeller()).then(
            () => setIsLoading(false)
        ).catch(() => setIsLoading(false))
    }, []);

    const handleClick = async (status: Status, id: string) => {
        setIsLoading(true)
        try {
            const update = await API.patch(`/transaction/${id}`, { status: status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }

            })
            console.log(Update);
            dispatch(alltransactionSeller())
            setIsLoading(false)
            return update
        } catch (error) {
            console.log(error);
        }
    };

    if (isloading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box sx={{ padding: "24px" }}>
            <Typography
                variant="h4"
                fontWeight="700"
                sx={{ color: "#613D2B", marginBottom: "24px" }}
            >
                Income transaction
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Post Code</TableCell>
                            <TableCell>Products Order</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction, index) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{transaction.name}</TableCell>
                                <TableCell>{transaction.address}</TableCell>
                                <TableCell>{transaction.possCode}</TableCell>
                                <TableCell>
                                    {transaction.productTransactions.product.name}
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            color:
                                                transaction.status === "wait"
                                                    ? "#FFA500"
                                                    : transaction.status === "approve"
                                                        ? "green"
                                                        : "red",
                                        }}
                                    >
                                        {transaction.status === "wait"
                                            ? "Waiting Approve"
                                            : transaction.status === "approve"
                                                ? "Success"
                                                : "Cancel"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {transaction.status === "wait" ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "red",
                                                    color: "white",
                                                    marginRight: "8px",
                                                    "&:hover": {
                                                        backgroundColor: "#d32f2f",
                                                    },
                                                }}
                                                onClick={() => handleClick(Status.REJECT, transaction.id)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "green",
                                                    color: "white",
                                                    "&:hover": {
                                                        backgroundColor: "#388e3c",
                                                    },
                                                }}
                                                onClick={() => handleClick(Status.APPROVE, transaction.id)}
                                            >
                                                Approve
                                            </Button>
                                        </>
                                    ) : transaction.status === "approve" ? (
                                        <CheckCircleIcon sx={{ color: "green" }} />
                                    ) : (
                                        <CancelIcon sx={{ color: "red" }} />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SellerDashboard;
