 import { makeStyles } from "@mui/styles"; 

const styles = makeStyles( theme => ({
    container: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column'
    },
    buttonsRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        display: 'flex',
        alignItems: 'center'
    },
    list: {
        display: 'grid',
        alignItems: 'start',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',
        gridAutoRows: '1fr'
    },
    listItem: {
        height: '100%',
        paddingBottom: 12
    },
    toggleItem: {
        fontSize: '12px',
        padding: 8,
        '& img': {
            maxWidth: 16,
            maxHeight: 16
        },
        '& .MuiSvgIcon-root': {
            maxWidth: 16,
            maxHeight: 16
        }
    },

}));
 
export {
    styles as default
};