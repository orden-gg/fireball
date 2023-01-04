import { GalleryFakeGotchi } from 'pages/FakeGotchisGallery/models';

import { styles } from './styles';

export function GalleryPreview({ fakeGotchi }: { fakeGotchi: GalleryFakeGotchi }) {
    const classes = styles();

    const externalLink = (card: GalleryFakeGotchi): string => {
        return `https://www.fakegotchis.com/${card.identifier ? `explore/${card.identifier}` : `queue/${card.id}`}`;
    };

    return (
        <div className={classes.galleryPreview}>
            <img
                className={classes.galleryImage}
                src={`https://arweave.net/${fakeGotchi.thumbnailHash}`}
                alt={fakeGotchi.name}
                loading='lazy'
            />
            <div className={classes.galleryDescr}>
                <div className={classes.galleryDescTitle}>
                    <span>{fakeGotchi.name}</span>
                    <div>
                        <a href={externalLink(fakeGotchi)} target='_blank' rel='noreferrer'>
                            fakegotchis.com
                        </a>
                    </div>
                </div>
                <div>
                    <span>editions:</span>{' '}
                    {fakeGotchi.metadata?.editions ? fakeGotchi.metadata.editions : fakeGotchi.editions} out{' '}
                    {fakeGotchi.editions}
                </div>
                <div>
                    <span>artist:</span> {fakeGotchi.artistName}
                </div>
                {fakeGotchi.likeCount && (
                    <div>
                        <span>likes:</span> {fakeGotchi.likeCount}
                    </div>
                )}
            </div>
        </div>
    );
}
