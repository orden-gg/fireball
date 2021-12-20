import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';

import song from '../../assets/music/halloween.mp3';

import styles from './styles';

export default function MusicButton() {
    const classes = styles();
    const [playing, setPlaying] = useState(false);
    const [audio] = useState(new Audio(song));

    useEffect(() => {
        audio.addEventListener('ended', () => audio.play()); // autoplay on end
    }, []);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]);

    return (
        <Box className={classes.button}>
            <Button  color='primary' onClick={() => setPlaying(!playing)}>
                {playing ? '[pause]' : '[play]'}
            </Button>
        </Box>
    );
}