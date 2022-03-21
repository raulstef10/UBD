import {Autocomplete, Box, Button, MenuItem, Paper, Select, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {emptyJoke, fetchJoke, fetchJokes, findByCateory} from "../service/jokes";
import JokeDetails from "../service/types/JokeDetails";
import JokeForm from "./forms/JokeForm";

type JokeListing = {
    category: string,
    description: string,
    writer: string,
    label: string,
    id: string
}
const emptyJokeListing: JokeListing = {
    category: '',
    description: '',
    writer: '',
    label: '',
    id: ''
}

function convertToListing(joke: JokeDetails) {
    return {
        label: joke.title,
        description: joke.description,
        category: joke.category,
        writer: joke.writer,
        id: joke.id,
    }
}

function UserHome() {
    const [selectedJoke, setSelectedJoke] = useState<JokeListing>(emptyJokeListing);
    const [jokes, setJokes] = useState<JokeListing[]>([]);
    const [open, setOpen] = useState(false);
    const [alteredJoke, setAlteredJoke] = useState<JokeDetails>(emptyJoke);
    const [category, setCategory] = useState('ALL CATEGORIES');

    const handleChange = async (category: string) => {
        setCategory(category)
        let list
        if (category === "ALL CATEGORIES") {
            list = await fetchJokes();
        } else {
            list = await findByCateory(category);
        }
        let listing = list.map<JokeListing>(convertToListing)
        setJokes(listing);

    };
    /* eslint-disable */
    useEffect(() => {
        refreshJokes()
    }, [])
    /* eslint-enable */
    const refreshJokes = async () => {
        let list = await fetchJokes();
        let listing = list.map<JokeListing>(convertToListing)
        setJokes(listing);

    }

    const showJoke = async (id: string) => {
        let list = await fetchJoke(id);
        let listing = [list].map<JokeListing>(convertToListing)
        setJokes(listing);

    }

    const closeForm = async () => {
        setOpen(false);
        await refreshJokes();
    }
    const openNewJokeForm = () => {
        setAlteredJoke(emptyJoke);
        setOpen(true);
    }

    return (
        <Paper sx={{mt: 3, ml: 30, mr: 30, mb: 3}} style = {{padding:"1rem"}}>
            <div style={{
                display: "flex", alignItems: "unset",
                alignContent: "space-around",
                justifyContent: "space-evenly",
            }}>
                <Button color={"warning"} variant="contained" onClick={refreshJokes}>Refresh</Button>
                <Button color={"warning"} variant="contained" style={{left: "2rem"}} onClick={openNewJokeForm}>Create Joke</Button>
                <JokeForm open={open} alteredJoke={alteredJoke} closeFormCallback={closeForm}/>
                <div>
                    <Box style={{minWidth: 120}}>
                        <Select style={{minWidth: 200}}
                                defaultValue="ALL"
                                value={category}
                                onChange={category => handleChange(category.target.value)}
                        >
                            <MenuItem value={"ALL CATEGORIES"}>ALL CATEGORIES</MenuItem>
                            <MenuItem value={"ANIMAL"}>ANIMAL</MenuItem>
                            <MenuItem value={"BLONDE"}>BLONDE</MenuItem>
                            <MenuItem value={"COMPUTER"}>COMPUTER</MenuItem>
                            <MenuItem value={"DOCTOR"}>DOCTOR</MenuItem>
                            <MenuItem value={"MATH"}>MATH</MenuItem>
                        </Select>
                    </Box>
                </div>
            </div>
            <Autocomplete
                disablePortal
                value={emptyJokeListing}
                onChange={(event: any, newValue: JokeListing | null) => {
                    setSelectedJoke(newValue || emptyJokeListing);
                    if (newValue?.label !== "Joke") {
                        if (newValue !== null) {
                            showJoke(newValue.id);
                        } else {
                            refreshJokes();
                        }
                    }
                }}
                onAbortCapture={() => {
                    refreshJokes();
                }}
                options={jokes.sort((a, b) => -b.category.localeCompare(a.category))}
                groupBy={(option) => option.category}
                renderInput={(params) => <TextField {...params}
                                                    margin="normal"
                                                    name="jokes"
                                                    label="Joke"
                                                    id="jokes"
                />}
            />
            {jokes.map(joke => (

                <Paper elevation={6} style={{marginBottom:"1rem",margin: "10px", padding: "15px", textAlign: "left"}} key={joke.label}>
                    <div><h1 style={{float: "left"}}>{joke.label}</h1>
                        <h4 style={{textAlign: "right", float: "right"}}>Writer:{joke.writer}</h4></div>
                    <br/>
                    <br/>
                    <br/>
                    <h3>Category: {joke.category}</h3><br/>
                    <h2>{joke.description}</h2><br/>
                </Paper>
            ))}
        </Paper>
    );
}

export default UserHome;