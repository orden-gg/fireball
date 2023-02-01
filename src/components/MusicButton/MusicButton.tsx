import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';

import song from 'assets/music/halloween.mp3';

export function MusicButton() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [audio] = useState<HTMLAudioElement>(new Audio(song));

  useEffect(() => {
    audio.addEventListener('ended', () => audio.play()); // autoplay on end
  }, []);

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playing]);

  return (
    <IconButton color={playing ? 'primary' : 'default'} onClick={() => setPlaying(!playing)}>
      {playing ? <MusicOffIcon /> : <MusicNoteIcon />}
    </IconButton>
  );
}
