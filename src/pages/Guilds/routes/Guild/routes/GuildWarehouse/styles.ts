import { createStyles, makeStyles } from '@mui/styles';

export const GuildWarehouseStyles = makeStyles((theme) =>
  createStyles({
    benefits: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: theme.palette.common.white,
      fontSize: 12,
      fontWeight: 600,
      padding: 0,
      marginTop: 4
    },
    itemTypeValue: {
      color: '#06b6b6'
    },
    benefitValue: {
      textAlign: 'center',
      fontStyle: 'italic'
    }
  })
);
