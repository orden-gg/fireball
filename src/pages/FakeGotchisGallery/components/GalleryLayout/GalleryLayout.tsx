import { Masonry } from '@mui/lab';

import { GalleryFakeGotchi } from 'pages/FakeGotchisGallery/models';
import { FakeGotchisIcon } from 'components/Icons/Icons';

import Zoom from 'react-medium-image-zoom';

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
                        <Zoom>
                            <img src={`https://arweave.net/${item.thumbnailHash}`} alt={item.name} loading='lazy' />
                        </Zoom>

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
                    <div className={classes.fakeGotchiGalleryLoader}>
                        <FakeGotchisIcon height={80} width={80} />
                    </div>
                </div>
            ))}
        </Masonry>
    );
}
