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
import AccountDetails from "../service/types/AccountDetails";
import {deleteUser, emptyUser, fetchUser, fetchUserByUsername, fetchUsers, findByRole} from "../service/users";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import UserForm from "./forms/UserForm";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {useAppDispatch, useAppSelector} from "../hooks";
import {logout} from "../state/login";
import {useHistory} from "react-router-dom";

type AccountListing = {
    id: string,
    label: string,
    password: string,
    role: string
    fullname: string,
    dateofbirth: string,
    address: string,
}
const emptyAccountListing: AccountListing = {
    id: '',
    label: '',
    password: '',
    role: '',
    fullname: '',
    dateofbirth: '',
    address: '',
}

function convertToListing(account: AccountDetails) {
    return {
        id: account.id,
        label: account.username,
        password: account?.password,
        role: account.role,
        fullname: account.fullname,
        dateofbirth: account.dateofbirth,
        address: account.address,
    }
}

function convertToDetails(listing: AccountListing) {
    return {
        id: listing.id,
        username: listing.label,
        password: listing.password,
        role: listing.role,
        fullname: listing.fullname,
        dateofbirth: listing.dateofbirth,
        address: listing.address,
    }
}

function Users() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [users, setUsers] = useState<AccountListing[]>([]);
    const [open, setOpen] = useState(false);
    const [alteredUser, setAlteredUser] = useState<AccountDetails>(emptyUser);
    const [role, setRole] = useState('ALL ROLES');
    const [selectedAccount, setSelectedAccount] = useState<AccountListing>(emptyAccountListing);
    const dispatch = useAppDispatch();
    const history = useHistory();
    const userRole = useAppSelector(state => state.login.role);
    const username = useAppSelector(state => state.login.username);

    const handleChange = async (role: string) => {
        setRole(role)
        let list
        if (role === "ALL ROLES") {
            list = await fetchUsers();
        } else {
            list = await findByRole(role);
        }
        // @ts-ignore
        let listing = list.map<AccountListing>(convertToListing)
        setUsers(listing);
    };

    useEffect(() => {
        refreshUsers();
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

    const refreshUsers = async () => {
        let list
        if (userRole === "ADMINISTRATOR") {
            list = await fetchUsers();
        } else {
            list = [await fetchUserByUsername(username)];
        }
        // @ts-ignore
        let listing = list.map<AccountListing>(convertToListing)
        setUsers(listing);
    }

    const openNewUserForm = () => {
        setAlteredUser(emptyUser);
        setOpen(true);
    }

    const showAccount = async (id: string) => {
        let list = await fetchUser(id);
        // @ts-ignore
        let listing = [list].map<AccountListing>(convertToListing)
        setUsers(listing);
        setUsers(listing);
    }

    const openEditUserForm = (user: AccountListing) => {
        let userDetails = convertToDetails(user);
        setAlteredUser(userDetails);
        setOpen(true);
    }
    const deleteAction = async (user: AccountListing) => {
        if (window.confirm(`Are you sure you wish to delete ${user.label}?`)) {
            let userDetails = convertToDetails(user);
            await deleteUser(userDetails);
            if (user.label===username)
                {
                    dispatch(logout())
                    history.push("/login");
                }
            await refreshUsers();
        }
    }
    const closeForm = async () => {
        setOpen(false);
        await refreshUsers();
    }
    return (
        <TableContainer component={Paper}  style={{
            margin: "1rem",
            width: "auto"
        }}>
            <UserForm open={open} alteredUser={alteredUser} closeFormCallback={closeForm}/>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Button color={"warning"} variant="contained" onClick={refreshUsers}>Refresh</Button>
                        </TableCell>
                        {userRole === "ADMINISTRATOR" && <TableCell>
                            <Button color={"warning"} variant="contained" onClick={openNewUserForm}>Create Account</Button>
                        </TableCell>}
                        {userRole === "ADMINISTRATOR" && <TableCell>
                            <Box style={{minWidth: 120, bottom: "1rem"}}>
                                <Select style={{minWidth: 200}}
                                        value={role}
                                        onChange={category => handleChange(category.target.value)}

                                >
                                    <MenuItem value={"ALL ROLES"}>ALL ROLES</MenuItem>
                                    <MenuItem value={"ADMINISTRATOR"}>ADMIN</MenuItem>
                                    <MenuItem value={"CLIENT"}>CLIENT</MenuItem>
                                </Select>
                            </Box>
                        </TableCell>}
                        {userRole === "ADMINISTRATOR" && <TableCell style={{top: "2rem"}}>
                            <Autocomplete style={{top: "2rem"}}
                                          disablePortal
                                          value={emptyAccountListing}
                                          onChange={(event: any, newValue: AccountListing | null) => {
                                              setSelectedAccount(newValue || emptyAccountListing);
                                              if (newValue?.label !== "Username") {
                                                  if (newValue !== null) {
                                                      showAccount(newValue.id);
                                                  } else {
                                                      refreshUsers();
                                                  }
                                              }
                                          }}
                                          onAbortCapture={() => {
                                              refreshUsers();
                                          }}
                                          options={users.sort((a, b) => -b.role.localeCompare(a.role))}
                                          groupBy={(option) => option.role}
                                          renderInput={(params) => <TextField {...params}
                                                                              margin="normal"
                                                                              name="users"
                                                                              label="User"
                                                                              id="users"
                                          />}
                            />
                        </TableCell>}
                    </TableRow>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Date of Birth</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : users
                    ).map((u) => {
                            return (
                                <TableRow key={u.id}>
                                    <TableCell>{u.label}</TableCell>
                                    <TableCell>{u.role}</TableCell>
                                    <TableCell>{u.fullname}</TableCell>
                                    <TableCell>{u.address}</TableCell>
                                    <TableCell>{u.dateofbirth}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => openEditUserForm(u)}>
                                            <CreateIcon/>
                                        </IconButton>
                                        <IconButton onClick={() => deleteAction(u)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        }
                    )
                    }
                </TableBody>
                {userRole === "ADMINISTRATOR" && <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                            colSpan={3}
                            count={users.length}
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
                </TableFooter>}
            </Table>
        </TableContainer>
    )
}

export default Users;