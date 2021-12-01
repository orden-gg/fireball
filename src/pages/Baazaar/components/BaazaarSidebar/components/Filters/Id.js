import React, { useContext } from "react";
import { TextField } from "@mui/material";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";

import styles from "./styles";


export default function Id({runFilterWatcher}) {
    const classes = styles();
    const { id, setId } = useContext(BaazaarContext);

    const onIdChange = (event) => {
        setId(event.target.value);
        runFilterWatcher();
    };

    return (
        <TextField
            className={classes.smallInput}
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
