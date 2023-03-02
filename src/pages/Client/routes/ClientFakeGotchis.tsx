import { useAppSelector } from 'core/store/hooks';

import { GalleryLayout } from 'pages/FakeGotchisGallery/components';

import { ContentInner } from 'components/Content/ContentInner';

import * as fromFakeGotchisStore from '../store';

import { FakeItemsVM } from '../models';

export function ClientFakeGotchis() {
  const fakeItems: FakeItemsVM | null = useAppSelector(fromFakeGotchisStore.selectFakeGotchis);
  const isFakeGotchisLoading: boolean = useAppSelector(fromFakeGotchisStore.selectIsFakeGotchisLoading);

  return (
    <ContentInner dataLoading={isFakeGotchisLoading}>
      <GalleryLayout items={fakeItems ? fakeItems.fakeGotchis : []} />
    </ContentInner>
  );
}
