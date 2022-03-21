import {FormEvent} from 'react'
import {useAppDispatch} from '../hooks';
import LoginApi from '../service/auth'
import '../store'
import {login} from '../state/login'
import {useHistory} from 'react-router';
import {Box, Button, Container, CssBaseline, TextField, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

function Login() {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const doLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        let username = data.get('username') as String;
        let password = data.get('password') as String;
        let response = await LoginApi(username, password);
        dispatch(login(response))
        history.replace("/");
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
                    <Box component="form" onSubmit={doLogin} noValidate sx={{mt: 1}} style={{
                        float: "left", backgroundColor: "rgb(240, 240, 240, 0.9)",
                        border: "3px solid #f1f1f1"
                    }}
                    >
                        <Typography component="h1" variant="h5">
                            <h3>Please Sign In</h3>
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            style={{background: "azure"}}
                            autoComplete="username"
                            autoFocus/>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            style={{background: "azure"}}
                            autoComplete="current-password"
                        />
                        <Button color={"warning"}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}>
                            Sign In
                        </Button>
                        <Button color={"warning"}
                            component={Link}
                            to={'/register'}
                            fullWidth
                            variant="contained"
                        >
                            No Account? Click here
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default Login;