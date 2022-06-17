import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    mainTitle: {
        textAlign: 'center',
        fontSize: 28,
        [theme.breakpoints.up('md')]: {
            fontSize: 34
        }
    },
    teamWrapper: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))',
        gridGap: theme.spacing(.5)
    },
    teamUser: {
        padding: '0 5px 5px'
    },
    aavegotchiAvatar: {
        marginTop: 5,
        width: '100%',
        paddingBottom: '100%',
        position: 'relative',
        '& > img': {
            position: 'absolute',
            left: '5%',
            top: '5%',
            width: '90%',
            height: '90%'
        }
    },
    aavegotchiName: {
        fontSize: 15,
        textAlign: 'center',
        padding: 5,
        margin: 0,
        color: theme.palette.primary.main,
        fontWeight: 500
    }
}));
