import React, { useContext } from "react";
import { TextField } from "@mui/material";
import { BaazaarContext } from "../../../../../../contexts/BaazaarContext";

export default function Name() {
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
