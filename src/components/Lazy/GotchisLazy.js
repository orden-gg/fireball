import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled'

import { VirtuosoGrid } from 'react-virtuoso'

import Gotchi from 'components/Gotchi/Gotchi';

const ListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(192px,1fr));
    grid-gap: 12px;
`;

export default function GotchisLazy({ items, render }) {
    const gridRef = useRef(null);;

    useEffect(() => {
        if(items.length) scrollToTop();
    }, [items]);

    const scrollToTop = () => {
        gridRef.current.scrollToIndex({
            index: 0,
            align: 'start',
            behavior: 'auto'
        });
    };

    if (!items) return;

    if (items.length === 0) return (
        <div style={{ padding: '24px', textAlign: 'center' }}><span>No gotchis</span></div>
    );

    return (
        <VirtuosoGrid
            ref={gridRef}
            style={{ height: 'calc(100% - 40px)' }}
            totalCount={items.length}
            components={{
                List: ListContainer,
            }}
            itemContent={(index) => (
                <Gotchi
                    gotchi={items[index]}
                    render={render}
                />
            )}
        />
    );
}
