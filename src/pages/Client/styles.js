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
        gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',
        gridAutoRows: '1fr'
    },
    listItem: {
        height: '100%'
    },
    filtersButton: {
        padding: '0 !important',
        '&.Mui-selected': {
            backgroundColor: `${theme.palette.secondary.dark} !important`,
        }
    },
    filtersInner: {
        fontSize: 18,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '10px 12px',
        '& span': {
            width: 18
        }
    },
    lightText: {
        color: theme.palette.primary.main
    },
}));