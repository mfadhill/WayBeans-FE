import React, { useState } from "react";
import {
    AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Box, Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from "../../redux/store";
import { logoutAsync } from "../../redux/Async/authAsync";

interface IPorps {
    image: string;
    cartLength: number
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "#ffffff", // Ubah sesuai kebutuhan warna background
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Efek bayangan jika diperlukan
}));

const NavBarLogin: React.FC<IPorps> = ({ image, cartLength }: IPorps) => {
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
                <Link to={'/'} style={{ textDecoration: "none" }}>
                    <img height={'50px'} src="/logo.png" />
                </Link>
                <Box>
                    <IconButton sx={{ marginRight: "20px" }} onClick={(e) => navigate('/cart')}>
                        <Badge badgeContent={cartLength} color="error">
                            <ShoppingCartOutlinedIcon fontSize="large" sx={{ color: "#613D2B" }} />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleClick}
                    >
                        <Avatar alt="User Avatar" src={image} />
                    </IconButton>
                </Box>
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
                    <MenuItem onClick={(e) => navigate('/profile')}>
                        <Box
                            textAlign={"center"}
                            sx={{
                                alignItem: "center",
                                justifyContent: "center",
                                display: "flex",
                            }}
                        >
                            <AccountCircleOutlinedIcon
                                sx={{ marginRight: "5px", color: "#613D2B" }}
                            />
                            <Typography fontWeight={"700"}> Profile</Typography>
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

export default NavBarLogin;
