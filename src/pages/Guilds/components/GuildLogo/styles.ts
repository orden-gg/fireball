import { createStyles, makeStyles } from '@mui/styles';

export const guildLogoStyles = makeStyles(() =>
  createStyles({
    isNoGuildLogo: {
      opacity: 0.4,
      filter: 'grayscale(1)'
    }
  })
);
