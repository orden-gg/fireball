import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
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
            padding: '4px 14px !important'
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
        maxWidth: '100% !important',
        overflowX: "auto",
        maxHeight: 53,
        '& > *': {
            margin: '0 5px 2px 0 !important',
        }
    },
    singleChip: {
        height: 'auto !important',
        fontSize: '12px !important',
        '& .MuiChip-label': {
            padding: '3px 7px 3px 5px'
        },
        '& svg': {
            fontSize: '19px !important',
            marginRight: '3px !important'
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
        lineHeight: '.9 !important'
    },
    checkRange: {
        padding: '0 5px !important',
        fontSize: '0.65rem !important',
        lineHeight: '.9 !important',
        '&:hover': {
            background: 'transparent !important'
        },
        '&.rare': {
            color: theme.palette.rarity.rare
        }
    },
    traitsContainer: {
        paddingTop: '0 !important'
    },
    slider: {
        padding: '13px 0 0 !important'
    },
    toggleItem: {
        fontSize: '12px !important',
        padding: '4px !important'
    },
    smallInput: {
        '& input': {
            padding: '4px 14px !important'
        },
        '& label': {
            top: -5
        }
    },
    rangeSliderOuter: {
        paddingTop: '0px !important'
    }
}));