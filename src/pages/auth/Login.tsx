import React from "react";
import { Container, TextField, Button, Typography, Box, Paper, } from "@mui/material";
import { Link } from "react-router-dom";
import UseLogin from "./hooks/useLogin";
import UseLoginValidate from "../../lib/validation/UseLoginValidation";
import { Controller } from "react-hook-form";

const Login = () => {
    const { control, reset, handleSubmit } = UseLoginValidate();
    const { onSubmit, onErrorSubmit } = UseLogin({ reset });
    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: "100px" }} >
            <Paper
                elevation={3}
                style={{ padding: "20px", marginTop: "20px", borderRadius: "15px" }}
            >
                <Box display="flex" flexDirection="column" alignItems="start">
                    <Typography
                        component="h1"
                        variant="h4"
                        fontWeight={"700"}
                        sx={{ color: "#613D2B" }}
                    >
                        Login
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit, onErrorSubmit)}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <Controller
                            control={control}
                            name="email"
                            render={({ field, fieldState }) => (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    color="primary"
                                    id="email"
                                    label="Email"
                                    {...field}
                                    helperText={fieldState.error?.message}
                                    error={Boolean(fieldState.error)}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field, fieldState }) => (
                                <TextField
                                    margin="normal"
                                    required
                                    color="primary"
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    {...field}
                                    helperText={fieldState.error?.message}
                                    error={Boolean(fieldState.error)}
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: "#613D2B" }}
                        >
                            Login
                        </Button>
                        <Typography>
                            Don't have an account yet? klik{" "}
                            <Link
                                to={"/auth/register"}
                                style={{
                                    textDecoration: "none",
                                    color: "#613D2B",
                                    fontWeight: "700",
                                }}
                            >
                                Here
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
