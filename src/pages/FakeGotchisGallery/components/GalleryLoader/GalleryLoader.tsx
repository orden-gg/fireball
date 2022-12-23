import { ReactComponent as FakeLoadingIcon } from 'assets/images/icons/fake-gotchis.svg';

import { styles } from './styles';

export function GalleryLoader({ className }: { className?: string }) {
    const classes = styles();

    return (
        <div className={className}>
            <FakeLoadingIcon className={classes.fakeLoader} />
        </div>
    );
}
