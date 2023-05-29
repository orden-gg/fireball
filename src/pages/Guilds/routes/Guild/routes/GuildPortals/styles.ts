import { createStyles, makeStyles } from '@mui/styles';

export const guildPortalsStyles = makeStyles(() =>
  createStyles({
    guildPortals: {
      display: 'grid',
      alignItems: 'start',
      gap: 12,
      gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',
      gridAutoRows: '1fr',
      padding: '6px 12px'
    }
  })
);
