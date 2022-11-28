import { Navigate, Route, Routes } from 'react-router-dom';

import { PageNavLink } from 'shared/models';
import { FakeGotchisIcon } from 'components/Icons/Icons';
import { PageNav } from 'components/PageNav/PageNav';

import { Minted, Queue } from '../components';

import { styles } from './styles';

export function FakeGotchisGallery() {
    const classes = styles();

    const navData: PageNavLink[] = [
        {
            name: 'minted',
            path: 'minted',
            icon: <FakeGotchisIcon width={24} height={24} />,
            isLoading: false,
            count: 1
        },
        {
            name: 'queue',
            path: 'queue',
            icon: <FakeGotchisIcon width={24} height={24} />,
            isLoading: false,
            count: 1
        }
    ];

    return (
        <div className={classes.fakeGotchisGalleryContainer}>
            <div className={classes.fakeGotchisGalleryContainerNav}>
                <PageNav links={navData}></PageNav>
            </div>
            <Routes>
                <Route path='minted' element={<Minted />} />
                <Route path='queue' element={<Queue />} />
                <Route path='*' element={<Navigate to='minted' replace />} />
            </Routes>

        </div>
    );
}
