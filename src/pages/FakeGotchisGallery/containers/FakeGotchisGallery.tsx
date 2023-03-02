import ContentLoader from 'react-content-loader';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';

import { Button, useTheme } from '@mui/material';

import { useAppSelector } from 'core/store/hooks';

import { PageNavItem } from 'shared/models';

import { FakeGotchisIcon } from 'components/Icons/Icons';

import * as fromFakeGotchisGalleryStore from '../store';

import { Minted, Queue } from '../components';
import { styles } from './styles';

export function FakeGotchisGallery() {
  const classes = styles();
  const theme = useTheme();

  const navData: PageNavItem[] = [
    {
      path: 'minted',
      name: 'minted',
      icon: <FakeGotchisIcon width={24} height={24} />,
      isLoading: useAppSelector(fromFakeGotchisGalleryStore.getIsMintedGotchisLoading),
      isLoaded: useAppSelector(fromFakeGotchisGalleryStore.getIsMintedGotchisLoaded),
      count: useAppSelector(fromFakeGotchisGalleryStore.getMintedGotchisCount)
    },
    {
      path: 'queue',
      name: 'queue',
      icon: <FakeGotchisIcon width={24} height={24} />,
      isLoading: useAppSelector(fromFakeGotchisGalleryStore.getIsQueuedGotchisLoading),
      isLoaded: useAppSelector(fromFakeGotchisGalleryStore.getIsQueuedGotchisLoaded),
      count: useAppSelector(fromFakeGotchisGalleryStore.getQueuedGotchisCount)
    }
  ];

  return (
    <div className={classes.fakeGotchisGalleryContainer}>
      <div className={classes.fakeGotchisGalleryContainerNav}>
        {navData.map((navItem: PageNavItem) => {
          return (
            <Button
              key={navItem.path}
              startIcon={navItem.icon}
              component={NavLink}
              className={classes.fakeGotchisGalleryNavButton}
              to={navItem.path}
            >
              {<span className={classes.fakeGotchisGalleryNavName}>{navItem.name}</span>}
              {navItem.isLoading ? (
                <ContentLoader
                  speed={2}
                  viewBox='0 0 28 14'
                  backgroundColor={theme.palette.secondary.main}
                  foregroundColor={theme.palette.primary.dark}
                  className={classes.fakeGotchisGalleryButtonLoader}
                >
                  <rect x='0' y='0' width='28' height='14' />
                </ContentLoader>
              ) : (
                <span className={classes.fakeGotchisGalleryNavLabel}>
                  [{navItem.isLoaded ? [navItem.count] : <>...</>}]
                </span>
              )}
            </Button>
          );
        })}
      </div>

      <Routes>
        <Route path='minted' element={<Minted />} />
        <Route path='queue' element={<Queue />} />
        <Route path='*' element={<Navigate to='minted' replace />} />
      </Routes>
    </div>
  );
}
