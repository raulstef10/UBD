import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from '../store'
import LoginState from '../service/types/LoginState'
import { emptyLogin } from "../service/auth";

const initialState: LoginState =
    JSON.parse(localStorage.getItem("loginState") || JSON.stringify(emptyLogin));

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = "";
            state.username = "";
            state.role = "";
            localStorage.removeItem("loginState");
            return state
        },
        login: (state, action) => {
            state = action.payload
            localStorage.setItem("loginState", JSON.stringify(state));
            localStorage.setItem("username",JSON.stringify(state.username))
            localStorage.setItem("role",JSON.stringify(state.role))
            return state
        }
    }
});

export const { logout, login } = loginSlice.actions
export const getRole = (state: RootState) => state.login.role
export default loginSlice.reducer