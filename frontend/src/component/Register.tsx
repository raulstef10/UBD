import {Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";
import {FormEvent} from "react";
import {Link, useHistory} from "react-router-dom";
import {RegisterApi} from "../service/auth";
import RegisterRequest from "../service/types/RegisterRequest";

function Register() {
    const history = useHistory();
    const doRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        const passwordConfirm = data.get("confirmpassword") as string;
        let registerDetails: RegisterRequest = {
            username: data.get("username") as string,
            password: data.get("password") as string,
            fullname: data.get("fullname") as string,
            dateofbirth: data.get("dateofbirth") as string,
            address: data.get("address") as string,
        }
        if (passwordConfirm !== registerDetails.password) {
            alert("Passwords do not match!")
        } else {
            await RegisterApi(registerDetails).then(
                (response) => {
                    alert("You may log in");
                    history.push("/login");
                },
                (error) => {
                    alert(error.response.data.message);
                }
            )
        }
    }
    return (
        <div style={{backgroundImage: "url(/img/loginPic.png)", height: "90vh"}}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Box component="form" onSubmit={doRegister} noValidate sx={{mt: 1}} style={{
                        float: "left", backgroundColor: "rgb(240, 240, 240, 0.9)",
                        border: "3px solid #f1f1f1"
                    }}>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            style={{background: "azure"}}
                            name="username"
                            autoComplete="username"
                            autoFocus/>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fullname"
                            label="Full name"
                            style={{background: "azure"}}
                            name="fullname"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            style={{background: "azure"}}
                            name="address"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            type="date"
                            name="dateofbirth"
                            label="Date of Birth"
                            style={{background: "azure"}}
                            id="dateofbirth"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            style={{background: "azure"}}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmpassword"
                            label="Confirm Password"
                            style={{background: "azure"}}
                            type="password"
                            id="confirmpassword"
                            autoComplete="current-password"
                        />
                        <Button color={"warning"}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}>
                            Register
                        </Button>
                        <Button color={"warning"}
                            component={Link}
                            to={'/login'}
                            fullWidth
                            variant="contained"
                            sx={{mb: 2}}
                        >
                            Have an account? Press here to login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default Register;
