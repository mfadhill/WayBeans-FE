import { Box, Container } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../redux/store'
import React from 'react'

const AuthLayout: React.FC = () => {
    const { isLogin, profile } = useAppSelector((state) => state.auth)
    if (isLogin && profile) {
        return <Navigate to={'/'} />
    }
    return (
        <Box className="container" sx={{ color: "white", height: "100vh", }} >
            <Container className="container">
                <Outlet />
            </Container>
        </Box>
    )
}

export default AuthLayout;