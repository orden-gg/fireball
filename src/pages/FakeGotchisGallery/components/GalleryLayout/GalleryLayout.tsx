import { Masonry } from '@mui/lab';

import { styles } from './styles';

export function GalleryLayout(items) {
    const classes = styles();

    return (
        <div className={classes.fakeGotchiGalleryLayout}>
            <Masonry columns={{ xs: 3, sm: 4, md: 6, lg: 8 }} spacing={1}>
                {items.items.map((item, i) => (
                    <div className={classes.fakeGotchiGalleryItem} key={i}>
                        <div className={classes.fakeGotchiGallerCount}>#{items.items.length - i}</div>
                        <img src={`https://arweave.net/${item.thumbnailHash}`} alt={item.name} loading='lazy' />
                    </div>
                ))}
            </Masonry>
        </div>
    );
}
