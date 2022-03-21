import axios from 'axios'
import { REST_API_URL, LOGIN_PATH, REGISTER_PATH } from './consts'
import LoginRequest from './types/LoginRequest'
import LoginState from './types/LoginState';
import RegisterRequest from './types/RegisterRequest';

export const emptyLogin: LoginState = { token: '', username: '', role: '' };

export async function RegisterApi(registerDetails: RegisterRequest) {
    return await axios.post(REST_API_URL + REGISTER_PATH, registerDetails);
}

export async function LoginApi(username: String, password: String) {
    var body: LoginRequest = {
        username: username,
        password: password,
    }
    return await axios.post(REST_API_URL + LOGIN_PATH, body).then(
        (response) => {
            return response.data;
        },
        (error) => {
            alert("Login unsuccessful");
            return emptyLogin;
        }
    )

}
export default LoginApi;