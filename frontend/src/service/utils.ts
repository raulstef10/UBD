import LoginState from "./types/LoginState";

export default function authHeader() {
    let user: LoginState = JSON.parse(localStorage.getItem("loginState") || '{}');
    if (user.username && user.token)
        return {
            headers:
                { Authorization: 'Bearer ' + user.token }
        }
    return {}
}