import axios from "axios";
import {FIND_BY_ROLE_API, FIND_BY_USERNAME_API, REST_API_URL, USERS_PATH} from "./consts";
import AccountDetails from "./types/AccountDetails";
import authHeader from "./utils";
import {emptyJoke} from "./jokes";

export async function fetchUsers() {
    return await axios.get<AccountDetails[]>(REST_API_URL + USERS_PATH, authHeader()).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return [];
        }
    )
}

export async function fetchUser(id: string) {
    return await axios.get<AccountDetails>(REST_API_URL + USERS_PATH + '/' + id, authHeader()).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return emptyJoke;
        }
    )
}

export async function fetchUserByUsername(username: string) {
    return await axios.get<AccountDetails>(REST_API_URL + USERS_PATH + FIND_BY_USERNAME_API + '/' + username, authHeader()).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return emptyJoke;
        }
    )
}

export async function findByRole(role: string) {
    return await axios.get<AccountDetails[]>(REST_API_URL + USERS_PATH + FIND_BY_ROLE_API + '/' + role, authHeader()).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return [];
        }
    )
}


export async function createUser(user: AccountDetails) {
    return await axios.post<AccountDetails>(REST_API_URL + USERS_PATH, user, authHeader()).then(
        (response) => {
            return response.data;
        },
        (error) => {
            alert(error.response.data.message)
            return null;
        }
    )
}

export async function alterUser(user: AccountDetails) {
    return await axios.put<AccountDetails>(REST_API_URL + USERS_PATH, user, authHeader()).then(
        (response) => {
            return response.data;
        },
        (error) => {
            alert(error.response.data.message)
            return null
        }
    )
}

export async function deleteUser(user: AccountDetails) {
    return await axios.delete(REST_API_URL + USERS_PATH + '/' + user.id, authHeader()).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return {};
        }
    )
}

export const emptyUser: AccountDetails = {
    id: '',
    username: '',
    role: '',
    fullname: '',
    dateofbirth: '',
    address: '',
}
