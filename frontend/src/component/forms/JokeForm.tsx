import {Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";
import {FormEvent, useEffect, useState} from "react";
import {alterJoke, createJoke} from "../../service/jokes";
import JokeDetails from "../../service/types/JokeDetails";
import JokeFormProps from "./types/JokeFormProps";
import {CATEGORY} from "../../service/consts";

function JokeForm(props: JokeFormProps) {
    const [currentUser, setcurrentUser] = useState<string>("");
    useEffect(() =>
        function getCurrentUser() {
            const username = JSON.parse(localStorage.getItem('username') as string);
            if (username !== "")
                setcurrentUser(username)
        })
    const submitCallback = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        let jokeDetails: JokeDetails = {
            id: data.get("id") as string,
            description: data.get("desc") as string,
            title: data.get("title") as string,
            writer: data.get("writer") as string,
            category: data.get("category") as string
        }
        if (props.alteredJoke.id === '') {
            await createJoke(jokeDetails)
        } else {
            jokeDetails.id = props.alteredJoke.id
            await alterJoke(jokeDetails)
        }
        props.closeFormCallback();
    }
    return (
        <Dialog open={props.open}>
            <DialogTitle>{props.alteredJoke.id ? "Edit Joke" : "New Joke"}</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={submitCallback} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="title"
                        required
                        inputProps={{maxLength: 70}}
                        label="Title"
                        id="title"
                        defaultValue={props.alteredJoke.title}
                    />
                    <TextField
                        margin="normal"
                        style={{overflowWrap: "break-word"}}
                        multiline
                        rows={4}
                        inputProps={{maxLength: 250}}
                        required
                        fullWidth
                        id="desc"
                        label="Description"
                        name="desc"
                        defaultValue={props.alteredJoke.description}
                        autoFocus/>
                    <Autocomplete
                        disablePortal
                        options={CATEGORY}
                        defaultValue={CATEGORY[0]}
                        renderInput={(params) => <TextField {...params}
                                                            margin="normal"
                                                            fullWidth
                                                            name="category"
                                                            label="Category"
                                                            id="category"
                        />}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="writer"
                        label="Writer"
                        id="writer"
                        defaultValue={currentUser}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Button color={"warning"}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}>
                        Submit
                    </Button>
                    <Button color={"warning"} variant="contained" fullWidth
                            onClick={() => props.closeFormCallback()}>Cancel</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
export default JokeForm;