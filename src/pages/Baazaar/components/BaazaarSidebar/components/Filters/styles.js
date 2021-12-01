import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
    rootContainer: {
        paddingTop: 0
    },
    container: {
        marginBottom: 20
    },
    checkboxLabel: {
        fontSize: 13
    },
    formControl: {
        width: '100%',
        '& .MuiSelect-select': {
            padding: '4px 14px'
        },
        '& label': {
            top: -12,
            '&.MuiFormLabel-filled': {
                top: 0
            }
        }
    },
    stackOfChipsOuter: {
        padding: '10px 0'
    },
    stackOfChips: {
        maxWidth: '100%',
        overflowX: "auto",
        maxHeight: 53,
        '& > *': {
            margin: '0 5px 2px 0',
        }
    },
    singleChip: {
        height: 'auto',
        fontSize: '12px',
        '& .MuiChip-label': {
            padding: '3px 7px 3px 5px'
        },
        '& svg': {
            fontSize: '19px',
            marginRight: '3px'
        }
    },
    field: {
        '& img': {
            width: 20,
            marginRight: 5
        },
        '& .booster': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    },
    checkRangeOuter: {
        lineHeight: '.9'
    },
    checkRange: {
        padding: '0 5px',
        fontSize: '0.65rem',
        lineHeight: '.9',
        '&:hover': {
            background: 'transparent'
        },
        '&.rare': {
            color: theme.palette.rarity.rare
        }
    },
    traitsContainer: {
        paddingTop: '0'
    },
    slider: {
        padding: '13px 0 0'
    },
    toggleItem: {
        fontSize: '12px',
        padding: '4px'
    },
    smallInput: {
        '& input': {
            padding: '4px 14px'
        },
        '& label': {
            top: -5
        }
    },
    rangeSliderOuter: {
        paddingTop: '0px'
    }
}));

export default styles;