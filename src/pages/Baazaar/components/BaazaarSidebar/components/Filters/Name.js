import React, { useContext } from "react";
import { TextField } from "@mui/material";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";
import useStyles from "./styles";

export default function Name({runFilterWatcher}) {
    const classes = useStyles();
    const { name, setName } = useContext(BaazaarContext);

    const onNameChange = (event) => {
        setName(event.target.value);
        runFilterWatcher();
    };

    return (
        <TextField
            className={classes.smallInput}
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
