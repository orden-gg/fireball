import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
    createStyles({
        fakeGotchiGalleryLayout: {
            height: 'calc(100vh - 178px)',
            overflowY: 'auto'
        },
        fakeGotchiGallerCount: {
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
            position: 'relative',
            '& img': {
                display: 'block',
                width: '100%'
            }
        }
    })
);
