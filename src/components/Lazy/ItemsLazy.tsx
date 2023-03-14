import { useRef } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';

import styled from '@emotion/styled';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(192px, 1fr));
  grid-gap: 12px;
`;

const NoContent = styled.div`
  text-align: center;
  padding: 24px;
`;

interface ItemsLazyProps {
  items: CustomAny[];
  component: (props: CustomAny) => JSX.Element;
  onHandleReachedEnd?: () => void;
}

export function ItemsLazy({ items, component, onHandleReachedEnd }: ItemsLazyProps) {
  const gridRef = useRef<CustomAny>(null);

  // useEffect(() => {
  //     if (items.length) {
  //         scrollToTop();
  //     }
  // }, [items]);

  // const scrollToTop = () => {
  //     gridRef.current.scrollToIndex({
  //         index: 0,
  //         align: 'start',
  //         behavior: 'auto'
  //     });
  // };

  if (!items) {
    return <></>;
  }

  if (items.length === 0) {
    return (
      <NoContent>
        <span>No items</span>
      </NoContent>
    );
  }

  const onEndReached = (index: number) => {
    if (index === items.length - 1) {
      if (onHandleReachedEnd) {
        onHandleReachedEnd();
      }
    }
  };

  return (
    <VirtuosoGrid
      ref={gridRef}
      style={{ height: '100%' }}
      totalCount={items.length}
      components={{
        List: ListContainer as CustomAny
      }}
      itemContent={(index) => component(items[index])}
      endReached={(index) => onEndReached(index)}
    />
  );
}
