import * as React from 'react';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {orange} from '@mui/material/colors';

const ColorButton = styled(Button)(({theme}) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));

export default function CustomizedButton() {
    return (
        <Stack spacing={2} direction="row">
            <ColorButton variant="contained">Custom CSS</ColorButton>
        </Stack>
    );
}