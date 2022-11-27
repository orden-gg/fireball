import { createStyles, makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';

export const styles = makeStyles((theme) =>
    createStyles({
        anvilWrapper: {
            padding: theme.spacing(3),
            maxWidth: 1400,
            margin: 'auto',
            width: '100%',
            minHeight: 'calc(100vh - 177px)'
        },
        anvilTitle: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& h1': {
                marginRight: 20
            }
        },
        anvilSelectWrapper: {
            '& .MuiSelect-select': {
                display: 'flex !important',
                alignItems: 'center'
            }
        },
        anvilSelect: {
            display: 'flex',
            alignItems: 'center'
        },
        anvilSelectImage: {
            width: '20px !important',
            height: 20,
            padding: '0 !important',
            margin: '0 12px 0 0 !important'
        }
    })
);

export const anvilCalcStyles = makeStyles(() =>
    createStyles({
        anvilCalc: {
            alignItems: 'center',
            display: 'flex'
        },
        anvilCalcSection: {
            display: 'flex',
            justifyContent: 'center',
            flexGrow: 1
        },
        anvilCalcArrow: {
            fontSize: 64,
            opacity: 0.15,
            flexShrink: 1,
            minWidth: 64
        },
        anvilCalcButton: {
            fontSize: 48
        },
        anvilCalcFooter: {}
    })
);

export const anvilSectionStyles = makeStyles(() =>
    createStyles({
        anvilItem: {
            width: 260
        },
        anvilItemInfo: {
            color: '#fff',
            '& span': {
                fontWeight: 600,
                color: '#fbf941'
            }
        }
    })
);

export const anvilSummaryStyles = makeStyles(() =>
    createStyles({
        anvilSummaryWrapper: {
            marginTop: 20
        },
        anvilSummaryInner: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap'
        },
        anvilSummaryItem: {
            background: alpha('#000', 0.2),
            borderRadius: 4,
            padding: 12,
            margin: 4,
            minWidth: 220,
            textAlign: 'center'
        },
        anvilSummaryTotal: {
            background: alpha('#ffff00', 0.15),
            borderRadius: 4,
            padding: 12,
            margin: '0 auto 4px',
            width: 448,
            maxWidth: '100%'
        },
        anvilSummaryTitle: {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 500
        },
        anvilSummaryPrice: {
            fontSize: 20,
            '& img': {
                width: 32,
                height: 32
            },
            '& span': {
                fontSize: '18px !important'
            },
            '& div:last-of-type': {
                marginTop: 8,
                fontSize: '20px !important',
                '& img': {
                    width: 20,
                    height: 20
                }
            }
        }
    })
);
