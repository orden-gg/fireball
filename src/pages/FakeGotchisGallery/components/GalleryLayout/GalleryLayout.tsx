import { ImageList, Link } from '@mui/material';

import { GotchiHeartGif, H1OpenedPortalGif } from 'components/Icons/Icons';
import { GalleryFakeGotchi } from 'pages/FakeGotchisGallery/models';

import { styles } from './styles';

export function GalleryLayout({ items }: { items: GalleryFakeGotchi[] }) {
    const classes = styles();

    return (
        <ImageList variant='masonry' cols={8} gap={4} className={classes.fakeGotchiGalleryList}>
            {items.map((item: GalleryFakeGotchi, index: number) => (
                <div className={classes.fakeGotchiGalleryItem} key={index}>
                    <img
                        src={`https://arweave.net/${item.thumbnailHash}`}
                        srcSet={`https://arweave.net/${item.thumbnailHash}`}
                        alt={item.name}
                        loading='lazy'
                    />
                    <Link
                        href={`https://arweave.net/${item.thumbnailHash}`}
                        target='_blank'
                        className={classes.fakeGotchiGalleryItemDesc}
                    >
                        <div className={classes.name}>{item.name}</div>
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
                        </div>
                    </Link>
                </div>
            ))}
        </ImageList>
    );
}
