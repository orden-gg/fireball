import { useAppSelector } from 'core/store/hooks';

import { GalleryLayout } from 'pages/FakeGotchisGallery/components';

import { ContentInner } from 'components/Content/ContentInner';

import { FakeItemsVM } from '../models';
import * as fromFakeGotchisStore from '../store';

export function ClientFakeGotchis() {
  const fakeItems: FakeItemsVM | null = useAppSelector(fromFakeGotchisStore.selectFakeGotchis);
  const isFakeGotchisLoading: boolean = useAppSelector(fromFakeGotchisStore.selectIsFakeGotchisLoading);

  return (
    <ContentInner dataLoading={isFakeGotchisLoading}>
      <GalleryLayout items={fakeItems ? fakeItems.fakeGotchis : []} />
    </ContentInner>
  );
}
