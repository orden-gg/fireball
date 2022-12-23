import { Masonry } from '@mui/lab';
// import { Link } from '@mui/material';

// import { GotchiHeartGif, H1OpenedPortalGif } from 'components/Icons/Icons';
import { GalleryFakeGotchi } from 'pages/FakeGotchisGallery/models';

import { GalleryLoader } from '../GalleryLoader/GalleryLoader';
import { styles } from './styles';

export function GalleryLayout({ items }: { items: GalleryFakeGotchi[] }) {
    const classes = styles();

    return (
        <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 6 }} spacing={0.5} className={classes.fakeGotchiGalleryList}>
            {items.map((item: GalleryFakeGotchi, index: number) => (
                <div className={classes.fakeGotchiGalleryItem} key={index}>
                    <div
                        // href={`https://arweave.net/${item.thumbnailHash}`}
                        // target='_blank'
                        className={classes.fakeGotchiGalleryItemDesc}
                    >
                        <img src={`https://arweave.net/${item.thumbnailHash}`} alt={item.name} />
                        {/* <div className={classes.name}>{item.name}</div>
                            <div className={classes.author}>
                                by
                                <span> {item.artistName}</span>
                            </div>
                            <div className={classes.fakeGotchiGalleryItemFooter}>
                                <p>
                                    <H1OpenedPortalGif height={20} width={20} /> {item.editions}
                                </p>
                                <p>
                                    <GotchiHeartGif height={16} width={16} /> {item.likeCount}
                                </p>
                            </div> */}
                    </div>
                    <GalleryLoader className={classes.fakeGotchiGalleryLoader} />
                </div>
            ))}
        </Masonry>
    );
}
