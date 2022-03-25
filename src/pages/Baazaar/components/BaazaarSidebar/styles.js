import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';

const styles = makeStyles(theme => ({
    sidebar: {
        padding: 24,
        borderRadius: 8,
        background: theme.palette.background.paper,
        minWidth: 300,
        maxWidth: 600,
        [theme.breakpoints.up('sm')]: {
            maxWidth: 300,
            marginRight: 24
        }
    },
    sidebarSection: {
        '& + div': {
            marginTop: 12
        }
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
    filterTitle: {
        fontSize: '.75rem',
        textTransform: 'uppercase',
        lineHeight: '1.375rem',
        letterSpacing: '1px'
    },
    applyButton: {
        borderRadius: 4,
        fontSize: '1rem',
        boxShadow: 'none',
        letterSpacing: '1px',
        background: alpha(theme.palette.customColors.lightGray, .24),
        '&:hover': {
            background: alpha(theme.palette.customColors.lightGray, .14),
        }
    },
    common: {
        color: theme.palette.rarity.common
    },
    uncommon: {
        color: theme.palette.rarity.uncommon
    },
    rare: {
        color: theme.palette.rarity.rare
    },
    legendary: {
        color: theme.palette.rarity.legendary
    },
    mythical: {
        color: theme.palette.rarity.mythical
    },
    godlike: {
        color: theme.palette.rarity.godlike
    },
    toggleItem: {
        fontSize: '12px',
        padding: '7px 0',
        '& img': {
            maxWidth: 16,
            maxHeight: 16
        },
        '& .MuiSvgIcon-root': {
            maxWidth: 16,
            maxHeight: 16
        }
    },
    smallInput: {
        '& input': {
            padding: '4px 14px'
        },
        '& label': {
            top: -5
        }
    },
    priceFilter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': {
            maxWidth: 25,
            maxHeight: 25
        }
    },
    verticalToggle: {
        '& button': {
            justifyContent: 'left',
            padding: '7px 10px'
        },
        '& img': {
            marginRight: 15,
            width: 16
        }
    },
    mainToggleTop: {
        '& button:first-child': {
            borderBottomLeftRadius: 0
        },
        '& button:last-child': {
            borderBottomRightRadius: 0
        }
    },
    mainToggleBottom: {
        '& button': {
            borderTop: 0
        },
        '& button:first-child': {
            borderTopLeftRadius: 0
        },
        '& button:last-child': {
            borderTopRightRadius: 0
        }
    }
}));

export default styles;
