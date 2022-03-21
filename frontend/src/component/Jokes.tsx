import {
    Autocomplete,
    Box,
    Button,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import JokeForm from "./forms/JokeForm";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import JokeDetails from "../service/types/JokeDetails";
import {deleteJoke, emptyJoke, fetchJoke, fetchJokes, findByCateory, findByOwner} from "../service/jokes";

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

function convertToDetails(listing: JokeListing) {
    return {
        title: listing.label,
        description: listing.description,
        category: listing.category,
        writer: listing.writer,
        id: listing.id,
    }
}

function Jokes() {
    const [selectedJoke, setSelectedJoke] = useState<JokeListing>(emptyJokeListing);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [jokes, setJokes] = useState<JokeListing[]>([]);
    const [open, setOpen] = useState(false);
    const [alteredJoke, setAlteredJoke] = useState<JokeDetails>(emptyJoke);
    const userRole = JSON.parse(localStorage.getItem('role') as string);
    const username = JSON.parse(localStorage.getItem('username') as string);
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

    const showJoke = async (id: string) => {
        let list = await fetchJoke(id);
        let listing = [list].map<JokeListing>(convertToListing)
        setJokes(listing);

    }

    useEffect(() => {
        refreshJokes();
    }, [])

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const refreshJokes = async () => {
        let jokeDetails
        if (userRole === "ADMINISTRATOR") {
            jokeDetails = await fetchJokes();
        } else {
            jokeDetails = await findByOwner(username)
        }
        let listing = jokeDetails.map<JokeListing>(convertToListing)
        setJokes(listing);
    }

    const openNewJokeForm = () => {
        setAlteredJoke(emptyJoke);
        setOpen(true);
    }

    const openEditJokeForm = (joke: JokeListing) => {
        let jokeDetails = convertToDetails(joke);
        setAlteredJoke(jokeDetails);
        setOpen(true);
    }
    const deleteAction = async (joke: JokeListing) => {
        if (window.confirm(`Are you sure you wish to delete ${joke.description}?`)) {
            let jokeDetails = convertToDetails(joke);
            await deleteJoke(jokeDetails);
            await refreshJokes();
        }
    }
    const closeForm = async () => {
        setOpen(false);
        await refreshJokes();
    }
    return (
        <TableContainer component={Paper} style={{
            margin: "1rem",
            width: "auto"
        }}>
            <JokeForm open={open} alteredJoke={alteredJoke} closeFormCallback={closeForm}/>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Button color={"warning"} variant="contained" onClick={refreshJokes}>Refresh</Button>
                        </TableCell>
                        <TableCell>
                            <Button color={"warning"} variant="contained" onClick={openNewJokeForm}>Create Joke</Button>
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Writer</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Writer</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? jokes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : jokes
                    ).map((d) => {
                            return (
                                <TableRow key={d.id}>
                                    <TableCell>{d.label}</TableCell>
                                    <TableCell>{d.writer}</TableCell>
                                    <TableCell>{d.category}</TableCell>
                                    <TableCell
                                        style={{overflowWrap: "break-word"}}
                                    >{d.description}</TableCell>
                                    <TableCell>{d.writer}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => openEditJokeForm(d)}>
                                            <CreateIcon/>
                                        </IconButton>
                                        <IconButton onClick={() => deleteAction(d)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        }
                    )
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                            colSpan={3}
                            count={jokes.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default Jokes;