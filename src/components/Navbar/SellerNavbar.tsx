import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from "../../redux/store";
import { logoutAsync } from "../../redux/Async/authAsync";

interface IPorps {
    image: string
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
}));

const SellerNavbar: React.FC<IPorps> = ({ image }: IPorps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <StyledAppBar position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Link to={'/seller'} style={{ textDecoration: "none" }}>
                    <img height={'50px'} src="/image.png" />
                </Link>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleClick}
                >
                    <Avatar alt="User Avatar" src="/beans.png" />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <MenuItem onClick={(e) => navigate('/seller/productform')}>
                        <Box
                            textAlign={"center"}
                            sx={{
                                alignItem: "center",
                                justifyContent: "center",
                                display: "flex",
                            }}
                        >
                            <img src='/logo.png' width={'20px'} height={'20px'} />
                            <Typography fontWeight={"700"}> Add Product</Typography>
                        </Box>
                    </MenuItem>
                    <MenuItem sx={{
                        borderTop: "2px solid #A8A8A8"
                    }}
                        onClick={(e) => dispatch(logoutAsync())}>
                        <Box
                            textAlign={"center"}
                            sx={{
                                alignItem: "center",
                                justifyContent: "center",
                                display: "flex",
                            }}
                        >
                            <LogoutIcon
                                sx={{ marginRight: "5px", color: "#E50914" }}
                            />
                            <Typography fontWeight={"700"}> Log Out</Typography>
                        </Box>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </StyledAppBar>
    );
};

export default SellerNavbar;
