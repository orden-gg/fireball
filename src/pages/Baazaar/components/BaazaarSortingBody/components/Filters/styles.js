import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    rootContainer: {
        paddingTop: 13,
        marginBottom: 25,
        [theme.breakpoints.down('md')]: {
            marginBottom: 25
        }
    },
    container: {
        marginBottom: 20
    },
    checkboxLabel: {
        fontSize: 13
    },
    formControl: {
        width: '100%'
    },
    stackOfChipsOuter: {
        padding: '10px 0'
    },
    stackOfChips: {
        maxWidth: '100% !important',
        overflowX: "auto",
        height: 34,
        '& > *': {
            margin: '0 5px 2px 0 !important',
        }
    },
    sliderContainer: {
        paddingTop: 4
    }
}));