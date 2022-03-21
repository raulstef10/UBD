import {Link, useHistory, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../hooks'
import {useState} from "react";
import {logout} from "../state/login"
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function getPageNameFromPath(location: string) {
    switch (location) {
        case "/":
            return "Home"
        case "/users":
            return "Users";
        case "/jokes":
            return "Jokes";
        default:
            return location;
    }
}

function NavBar() {
    const location = useLocation();
    const history = useHistory();
    const [openBar, setOpenBar] = useState(false);
    const [userTag, setUserTag] = useState("User");
    const role = useAppSelector(state => state.login.role);
    const username = useAppSelector(state => state.login.username);
    const dispatch = useAppDispatch();
    const dologout = () => {
        dispatch(logout())
        history.push("/login");
    };
    const toggleBar = () => {
        setOpenBar(!openBar);
        if (role === "ADMINISTRATOR") {
            setUserTag("Users")
        }
    }

    return (
        <AppBar position="static" style = {{background:"#d76b6b",height:"5rem"}}>
            <Toolbar>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 3}}
                    onClick={toggleBar}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    {getPageNameFromPath(location.pathname) === "Users" && role === "CLIENT" ? "User" : getPageNameFromPath(location.pathname)}
                </Typography>
                <Typography variant="h6" component={Link} to="/">
                    <img src={"./img/logo.svg"} style = {{transform:"scale(0.45)"}}></img>
                </Typography>
            </Toolbar>
            <Drawer
                anchor="left"
                open={openBar}
                onClose={toggleBar}
            >
                <h4 style={{textAlign: "center"}}>Hello, {username}</h4>
                <Box
                    sx={{width: 250}}
                    role="presentation"
                    onClick={toggleBar}
                    onKeyDown={toggleBar}>
                    <List>
                        <ListItem component={Link} to="/">
                            <ListItemText>Home</ListItemText>
                        </ListItem>
                        <ListItem component={Link} to="/users">
                            <ListItemText>{userTag}</ListItemText>
                        </ListItem>
                        <ListItem component={Link} to="/jokes">
                            <ListItemText>Jokes</ListItemText>
                        </ListItem>
                        <ListItem button onClick={dologout} style={{
                            overflow: "hidden",
                            position: "fixed",
                            bottom: "0",
                            background: "crimson",
                            width: "250px"
                        }}>
                            <ListItemText>Logout</ListItemText>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    )
}

export default NavBar;