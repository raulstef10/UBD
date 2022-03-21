import Login from './component/Login'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import NavBar from './component/NavBar'
import {useAppSelector} from './hooks';
import Users from './component/Users';
import Jokes from './component/Jokes'
import Register from './component/Register';
import UserHome from './component/UserHome';
import React, {useEffect} from "react";

function App() {
    const username = useAppSelector(state => state.login.username);
    useEffect(() => {
        document.title = "Jokisimo"
    }, [])
    return (
        <BrowserRouter>
            {!!username && <NavBar/>}
            <Switch>
                <Route exact path="/">
                    {!!username ? <UserHome/> : <Redirect push to="/login"/>}
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/users">
                    {!!username ? <Users/> : <Redirect push to="/login"/>}
                </Route>
                <Route path="/jokes">
                    {!!username ?  <Jokes/> : <Redirect push to="/login"/>}
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
