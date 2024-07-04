import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import TransactionCard from "../../components/card/TransactionCard";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { allTransactionByUser } from "../../redux/Async/allTransactionByUser";

const Profile = () => {
    const { profile } = useAppSelector((state) => state.auth);
    const [isloading, setIsLoading] = React.useState(true);
    const transaction = useAppSelector(
        (state) => state.allTransactionUser.Transaction
    );
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(allTransactionByUser())
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
    }, []);
    console.log(transaction);

    if (isloading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                padding: "32px",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{ display: "flex", marginBottom: "32px", gap: "100px" }}>
                <Box sx={{ marginRight: "32px" }}>
                    <Typography
                        variant="h4"
                        fontWeight="700"
                        sx={{ color: "#613D2B", marginBottom: "16px" }}
                    >
                        My Profile
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "start", height: "200px" }}>
                        <img
                            src={
                                profile.photoProfile
                                    ? profile.photoProfile
                                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            width="170px"
                            height="100%"
                            style={{ marginTop: "5px", objectFit: "cover" }}
                            alt="Profile"
                        />
                        <Box marginLeft="16px">
                            <Typography
                                variant="h5"
                                fontWeight="700"
                                sx={{ color: "#613D2B" }}
                            >
                                Full Name
                            </Typography>
                            <Typography sx={{ marginBottom: "8px" }}>
                                {profile.fullname}
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight="700"
                                sx={{ color: "#613D2B" }}
                            >
                                Email
                            </Typography>
                            <Typography>{profile.email}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        variant="h4"
                        fontWeight="700"
                        sx={{ color: "#613D2B", marginBottom: "16px" }}
                    >
                        Transactions
                    </Typography>
                    <Box>
                        {transaction.map((transaction, index) => (
                            <TransactionCard
                                id={transaction.id + transaction.userId}
                                image={transaction.productTransactions.product.imageProduct}
                                key={index}
                                title={transaction.productTransactions.product.name}
                                date={transaction.productTransactions.product.createdAt}
                                price={transaction.productTransactions.product.price}
                                qty={transaction.total}
                                status={transaction.status}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;
