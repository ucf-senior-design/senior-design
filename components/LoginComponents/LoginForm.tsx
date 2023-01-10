import { Grid, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import theme from "../../styles/theme/Theme";
import LinkButton from "./LinkButton";
import LoginButton from "./LoginButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const LoginForm = () => {
    const [user, sUser] = useState({
        email:"",
        password:"",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    return (
        <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
        xs={4}
        style={{color:theme.palette.tertiary.main}}
        >
            <Paper
                elevation={3}
                style={{
                    background:theme.palette.secondary.main,
                    padding:20,
                    paddingBottom:40    
                }}
                >

                <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                >

                    <Typography variant="h4" style={{fontWeight:500, color:theme.palette.tertiary.main, padding:5}}>login</Typography>
                    <Typography style={{color:theme.palette.tertiary.main, paddingBottom:15}}>enter your details to log in</Typography>
                    <form>

                        <Grid
                        container
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="stretch"
                        >

                        <TextField
                            required
                            id="email-input"
                            value={user.email}
                            label="email"
                            placeholder="email@domain.com"
                            onChange={(e) =>
                                sUser((user) => ({
                                ...user,
                                email: e.target.value,
                                }))
                            }
                            sx={{marginBottom:3}}
                        />

                        <TextField
                            required
                            id="password-input"
                            value={user.password}
                            label="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            onChange={(e) =>
                                sUser((user) => ({
                                ...user,
                                password: e.target.value,
                                }))
                            }
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />

                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{marginBottom:4, marginTop:1}}
                            >
                            <LinkButton link="/" text="forgot your password?"/>
                        </Grid>
                            <LoginButton />
                        </Grid>
                    </form>
                    <p>
                        <a style={{paddingRight:5}}>don&apos;t have an account?</a>
                        <LinkButton link="/" text="sign up" />
                    </p>
                </Grid>
            </Paper>
        </Grid>
    )
}