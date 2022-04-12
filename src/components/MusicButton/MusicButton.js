import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';

import song from 'assets/music/halloween.mp3';

export default function MusicButton() {
    const [playing, setPlaying] = useState(false);
    const [audio] = useState(new Audio(song));

    useEffect(() => {
        audio.addEventListener('ended', () => audio.play()); // autoplay on end

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        playing ? audio.play() : audio.pause();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playing]);

    return (
        <IconButton
            color={playing ? 'primary' : 'default'}
            onClick={() => setPlaying(!playing)}
        >
            {playing ? (
                <MusicOffIcon />
            ) : (
                <MusicNoteIcon />
            )}
        </IconButton>
    );
}
