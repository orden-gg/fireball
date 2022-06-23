import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { VirtuosoGrid } from 'react-virtuoso';

const ListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(192px,1fr));
    grid-gap: 12px;
`;

const NoContent = styled.div`
    text-align: center;
    padding: 24px;
`;

interface GotchisLazyProps {
    items: any[];
    renderItem: (id: number | string) => JSX.Element;
}

export function GotchisLazy({ items, renderItem }: GotchisLazyProps) {
    const gridRef = useRef<any>(null);

    useEffect(() => {
        if (items.length) {
            scrollToTop();
        }
    }, [items]);

    const scrollToTop = () => {
        gridRef.current.scrollToIndex({
            index: 0,
            align: 'start',
            behavior: 'auto'
        });
    };

    if (!items) {
        return <></>;
    }

    if (items.length === 0) {
        return <NoContent>
            <span>No gotchis</span>
        </NoContent>;
    }

    return (
        <VirtuosoGrid
            ref={gridRef}
            style={{ height: '100%' }}
            totalCount={items.length}
            components={{
                List: ListContainer as any
            }}
            itemContent={index => renderItem(index)}
        />
    );
}
