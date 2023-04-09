import { createStyles, makeStyles } from '@mui/styles';

export const guildDescriptionStyles = makeStyles((theme) =>
  createStyles({
    guildDescription: {
      textAlign: 'left',
      fontWeight: 300,
      lineHeight: 1.6,
      margin: theme.spacing(1)
    }
  })
);
