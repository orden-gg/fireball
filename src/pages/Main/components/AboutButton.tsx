import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import { aboutStyles } from '../styles';

export function AboutButton() {
  const classes = aboutStyles();

  const navigate = useNavigate();

  return (
    <div className={classes.aboutCointainer}>
      <Button className={classes.aboutButton} variant='contained' onClick={() => navigate('about')}>
        About fireball.gg
      </Button>
    </div>
  );
}
