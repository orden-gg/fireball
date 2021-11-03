import React, {useContext} from "react";
import {Grid, Button, TextField, Checkbox, Typography} from "@mui/material";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";
import useStyles from "./styles";

export default function Id() {
    const classes = useStyles();
    const { id, setId } = useContext(BaazaarContext);

    const onIdChange = (event) => {
        setId(event.target.value);
    };

    return (
        <TextField
            type='text'
            variant='outlined'
            fullWidth
            size={'small'}
            label={'Id'}
            defaultValue={id}
            onChange={onIdChange}
        />
    );
}
