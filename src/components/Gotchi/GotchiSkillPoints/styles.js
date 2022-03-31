import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
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

export default styles;
