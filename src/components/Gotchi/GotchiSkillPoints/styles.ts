import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    skillpoints: {
        fontSize: 11,
        fontWeight: 400,
        marginRight: 'auto',
        marginTop: '-4px'
    },
    skillpointsHighlight: {
        color: '#00FFFF',
        '&:before': {
            content: '"+"'
        }
    }
}));
