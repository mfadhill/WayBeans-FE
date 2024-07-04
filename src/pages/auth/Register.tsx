import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import UseRegisterValidate from "../../lib/validation/UseRegisterValidation";
import { UseRegister } from "./hooks/useRegister";
import { Controller } from "react-hook-form";

const Register = () => {
    const { control, reset, handleSubmit } = UseRegisterValidate();
    const { onSubmit, onErrorSubmit } = UseRegister({ reset });

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: "100px" }}>
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
                        Register
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1 }}
                        onSubmit={handleSubmit(onSubmit, onErrorSubmit)}
                    >
                        <Controller
                            control={control}
                            name="fullname"
                            render={({ field, fieldState }) => (
                                <TextField
                                    margin="normal"
                                    required
                                    color="primary"
                                    fullWidth
                                    label="Fullname"
                                    id="fullname"
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
                                    id="email"
                                    color="primary"
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
                            Register
                        </Button>
                        <Typography>
                            Alredy have account ? klik{" "}
                            <Link
                                to={"/auth/login"}
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

export default Register;
