import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
    createStyles({
        fakeGotchiGalleryList: {
            margin: -2,
            width: 'calc(100% + 2px)'
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
            position: 'relative',
            background: alpha('#000', 0.1),
            '& img': {
                display: 'block',
                width: '100%'
            },
            '&:hover $fakeGotchiGalleryItemDesc': {
                opacity: 1
            },
            [theme.breakpoints.up('md')]: {
                minHeight: 130
            }
        },
        fakeGotchiGalleryItemDesc: {
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: alpha('#000', 0.25),
            textAlign: 'center',
            overflowY: 'auto',
            transition: 'opacity .2s ease-in-out',
            position: 'relative',
            zIndex: 1,
            '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: alpha('#000', 0.25),
                border: `2px solid ${alpha('#000', 0.75)}`,
                pointerEvents: 'none',
                transition: 'opacity .2s ease-in-out',
                opacity: 0
            },
            '& p': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '4px 0 0'
            },
            '& span': {
                fontWeight: 700
            },
            '&:hover': {
                cursor: 'zoom-in',
                '&::after': {
                    opacity: 1
                }
            }
        },
        fakeGotchiGalleryItemFooter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 4
        },
        fakeGotchiGalleryLoader: {
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.8
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
