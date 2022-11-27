import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() =>
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
