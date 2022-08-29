import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) => createStyles({
    glossaryWearablesContainer: {
        padding: '56px 16px 12px'
    },
    backButton: {
        marginLeft: 12
    },
    section: {
        '& + $section': {
            marginTop: 12
        }
    },
    filtersWrapper: {
        paddingBottom: 12
    },
    buttonsWrapper: {
        padding: 12,
        display: 'flex',
        justifyContent: 'space-between'
    },
    wearableHeader: {
        marginLeft: '-8px',
        justifyContent: 'space-between'
    },
    wearableHeaderLabel: {
        minWidth: 34,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(0, .5),
        color: theme.palette.common.white,
        backgroundColor: theme.palette.secondary.dark,
        fontWeight: 600,
        lineHeight: 1.6
    },
    wearableBenefitTooltip: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));
