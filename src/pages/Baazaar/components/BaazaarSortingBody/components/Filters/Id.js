import React, { useContext } from "react";
import { TextField } from "@mui/material";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";

export default function Id() {
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
