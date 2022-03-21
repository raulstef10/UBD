import axios from "axios";
import {FIND_BY_CATEGORY_API, FIND_BY_OWNER_API, JOKES_PATH, REST_API_URL} from "./consts";
import JokeDetails from "./types/JokeDetails";
import authHeader from "./utils";

export async function fetchJokes() {
    return await axios.get<JokeDetails[]>(REST_API_URL + JOKES_PATH, authHeader()).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return [];
        }
    )
}

export async function fetchJoke(id: string) {
    return await axios.get<JokeDetails>(REST_API_URL + JOKES_PATH + '/' + id, authHeader()).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return emptyJoke;
        }
    )
}

export async function createJoke(joke: JokeDetails) {
    return await axios.post<JokeDetails>(REST_API_URL + JOKES_PATH, joke, authHeader()).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return {};
        }
    )
}

export async function alterJoke(joke: JokeDetails) {
    return await axios.put<JokeDetails>(REST_API_URL + JOKES_PATH, joke, authHeader()).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return {};
        }
    )
}

export async function deleteJoke(joke: JokeDetails) {
    return await axios.delete(REST_API_URL + JOKES_PATH + '/' + joke.id, authHeader()).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return {};
        }
    )
}

export async function findByOwner(owner: string) {
    return await axios.get<JokeDetails[]>(REST_API_URL + JOKES_PATH + FIND_BY_OWNER_API + '/' + owner, authHeader()).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return [];
        }
    )
}

export async function findByCateory(category: string) {
    return await axios.get<JokeDetails[]>(REST_API_URL + JOKES_PATH + FIND_BY_CATEGORY_API + '/' + category, authHeader()).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return [];
        }
    )
}

export const emptyJoke: JokeDetails = {
    id: '',
    title: '',
    writer: '',
    description: '',
    category: ''
}
