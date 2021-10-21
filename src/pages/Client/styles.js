import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    container: {
        padding: 24
    },
    backdrop: {
        zIndex: theme.zIndex.appBar - 1,
        color: '#fff'
    },
    textHighlight: {
        color: theme.palette.primary.main,
        marginLeft: 10
    },
    list: {
        display: 'grid',
        alignItems: 'start',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridAutoRows: '1fr'
    },
    listItem: {
        height: '100%'
    }
}));