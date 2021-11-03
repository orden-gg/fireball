import React, {useContext} from "react";
import {Grid, Button, TextField, Checkbox, Typography} from "@mui/material";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";
import useStyles from "./styles";

export default function Name() {
    const classes = useStyles();
    const { name, setName } = useContext(BaazaarContext);

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    return (
        <TextField
            type='text'
            variant='outlined'
            fullWidth
            size={'small'}
            label={'Name'}
            defaultValue={name}
            onChange={onNameChange}
        />
    );
}
