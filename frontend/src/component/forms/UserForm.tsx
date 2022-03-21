import {Dialog, DialogTitle, DialogContent, Box, TextField, Button, Autocomplete} from "@mui/material";
import UserFormProps from "./types/UserFormProps";
import {FormEvent} from "react";
import AccountDetails from "../../service/types/AccountDetails";
import {createUser, alterUser} from "../../service/users";
import {ROLES} from "../../service/consts";

function UserForm(props: UserFormProps) {
    const submitCallback = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        let userDetails: AccountDetails = {
            id: data.get("userid") as string,
            username: data.get("username") as string,
            password: data.get("password") as string,
            role: data.get("role") as string,
            fullname: data.get("fullname") as string,
            dateofbirth: data.get("dateofbirth") as string,
            address: data.get("address") as string,
        }
        if (userDetails.id === '') {
            if (await createUser(userDetails))
                props.closeFormCallback();
        } else if (await alterUser(userDetails))
            props.closeFormCallback();
    }
    return (
        <Dialog open={props.open}>
            <DialogTitle>{props.alteredUser.username ? "Edit User" : "New User"}</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={submitCallback} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="userid"
                        label="ID"
                        name="userid"
                        defaultValue={props.alteredUser.id}
                        InputProps={{
                            readOnly: true,
                        }}/>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        defaultValue={props.alteredUser.username}
                        autoFocus/>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />
                    <Autocomplete
                        disablePortal
                        options={ROLES}
                        defaultValue={props.alteredUser.role}
                        renderInput={(params) => <TextField {...params}
                                                            margin="normal"
                                                            fullWidth
                                                            name="role"
                                                            label="Role"
                                                            id="role"
                        />}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="fullname"
                        label="Full Name"
                        id="fullname"
                        defaultValue={props.alteredUser.fullname}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        type="date"
                        name="dateofbirth"
                        label="Date of Birth"
                        id="dateofbirth"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={props.alteredUser.dateofbirth}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="address"
                        label="Address"
                        id="address"
                        defaultValue={props.alteredUser.address}
                    />

                    <Button color={"warning"}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}>
                        Submit
                    </Button>
                    <Button color={"warning"} variant="contained" fullWidth onClick={() => props.closeFormCallback()}>Cancel</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default UserForm;