import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
    createStyles({
        fakeGotchiGalleryList: {
            margin: 0,
            [theme.breakpoints.down('lg')]: {
                columnCount: '6 !important'
            },
            [theme.breakpoints.down('md')]: {
                columnCount: '4 !important'
            },
            [theme.breakpoints.down('sm')]: {
                columnCount: '2 !important'
            }
        },
        fakeGotchiGalleryCount: {
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 2,
            background: alpha(theme.palette.rarity.godlike, 0.8),
            padding: '1px 4px',
            fontSize: 12,
            fontStyle: 'italic',
            fontWeight: 600,
            color: '#000'
        },
        fakeGotchiGalleryItem: {
            minHeight: 100,
            marginBottom: 4,
            position: 'relative',
            background: alpha(theme.palette.rarity.godlike, 0.1),
            '& > img': {
                display: 'block',
                width: '100%'
            },
            '&:hover $fakeGotchiGalleryItemDesc': {
                opacity: 1
            }
        },
        fakeGotchiGalleryItemDesc: {
            display: 'flex',
            flexDirection: 'column',
            opacity: 0,
            position: 'absolute',
            inset: 0,
            padding: 8,
            background: alpha('#000', 0.75),
            textAlign: 'center',
            overflowY: 'auto',
            transition: 'opacity .2s ease-in-out',
            zIndex: 1,
            '& p': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '4px 0 0'
            },
            '& span': {
                fontWeight: 700
            },
            '& img': {
                marginRight: 4
            }
        },
        fakeGotchiGalleryItemFooter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 4
        },
        name: {
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.4,
            textTransform: 'capitalize',
            color: 'burlywood'
        },
        author: {
            paddingTop: 4,
            flexGrow: 1,
            '& span': {
                color: theme.palette.rarity.godlike
            }
        }
    })
);
