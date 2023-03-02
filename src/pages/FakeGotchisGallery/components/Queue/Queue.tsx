import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';

import { FakeGotchi } from 'shared/models';

import { ContentInner } from 'components/Content/ContentInner';

import * as fromFakeGotchisGalleryStore from '../../store';

import { GalleryLayout } from '../GalleryLayout/GalleryLayout';

export function Queue() {
  const dispatch = useAppDispatch();

  const queuedGotchis: FakeGotchi[] = useAppSelector(fromFakeGotchisGalleryStore.getQueuedGotchis);
  const isQueuedGotchisLoading: boolean = useAppSelector(fromFakeGotchisGalleryStore.getIsQueuedGotchisLoading);

  useEffect(() => {
    dispatch(fromFakeGotchisGalleryStore.loadQueuedFakeGotchis());
  }, []);

  return (
    <>
      <ContentInner dataLoading={isQueuedGotchisLoading}>
        <GalleryLayout items={queuedGotchis} />
      </ContentInner>
    </>
  );
}
