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
    overridedSlot: {
        margin: 0,
        padding: '4px 0 0 4px'
    },
    benefits: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.palette.common.white,
        fontSize: 12,
        fontWeight: 600,
        padding: 0,
        textShadow: `${theme.palette.secondary.dark} 2px 2px 0px,
                    ${theme.palette.secondary.main} -1px -1px 0px,
                    ${theme.palette.secondary.main} 1px -1px 0px,
                    ${theme.palette.secondary.main} -1px 1px 0px,
                    ${theme.palette.secondary.main} 1px 1px 0px`
    },
    benefitsLabel: {
        color: 'darkcyan'
    },
    benefitValue: {
        textAlign: 'center'
    }
}));
