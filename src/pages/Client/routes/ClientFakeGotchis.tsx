import * as fromFakeGotchisStore from '../store';
import { useAppSelector } from 'core/store/hooks';

import { GalleryLayout } from 'pages/FakeGotchisGallery/components';

import { ContentInner } from 'components/Content/ContentInner';

import { FakeItemsVM } from '../models';

export function ClientFakeGotchis() {
  const fakeItems: FakeItemsVM | null = useAppSelector(fromFakeGotchisStore.getFakeGotchis);
  const isInitialFakeGotchisLoading: boolean = useAppSelector(fromFakeGotchisStore.getIsInitialFakeGotchisLoading);

  return (
    <ContentInner dataLoading={isInitialFakeGotchisLoading}>
      <GalleryLayout items={fakeItems ? fakeItems.fakeGotchis : []} />
    </ContentInner>
  );
}
